const mongoose = require('mongoose');

var articleCommentSchema = mongoose.Schema({
    articleId: String,
    articleComment: String,
    articleCommUser: String
})

const articleSchema = mongoose.Schema({
    articleId: { type: String },
    articleType: { type: String, required: true },
    articleCategory: { type: String, required: true },
    articleSubCategory: { type: String, required: true },
    articleTitle: { type: String, required: true },
    articleSubTitle: { type: String, required: true },
    articleContent: { type: String, required: true },
    articleMainImage: { type: String, required: true },
    articleTags: [{ type: String, required: false }],
    articleAuthor: { type: String, required: true },
    articleNoOfViews: { type: Number, default: 0 },    
    isArticleVisible: { type: Boolean, required: false, default: false},
    articleCity: { type: String, required: true },
    isArticleApproved: { type: Boolean, required: false, default: false },
    isArticleLeadNews: { type: Boolean, required: false, default: false },
    sendNotification: { type: Boolean, required: false, default: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    articleComments: [{ type: articleCommentSchema, required: false }]
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
