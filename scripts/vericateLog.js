
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
  } else {
    window.location.replace("index.html")
  }
})