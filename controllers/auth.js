const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        const user = await User.create({ name, email, password, role });

        // Create token
        const token = user.getSignedJwtToken();
        res.status(200).json({success: true, token});
    } catch (err) {
        next(new ErrorResponse(err.message.red), 500);
    }
}

// @desc    Login user
// @route Post /api/v1/auth/login
// @access Public

exports.login = async (req, res, next) => {
    const { email, password }= req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    // Create token
    const token = await user.getSignedJwtToken();
    res.status(200).json({success: true, token});
    
}