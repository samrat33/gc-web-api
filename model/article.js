const mongoose = require('mongoose');

var articleCommentSchema = mongoose.Schema({
    articleId: String,
    articleComment: String,
    articleCommUser: String
})

const articleSchema = mongoose.Schema({
    articleId: {type: String, required: true},
    articleTitle: {type: String, required: true},
    articleSubtitle: {type: String, required: true},
    articleContent: {type: String, required: true},
    articleCategory: {type: String, required: true},
    articleAuthor: {type: String, required: true},
    articleCreateTimestamp: {type: String, required: true},
    articleNoOfViews: {type: Number, default: 0},
    articleExpiryTimestamp: {type: String, required: true},
    articleTags: [{type: String, required: true}],
    articleImages: {type: String},
    isArticleVisible: {type: Boolean, required: true},
    articleComments: [{type: articleCommentSchema, required: false}]
});

module.exports = mongoose.model('Article', articleSchema);
