import "./login.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../API_CALLS";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import getConfig from "../../config";
const { SERVER_URI } = getConfig();

export default function Login({ isLogin }) {
  const [isLoginPage, setIsLoginPage] = useState(isLogin);
  const navigate = useNavigate();

  const { login } = useAuth();

  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confPassword = useRef();
  const isFetching = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginPage) {
      const credentials = {
        email: email.current.value,
        password: password.current.value,
      };
      loginCall(credentials, login);
    } else {
      if (confPassword.current.value !== password.current.value)
        return alert("Passwords do not match !!");

      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post(`${SERVER_URI}/api/auth/register`, user);
        setIsLoginPage(!isLoginPage);
        navigate("/login");
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialify</h3>
          <span className="loginDesc">Welcome To Socialify !! </span>
          <span className="loginDesc">SocialMedia for Sociopaths.</span>
        </div>
        <div className="loginRight">
          <form
            onSubmit={handleSubmit}
            className="loginBox"
            style={{
              height: isLoginPage ? "300px" : "400px",
              gap: "10px",
            }}
          >
            {!isLoginPage && (
              <input
                required
                className="loginInput"
                ref={username}
                placeholder="Username"
              />
            )}
            <input
              type="email"
              required
              ref={email}
              className="loginInput"
              placeholder="Email"
            />
            <input
              ref={password}
              required
              type="password"
              className="loginInput"
              placeholder="Password"
            />
            {!isLoginPage && (
              <input
                ref={confPassword}
                required
                type="password"
                // minLength="8"
                className="loginInput"
                placeholder="Confirm Password"
              />
            )}
            <button type="submit" disabled={isFetching} className="loginButton">
              {isFetching ? (
                <CircularProgress color="inherit" size="30px" />
              ) : isLoginPage ? (
                "Log In"
              ) : (
                "Sign Up"
              )}
            </button>

            {isLoginPage && (
              <span style={{ cursor: "pointer" }} className="loginForgot">
                Forgot Password?
              </span>
            )}
            {!isLoginPage && !isFetching && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsLoginPage(!isLoginPage);
                  navigate("/login");
                }}
                className="loginForgot"
              >
                Already have an Account?
              </span>
            )}
            {isLoginPage && (
              <button
                className="loginRegisterButton"
                disabled={isFetching}
                onClick={() => {
                  setIsLoginPage(!isLoginPage);
                  navigate("/register");
                }}
              >
                {isFetching ? (
                  <CircularProgress color="inherit" size="30px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
