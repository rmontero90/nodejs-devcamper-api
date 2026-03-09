const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        const user = await User.create({ name, email, password, role });

        sendTokenResponse(user, 200, res);
        res.status(200).json({success: true});
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

    sendTokenResponse(user, 200, res);
}

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
 
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res
        .status(statusCode)
        .cookie('mytoken', token, options)
        .json({
            success: true,
            token
        });
    
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
}

// Get user from the token and add id to req object
exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
}