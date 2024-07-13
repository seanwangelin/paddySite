const express = require("express");
const postsRouter = express.Router();

const {
    getAllPosts,
    createPost
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

  postsRouter.post("/newPost", async (req, res) => {
    const { title, description, image_url } = req.body;
  
    try {
      const newPost = await createPost(title, description, image_url);
      res.send(newPost);
      console.log("post added!");
    } catch (err) {
      console.error(err, req.body);
    }
  });

  module.exports = postsRouter;