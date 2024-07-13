const {
  client,
  User,
  Posts
  // declare your model imports here
  // for example, User
} = require("./");
const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3();

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    await client.query(`
        drop table if exists users;
        drop table if exists posts;

        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(15) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          isAdmin BOOLEAN DEFAULT false
        );

        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          title varchar(255) NOT NULL,
          description varchar(255) NOT NULL,
          image_url varchar(255)
        );



      `);

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })

    const createInitialUsers = async () => {
      console.log("starting to create users...");

      const usersToCreate = [
        {
          username: "paddy",
          password: "vine7604!",
          isAdmin: true,
        },
      ];

      const users = await Promise.all(usersToCreate.map(User.createUser));
      console.log("users create: ", users);
      console.log("finished creating users");
    };

    const createInitialPosts = async () => {
      console.log("starting to create posts...");

      const postsToCreate = [
        {
          title: "first post",
          description:
            "this is a test to see how the sizing and stuff goes. Wish me luck.",
          image_url: "https://paddy-site.s3.us-east-2.amazonaws.com/lolPic.jpg",
        },
      ];

      const posts = await Promise.all(postsToCreate.map(Posts.createPost));

      console.log("posts to create: ", posts);
      console.log("finished creating posts");
    };

    await createInitialUsers();
    await createInitialPosts();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
