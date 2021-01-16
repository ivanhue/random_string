// variables
const toggle = document.querySelector('.toggle');
const note_btn = document.querySelector("#note-btn");
const todo_list = document.querySelector("#todo-lists");
const SelectColor = document.getElementById("color");
const SalirG = document.getElementById("SalirG");
const BorrarG = document.getElementById("BorrarG");
const h1 = document.getElementById("h1");
var Id;

// eventListeners

SalirG.addEventListener("click", function (event) {
    quitGroup();
});

BorrarG.addEventListener("click", function (event) {
    delteGroup()
});

// navbar listener
toggle.addEventListener('click', (e) => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
});

// note-btn listener
note_btn.addEventListener("click", function (event) {
    event.preventDefault();
    pushNote(document.getElementById("text-box").value, SelectColor.value, false);
    document.getElementById("text-box").value = '';
});

//check or remove a note
todo_list.addEventListener("click", (e) => {
    const todo = e.target;
    if (todo.classList[0] === "complete-btn") {
        const check = todo.parentElement;
        if (todo.value == "false") {

            todo.value = true;
        }
        else if (todo.value == "true") {

            todo.value = false;
        }
        changeNote(todo.parentElement.children[1].value, todo.value)

    }
    else if (todo.classList[0] === "delete-btn") {
        const check = todo.parentElement;
        deleteNote(todo.value);
        check.remove();
    }

});

// functions
function CleanNotes() {
    while (todo_list.firstChild) {
        todo_list.removeChild(todo_list.lastChild);
    }
}
function getId(IdIn) {
    Id = IdIn;
}
function Title(x) {
    h1.innerText = x;
}

function NewNote(content, color, Status, NoteId, MeAdmin) {
    if (content != 0) {
        //creating element
        var div = document.createElement("div")
        var li = document.createElement("li");
        var b1 = document.createElement("button");
        var b2 = document.createElement("button");
        var b3 = document.createElement("button");
        var i1 = document.createElement("i");
        var i2 = document.createElement("i");
        var i3 = document.createElement("i");

        //assigning classes
        b1.className = "delete-btn";
        b2.className = "complete-btn";
        b3.className = "fav-btn";
        i1.className = "fas fa-trash";
        i2.className = "fas fa-check";
        i3.className = "far fa-star";
        div.className = "note";
        li.className = "note-content";
        li.textContent = content;

        b1.setAttribute("value", NoteId);
        b2.setAttribute("value", Status);
        if (MeAdmin == false) {
            b1.style.display = "none";
            b2.style.display = "none";
        }

        switch (color) {
            case "color-1": div.style.borderLeftColor = "#e07536";
                break;
            case "color-2": div.style.borderLeftColor = "#fa8072";
                break;
            case "color-3": div.style.borderLeftColor = "#789dca";
                break;
            case "color-4": div.style.borderLeftColor = "#57bd9e";
                break;
            case "color-5": div.style.borderLeftColor = "#b19cd9";
                break;
        }

        //appending elements
        div.appendChild(li);
        div.appendChild(b3);
        div.appendChild(b1);
        div.appendChild(b2);
        b3.appendChild(i3);
        b1.appendChild(i1);
        b2.appendChild(i2);
        todo_list.appendChild(div);
        if (b2.value === "true") {
            div.classList.toggle("completed");
        }
    }
}
