import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [postsArray, setPostsArray] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState("");

  const DB = "http://localhost:4000";

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  const getPosts = async () => {
    let posts = [];

    try {
      const response = await fetch(`${DB}/api/posts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      result.map((singleResult) => {
        posts.push(singleResult);
      });
      setPostsArray(posts);

      console.log(result);
      // return result;
    } catch (err) {
      throw err;
    }
  };

  const createPost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${DB}/api/posts/newPost/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postTitle,
          description: postDescription,
          image_url: postImage,
        }),
      });
      const result = await response.json();

      return result;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="app-container">
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
      </div>
      <div id="postContainer">
        {postsArray.map((post) => {
          return (
            <>
              <div>
                <form onSubmit={(event) => createPost(event)}>
                  <label>Post name:</label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                  ></input>
                  <label>Post description:</label>
                  <input
                    type="text"
                    value={postDescription}
                    onChange={(event) => setPostDescription(event.target.value)}
                  ></input>
                  <label>Post image:</label>
                  <input
                    type="text"
                    value={postImage}
                    onChange={(event) => setPostImage(event.target.value)}
                  ></input>
                </form>
              </div>
              <div key={post.id}>
                <img src={post.image_url} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default App;
