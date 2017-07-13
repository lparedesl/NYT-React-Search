const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    topic: {
        type: String
    },
    date: {
        type: Date
    },
    url: {
        type: String
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
