import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyCp_BHB8g8FvyT6GkRBWegmfGklIv3QUY8",
    authDomain: "todo-app-d6f1f.firebaseapp.com",
    databaseURL: "https://todo-app-d6f1f.firebaseio.com",
    projectId: "todo-app-d6f1f",
    storageBucket: "todo-app-d6f1f.appspot.com",
    messagingSenderId: "627647988122"
  };
 var fb =  firebase.initializeApp(config);
 export default fb;
