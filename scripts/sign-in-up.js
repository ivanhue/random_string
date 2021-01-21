//variable declaration
const d = document
const c = console.log
const f = firebase
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".header-title");
const modalBody = document.querySelector(".modal-body");
const overlay = document.getElementById("overlay");
const closeModal = document.querySelector(".btn-right");


//Variables for each of the icons of the social network
const googleIcon = document.getElementById("google"),
    facebookIcon = document.getElementById("facebook"),
    twitterIcon = document.getElementById("twitter")

const googleIconS = document.getElementById("google-s"),
    facebookIconS = document.getElementById("facebook-s"),
    twitterIconS = document.getElementById("twitter-s")

const auth = f.auth(),
    user = auth.currentUser,
    formSignin = d.getElementById('signin'),
    formLogin = d.getElementById('login')

function createUserInDB(uid, name, email) {
    let usersRef = f.database().ref().child('users')

    usersRef.child(uid).set({
        name,
        email
    }).then(() => {
        window.location.replace("dashboard.html");
    }).catch((err) => {
        console.log(err);
    })
}

//Function that allows the launch of the login pop-up according to the social network used, receives as a parameter said network which can be: Google, Facebook or Twitter. If the registration of that social network is not enabled, no pop-up will be shown
function signInSocial(plataform){
    let provider;
    switch (plataform) {
        case 'Google':
            provider = new firebase.auth.GoogleAuthProvider();
            break;
        case 'Facebook':
            provider = new firebase.auth.FacebookAuthProvider();
            break;
        case 'Twitter':
            provider = new firebase.auth.TwitterAuthProvider();
            break;
        default:
            return;
    }
    auth
    .signInWithPopup(provider) // https://firebase.google.com/docs/auth/web/google-signin
    .then((result) => {
      let user = result.user;
      c(result.additionalUserInfo.isNewUser)
      if(result.additionalUserInfo.isNewUser){            
        //Insert in DB
        createUserInDB(
            user.uid,
            user.displayName,
            user.email
        );
        c("Registro exitoso")
        
      }else{
        window.location.replace("dashboard.html");
      }
    }).catch((error) => {
        let errorMessage = error.message;
        if(error.code=='auth/account-exists-with-different-credential'){
            modalTitle.innerHTML = "Lo sentimos pero usted ya se ha registrado con ese correo.";
            modalBody.innerHTML = "Por favor incie sesión con la cuenta creada anteriormente. Puede que ya tenga cuanta en otra red social pero vinculada a ese correo.";
            modal.classList.add("active");
            overlay.classList.add("active");
        }
        c(errorMessage);
    });
}


//event listeners

//Closes the pop up with the button, it only modifies the DOM
closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
});

//Closes the pop up by ckicking the shaded part, does not receive any parametres, it only modifies the DOM
overlay.addEventListener("click", () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
});


formSignin.addEventListener('submit', e => {
    e.preventDefault()
    //alert('Registrando..')


    auth.createUserWithEmailAndPassword(
        e.target.email.value,
        e.target.password.value
    )
        .then(res => {
            c(res)
            c(res.user)
            //Insert in DB
            createUserInDB(
                res.user.uid,
                e.target.name.value,
                e.target.email.value
            )
            //Send e-mail verification

            res.user.sendEmailVerification().then(function () {
                modalTitle.innerHTML = "¡Solo un paso más!";
                modalBody.innerHTML = "Se ha enviado un mensaje de verificacion a su correo.";
                modal.classList.add("active");
                overlay.classList.add("active");
                e.target.reset();
            }).catch(function (error) {
                modalTitle.innerHTML = "Ha ocurido un error.";
                modalBody.innerHTML = "No se ha podido mandar un correo de verificación, inténtelo de nuevo.";
                modal.classList.add("active");
                overlay.classList.add("active");
                c(error);
            });

        })
        .catch(err => {
            console.error(err)
            switch (err.code) {
                case 'auth/invalid-email':
                    modalTitle.innerHTML = "Registro incompleto";
                    modalBody.innerHTML = "La dirección de correo está vacía.";
                    modal.classList.add("active");
                    overlay.classList.add("active");
                    break;
                case 'auth/weak-password':
                    modalTitle.innerHTML = "Registro incompleto";
                    modalBody.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
                    modal.classList.add("active");
                    overlay.classList.add("active");
                    break;
                case 'auth/email-already-in-use':
                    modalTitle.innerHTML = "Registro incompleto";
                    modalBody.innerHTML = 'La cuenta de correo', e.target.email.value, 'ya existe. Intente con otra,';
                    modal.classList.add("active");
                    overlay.classList.add("active");
                    break;
                default:
            }

            e.target.name.focus()
        })
})

formLogin.addEventListener('submit', e => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(
        e.target.email.value,
        e.target.password.value
    )
        .then(u => {
            c(u)

            //Verificate e-mail status
            if (u.user.emailVerified) {
                modalTitle.innerHTML = "¡Bienvenido!";
                modalBody.innerHTML = "Usuario logueado.";
                modal.classList.add("active");
                overlay.classList.add("active");
                window.location.replace("dashboard.html");
            } else {
                modalTitle.innerHTML = "Registro incompleto";
                modalBody.innerHTML = "Su correo no ha sido verificado, por favor verifique el correo para iniciar sesión";
                modal.classList.add("active");
                overlay.classList.add("active");
                auth.signOut();
            }
            e.target.reset()
        })
        .catch(err => {
            console.error(err)
            modalTitle.innerHTML = "¡Lo sentimos!";
            modalBody.innerHTML = "El correo o contraseña son incorrectos. Intente de nuevo.";
            modal.classList.add("active");
            overlay.classList.add("active");
            e.target.password.focus()
        })
})


//Reset password

const resetPassword = document.getElementById('send-firebase');
const mailField = document.getElementById('email-firebase');
const autenti = f.auth();

const resetPasswordFunction = () => {
    const email = mailField.value

    autenti.sendPasswordResetEmail(email)
    .then(() => {
        c('Password Reset Email sent sussesfully!')
    })
    .catch(error => {
        console.error(error);
    })
}

resetPassword.addEventListener('click', resetPasswordFunction);


//Listners for each of the icons of the social network
googleIcon.addEventListener('click', ()=>{
    signInSocial('Google');
});

facebookIcon.addEventListener('click', ()=>{
    signInSocial('Facebook');
});

twitterIcon.addEventListener('click', ()=>{
    signInSocial('Twitter');
});

googleIconS.addEventListener('click', ()=>{
    signInSocial('Google');
});

facebookIconS.addEventListener('click', ()=>{
    signInSocial('Facebook');
});

twitterIconS.addEventListener('click', ()=>{
    signInSocial('Twitter');
});