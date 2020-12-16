document.querySelector('#logout').addEventListener('click', e => {
    firebase.auth().signOut()
        .then(() => {
            alert('Sesión terminada')
            window.location.replace("index.html");
        })
})