//variable declaration
const d = document
const c = console.log
const f = firebase
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".header-title");
const modalBody = document.querySelector(".modal-body");
const overlay = document.getElementById("overlay");
const closeModal = document.querySelector(".btn-right");


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