const express = require("express");

const ArticleController = require('../controller/article');

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("/v1/articles", checkAuth, extractFile, ArticleController.createArticle);

router.put("/v1/articles/:articleId", checkAuth, extractFile, ArticleController.updateArticle);

router.get("/v1/articles", ArticleController.getArticles);

router.get("/v1/article/:articleId", ArticleController.getArticle);

router.delete("/v1/articles/:articleId", checkAuth, ArticleController.deleteArticle);

module.exports = router;

