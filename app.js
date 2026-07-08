const API_URL = "";


let currentMode = "manual";


function pump(state){


    console.log(
        "Pompa:",
        state
    );


    alert(
        "Komenda pompy: " + state
    );

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


    document.getElementById(
        "schedule-list"
    ).innerHTML =
        schedule.join("<br>");

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