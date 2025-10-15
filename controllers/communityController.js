const Community = require("../models/Community");
const User = require("../models/User");
const mongoose = require("mongoose");

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
    // const communities = await Community.find().populate("userId", "name email");
    const communities = await Community.find();
    const result = await Promise.all(
      communities.map(async (c) => {
        const admin = await User.findOne({ communityId: c._id, role: "admin" }).select("name email");
        return { ...c.toObject(), admin: admin || null };
      })
    );

    res.json(result);
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
  // console.log("assignAdmin route hit");
  // console.log("Body:", req.body);
  // res.json({ message: "Route works" }); 
  try{
    const { communityId, userId } = req.body;
    console.log(await User.find());

    console.log(await Community.find());

    // console.log("Assign request:", req.body);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      return res.status(400).json({ message: "Invalid communityId format" });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // user.role = 'admin';
    // await user.save();

    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: 'Community not found' });
    // community.userId = userId;
    // await community.save();
    // Assign admin
    user.role = 'admin';
    user.communityId = communityId;
    await user.save();

    res.json({ message: 'Admin assigned to community successfully', community, user });

  }catch(err){
    console.error("Error assigning admin:", err);
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId format" });

    // const community = await Community.findById(communityId);
    // if (!community) return res.status(404).json({ message: "Community not found" });

    const user = await User.findById(userId);
    
      user.role = "admin";
      user.communityId = null;
      await user.save();

    // community.userId = null;
    // await community.save();

    res.json({ message: "HOA Admin removed", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// module.exports = { assignAdmin, removeAdmin };  