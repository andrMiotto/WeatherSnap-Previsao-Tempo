const tempElemento = document.querySelector(".temperature");
const windElemento = document.querySelector(".wind");
const humidityElemento = document.querySelector(".humidity");
const cityElemento = document.querySelector(".city");
const cidadeDigitada = document.querySelector(".searching-city");
const botaoBuscar = document.querySelector(".search-button");
const dateElemento = document.querySelector(".date");
const imageTempElemento = document.querySelector(".image-temp");
const innerStats = document.querySelector(".inner-stats-wheater");
const bodyElemento = document.querySelector(".body");

const analyticsElemento = document.querySelector(".analytics");
const shareElemento = document.querySelector(".share");




const apiKey = "195dc487f4791e835d087050c4c4365d";
 

botaoBuscar.addEventListener("click", () => {
    const cidade = cidadeDigitada.value;

    if (cidade === "") {
        alert("Digite uma cidade");
        return;
    }




    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Cidade não encontrada");
            return response.json();
        })


        .then((data) => {
            tempElemento.textContent = Math.floor(data.main.temp) + "°C";
            windElemento.textContent = Math.floor(data.wind.speed) + " Km/h";
            humidityElemento.textContent = Math.floor(data.main.humidity) + " %";
            cityElemento.textContent = data.name;

            const isDay = data.weather[0].icon.endsWith("d");
            
            document.body.classList.remove("bg-slate-800", "bg-sky-300", "bg-stone-950");

            if (isDay) {
                bodyElemento.classList.add("bg-sky-300");
                analyticsElemento.classList.add("bg-sky-300");
                shareElemento.classList.add("bg-sky-300");
            } else {
                bodyElemento.classList.add("bg-stone-950");
                analyticsElemento.classList.add("bg-sky-300");
                shareElemento.classList.add("bg-sky-300");
            }

            cidadeDigitada.value = "";

            const climaPrincipal = data.weather[0].main;
            const climaDescricao = data.weather[0].description;


            switch (climaPrincipal) {
                case "Clear":
                    imageTempElemento.src = "/Images/Icons/colorfull/sun.svg";
                    innerStats.textContent = climaPrincipal;
                    break;
        
                case "Clouds":
                    imageTempElemento.src = "/Images/Icons/colorfull/cloud.png";
                    innerStats.textContent = climaPrincipal;

                    
                    break;
        
                case "Rain":
                case "Drizzle":
                    imageTempElemento.src = "/Images/Icons/colorfull/rain.svg";
                    innerStats.textContent = climaPrincipal;

                    break;
        
                case "Thunderstorm":
                    imageTempElemento.src = "/Images/Icons/colorfull/storm.svg";
                    innerStats.textContent = climaPrincipal;

                    break;
        
                case "Snow":
                    imageTempElemento.src = "/Images/Icons/colorfull/snow.svg";
                    innerStats.textContent = climaPrincipal;

                    break;
        
                case "Mist":
                case "Fog":
                case "Haze":
                case "Smoke":
                    imageTempElemento.src = "/Images/Icons/colorfull/cloud.png";
                    innerStats.textContent = climaPrincipal;

                    break;
        
                default:
                    imageTempElemento.src = "/Images/Icons/colorfull/cloud.png";
                    innerStats.textContent = climaPrincipal;

            }





        })

        .catch((error) => console.error("Erro:", error));






});
