import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";

interface User {
  username: string;
  password: string;
}

const LoginSignupForm: React.FC = () => {
  const navigation = useNavigate();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [action, setAction] = useState("");
  const registerLink = () =>{
    setAction(' active');
  };

  const loginLink = () =>{
    setAction('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigation("/app-chat");
  };

  return (
    <div className="container-login" >
      <div className={`wrapper${action}`}>
        {/* Login Screen */}
          <div className="form-box login">
            <form action="">
              <h1>Login</h1>

              <div className="input-box">
                  <FaUser className="icon" />
                  <input type="text" placeholder="Username" required/>
              </div>

              <div className="input-box">
                  <RiLockPasswordFill className="icon"/>
                  <input type="password" placeholder="Password" required/>
              </div>

              <div className="remember-forgot">
                <label><input type="checkbox"/>Remember me</label>
                <a href="#">Forgot Password?</a>
              </div>

              <button type="submit" onClick={() => navigation("/app-chat")}>Login</button>

              <div className="register-link">
                  <p>Don't have an account ? <a href="#" onClick={registerLink}>Register Now</a></p>
              </div>
            </form>
          </div>

          {/* Register Screen */}
          <div className="form-box register">
            <form action="">
              <h1>Registration</h1>

              <div className="input-box">
                  <FaUser className="icon" />
                  <input type="text" placeholder="Username" required/>
              </div>

              <div className="input-box">
                  <IoMdMail className="icon" />
                  <input type="email" placeholder="Email" required/>
              </div>

              <div className="input-box">
                  <RiLockPasswordFill className="icon"/>
                  <input type="password" placeholder="Password" required/>
              </div>

              <div className="remember-forgot">
                <label><input type="checkbox"/>I agree to the terms & conditions</label>
              </div>

              <button type="submit">Register</button>

              <div className="register-link">
                  <p>Have an account ? <a href="#" onClick={loginLink}>Login</a></p>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
