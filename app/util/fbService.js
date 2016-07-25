// Initialize Firebase
const config = {
    apiKey: "AIzaSyCjcMvHQcrWl7SD8sKu-9MM4XXEdbFymRg",
    authDomain: "playlistapp-5ab87.firebaseapp.com",
    databaseURL: "https://playlistapp-5ab87.firebaseio.com",
    storageBucket: "playlistapp-5ab87.appspot.com",
};
const fbService = firebase.initializeApp(config);
const fbDatabase = firebase.database();
const fbAuth = firebase.auth();
const fbStorage = firebase.storage();

export { fbDatabase, fbAuth, fbStorage }