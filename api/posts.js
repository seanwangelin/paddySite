const express = require("express");
const postsRouter = express.Router();

const {
    getAllPosts,
  } = require("../db/models/posts");

  postsRouter.get("/", async (req, res, next) => {
    try {
      const posts = await getAllPosts();
      res.send(posts);
    } catch (err) {
      console.log(err, "error getting posts");
      next();
    }
  });

  module.exports = postsRouter;