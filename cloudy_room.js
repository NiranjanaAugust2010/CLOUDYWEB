//ADD YOUR FIREBASE LINKS HERE

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
user_name = localStorage.getItem("username")
document.getElementById("user").innerHTML = "Welcome " + user_name + "!"

function addroom() {
      room_name = document.getElementById("room_name").value
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name)
      window.location = "cloudy_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  row="<div class='room_name' id=" + Room_names+ " onclick='redirecttoroomname(this.id)' >#" +Room_names+"</div> <hr>"
                  document.getElementById("output").innerHTML+=row




            });
      });
}
getData();

function redirecttoroomname(name){
      localStorage.setItem("room_name",name)
      window.location="cloudy_page.html"
}

function logout(){
      localStorage.removeItem("username")
      localStorage.removeItem("room_name")
      window.location="index.html"
}