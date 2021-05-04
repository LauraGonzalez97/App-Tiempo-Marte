//api


const API_URL = `https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0`
const API2_URL = `https://mars-weather-rems.netlify.app/rems.json`




//animacion next 7 days

const previousWeatherToggle = document.querySelector('.show-previous-weather');
const previousWeather = document.querySelector('.previous-weather')

//
const currentSolElement = document.querySelector('[data-current-sol]')
const currentDateElement = document.querySelector('[data-current-date]')
const currentTempHighElement = document.querySelector('[data-current-temp-high]')
const currentTempLowElement = document.querySelector('[data-current-temp-low]')


//
const currentAVElement = document.querySelector('[data-current-av]')
const currentCTElement = document.querySelector('[data-current-ct]')






//wind seccion
//const windSpeedElement = document.querySelector('[data-wind-speed')
//const windDirectionText = document.querySelector('[data-wind-direction')
//const windDirectionArrow = document.querySelector('[data-wind-direction-arrow')

const previousSolTemplate = document.querySelector('[data-previous-sol-template]')
const previousSolContainer = document.querySelector('[data-previous-sols]')




previousWeatherToggle.addEventListener('click', () => {
    previousWeather.classList.toggle('show-weather')
})




//CONSEGUIR TIEMPO EN MARTE

let selectedSolIndex



getWeather().then(sols => {
    selectedSolIndex = sols.length - 1
    displaySelectedSol(sols)
    displayPreviousSols(sols)


})


function displaySelectedSol(sols) {
    const selectedSol = sols[selectedSolIndex]
    currentSolElement.innerText = selectedSol.sol

    currentDateElement.innerText = displayDate(selectedSol.date)
    currentTempHighElement.innerText = displayTemperature(selectedSol.maxTemp)
    currentTempLowElement.innerText = displayTemperature(selectedSol.minTemp)

    //
    currentAVElement.innerText = displayTemperature(selectedSol.av)
    currentCTElement.innerText = displayTemperature(selectedSol.ct)
    
    
    
   





    //viento
    //windSpeedElement.innerText = displayTemperature(selectedSol.windSpeed)
    //windDirectionArrow.style.setProperty('--direction',`${selectedSol.windDirectionDegrees} deg`)
    //windDirectionText.innerText = selectedSol.windDirectionCardinal


}



//funcion para acortar la fecha

function displayDate(date) {
    return date.toLocaleDateString(
        undefined,
        { day: 'numeric', month: 'long' }
    )
}

//funcion acortar temperaturas

function displayTemperature(temperature) {
    return Math.round(temperature)
}

//viento
//function displaySpeed(speed){
//return Math.round(speed)
//}




//funcion PREVIOUS DAYS

function displayPreviousSols(sols) {
    previousSolContainer.innerHTML = ''
    sols.forEach((solData, index) => {
        const solContainer = previousSolTemplate.content.cloneNode(true)
        solContainer.querySelector('[data-sol]').innerText = solData.sol
        solContainer.querySelector('[data-date]').innerText = displayDate(solData.date)
        solContainer.querySelector('[data-temp-high]').innerText = displayTemperature(solData.maxTemp)
        solContainer.querySelector('[data-temp-low]').innerText = displayTemperature(solData.minTemp)




        
        previousSolContainer.appendChild(solContainer)

    })
}

//conseguir datos API

function getWeather() {
    return fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const {
                sol_keys,
                validity_checks,
                ...solData

            } = data
            return Object.entries(solData).map(([sol, data]) => {
                return {
                    sol: sol,
                    maxTemp: data.PRE.mx,
                    minTemp: data.PRE.mn,
                    windDirection: data.WD.most_common,
                    date: new Date(data.First_UTC),

                    av: data.PRE.av,
                    ct: data.PRE.ct,
                    
                    
                    

                    


                }

            })

        })
       
        
    


}







// MENU LATERAL

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");

    document.querySelector("#btnNav").addEventListener("click", () => {
        nav.classList.add("nav--open");
    });

    document.querySelector(".nav__overlay").addEventListener("click", () => {
        nav.classList.remove("nav--open");
    });
});



//guardar temperaturas


window.onload = function () {
    let users;
    /** Crear / conectar bbdd */
    let db = new PouchDB('usuarios');

    /** Pintar la lista de usuarios */
    renderUsers();

    /** Escuechar eventos de los botones */
    let btnAdd = document.querySelector("#add");
    btnAdd.addEventListener("click", addUser, false);


    /** Función para añadir usuarios */
    function addUser() {
        let name = document.querySelector("#nombre");
        let age = document.querySelector("#edad");
        if (name.value != "" && age.value != "") {
            let nextUser = users.length + 1;

            // Añadir registro a la BBDD
            let doc = {
                "_id": `usuario${nextUser}`,
                "name": name.value,
                "age": age.value
            };
            db.put(doc); //añade registro nuevo 

            renderUsers();
            name.value = "";
            age.value = "";
        }
    }

    /** Función para pintar la lista de usuarios */
    function renderUsers() {
        let lista = document.querySelector(".listaUsers");
        lista.innerHTML = "";
        //Retrieving all the documents in PouchDB
        db.allDocs({ include_docs: true }, function (err, docs) {
            if (err) {
                return console.log(err);
            } else {
                users = docs.rows;
                users.forEach(element => {
                    let user = `
                                <article>
                                   <div><span>Sol</span>${element.doc.name}</div>
                                   <div><span>High Temp</span>${element.doc.age}</div>
                                   <div><span>Low Temp</span>${element.doc.age}</div>

                                   

                                   

                                </article>`;


                    lista.innerHTML += user;
                });

            }
        });
    }



    


};



//borrar temperaturas








