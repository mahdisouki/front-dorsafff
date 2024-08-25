import React, { useState } from "react";
import "../../CSS/Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login({ socket }) {
  const [register, setRegister] = useState({ name: "", role: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log(login);
    try {
      const res = await axios.post("http://localhost:5000/user/login", login);
      console.log(res.data);

      // Assuming the response includes user details
      const { accesstoken, user } = res.data;

      Cookies.set("token", accesstoken);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userId", user._id);

      // Emit the newUser event with user details and socket ID
      socket.emit("newUser", { userName: user.name, userId: user._id, socketID: socket.id });

      // Redirect to home or any other page
      window.location.href = "/Dashboard"
    } catch (error) {
      console.log(error);
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    console.log(register);
    try {
      const res = await axios.post("http://localhost:5000/user/register", register);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="l">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={registerSubmit}>
            <label className="label" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="nom"
              required=""
              onChange={e => setRegister({ ...register, name: e.target.value })}
            />
            <input
              className="input"
              type="role"
              name="role"
              placeholder="role"
              required=""
              onChange={e => setRegister({ ...register, role: e.target.value })}
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              required=""
              className="input"
              onChange={e => setRegister({ ...register, email: e.target.value })}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              className="input"
              onChange={e => setRegister({ ...register, password: e.target.value })}
            />
            <button type="submit" className="button">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={loginSubmit}>
            <label className="label" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              onChange={e => setLogin({ ...login, email: e.target.value })}
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              onChange={e => setLogin({ ...login, password: e.target.value })}
            />
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
