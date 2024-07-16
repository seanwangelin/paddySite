import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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

  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("username");
    window.location.reload();
  };

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

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${DB}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const result = await response.json();

      localStorage.setItem("username", result.user.username);
      setLoggedIn(true);

      console.log("USERNAME RESULT: " + result.user);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="app-container">
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
      </div>
      <>
      {loggedIn? (
            <button className="navLink" onClick={(event) => logout(event)}>
              log out
            </button>
          ) : (
          <form onSubmit={(event) => loginUser(event)}>
            <div>LOGIN HERE</div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            ></input>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit">Login</button>
          </form>
        )}
      </>
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
