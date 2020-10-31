import firebase from 'firebase';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCW2paAz04lJrnvfIPHVMbOFH2fTbCHs84",
    authDomain: "react-intro-blog-bbc16.firebaseapp.com",
    databaseURL: "https://react-intro-blog-bbc16.firebaseio.com",
    projectId: "react-intro-blog-bbc16",
    storageBucket: "react-intro-blog-bbc16.appspot.com",
    messagingSenderId: "925589973618",
    appId: "1:925589973618:web:0df75b0ae3cad29bc230eb"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore;
export default db;