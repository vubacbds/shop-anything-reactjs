// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { SetCookie } from "../util/cookie";
import { useDispatch } from "react-redux";
import { add_user } from "../action/user";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function LoginGmail() {
  // const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const dispatch = useDispatch();

  // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //       setIsSignedIn(!!user);
  //       console.log(user);
  //       if (user) {
  //         const dataUser = {
  //           _id: user.multiFactor.user.uid,
  //           name: user.multiFactor.user.displayName,
  //           email: user.multiFactor.user.email,
  //           phone: user.multiFactor.user.phoneNumber,
  //           address: "",
  //           image: user.multiFactor.user.photoURL,
  //         };
  //         SetCookie("user", JSON.stringify(dataUser));
  //         SetCookie("accessToken", user.multiFactor.user.accessToken);
  //         dispatch(add_user(dataUser));
  //       }
  //     });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  // if (!isSignedIn) {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
  // }

  // return (
  //   <div>
  //     <h1>My App</h1>
  //     <p>
  //       Welcome {firebase.auth().currentUser.displayName}! You are now
  //       signed-in!
  //     </p>
  //     <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
  //   </div>
  // );
}

export default LoginGmail;
