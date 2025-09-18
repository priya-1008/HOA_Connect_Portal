const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Community = require('../models/Community');
const ROLES = require('../config/roles');

exports.register = async (req,res) => {
  try{
    const { name, email, password, role, phoneNo, houseNumber, communityId} = req.body;
    const requester = req.user;

    if(!role || ![ROLES.ADMIN, ROLES.RESIDENT].includes(role)) {
      return res.status(400).json({ message: 'Invalid or missing role. Only admin or resident allowed' });
    }
    //Only SuperAdmin creates an Admin
    if (role === ROLES.ADMIN && requester.role !== ROLES.SUPERADMIN) {
      return res.status(403).json({ message: 'Only SuperAdmin can create Admins' });
    }
    //Only Admin creates Resident
    if (role === ROLES.ADMIN && requester.role !== ROLES.SUPERADMIN) {
      return res.status(403).json({ message: 'Only SuperAdmin can create Admins' });
    }

    //Duplicate email checking
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Check if community exists
    const community = await Community.findOne({ communityId });
    if (!community) return res.status(400).json({ message: 'Community not found' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name, email, password: hashedPassword, role, phoneNo, houseNumber, communityId
    });

    await user.save();

    // If Admin, link to community
    if (role === ROLES.ADMIN) {
      community.userId = user._id;
      await community.save();
    }


    // Do not send password back
    const safeUser = (({ _id, name, email, role, phoneNo, houseNumber, communityId }) =>
      ({ _id, name, email, role, phoneNo, houseNumber, communityId }))(user);

    res.status(201).json({ message: `${role} registered successfully`, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: "Email and Password are required."});

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, { expiresIn: '7d'});
    res.json({ message: 'Login Successful', token, role: user.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login error', error: error.message });
  }
}