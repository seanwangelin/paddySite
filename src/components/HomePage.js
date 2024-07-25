import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/HomePage.css";

export default function HomePage({ DB, postsArray, admin }) {
  const navigate = useNavigate();

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  console.log(admin);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${DB}/api/posts/delete/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "aplication/json",
        },
      });

      const result = await response.json();
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div id="homePageContainer">
        <div id="homeBanner">Site Name Sports Blog</div>
        {postsArray.map((post) => {
          return (
            <>
              <div
                className="postContainer"
                key={post.id}
                onClick={() => handlePostClick(post.id)}
              >
                {admin ? (
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                ) : null}
                <img className="postImg" src={post.image_url} />
                <div className="titleDescriptionContainer">
                  <div className="postTitle">{post.title}</div>
                  <div className="postDescription">
                    {post.description.substring(1, 255)}...
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
