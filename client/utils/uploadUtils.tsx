import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { FIREBASE_API_KEY, FIREBASE_MSG_ID, FIREBASE_APP_ID } from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "decendraline.firebaseapp.com",
  projectId: "decendraline",
  storageBucket: "decendraline.appspot.com",
  messagingSenderId: FIREBASE_MSG_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const uploadImage: any = async (image: string) => {
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", image, true);
    xhr.send(null);
  });
  const storageRef = ref(getStorage(), "images/" + Date.now() + ".jpg");
  const res = await uploadBytes(storageRef, blob, {
    contentType: "image/jpeg",
  });
  const url = await getDownloadURL(storageRef);
  return url;
};
