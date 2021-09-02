import firebase from 'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyD4bfd0U3eORQeBngDq0j3cZB4ecoXHt-s",
    authDomain: "book-donation-9366f.firebaseapp.com",
    projectId: "book-donation-9366f",
    storageBucket: "book-donation-9366f.appspot.com",
    messagingSenderId: "283632072541",
    appId: "1:283632072541:web:271914a09e450f353a1ab4"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
