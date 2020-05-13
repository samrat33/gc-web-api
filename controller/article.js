const Article = require("../model/article");

exports.createArticle = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const article = new Article({
        articleType: req.body.articleType,
        articleCategory: req.body.articleCategory,
        articleSubCategory: req.body.articleSubCategory,
        articleTitle: req.body.articleTitle,
        articleSubTitle: req.body.articleSubTitle,
        articleContent: req.body.articleContent,
        articleMainImage: url + "/images/" + req.file.filename,
        articleTags: req.body.articleTags,
        articleAuthor: req.body.articleAuthor,
        articleCity: req.body.articleCity,
        articleComments: req.body.articleComments,
        isArticleLeadNews: req.body.isArticleLeadNews,
        sendNotification: req.body.sendNotification,
        creator: req.userData.userId
    });
    article.save()
        .then(createdArticle => {
            console.log(createdArticle.creator);
            res.status(201).json({
                message: 'Article added successfully',
                article: {
                    ...createdArticle,
                    articleId: createdArticle._id
                }
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Creating an article failed!"
            });
        });
};

exports.updateArticle = (req, res, next) => {
    let imagePath = req.body.articleMainImage;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const article = new Article({
        _id: req.body.articleId,
        articleType: req.body.articleType,
        articleCategory: req.body.articleCategory,
        articleSubCategory: req.body.articleSubCategory,
        articleTitle: req.body.articleTitle,
        articleSubtitle: req.body.articleSubtitle,
        articleContent: req.body.articleContent,
        articleMainImage: imagePath,
        articleTags: req.body.articleTags,
        articleAuthor: req.body.articleAuthor,
        articleComments: req.body.articleComments,
        isArticleLeadNews: req.body.isArticleLeadNews,
        sendNotification: req.body.sendNotification,
        creator: req.userData.userId
    });
    Article.updateOne({ _id: req.params.articleId, creator: req.userData.userId }, article)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Couldn't udpate post!"
            });
        });
};

exports.getArticles = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const articleQuery = Article.find();
    let fetchedArticles;
    if (pageSize && currentPage) {
        articleQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    articleQuery.then(documents => {
        fetchedArticles = documents;
        return Article.countDocuments();
    })
        .then(count => {
            res.status(200).json({
                message: "Articles fetched successfully!",
                articles: fetchedArticles,
                maxArticles: count
            });
        }).catch(error => {
            res.status(500).json({
                message: "Fetching articles failed!"
            });
        });
}

exports.getArticle = (req, res, next) => {
    Article.findById(req.params.articleId).then(article => {
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ message: "Article not found!" });
        }
    });
};

exports.deleteArticle = (req, res, next) => {
    Article.deleteOne({ _id: req.params.articleId, creator: req.userData.userId }).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Article deleted!" });
        } else {
            res.status(401).json({ message: "Not Authorized!" });
        }
    });

}