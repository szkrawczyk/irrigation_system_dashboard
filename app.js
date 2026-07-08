const API_URL = 
"https://irrigation-api.szymon882.workers.dev";


let currentMode = "manual";


async function pump(state){


    try {


        const response = await fetch(
            API_URL + "/api/pump",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    state:state

                })

            }
        );


        const data = await response.json();


        console.log(data);


        document.getElementById(
            "pump-status"
        ).innerText = state;



        alert(data.message);


    }


    catch(error){


        console.error(
            "Błąd:",
            error
        );


        alert(
            "Nie udało się połączyć z Workerem"
        );


    }


}




function toggleMode(){


    if(currentMode==="manual"){

        currentMode="auto";

    }
    else{

        currentMode="manual";

    }


    document.getElementById(
        "mode-status"
    ).innerText =
        currentMode.toUpperCase();



    document.getElementById(
        "mode-info"
    ).innerText =
        "Tryb: " + currentMode;



}




let schedule=[

    "08:00",
    "21:00"

];



function renderSchedule(){

    const container = document.getElementById("schedule-list");

    container.innerHTML = "";

    schedule.forEach((time,index)=>{

        const row = document.createElement("div");

        row.className = "schedule-item";


        row.innerHTML = `
            <span>${time}</span>
            <button onclick="removeSchedule(${index})">
                ❌
            </button>
        `;


        container.appendChild(row);

    });

}



function removeSchedule(index){

    schedule.splice(index,1);

    renderSchedule();

}


renderSchedule();




function addSchedule(){


    let time =
    prompt(
        "Podaj godzinę (HH:MM)"
    );


    if(time){

        schedule.push(time);

        renderSchedule();

    }

}




function changeDuration(){


    let value =
    prompt(
        "Podaj czas w sekundach",
        "15"
    );


    if(value){

        document.getElementById(
            "duration"
        ).innerText =
            value+" s";

    }

}