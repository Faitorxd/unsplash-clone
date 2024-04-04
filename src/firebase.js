
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDkCP0CUlTyhIBerg0_SkBAVah2fPTv1vs",
  authDomain: "clon-unsplash.firebaseapp.com",
  projectId: "clon-unsplash",
  storageBucket: "clon-unsplash.appspot.com",
  messagingSenderId: "377657755950",
  appId: "1:377657755950:web:4d46a2a332cebf156152bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export function uploadFile(file){
    const storageRef = ref(storage, `images/${file.name}`);
    uploadBytes(storageRef, file).then(snapshot => {
        console.log('Archivo subido con éxito');
    }).catch(error => {
        console.error('Error al subir el archivo', error);
    });
}