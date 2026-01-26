const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId})
    } else {
        query = Course.find();
    }

    const courses = await query;
    res.status(200).json({ success: true, count: courses.length, data: courses });
}