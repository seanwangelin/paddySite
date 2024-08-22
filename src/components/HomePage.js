import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../style/HomePage.css";

export default function HomePage({ DB, postsArray, admin }) {
  const navigate = useNavigate();

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

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
        <div id="homeBanner">Wang Sports</div>
        {postsArray.map((post) => {
          return (
            <>
              <div
                className="postContainer"
                key={post.id}
                onClick={() => handlePostClick(post.id)}
              >
                {admin ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(post.id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                ) : null}
                <div className="authorAndImageStyling">
                  <img className="postImg" src={post.image_url} />
                  <div className="homePageAuthor">by Paddy Wangelin</div>
                </div>
                <div className="titleDescriptionContainer">
                  <div className="postTitle">{post.title}</div>
                  <div className="postDescription">
                    {post.description.substring(1, 1000)}...
                  </div>
                  <div className="postDescriptionShort">
                    {post.description.substring(1, 275)}...
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
