import { React } from "react";
import { Link, useLocation } from "react-router-dom";

import "../style/Header.css";

export default function Header({ loggedIn, admin, setAdmin, setLoggedIn }) {
  const newPostClick = () => {
    navigate('/posts/newPost');
  };

  const location = useLocation();
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("app");
    window.location.reload();
    setAdmin(false);
    setLoggedIn(false);
  };

  return (
    <div id="headerContainer">
      <div id="headerLayout">
        <h1 id="siteName">Wang Sports</h1>
        <div id="headerButtons">
          {loggedIn ? (
            <button className="navLink" onClick={(event) => logout(event)}>
              Log out
            </button>
          ) : null}
          {admin ? (
            <>
            <Link to="/Posts/NewPost"><button className="navLink" onClick={() => newPostClick()}>New Post</button></Link>
              
              {localStorage.setItem("app", "les")}
            </>
          ) : null}
          <Link to="/About">
            <button className="navLink">About</button>
          </Link>
          <Link to="/">
            <div id="home-icon"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
