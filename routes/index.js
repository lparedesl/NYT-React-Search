const express = require('express');
const router = express.Router();

// Load index.html
router.get('*', (req, res, next) => {
    res.render('index');
});

module.exports = router;