let requests = JSON.parse(localStorage.getItem("requests")) || [];

// DOM Elements
const equipment = document.getElementById("equipment");
const department = document.getElementById("department");
const subject = document.getElementById("subject");
const type = document.getElementById("type");

// Create new request
function createRequest() {
    const request = {
        id: Date.now(),
        equipment: equipment.value,
        department: department.value,
        subject: subject.value,
        type: type.value,
        status: "New"
    };

    requests.push(request);
    localStorage.setItem("requests", JSON.stringify(requests));
    render();
}

// Move status to next stage
function moveStatus(id) {
    requests = requests.map(r => {
        if (r.id === id) {
            if (r.status === "New") r.status = "In Progress";
            else if (r.status === "In Progress") r.status = "Repaired";
        }
        return r;
    });
    localStorage.setItem("requests", JSON.stringify(requests));
    render();
}

// Scrap request
function scrap(id) {
    requests = requests.map(r => {
        if (r.id === id) r.status = "Scrap";
        return r;
    });
    localStorage.setItem("requests", JSON.stringify(requests));
    render();
}

// Render tasks in board
function render() {
    ["New", "In Progress", "Repaired", "Scrap"].forEach(s => {
        document.getElementById(s).innerHTML = "";
    });

    requests.forEach(r => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
            <b>${r.subject}</b>
            ${r.equipment} (${r.department})<br>
            <small>${r.type}</small><br>
            ${r.status !== "Repaired" && r.status !== "Scrap" ? `<button onclick="moveStatus(${r.id})">Next</button>` : ""}
            ${r.status !== "Scrap" ? `<button onclick="scrap(${r.id})">Scrap</button>` : ""}
        `;
        document.getElementById(r.status).appendChild(div);
    });
}

// Initial render
render();
