const DB_KEY = "GN_RP_DB";

function defaultDB(){
    return {
        users:[
            {
                id:1,
                username:"admin",
                password:"admin123",
                role:"Commandement"
            }
        ],
        citizens:[]
    };
}

function loadDB(){

    let db = localStorage.getItem(DB_KEY);

    if(!db){

        db = defaultDB();

        saveDB(db);

        return db;
    }

    return JSON.parse(db);
}

function saveDB(db){
    localStorage.setItem(
        DB_KEY,
        JSON.stringify(db)
    );
}

let currentUser = null;

function login(){

    const db = loadDB();

    const username =
    document.getElementById("loginUsername").value;

    const password =
    document.getElementById("loginPassword").value;

    const user =
    db.users.find(
        u =>
        u.username === username &&
        u.password === password
    );

    if(!user){

        document.getElementById(
            "loginError"
        ).textContent =
        "Identifiants incorrects";

        return;
    }

    currentUser = user;

    document.getElementById(
        "loginScreen"
    ).classList.add("hidden");

    document.getElementById(
        "app"
    ).classList.remove("hidden");

    document.getElementById(
        "currentUser"
    ).textContent =
    user.role + " - " + user.username;

    refreshAll();
}

function logout(){

    currentUser = null;

    document.getElementById(
        "app"
    ).classList.add("hidden");

    document.getElementById(
        "loginScreen"
    ).classList.remove("hidden");
}

function showPage(page){

    document.querySelectorAll(".page")
    .forEach(
        p => p.classList.add("hidden")
    );

    document.getElementById(page)
    .classList.remove("hidden");
}

function createCitizen(){

    const db = loadDB();

    db.citizens.push({
        id:Date.now(),
        nom:document.getElementById("citizenNom").value,
        prenom:document.getElementById("citizenPrenom").value,
        identite:document.getElementById("citizenIdentite").value
    });

    saveDB(db);

    renderCitizens();

    refreshAll();
}

function renderCitizens(){

    const db = loadDB();

    document.getElementById(
        "citizensList"
    ).innerHTML =
    db.citizens.map(c => `
        <div>
            ${c.nom} ${c.prenom}
            (${c.identite})

            <button onclick="deleteCitizen(${c.id})">
                Supprimer
            </button>
        </div>
    `).join("");
}

function deleteCitizen(id){

    const db = loadDB();

    db.citizens =
    db.citizens.filter(
        c => c.id !== id
    );

    saveDB(db);

    renderCitizens();

    refreshAll();
}

function createUser(){

    const db = loadDB();

    db.users.push({
        id:Date.now(),
        username:
        document.getElementById("newUserName").value,
        password:
        document.getElementById("newUserPass").value,
        role:
        document.getElementById("newUserRole").value
    });

    saveDB(db);

    renderUsers();

    refreshAll();
}

function renderUsers(){

    const db = loadDB();

    document.getElementById(
        "usersList"
    ).innerHTML =
    db.users.map(u => `
        <div>
            ${u.username}
            (${u.role})

            <button onclick="deleteUser(${u.id})">
                Supprimer
            </button>
        </div>
    `).join("");
}

function deleteUser(id){

    const db = loadDB();

    db.users =
    db.users.filter(
        u => u.id !== id
    );

    saveDB(db);

    renderUsers();

    refreshAll();
}

function refreshAll(){

    const db = loadDB();

    document.getElementById(
        "countCitizens"
    ).textContent =
    db.citizens.length;

    document.getElementById(
        "countUsers"
    ).textContent =
    db.users.length;

    renderCitizens();

    renderUsers();
}

loadDB();