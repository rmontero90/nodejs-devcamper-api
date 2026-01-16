const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async') // No longer needed because of native support from Express 5

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({success: true, data: bootcamps});
}
// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.getBootcamp = async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        next(new ErrorResponse(`Bootcamps of ${req.params.id} not found`, 404));
    }
    res.status(200).json({ success: true, data: bootcamp });
}
// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp});

}
// @desc    Update single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
        res.status(200).json({success: true, data: bootcamp});
    if (!bootcamp) {
        next(new ErrorResponse(`Bootcamps of ${req.params.id} not found`, 404));
    }
}