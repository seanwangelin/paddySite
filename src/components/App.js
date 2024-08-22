import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";

import { default as HomePage } from "./HomePage";
import { default as SinglePost } from "./SinglePost";
import { default as NewPost } from "./NewPost";
import { default as Header } from "./Header";
import { default as Admin } from "./Admin";
import { default as About } from "./About";

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

  const DB = "https://paddysite.onrender.com";

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

  return (
    <>
      <Header
        loggedIn={loggedIn}
        admin={admin}
        setAdmin={setAdmin}
        setLoggedIn={setLoggedIn}
      />
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
        <Route path="/posts/newPost" element={<NewPost DB={DB} admin={admin} />} />
        <Route
          path="/admin"
          element={
            <Admin
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setAdmin={setAdmin}
              DB={DB}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      {admin ? localStorage.setItem("app", "les") : null}
    </>
  );
};

export default App;
