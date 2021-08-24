// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBcNe_LDyyWL_gWM9ssUn-afdwZssG66ik',
	authDomain: 'amzn-cooma.firebaseapp.com',
	projectId: 'amzn-cooma',
	storageBucket: 'amzn-cooma.appspot.com',
	messagingSenderId: '779866155873',
	appId: '1:779866155873:web:a07a0adecd9e6a67b73320',
	measurementId: 'G-NPBJLL0T6S',
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = app.firestore();

export default db;
