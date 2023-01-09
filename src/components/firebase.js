import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDATv4GvvNOgKbt_ACfIxjDCS2bwe3L8Y4",
    authDomain: "chat-app-4113e.firebaseapp.com",
    projectId: "chat-app-4113e",
    storageBucket: "chat-app-4113e.appspot.com",
    messagingSenderId: "242928143837",
    appId: "1:242928143837:web:fc39393a79c3c21bc9ba34"
  }).auth();
