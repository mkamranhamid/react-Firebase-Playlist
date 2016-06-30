// Initialize Firebase
        const config = {
            apiKey: "AIzaSyCDemLJQsoV-csJ7jtdzTq_nV2ESwvhG2M",
            authDomain: "kamran-playlist.firebaseapp.com",
            databaseURL: "https://kamran-playlist.firebaseio.com",
            storageBucket: "kamran-playlist.appspot.com",
        };
        const fbService = firebase.initializeApp(config);
        const fbDatabase = firebase.database();
        const fbAuth = firebase.auth();
           
         export { fbDatabase, fbAuth }