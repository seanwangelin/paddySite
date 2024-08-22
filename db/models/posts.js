const client = require('../client');

async function getAllPosts() {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM posts;
        `
      );
  
      return rows;
    } catch (err) {
      throw err
    }
  }

  async function createPost({ title, description, image_url }) {
    try {
      ("Data to Insert:", { title, description, image_url }); // Log the data to insert
      const {
        rows: [post],
      } = await client.query(
        `
        INSERT INTO posts(title, description, image_url)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
        [title, description, image_url]
      );
      ("Inserted Post:", post); // Log the inserted post
      return post;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  

  async function getPostById(id) {
    try {
      const { rows: [post] } = await client.query(
        `
        SELECT * FROM posts WHERE id = $1;
        `,
        [id]
      );
  
      return post;
    } catch (err) {
      throw err;
    }
  }

  async function deletePost (postID) {
    try {
      const {
        rows: [post],
      } = await client.query(
        `
          DELETE FROM posts WHERE posts.id = $1
          RETURNING *;
        `,
        [postID]
      );
      if (!post) {
        throw {
          name: "post not found",
          message: "could not find this post",
        };
      }

      return post;
    } catch(err) {
      throw err;
    }
  }

  module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    deletePost
  };