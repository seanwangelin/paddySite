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
          description text NOT NULL,
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet nisl purus in mollis nunc sed. Sodales neque sodales ut etiam sit amet nisl purus. Ut sem viverra aliquet eget sit amet tellus. Dictum non consectetur a erat nam. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Quam pellentesque nec nam aliquam sem et. Risus viverra adipiscing at in tellus integer feugiat. Nibh tortor id aliquet lectus proin nibh. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Imperdiet proin fermentum leo vel orci porta. Nunc sed id semper risus. Nec ullamcorper sit amet risus nullam eget. Molestie at elementum eu facilisis. Fermentum iaculis eu non diam. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Lacus vestibulum sed arcu non odio. Et molestie ac feugiat sed Elementum nibh tellus molestie nunc non blandit massa enim nec. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Sed viverra ipsum nunc aliquet. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Magna ac placerat vestibulum lectus mauris ultrices eros in. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Ridiculus mus mauris vitae ultricies leo integer. Velit euismod in pellentesque massa placerat duis ultricies. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. At erat pellentesque adipiscing commodo elit at imperdiet dui. Nulla pharetra diam sit amet. Pulvinar etiam non quam lacus. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Diam sit amet nisl suscipit adipiscing bibendum est. Augue ut lectus arcu bibendum at varius vel pharetra vel. Arcu risus quis varius quam. Faucibus ornare suspendisse sed nisi lacus sed viverra. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Felis imperdiet proin fermentum leo vel orci porta. Lectus vestibulum mattis ullamcorper velit. Nunc eget lorem dolor sed viverra ipsum nunc. Dignissim cras tincidunt lobortis feugiat vivamus at augue. Ut pharetra sit amet aliquam id diam maecenas ultricies. Amet luctus venenatis lectus magna fringilla urna porttitor. At lectus urna duis convallis. Amet cursus sit amet dictum sit. Sollicitudin ac orci phasellus egestas tellus rutrum. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Amet porttitor eget dolor morbi non arcu risus quis varius. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Enim lobortis scelerisque fermentum dui faucibus. Tempor id eu nisl nunc mi ipsum. Nec nam aliquam sem et tortor consequat id porta nibh. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Enim lobortis scelerisque fermentum dui faucibus in. Neque volutpat ac tincidunt vitae semper quis. Hac habitasse platea dictumst vestibulum rhoncus. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Blandit massa enim nec dui nunc. Aliquet risus feugiat in ante metus dictum. Nec feugiat nisl pretium fusce id velit ut. Nisl purus in mollis nunc sed id semper risus. Est ultricies integer quis auctor elit sed vulputate mi sit. Facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris. Non curabitur gravida arcu ac tortor dignissim convallis. Felis eget velit aliquet sagittis id consectetur purus ut faucibus. Eros in cursus turpis massa tincidunt dui ut. Dui ut ornare lectus sit amet. Senectus et netus et malesuada fames ac. Habitant morbi tristique senectus et netus et. Scelerisque fermentum dui faucibus in ornare quam. Amet consectetur adipiscing elit ut aliquam purus sit amet. Ut enim blandit volutpat maecenas volutpat blandit. Adipiscing elit ut aliquam purus sit amet luctus. Risus pretium quam vulputate dignissim suspendisse in est ante in. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut.",
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
