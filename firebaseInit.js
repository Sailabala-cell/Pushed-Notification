import firebase from "firebase/app";
import "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABh9Z5uHGpm-tL-p9OsM-g3MmF-3UosMs",
  authDomain: "notify-95594.firebaseapp.com",
  projectId: "notify-95594",
  storageBucket: "notify-95594.appspot.com",
  messagingSenderId: "661269978201",
  appId: "1:661269978201:web:2b613e27a11acf4e316548",
  measurementId: "G-C9JJ9YJ5M0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
