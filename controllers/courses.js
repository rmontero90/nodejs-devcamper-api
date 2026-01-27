const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;
    res.status(200).json({ success: true, count: courses.length, data: courses });
}

// @desc    Get single course
// @route   GET /api/v1/courses/:id
exports.getCourse = async (req, res, next) => {

    const course = await Course.findById(req.params.id);

    if (!course) {
        next(new ErrorResponse(`Course of ${req.params.id} not found`, 404));
    }
    res.status(200).json({ success: true, data: course });
}