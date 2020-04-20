import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBTJjg0-uDPYSAHZ4Tztqu38gZENeLURMY",
    authDomain: "marioplan-4e7ea.firebaseapp.com",
    databaseURL: "https://marioplan-4e7ea.firebaseio.com",
    projectId: "marioplan-4e7ea",
    storageBucket: "marioplan-4e7ea.appspot.com",
    messagingSenderId: "651508268784",
    appId: "1:651508268784:web:65a7c6aaf10999d2418c35",
    measurementId: "G-Y8TZ9HQ0FD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase