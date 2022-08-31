import React, { useState, useEffect } from "react";
import "../App.css";

function RegLog({ setUserLoggedIn }) {
  const baseURL = process.env.REACT_APP_BASE_URL_TO_FETCH;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let loggedInUserID = localStorage.getItem("userid");
    let loggedInUserToken = localStorage.getItem("accesstoken");

    if (!loggedInUserID && !loggedInUserToken) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  }, []);

  const registerUser = async () => {
    setLoading(true);
    await fetch(`${baseURL}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        setMessage(item.msg);
        setUsername("");
        setPassword("");
      });
    setLoading(false);
  };

  const loginUser = async () => {
    setLoading(true);
    await fetch(`${baseURL}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item.msg) {
          setMessage(item.msg);
        } else {
          localStorage.setItem("userid", item.userid);
          localStorage.setItem("accesstoken", item.accesstoken);
          setUsername("");
          setPassword("");
          setUserLoggedIn(true);
        }
      });
    setLoading(false);
  };

  return (
    <div className="general_form">
      <h1>Register/Login</h1>
      <input
        type="text"
        placeholder="Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <button onClick={registerUser}>REGISTER</button>
          <button onClick={loginUser}>LOGIN</button>
        </>
      )}
      {message && <h4>{message}</h4>}
    </div>
  );
}

export default RegLog;
