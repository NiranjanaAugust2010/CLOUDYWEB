var firebaseConfig = {
    apiKey: "AIzaSyDnjd-vTaRIGd9F89_uZ3aZ0bOa-LNg5KA",
    authDomain: "cloudyweb-61c29.firebaseapp.com",
    databaseURL: "https://cloudyweb-61c29-default-rtdb.firebaseio.com",
    projectId: "cloudyweb-61c29",
    storageBucket: "cloudyweb-61c29.appspot.com",
    messagingSenderId: "114126196942",
    appId: "1:114126196942:web:75a94d61993d79a852009f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

rn = localStorage.getItem("room_name")

un = localStorage.getItem("username")

function send() {
    msg = document.getElementById("msg").value
    firebase.database().ref(rn).push({
        name: un,
        message: msg,
        like: 0
    })

}

function room1name() {
    document.getElementById("room1name").innerHTML = "Welcome to room " + rn + "!"

}


function getdata() {
    firebase.database().ref("/" + rn).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;

                message_data = childData;
                name1 = message_data['name']
                message = message_data['message']
                like = message_data['like']
                name_with_tag = "<h4>" + name1 + "<img class= 'user_tick' src='tick.png'> </h4>"
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>"
                spanwithtag = "<span class='glyphicon glyphicon-thumbs-up'> like:" + like + "</span></button><hr>"
                row = name_with_tag + message_with_tag + like_button + spanwithtag
                document.getElementById("output").innerHTML += row


            }

        })

    })
}



getdata()

function updatelike(message_id) {
    button_id = message_id
    likes = document.getElementById(button_id).value
    updatedlikes = Number(likes) + 1
    firebase.database().ref(rn).child(message_id).update({
        like: updatedlikes
    })
}

function logout(){
    localStorage.removeItem("username")
    localStorage.removeItem("room_name")
    window.location="index.html"
}
