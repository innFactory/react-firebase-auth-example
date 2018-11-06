// Import the Firebase modules that you need in your app.
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';
import { FirebaseApp } from 'firebase-types';

// Initalize and export Firebase.
const config = {
    apiKey: 'CONFIG.FIREBASE.APIKEY',
    authDomain: 'CONFIG.FIREBASE.AUTHDOMAIN',
    databaseURL: 'CONFIG.FIREBASE.DATABASEURL',
    projectId: 'CONFIG.FIREBASE.PROJECTID',
    storageBucket: 'CONFIG.FIREBASE.STORAGEBUCKET',
    messagingSenderId: 'CONFIG.FIREBASE.MESSAGINGSENDERID'
};

export default firebase.initializeApp(config) as FirebaseApp;