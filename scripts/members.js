// variables
const toggle = document.querySelector('.toggle');
const SelectGroup = document.getElementById("SelectGroup");
const MemberList = document.getElementById("Member-List");
// eventListeners

MemberList.addEventListener("click", (e) => {
    const Member = e.target;
    if (Member.classList[1] === "fa-user-times") {
        const check = Member.parentElement.parentElement;
        deleteMember(Member.parentElement.value)
        check.remove();
    }
    else if (Member.classList[1] === "fa-crown") {
        Member.className = "fas fa-ban";
        changeAdmin(Member.parentElement.value, true);
    }
    else if (Member.classList[1] === "fa-ban") {
        Member.className = "fas fa-crown";
        changeAdmin(Member.parentElement.value, false);
    }
});

//functions
function NewOption(Name, Id) {
    var option = document.createElement('option');
    option.text = Name;
    option.value = Id;
    SelectGroup.add(option);
}

//shows and hides permisssions
function LoadMembers(Admin, MeAdmin, Member, Id) {
    if (MeAdmin == false) {
        var div = document.createElement("div");
        var span = document.createElement("span");

        div.className = "member";
        span.textContent = Member;

        div.appendChild(span);
        MemberList.appendChild(div);
    }
    else if (Admin == false) {
        var div = document.createElement("div");
        var span = document.createElement("span");
        var b1 = document.createElement("button");
        var b2 = document.createElement("button");
        var i1 = document.createElement("i");
        var i2 = document.createElement("i");

        div.className = "member";
        span.textContent = Member;
        b1.value = Id;
        b1.setAttribute("aria-label", "Hacer admin");
        i1.className = "fas fa-crown";
        b2.value = Id;
        b2.setAttribute("aria-label", "Eliminar");
        i2.className = "fas fa-user-times";

        b1.appendChild(i1);
        b2.appendChild(i2);
        div.appendChild(span);
        div.appendChild(b1);
        div.appendChild(b2);
        MemberList.appendChild(div)
    }
    else {
        var div = document.createElement("div");
        var span = document.createElement("span");
        var b1 = document.createElement("button");
        var b2 = document.createElement("button");
        var i1 = document.createElement("i");
        var i2 = document.createElement("i");

        div.className = "member";
        span.textContent = Member;
        b1.value = Id;
        b1.setAttribute("aria-label", "Remover admin");
        i1.className = "fas fa-ban";
        b1.value = Id;
        b2.setAttribute("aria-label", "Eliminar");
        i2.className = "fas fa-user-times";

        b1.appendChild(i1);
        b2.appendChild(i2);
        div.appendChild(span);
        div.appendChild(b1);
        div.appendChild(b2);
        MemberList.appendChild(div)
    }
}

function Clean() {
    while (MemberList.firstChild) {
        MemberList.removeChild(MemberList.lastChild);
    }
}

// navbar listener
toggle.addEventListener('click', (e) => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
});