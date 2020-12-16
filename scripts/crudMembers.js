
const db = firebase.database(),
    groupsRef = db.ref().child('groups')
usersRef = db.ref().child('users')

//Group list
firebase.auth().onAuthStateChanged(user => {

    const userID = user.uid
    if (user) {
        let usersGroupsRef = firebase.database().ref().child('users/' + userID + '/groups')
        usersGroupsRef.on('child_added', gp => {
            console.log(gp.key);
            groupsRef.child(gp.key).once('value', data => {

                NewOption(data.child('name').val(), data.key)

            })


        })

    }
})


//Member list

SelectGroup.addEventListener("change", (e) => {
    firebase.auth().onAuthStateChanged(user => {
        Clean()
        const userID = user.uid
        if (user) {
            let groupMembersRef = groupsRef.child(SelectGroup.value)
            groupMembersRef.child('admins').on('child_added', member => {
                usersRef.child(member.key).once('value', data => {
                    let heAdmin
                    db.ref(`groups/${SelectGroup.value}/admins/${user.uid}`).once('value', (e) => {
                        iamAdmin = e.val()
                    })
                    db.ref(`groups/${SelectGroup.value}/admins/${data.key}`).once('value', (e) => {
                        heAdmin = e.val()
                    })
                    if (userID == data.key) {
                        LoadMembers(heAdmin, false, data.child('name').val(), data.key)
                    } else {
                        LoadMembers(heAdmin, iamAdmin, data.child('name').val(), data.key)
                    }


                })
            })

        }
    })

});


//Delete Member

function deleteMember(id) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.ref(`groups/${SelectGroup.value}/admins/${id}`).remove()
            db.ref(`users/${id}/groups/${SelectGroup.value}`).remove()

        }
    })
}

function changeAdmin(id, value) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.ref(`users/${id}/groups`).update({ [SelectGroup.value]: value })
            db.ref(`groups/${SelectGroup.value}/admins`).update({ [id]: value })
            /*
            db.ref(`users/${id}/groups/${SelectGroup.value}`).set(value)

            db.ref(`groups/${SelectGroup.value}/admins/${id}`).set(value)
            */
        }
    })

}


