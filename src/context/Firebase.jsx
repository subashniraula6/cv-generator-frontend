import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { removeLocalUserProfiles } from '../utils'
import axios from "../axios/axios"; 
import { notification } from "antd";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signupUserWithEmailAndPassword = (email, Password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, Password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, provider);
  };

  const logout = () => {
    return signOut(firebaseAuth);
  };

  const putData = (coll, data) => {
    return addDoc(collection(db, coll), data);
  };

  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser) {
        // Yes, user is logged in
        // load user data from db
        axios.get("kneg/fbuser/"+ firebaseUser.uid)
        .then(res => {
          let fetchedUser = res.data.data;
          setUser({...firebaseUser, ...fetchedUser})
        })
        .catch(err => {
          notification.error({
            message: "Fetching user error",
            description: err.message,
          });
          console.log(err)
        })
        setUser(user);

      } else {
        // User is logged out
        setUser(null);
        removeLocalUserProfiles();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        loginWithGoogle,
        putData,
        logout,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
