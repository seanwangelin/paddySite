import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "../style/HomePage.css";

export default function HomePage({
  postsArray,
  postDescription,
  postImage,
  createPost,
  setPostDescription,
  setPostImage,
  postTitle,
  setPostTitle,
}) {

  const navigate = useNavigate();

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  }

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
          <button>Submit post</button>
        </form>
      </div>
      {postsArray.map((post) => {
        return (
          <>
            <div id="homePageContainer">
              <div className="postContainer" key={post.id} onClick={()=> handlePostClick(post.id)}>
                <img className="postImg" src={post.image_url} />
                <div className="titleDescriptionContainer">
                  <div className="postTitle">{post.title}</div>
                  <div className="postDescription">{post.description}</div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
