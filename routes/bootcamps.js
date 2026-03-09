const express = require("express");
const { 
    getBootcamp, 
    getBootcamps, 
    createBootcamp, 
    updateBootcamp, 
    deleteBootcamp, 
    getBootcampsInRadius 
} = require('../controllers/bootcamps');


// Include other resource routers
const courseRouter = require('./courses');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth')

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
.route('/')
    .get(protect, getBootcamps)
    .post(protect, authorize('publisher'), createBootcamp);

router.route('/:id')
    .get(protect, getBootcamp)
    .put(protect, updateBootcamp)
    .delete(protect, deleteBootcamp);

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

module.exports = router;
