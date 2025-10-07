const Community = require("../models/Community");
const User = require("../models/User");

exports.createCommunity = async (req, res) => {
  try {
    const { name, location } = req.body;
    const community = await Community.create({ name, location, userId: req.user._id });
    res.status(201).json({ message: "Community created successfully", community });
  } catch (err) {
    res.status(500).json({ message: "Error creating community", error: err.message });
  }
};

exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate("userId", "name email");
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCommunity = async (req, res) => {
  try {
    const updated = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Community updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const { id } = req.params;

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    await Community.findByIdAndDelete(req.params.id);
    res.json({ message: "Community deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignAdmin = async (req, res) => {
  try{
    const { communityId, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: 'Community not found' });
    community.userId = userId;
    await community.save();

    res.json({ message: 'Admin assigned to community successfully', community, user });

  }catch(err){
    console.error("Error assigning admin:", err);
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const { communityId } = req.body;
    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: "Community not found" });

    const user = await User.findById(community.userId);
    if (user) {
      user.role = "user";
      await user.save();
    }

    community.userId = null;
    await community.save();

    res.json({ message: "HOA Admin removed", community });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// module.exports = { assignAdmin, removeAdmin };  