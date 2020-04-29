const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const Article = require('./model/article');

mongoose.connect("mongodb+srv://devuser:ssamratt33@cluster0-wq2gn.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection to mongoDb successful")
  })
  .catch(() => {
    console.log("Connection unsuccessful")
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/v1/articles", (req, res, next) => {
  const article = new Article({
    articleId: req.body.articleId,
    articleTitle: req.body.articleTitle,
    articleSubtitle: req.body.articleSubtitle,
    articleContent: req.body.articleContent,
    articleCategory: req.body.articleCategory,
    articleAuthor: req.body.articleAuthor,
    articleCreateTimestamp: req.body.articleCreateTimestamp,
    articleNoOfViews: req.body.articleNoOfViews,
    articleExpiryTimestamp: req.body.articleExpiryTimestamp,
    articleTags: req.body.articleTags,
    articleImages: req.body.articleImages,
    isArticleVisible: req.body.isArticleVisible,
    articleComments: req.body.articleComments
  })
  article.save();
  console.log(article);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/v1/articles", (req, res, next) => {
  Article.find()
  .then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      articles: documents
    });
  });
  
});

module.exports = app;