// // Use these for db & auth
// export const auth = firebase.getAuth(firebaseApp); // Export Firebase Authentication service
// export const db = firebase.getFirestore(firebaseApp); 

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJ4XrIHcg61p_IlKrfi0WVRUdjqZl2vK8",
        authDomain: "knegg-personal.firebaseapp.com",
        projectId: "knegg-personal",
        storageBucket: "knegg-personal.appspot.com",
        messagingSenderId: "462060633587",
        appId: "1:462060633587:web:d2c99f209fe779094be686",
        measurementId: "G-KFNM88Z10R"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp };
