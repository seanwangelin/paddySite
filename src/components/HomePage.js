import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/HomePage.css";

export default function HomePage({ DB, postsArray }) {
  const navigate = useNavigate();

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <>
      {postsArray.map((post) => {
        return (
          <>
            <div id="homePageContainer">
              <div
                className="postContainer"
                key={post.id}
                onClick={() => handlePostClick(post.id)}
              >
                <img className="postImg" src={post.image_url} />
                <div className="titleDescriptionContainer">
                  <div className="postTitle">{post.title}</div>
                  <div className="postDescription">
                    {post.description.substring(1, 255)}...
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
