const API_URL = "";

let currentMode = "manual";

let config = {
    zones: []
};


// =======================
// WCZYTANIE KONFIGURACJI
// =======================

async function loadConfig(){

    try {

        const response = await fetch("/api/config");

        config = await response.json();

        console.log("CONFIG:", config);


        renderZone("pomidory");

        renderZone("papryka");


    } catch(error){

        console.error(
            "CONFIG ERROR:",
            error
        );

    }

}


loadConfig();




// =======================
// STEROWANIE POMPĄ
// =======================

async function pump(state, zone){


    try {


        const selectedZone =
            config.zones.find(
                z => z.id === zone
            );


        const response = await fetch(
            "/api/pump",
            {

                method:"POST",

                credentials:"include",

                headers:{
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    state:state,

                    zone:zone,

                    duration:
                        selectedZone ? selectedZone.duration : 0

                })

            }
        );


        const data =
            await response.json();


        console.log(data);



        if(data.success){


            alert(
                zone +
                ": " +
                state
            );


        }
        else {

            alert(
                "Błąd: " +
                data.error
            );

        }



    }
    catch(error){

        console.error(error);

        alert(
            "Błąd połączenia"
        );

    }


}





// =======================
// ZMIANA ZAKŁADKI
// =======================


function openZone(zone, button){


    document
    .querySelectorAll(".zone-page")
    .forEach(page=>{


        page.style.display="none";


    });



    document
    .getElementById(
        "zone-" + zone
    )
    .style.display="block";



    document
    .querySelectorAll(".tab-btn")
    .forEach(btn=>{

        btn.classList.remove(
            "active"
        );

    });



    button.classList.add(
        "active"
    );


}





// =======================
// RENDER HARMONOGRAMU
// =======================


function renderZone(zone){


    const selectedZone =
        config.zones.find(
            z=>z.id===zone
        );


    if(!selectedZone)
        return;



    const container =
        document.getElementById(
            "schedule-" + zone
        );



    container.innerHTML="";


    if(selectedZone.times.length === 0){

    container.innerHTML =
        "<span class='empty'>Brak ustawień</span>";

    }



    selectedZone.times.forEach(
        (time,index)=>{


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "schedule-item";



            row.innerHTML = `

                <span>
                    ${time}
                </span>


                <button
                onclick="removeSchedule('${zone}',${index})">

                    ❌

                </button>

            `;


            container.appendChild(row);


        }
    );



    document
    .getElementById(
        "duration-" + zone
    )
    .innerText =
        selectedZone.duration +
        " s";


}







// =======================
// DODAWANIE GODZINY
// =======================


function addSchedule(zone){


    const time =
        prompt(
            "Podaj godzinę HH:MM"
        );



    if(!time)
        return;

    const [hours, minutes] = time.split(":");


    const formattedTime =
        hours.padStart(2,"0") +
        ":" +
        minutes.padStart(2,"0");


    const selectedZone =
        config.zones.find(
            z=>z.id===zone
        );



    selectedZone.times.push(
        formattedTime
    );



    renderZone(zone);


    saveConfig();


}







// =======================
// USUWANIE GODZINY
// =======================


function removeSchedule(zone,index){


    const selectedZone =
        config.zones.find(
            z=>z.id===zone
        );



    selectedZone.times.splice(
        index,
        1
    );


    renderZone(zone);


    saveConfig();


}







// =======================
// CZAS PODLEWANIA
// =======================


function changeDuration(zone){


    const selectedZone =
        config.zones.find(
            z=>z.id===zone
        );


    const value =
        prompt(
            "Podaj czas podlewania (s)",
            selectedZone.duration
        );



    if(!value)
        return;



    selectedZone.duration =
        Number(value);



    renderZone(zone);


    saveConfig();


}






// =======================
// ZAPIS KV
// =======================


async function saveConfig(){


    await fetch(
        "/api/config",
        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },


            body:
            JSON.stringify(config)

        }
    );


    console.log(
        "CONFIG SAVED"
    );


}







// =======================
// TRYB PRACY
// =======================


function toggleMode(){


    currentMode =
        currentMode==="manual"
        ? "auto"
        : "manual";



    document
    .getElementById(
        "mode-status"
    )
    .innerText =
        currentMode.toUpperCase();



    document
    .getElementById(
        "mode-info"
    )
    .innerText =
        "Tryb: " + currentMode;


}