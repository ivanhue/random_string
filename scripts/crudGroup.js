const db = firebase.database(),
    groupsRef = db.ref().child('groups')


function createGroup(TitleValue, PasswordValue) {
    firebase.auth().onAuthStateChanged(user => {
        const userID = user.uid
        if (user) {
            let id = groupsRef.push().key,
                groupData = {
                    name: TitleValue,
                    psswrd: PasswordValue,
                    notes: {},
                    members: {},
                    admins: {
                        [userID]: true
                    }
                },
                updateData = {}

            updateData[`/${id}`] = groupData

            groupsRef.update(updateData)


            let usersRef = firebase.database().ref().child('users')
            usersRef.child(userID + '/groups').update({
                [id]: 'true'
            })
            h3.innerText = id
        } else {
        }
    })


}



firebase.auth().onAuthStateChanged(user => {

    const userID = user.uid
    if (user) {
        let usersGroupsRef = firebase.database().ref().child('users/' + userID + '/groups')
        usersGroupsRef.on('child_added', gp => {
            groupsRef.child(gp.key).once('value', data => {

                LoadGroup(data.key, data.val())

            })
        })

    }
})



function joinGroup(IdGroup, password) {
    firebase.auth().onAuthStateChanged(user => {
        const userID = user.uid
        if (user) {
            const modal = document.querySelector(".modal")
            let groupRef = groupsRef.child(IdGroup)
            let userGroupRef = firebase.database().ref().child('users/' + userID + '/groups' + '/' + IdGroup)
            groupRef.once('value', gp => {

                if (gp.exists() && gp.child('psswrd').val() == password) {
                    userGroupRef.once('value', gp => {

                        if (!(gp.exists())) {
                            let usersRef = firebase.database().ref().child('users')
                            usersRef.child(userID + '/groups').update({
                                [IdGroup]: false
                            })

                            groupRef.child('admins').update({
                                [userID]: false
                            })
                        }
                        if (modal.children[4].className == "join-psswrd active") {
                            e.preventDefault();
                            modal.children[4].classList.remove("active");
                            modal.children[6].classList.toggle("active");
                        } else {
                            e.preventDefault();
                            closeModal();
                            modal.children[6].classList.toggle("active");
                            modal.children[0].classList.toggle("active");
                        }

                    })

                }
                if (modal.children[4].className == "join-psswrd active") {
                    e.preventDefault();
                    modal.children[4].classList.remove("active");
                    modal.children[5].classList.toggle("active");
                } else {
                    e.preventDefault();
                    closeModal();
                    modal.children[5].classList.toggle("active");
                    modal.children[0].classList.toggle("active");
                }
            })


        }
    })

}
