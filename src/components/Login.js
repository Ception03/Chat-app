import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import "firebase/app";
import firebase from "firebase/app";
import { auth } from '../components/firebase';
 
import "../components/login.css";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">

        <h2 className="welcome-text">Scrim Chat<br/>Reimagined</h2>
        <p>Made with React.js Firebase, ChatEngine</p>

        <div 
        className="login-button google"
        onClick={()=> auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>

          <GoogleOutlined /> Sign in With Google

        </div>
       

      </div>
    </div>
  );
};
export default Login;
