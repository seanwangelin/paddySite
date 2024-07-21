import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";

import { default as HomePage } from "./HomePage";
import { default as SinglePost } from "./SinglePost";
import { default as NewPost } from "./NewPost";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [postsArray, setPostsArray] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  const DB = "http://localhost:4000";
  const navigate = useNavigate();

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    let isMounted = true;

    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      if (isMounted) {
        setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
      }
    };

    if (localStorage.getItem("username")) {
      setLoggedIn(true);
    }

    if (localStorage.getItem("app")) {
      setAdmin(true);
    }
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("app");
    window.location.reload();
    setAdmin(false);
  };

  const newPostClick = () => {
    navigate(`/posts/newPost`);
  };

  const getPosts = async () => {
    let isMounted = true;
    let posts = [];

    try {
      const response = await fetch(`${DB}/api/posts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (isMounted) {
        result.map((singleResult) => {
          posts.push(singleResult);
        });
        setPostsArray(posts);
      }

      console.log(result);
      // return result;
    } catch (err) {
      throw err;
    }
    return () => {
      isMounted = false;
    };
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

      console.log("Login Response:", result); // Log the entire response

      if (result.user) {
        localStorage.setItem("username", result.user.username);
        setLoggedIn(true);
        if (result.user.isadmin === true) {
          setAdmin(true);
        }
        console.log("USERNAME RESULT: " + result.user.isadmin);
      } else {
        console.error("User object not found in response");
      }

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              postsArray={postsArray}
              postDescription={postDescription}
              postImage={postImage}
              setPostImage={setPostImage}
              setPostDescription={setPostDescription}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              DB={DB}
              admin={admin}
            />
          }
        />
        <Route path="/posts/:id" element={<SinglePost DB={DB} />} />
        <Route
          path="/posts/newPost"
          element={<NewPost DB={DB} />}
        />
      </Routes>

      <>
        {admin ? (
          <>
            <div>admin enabled</div>
            <button onClick={() => newPostClick()}>New Post</button>
            {localStorage.setItem("app", "les")}
          </>
        ) : (
          <div>admin disabled</div>
        )}

        {loggedIn ? (
          <button className="navLink" onClick={(event) => logout(event)}>
            log out
          </button>
        ) : (
          <>
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
          </>
        )}
      </>
    </>
  );
};

export default App;
