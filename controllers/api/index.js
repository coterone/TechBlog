const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/Users', userRoutes);
router.use('/Posts', postRoutes);
router.use('/Comments', commentRoutes);

module.exports = router;