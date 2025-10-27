const Amenity = require('../models/Amenity');

// ---------------- CREATE AMENITY ----------------
exports.createAmenity = async (req, res) => {
    try {
        const { name, description, isActive, community } = req.body;
        if (!community) {
            return res.status(400).json({ message: 'Community ID is required' });
        }

        const existing = await Amenity.findOne({ name, community });
        if (existing) return res.status(400).json({ message: 'Amenity already exists in this community' });

        const amenity = new Amenity({ name, description, isActive, community });
        await amenity.save();

        res.status(201).json({ message: 'Amenity created', amenity });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ---------------- GET ALL AMENITIES ----------------
exports.getAllAmenities = async (req, res) => {
    try {
        const amenities = await Amenity.find().populate('community', 'name');
        res.status(200).json({ amenities });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ---------------- UPDATE AMENITY ----------------
exports.updateAmenity = async (req, res) => {
    try {
        const { amenityId } = req.params;
        const { name, description, isActive, community, maintenanceStatus } = req.body;

        const amenity = await Amenity.findByIdAndUpdate(
            amenityId,
            { name, description, isActive, community, maintenanceStatus },
            { new: true, runValidators: true }
        );

        if (!amenity) return res.status(404).json({ message: 'Amenity not found' });

        res.status(200).json({ message: 'Amenity updated', amenity });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ---------------- DELETE AMENITY ----------------
exports.deleteAmenity = async (req, res) => {
    try {
        const { amenityId } = req.params;

        const amenity = await Amenity.findByIdAndDelete(amenityId);
        if (!amenity) return res.status(404).json({ message: 'Amenity not found' });

        res.status(200).json({ message: 'Amenity deleted', amenity });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};