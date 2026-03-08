const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    // const { name, email, password, role } = req.body;

    res.status(200).json({success: true});
    // try {
    //     const user = await User.create({ name, email, password, role });
    // }
}