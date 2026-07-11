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

let config = {
    duration: 15,
    zones: [
        {
            id:1,
            enabled:true,
            times:[]
        }
    ]
};



async function loadConfig(){

    const response = await fetch("/api/config");

    config = await response.json();

    console.log("CONFIG:", config);

    document.getElementById("duration").innerText =
        config.duration + " s";

    renderSchedule();

}


async function saveConfig(){

    await fetch("/api/config",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(config)

    });

    console.log("CONFIG SAVED");

}



function renderSchedule(){

    const container =
        document.getElementById("schedule-list");


    container.innerHTML="";


    const times =
        config.zones[0].times;


    if(times.length===0){

        container.innerHTML="Brak ustawień";

        return;

    }


    times.forEach((time,index)=>{


        const row=document.createElement("div");


        row.className="schedule-item";


        row.innerHTML=`

            <span>${time}</span>

            <button onclick="removeSchedule(${index})">
            ❌
            </button>

        `;


        container.appendChild(row);


    });


}



function addSchedule(){

    const time =
        prompt("Podaj godzinę (HH:MM)");


    if(!time)
        return;


    cconst [hours, minutes] = time.split(":");

    const formattedTime =
        hours.padStart(2, "0") +
        ":" +
        minutes.padStart(2, "0");

    config.zones[0].times.push(formattedTime);


    renderSchedule();


    saveConfig();


}



function removeSchedule(index){


    config.zones[0].times.splice(index,1);


    renderSchedule();


    saveConfig();


}



function changeDuration(){


    const value =
        prompt(
            "Podaj czas w sekundach",
            config.duration
        );


    if(value){


        config.duration =
            Number(value);


        document.getElementById("duration").innerText =
            config.duration + " s";


        saveConfig();

    }

}


loadConfig();