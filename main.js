const tempElemento = document.querySelector(".temperature");
const windElemento = document.querySelector(".wind");
const humidityElemento = document.querySelector(".humidity");
const cityElemento = document.querySelector(".city");
const cidadeDigitada = document.querySelector(".searching-city");
const botaoBuscar = document.querySelector(".search-button");


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

            cidadeDigitada.value = "";


        })

        .catch((error) => console.error("Erro:", error));



});
