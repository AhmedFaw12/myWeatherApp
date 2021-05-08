const search = document.getElementById("search");
const row = document.querySelector(".row");
const findBtn = document.getElementById("find");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septmember", "October", "November", "December"];

let myData;



async function getWeather(loc) {
    let resp = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=95af9d5033a94650a2a164141210705&q=${loc}&days=3`);
    myData = await resp.json();

    DisplayCurrentWeather(myData);
    DisplayNextWeather(myData);


}

function DisplayCurrentWeather(myData) {
    let currentDateString = myData.current.last_updated.replace(" ", "T");// creating dateString 
    let currentDateObj = new Date(currentDateString);  //converting dateString to Date object in order to use its methods

    

    let str = `
    <div class="col-lg-4 position-relative forcast  today">
      <div class="forcastHeader overflow-hidden">
        <p class="float-left">${days[currentDateObj.getDay()]}</p>
        <p class="float-right">${currentDateObj.getDate()}${months[currentDateObj.getMonth()]}</p>
      </div>

      <div class="forcastContent  py-4 ">
        <p class="location">${myData.location.name}</p>
        <h2>
          <span class="degree">${myData.current.temp_c}<sup>o</sup>C</span>
          <span><img class="degreeImg" src="https:${myData.current.condition.icon}" alt=""></span>
        </h2>

        <p class="weatherCondition">${myData.current.condition.text}</p>
        <div>
          <span class="mr-3"><img src="images/icon-umberella.png" alt=""> 20%</span>
          <span class="mr-3"><img src="images/icon-wind.png" alt=""> ${myData.current.wind_kph}Km/h</span>
          <span class="mr-3"><img src="images/icon-compass.png" alt=""> ${myData.current.wind_dir}</span>
        </div>
      </div>
    </div>`;

    row.innerHTML = str;
}


function DisplayNextWeather(myData) {
    let nextData = myData.forecast.forecastday;
    // console.log(nextData.length);

    let str = "";
    for (let i = 1; i < nextData.length; i++) {

        let dateString = nextData[i].date;
        let dateObj = new Date(dateString);



        str += `<div class="col-lg-4 position-relative forcast  text-center ">
        <div class="forcastHeader">
          <p>${days[dateObj.getDay()]}</p>
  
        </div>
  
        <div class="forcastContent  py-4 ">
          <img class="degreeImg" src="https:${nextData[i].day.condition.icon}" alt="">
          <h2 class="mt-3 mb-0">
            <span class="degree">${nextData[i].day.maxtemp_c}<sup>o</sup>C</span>
          </h2>
          <p class="pb-3">${nextData[i].day.mintemp_c}<sup>o</sup></p>
          <p class="weatherCondition">${nextData[i].day.condition.text}</p>
  
        </div>
      </div>`
    }

    row.innerHTML += str;


}

getWeather("cairo");


search.addEventListener("keyup", function(){
    if(search.value ==""){
        getWeather("cairo");    
    }
})

findBtn.addEventListener("click", function(){
    if(search.value !=""){
        console.log(search.value);
        getWeather(search.value);
        search.value = "";
    }
})

document.addEventListener("keyup", function(e){
    if(search.value !=""){
      if(e.key == "Enter"){
        getWeather(search.value)
        search.value = "";
      }
    }
  });