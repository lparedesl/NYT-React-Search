const express = require('express');
const router = express.Router();

mongoose.Promise = global.Promise;

// Get All Saved Articles
router.get('/saved', (req, res, next) => {

});

// Save an Article
router.post('/save-article', (req, res, next) => {

});

// Delete a saved Article
router.post('/delete-article/:id', (req, res, next) => {

});

module.exports = router;