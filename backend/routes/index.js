const express = require('express');
const router = express.Router();
const commentRoutes = require('./commentRoute');


router.get('/', (req, res) => {
    res.send('API is working!');
});

// Mount routes
router.use('/comments', commentRoutes);

module.exports = router;
