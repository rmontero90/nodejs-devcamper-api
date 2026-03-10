const express = require('express');
const {
    getCourses,
    getCourse,
    addCourse
} = require('../controllers/courses');

const { protect } = require('../middleware/auth')

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(protect, getCourses)
    .post(protect, addCourse);

router
    .route('/:id')
    .get(protect, getCourse)

module.exports = router;