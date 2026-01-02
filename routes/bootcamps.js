const express = require("express");
const { getBootcamp, getBootcamps, createBootcamp, updateBootcamp } = require('../controllers/bootcamps');

const router = express.Router();

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp);

module.exports = router;
