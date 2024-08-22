const express = require("express");
const postsRouter = express.Router();

const { getAllPosts, createPost, getPostById, deletePost } = require("../db/models/posts");

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.send(posts);
  } catch (err) {
    (err, "error getting posts");
    next();
  }
});

postsRouter.post("/newPost", async (req, res) => {
  const { title, description, image_url } = req.body;
  ("Incoming Data:", req.body); // Log the incoming data

  try {
    const newPost = await createPost({ title, description, image_url });
    res.send(newPost);
    ("Post Added:", newPost); // Log the added post
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Error creating post" });
  }
});

postsRouter.get("/:id", async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    res.send(post);
  } catch (err) {
    (err, "error getting post");
    res.status(500).send({ error: "Error getting post" });
    next();
  }
});

postsRouter.delete("/delete/:postID", async (req, res, next) => {
  const { postID } = req.params;
  try {
    const deletedPost = await deletePost(postID);
    res.status(200).json({message: "post removed"});

    return deletedPost;
  } catch(err) {
    throw err;
  }
})

module.exports = postsRouter;
