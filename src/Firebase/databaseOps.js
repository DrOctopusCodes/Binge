import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


function addShow(show){
    console.log('In add show', show.name)
    var showsRef = firebase.database().ref('shows/');
 
    var myShowsFB = []
    showsRef.on('child_added', function(snapshot){
        const snapVal = snapshot.val()
        myShowsFB.push({'id':snapVal['id'], 'name':snapVal['showName']})
    })
    var exists = myShowsFB.find(ele => ele.id === show.id)
    if(exists){
        alert('Show is already on your watchList')
    }
    else{
        showsRef.push({
        id: show.id,
        imagePath: show.imagePath,
        network: show.network,
        showName: show.showName
        })
        alert('Added show to the watchList')
    }
}


function removeShow(show){
    console.log("In remove show")
    var showsRef = firebase.database().ref('shows/')
    var query = showsRef.orderByChild('id').equalTo(show.id);
    query.on('child_added', function(snapshot)
    {
        snapshot.ref.remove();
    });
    alert('Removed from your watchList')
}

const fetchMyShows = async () => {
    try {
        var showsRef = firebase.database().ref('shows/');
        var myShowsFB = []
        showsRef.on('child_added', function(snapshot){
            const snapVal = snapshot.val()
            myShowsFB.push({'id':snapVal['id'], 'name':snapVal['showName']})
        })
        return(myShowsFB)
    }catch (err) {
        console.log(err)
    }
}

const fetchRemovedShows = async () => {
    try {
        var showsRef = firebase.database().ref('shows/');
        var removedId;
        showsRef.on('child_removed', function(snapshot){
            const snapVal = snapshot.val()
            removedId = snapVal['id']
        })
        return(removedId)
    }catch (err) {
        console.log(err)
    }
}

export {addShow, fetchMyShows, removeShow, fetchRemovedShows}
