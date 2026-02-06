const tempElemento = document.querySelector(".temperature");


const apiKey = "195dc487f4791e835d087050c4c4365d";
const cidade = "São Paulo";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

fetch(url)
    .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar dados");
        return response.json();
    })
    .then((data) => {
        console.log(`A temperatura em ${data.name} é de ${data.main.temp}°C`);
    })
    .catch((error) => console.error("Erro:", error));