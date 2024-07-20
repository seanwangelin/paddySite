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

  async function createPost({
    title,
    description,
    image_url
  }) {
    try {
      const {
        rows: [post],
      } = await client.query(
        `
        INSERT INTO posts(title, description, image_url)
        VALUES ($1,$2, $3)
        returning *;
        `,
        [
          title,
          description,
          image_url
        ]
      );
  
      return post;
  
    } catch (error) {
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

  module.exports = {
    getAllPosts,
    createPost,
    getPostById
  };