const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

const app = express();

mongoose.connect("mongodb://devuser:" + process.env.MONGO_ATLAS_PASSWORD + "@cluster0-shard-00-00-wq2gn.mongodb.net:27017,cluster0-shard-00-01-wq2gn.mongodb.net:27017,cluster0-shard-00-02-wq2gn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log("Connection to mongoDb successful")
  })
  .catch((error) => {
    console.log(error)
    console.log("Connection unsuccessful")
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api", articleRoutes);
app.use("/api/users", userRoutes);

module.exports = app;

