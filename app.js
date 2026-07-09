const API_URL = "";

let currentMode = "manual";

async function loadConfig(){

    const response = await fetch("/api/config");

    config = await response.json();

    console.log(config);

}

loadConfig();

async function pump(state) {

    try {

        const response = await fetch("/api/pump", {
            method: "POST",

            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: state
            })
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            document.getElementById("pump-status").innerText = state;

            alert(
                state === "ON"
                    ? "Pompa została włączona"
                    : "Pompa została wyłączona"
            );

        } else {

            alert("Błąd: " + (data.error || "Nieznany błąd"));

        }

    } catch (error) {

        console.error(error);

        alert("Nie udało się połączyć z Workerem");

    }

}

function toggleMode() {

    currentMode =
        currentMode === "manual"
            ? "auto"
            : "manual";

    document.getElementById("mode-status").innerText =
        currentMode.toUpperCase();

    document.getElementById("mode-info").innerText =
        "Tryb: " + currentMode;

}

let config = {};

function renderSchedule() {

    const container = document.getElementById("schedule-list");

    container.innerHTML = "";

    schedule.forEach((time, index) => {

        const row = document.createElement("div");

        row.className = "schedule-item";

        row.innerHTML = `
            <span>${time}</span>
            <button onclick="removeSchedule(${index})">❌</button>
        `;

        container.appendChild(row);

    });

}

function removeSchedule(index) {

    schedule.splice(index, 1);

    renderSchedule();

}

renderSchedule();

function addSchedule() {

    const time = prompt("Podaj godzinę (HH:MM)");

    if (time) {

        schedule.push(time);

        renderSchedule();

    }

}

function changeDuration() {

    const value = prompt(
        "Podaj czas w sekundach",
        "15"
    );

    if (value) {

        document.getElementById("duration").innerText =
            value + " s";

    }

}