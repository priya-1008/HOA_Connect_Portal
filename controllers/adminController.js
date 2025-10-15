const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all residents for the logged-in admin’s community
exports.getResidents = async (req, res) => {
  try {
    if (!req.user?.community) {
      return res.status(400).json({ message: "Community not found in user" });
    }

    const residents = await User.find({
      community: req.user.community,
      role: "resident",
    }).select("-password");

    res.json(residents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new resident
exports.addResident = async (req, res) => {
  try {
    const { name, email, password, phoneNo, houseNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!req.user?.communityId) {
      return res.status(400).json({ message: "Community not found in user" });
    }

    const newResident = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNo,
      houseNumber,
      role: "resident",
      communityId: req.user.communityId,
    });

    res.status(201).json(newResident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update resident
exports.updateResident = async (req, res) => {
  try {
    const resident = await User.findById(req.params.id);
    if (!resident) return res.status(404).json({ message: "Resident not found" });

    if (!req.user?.communityId || !resident.communityId) {
      return res.status(400).json({ message: "Missing community info" });
    }

    if (resident.communityId.toString() !== req.user.communityId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(resident, req.body);
    await resident.save();
    res.json(resident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete resident
exports.deleteResident = async (req, res) => {
  try {
    const resident = await User.findById(req.params.id);
    if (!resident) return res.status(404).json({ message: "Resident not found" });

    if (!req.user?.communityId || !resident.communityId) {
      return res.status(400).json({ message: "Missing community info" });
    }

    if (resident.communityId.toString() !== req.user.communityId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await resident.deleteOne();
    res.json({ message: "Resident deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};