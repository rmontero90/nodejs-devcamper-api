const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else if (req.query.select && req.query.select.includes('bootcamp')) {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }
    else { 
        query = Course.find();
    }   

        //Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

       // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    const courses = await query;
    res.status(200).json({ success: true, count: courses.length, data: courses });
}

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Private
exports.getCourse = async (req, res, next) => {

    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        next(new ErrorResponse(`Course of ${req.params.id} not found`, 404));
    }
    res.status(200).json({ success: true, data: course });
}

// @desc    Add course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.addCourse = async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    console.log(`Course is create for ${req.body.bootcamp}`);
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}` , 404)
        )
    }

    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        data: course
    });
}