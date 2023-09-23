import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import  Constants  from 'expo-onstants';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

//Intialize firebase

const firebaseConfig = {
  apiKey: "AIzaSyBnnq3xjjqxVgk60mzk1TBMdOaBxMFIa_c",
  authDomain: "test-react-native-f968b.firebaseapp.com",
  projectId: "test-react-native-f968b",
  storageBucket: "test-react-native-f968b.appspot.com",
  messagingSenderId: "1081787135953",
  appId: "1:1081787135953:web:ea42805e09fc8a60af12f0",
  measurementId: "G-81GYBSZPXD"
};

let Firebase = firebase.initializeApp(firebaseConfig);


export const firestore = firebase.firestore();


//create hospital
export const createUserProfile = async (user, Images, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`AppUsers/${user.uid}`);
  const snapshot = await userRef.get();
  let newImages = [];

  for (let i = 0; i < Images.length; i++) {
    let response = await fetch(Images[i]);
    let blob = await response.blob();
    let ref = Firebase.storage().ref().child(`AppUsers/${Date.now()}`);
    await (ref.put(blob));
    let link = await ref.getDownloadURL();
    newImages.push(link);
  }

  if (!snapshot.exists) {
    const { email } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        id: user.uid,
        email,
        createdAt,
        photoUrl: newImages,
        ...additionalData
      })
    } catch (err) {
      console.log('Error while creating User ', error.message);
    }
  }

  return userRef;

}
//appointment handle approve

export default Firebase; 