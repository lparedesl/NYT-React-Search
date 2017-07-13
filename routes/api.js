const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/Article');

mongoose.Promise = global.Promise;

// Get All Saved Articles
router.get('/saved', (req, res, next) => {

});

router.post('/check-if-saved', (req, res, next) => {
    const articles = req.body;
    checkIfSaved(0, articles, data => {
        res.json(data);
    });

    function checkIfSaved(i, docs, cb) {
        if (i < docs.length) {
            docs[i].saved = false;
            const promise = Article.findById(docs[i]._id).exec();
            promise.then(doc => {
                if (doc) {
                    console.log('FOUND!!!', docs[i]._id);
                    docs[i].saved = true;
                }

                i++;
                if (i === docs.length) {
                    cb(docs);
                }
                checkIfSaved(i, docs, cb);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
});

// Save an Article
router.post('/save-article', (req, res, next) => {
    Article.findById(req.body._id, (err, doc) => {
        if (err) throw err;
        if (!doc) {
            const article = new Article(req.body);
            article.save((err, doc) => {
                if (err) throw err;
                res.json(doc);
            });
        } else {
            res.end();
        }
    });
});

// Delete a saved Article
router.post('/delete-article/:id', (req, res, next) => {

});

module.exports = router;