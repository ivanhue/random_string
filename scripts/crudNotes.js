const db = firebase.database()
var idGroup = window.location.hash.substring(1)

firebase.auth().onAuthStateChanged(user => {


    if (user) {
        const userID = user.uid
        let groupRef = firebase.database().ref().child('groups/' + idGroup)
        groupRef.once('value', gp => {
            Title(gp.child('name').val())
        })

    }
})


firebase.auth().onAuthStateChanged(user => {


    if (user) {
        const userID = user.uid
        let groupRef = firebase.database().ref().child('groups/' + idGroup)



        groupRef.child('notes').on('child_added', note => {
            let iamAdmin
            db.ref(`groups/${idGroup}/admins/${user.uid}`).once('value', (e) => {
                iamAdmin = e.val()
            })
            NewNote(note.child('text').val(), note.child('color').val(), note.child('status').val(), note.key, iamAdmin)
        })

    }
})

//
function pushNote(text, color, status, favourite) {
    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            const userID = user.uid
            let groupRef = firebase.database().ref().child('groups/' + idGroup)
            groupRef.child('notes').push({
                color: color,
                status: status,
                text: text,
                favourite: false
            })
        }
    })

}

function deleteNote(id) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.ref(`groups/${idGroup}/notes/${id}`).remove()
        }
    })
}

function changeNote(id, status) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.ref(`groups/${idGroup}/notes/${id}/status`).set(status)
        }
    })
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const userID = user.uid
        let groupRef = firebase.database().ref().child('groups/' + idGroup)

        groupRef.child('notes').on('child_changed', note => {
            let iamAdmin
            db.ref(`groups/${idGroup}/admins/${user.uid}`).once('value', (e) => {
                iamAdmin = e.val()
            })

            CleanNotes()
            groupRef.child('notes').once('value', note => {
                console.log(note.key)
                note.forEach(note => {
                    NewNote(note.child('text').val(), note.child('color').val(), note.child('status').val(), note.key, iamAdmin)
                });
            })

        })
        groupRef.child('notes').on('child_removed', note => {

            CleanNotes()
            let iamAdmin

            db.ref(`groups/${idGroup}/admins/${user.uid}`).on('value', (e) => {
                iamAdmin = e.val()
            })
            groupRef.child('notes').once('value', note => {
                note.forEach(note => {
                    NewNote(note.child('text').val(), note.child('color').val(), note.child('status').val(), note.key, iamAdmin)
                });
            })

        })

    }
})


function quitGroup() {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log("Entre a quit")
        if (user) {
            db.ref(`groups/${idGroup}/admins/${user.uid}`).remove()
            db.ref(`users/${user.uid}/groups/${idGroup}`).remove()

        }
    })
}


function delteGroup() {
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            let iamAdmin = false
            let wasAdmin = true
            db.ref(`groups/${idGroup}/admins/${user.uid}`).on('value', (e) => {
                iamAdmin = e.val()
            })

            db.ref(`groups/${idGroup}/admins`).once("value", member => {
                if (iamAdmin) {
                    member.forEach(function (user) {
                        db.ref(`users/${user.key}/groups/${idGroup}`).remove().then(() => {
                            db.ref(`users/${user.key}/groups/${idGroup}`).remove()
                        })
                    })

                }

            }).then(() => {
                if (iamAdmin) {
                    db.ref(`groups/${idGroup}`).remove()
                } else {
                    wasAdmin = false
                    alert("no eres admin >:[")
                }

            }).then(() => {
                if (wasAdmin) {
                    window.location.href = "dashboard.html"
                }
            })





        }
    })

}