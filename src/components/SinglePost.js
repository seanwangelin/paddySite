import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../style/SinglePost.css";

export default function SinglePost({ DB }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  //create an async function to get single post
  const getSinglePost = async () => {
    try {
      const response = await fetch(`${DB}/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        setPost(result);
      } else {
        const text = await response.text();
      }
    } catch (err) {
      console.err(err);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [id]);

  return (
    <>
      {post ? (
        <div id="postContainer">
          <div id="titleContainer">
            <h1 id="title">{post.title}</h1>
            <div id="authorName">by Paddy Wangelin</div>
          </div>
          <img src={post.image_url} alt={post.title} />
          <p id="description">{post.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
