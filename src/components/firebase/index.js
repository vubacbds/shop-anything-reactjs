// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCH7ojKNDOAlU2vqYe2zFzoC3uJuLHVrLQ",
//     authDomain: "room-social-network-upload.firebaseapp.com",
//     projectId: "room-social-network-upload",
//     storageBucket: "room-social-network-upload.appspot.com",
//     messagingSenderId: "114355453481",
//     appId: "1:114355453481:web:60e865edc074b7438f2638",
//     measurementId: "G-C66BBYV7J5"
//   };

// firebase.initializeApp(firebaseConfig)
// const storage = firebase.storage()

// export {storage, firebase as default}

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbdEkMG0zt5YBRQlpPdT_gctip3pYfLpM",
  authDomain: "product-anything.firebaseapp.com",
  projectId: "product-anything",
  storageBucket: "product-anything.appspot.com",
  messagingSenderId: "553146405137",
  appId: "1:553146405137:web:f234bde8921a619e31fcb0",
  measurementId: "G-J7HK4D02SN",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
