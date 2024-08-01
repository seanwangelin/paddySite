import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Admin.css";

export default function Admin({
  username,
  password,
  setUsername,
  setPassword,
  setLoggedIn,
  setAdmin,
  DB,
  loggedIn,
}) {
  const navigate = useNavigate();

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

      console.log("Login Response:", result);

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

      navigate("/");

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {loggedIn ? (
        <div id="loggedIn">Already logged in, return to home.</div>
      ) : (
        <form onSubmit={(event) => loginUser(event)}>
          <label id="loginLabel">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="loginInput"
          ></input>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="loginInput"
          ></input>
          <button type="submit" id="loginButton">
            Login
          </button>
        </form>
      )}
    </>
  );
}
