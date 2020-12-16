// const
const toggle = document.querySelector('.toggle');
const li_links = document.querySelectorAll(".links ul li");
const view_wraps = document.querySelectorAll(".view_wrap");
const list_view = document.querySelector(".list-view");
const grid_view = document.querySelector(".grid-view");
const action = document.querySelector(".action");
const newNote = document.querySelector(".new-note");
const joinNote = document.querySelector(".join-note");
const closeNote = document.querySelectorAll('.close-btn');
const overlay = document.getElementById("overlay");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnJoin = document.querySelectorAll(".modal-btn-join");
const modalBtn1 = document.getElementById("modalBtn1");
const modalBtn2 = document.getElementById("modalBtn2");
const modalBtn3 = document.getElementById("modalBtn3");
const modalBtn4 = document.getElementById("modalBtn4");
const modalBtn5 = document.getElementById("modalBtn5");
const h3 = document.getElementById("h3");
const wrap = document.querySelector("#wrap");
const wrap2 = document.querySelector("#wrap2");
const noteBtn = document.querySelector(".wrapper");
var TitleValue;
var PasswordValue;
var GroupId;
var JoinId;

// eventListeners

// navbar listener
toggle.addEventListener('click', (e) => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
});

//floating button listener
action.addEventListener('click', () => {
    action.classList.toggle("active-action");
});

//open modal new note listener
newNote.addEventListener('click', () => {
    const modal = document.querySelector(".modal");
    overlay.classList.toggle('active');
    modal.classList.toggle('active');
});

//open modal join group listener
joinNote.addEventListener('click', () => {
    const modal = document.querySelector(".modal");
    document.querySelector(".modal-note").classList.remove("active");
    overlay.classList.toggle('active');
    modal.classList.toggle('active');
    document.querySelector(".modal-join").classList.toggle("active");
});

overlay.addEventListener('click', () => {
    closeModal();
});

//New Notes
modalBtn1.addEventListener("click", function (event) {
    TitleValue = document.getElementById("title-modal").value;
});

modalBtn2.addEventListener("click", function (event) {
    PasswordValue = document.getElementById("psswrd-modal").value;
    GroupId = createGroup(TitleValue, PasswordValue);
});

modalBtn3.addEventListener("click", function (event) {
});

modalBtn4.addEventListener("click", function (event) {
    JoinId = document.getElementById("JoinId").value;
});

modalBtn5.addEventListener("click", function (event) {
    joinGroup(JoinId, document.getElementById("JoinP").value);
});

//functions

function LoadGroup(id, { name, psswrd }) {
    var viewItem = document.createElement("div");
    var viewItem2 = document.createElement("div");
    var viewL = document.createElement("div");
    var viewL2 = document.createElement("div");
    var i = document.createElement("i");
    var i2 = document.createElement("i");
    var viewR = document.createElement("div");
    var viewR2 = document.createElement("div");
    var pTitle = document.createElement("p");
    var pTitle2 = document.createElement("p");
    var pContent = document.createElement("p");
    var pContent2 = document.createElement("p");
    var divBtn = document.createElement("button");
    var divBtn2 = document.createElement("button");

    viewItem.className = "view_item";
    viewItem2.className = "view_item";
    viewL.className = "vi_left";
    viewL2.className = "vi_left";
    i.className = "fas fa-sticky-note";
    i2.className = "fas fa-sticky-note";
    viewR.className = "vi_right";
    viewR2.className = "vi_right";
    pTitle.className = "title";
    pTitle2.className = "title";
    pTitle.textContent = name;
    pTitle2.textContent = name;
    pContent.className = "content";
    pContent2.className = "content";
    pContent.textContent = 'ID: ' + id + ', Password: ' + psswrd;
    pContent2.textContent = 'ID: ' + id + ', Password: ' + psswrd;
    divBtn.className = "btn note-btn";
    divBtn2.className = "btn note-btn";

    divBtn.setAttribute("value", id);
    divBtn2.setAttribute("value", id);
    var link = 'notes.html#' + id;
    var Hlink = "<a href = " + link + "> Abrir </a>";
    divBtn.innerHTML = Hlink;
    divBtn2.innerHTML = Hlink;
    viewL.appendChild(i);
    viewL.appendChild(i);
    viewItem.appendChild(viewL);
    viewItem.appendChild(viewL);
    viewR.appendChild(pTitle);
    viewR.appendChild(pContent);
    viewR.appendChild(divBtn);
    viewItem.appendChild(viewR);
    wrap.appendChild(viewItem);

    viewL2.appendChild(i2);
    viewItem2.appendChild(viewL2);
    viewR2.appendChild(pTitle2);
    viewR2.appendChild(pContent2);
    viewR2.appendChild(divBtn2);
    viewItem2.appendChild(viewR2);
    wrap2.appendChild(viewItem2);
}

//changes between grid and list view
li_links.forEach(function (link) {
    link.addEventListener("click", () => {
        li_links.forEach(function (link) {
            link.classList.remove("active");
        });

        link.classList.add("active");

        const li_view = link.getAttribute("data-view");

        view_wraps.forEach(function (view) {
            view.style.display = "none";
        });

        if (li_view == "list-view") {
            list_view.style.display = "block";
        }
        else {
            grid_view.style.display = "block";
        }
    });
});

//closes the modal
function closeModal() {
    const modal = document.querySelector(".modal");
    overlay.classList.remove('active');
    modal.classList.remove('active');
    modal.children[0].classList.toggle("active");
    for (i = 1; i < 6; i++) {
        modal.children[i].classList.remove("active");
    }
}

//changes the DOM when creating a group
modalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const modal = document.querySelector(".modal");
        if (modal.children[0].className == "modal-note active") {
            modal.children[0].classList.remove("active");
            modal.children[1].classList.toggle("active");
            document.getElementById("title-modal").value = '';
        } else {
            if (modal.children[1].className == "note-password active") {
                ;
                modal.children[1].classList.remove("active");
                modal.children[2].classList.toggle("active");
                document.getElementById("psswrd-modal").value = '';
            } else {
                closeModal();
                modal.children[2].classList.remove("active");
                modal.children[0].classList.toggle("active");
            }
        }
    });
});

//changes the DOM when joining a group
modalBtnJoin.forEach((join) => {
    join.addEventListener('click', () => {
        const modal = document.querySelector(".modal");
        if (modal.children[3].className == "modal-join active") {
            modal.children[3].classList.remove("active");
            modal.children[4].classList.toggle("active");
            document.getElementById("JoinId").value = '';
        } else {
            if (modal.children[4].className == "join-psswrd active") {
                modal.children[4].classList.remove("active");
                modal.children[6].classList.toggle("active");
                document.getElementById("JoinP").value = '';
            } else {
                closeModal();
                modal.children[6].classList.toggle("active");
                modal.children[0].classList.toggle("active");
            }
        }
    });
});

//close modal listeners
closeNote.forEach((close) => {
    //close modal listeners
    close.addEventListener('click', () => {
        closeModal();
    });
})