import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/NewPost.css";

export default function NewPost({ DB, admin }) {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState("");

  const navigate = useNavigate();

  const createPost = async (event) => {
    event.preventDefault();
    console.log("Form data: ", {
      title: postTitle,
      description: postDescription,
      image_url: postImage,
    });
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

      console.log("RESULT: " + result);

      navigate("/");
      window.location.reload();

      return result;
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {admin ? (
        <div>
          <form onSubmit={(event) => createPost(event)}>
            <label>Post name:</label>
            <input
              type="text"
              value={postTitle}
              onChange={(event) => {
                setPostTitle(event.target.value);
                console.log("TITLE: " + event.target.value);
              }}
            ></input>
            <label>Post description:</label>
            <textarea
              type="text"
              value={postDescription}
              id="postDescription"
              onChange={(event) => {
                setPostDescription(event.target.value);
                console.log("DESCRIPTION: " + event.target.value);
              }}
            ></textarea>
            <label>Post image:</label>
            <input
              type="text"
              value={postImage}
              onChange={(event) => setPostImage(event.target.value)}
            ></input>
            <button type="submit" id="newPostButton">
              Submit post
            </button>
          </form>
        </div>
      ) : <div>You do not have permission to access this page</div>}
    </>
  );
}
