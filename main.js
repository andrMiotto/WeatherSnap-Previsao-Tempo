//Geral
const dateElemento = document.querySelector(".date");
const bodyElemento = document.querySelector(".body");
const suggestionElemento = document.querySelector(".suggestion");

//Clima
const tempElemento = document.querySelector(".temperature");
const windElemento = document.querySelector(".wind");
const humidityElemento = document.querySelector(".humidity");
const innerStats = document.querySelector(".inner-stats-wheater");

//Cidade
const cityElemento = document.querySelector(".city");
const cidadeDigitada = document.querySelector(".searching-city");

//Botões e Imagens
const botaoBuscar = document.querySelector(".search-button");
const analyticsElemento = document.querySelector(".analytics");
const shareElemento = document.querySelector(".share");

const imageTempElemento = document.querySelector(".image-temp");

const apiKey = "195dc487f4791e835d087050c4c4365d";

const dayCards = document.querySelectorAll(".day-card");

botaoBuscar.addEventListener("click", () => {
    const cidade = cidadeDigitada.value;

    if (cidade === "") {
        alert("Digite uma cidade");
        return;
    }


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

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

            const timestamp = data.dt;
            const timezone = data.timezone;

            const dataLocal = new Date((timestamp + timezone) * 1000);

            let dataFormatada = dataLocal.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long"
            });

            dataFormatada = dataFormatada
                .split(" ")
                .map(p => p.charAt(0).toUpperCase() + p.slice(1))
                .join(" ");

            dateElemento.textContent = dataFormatada;


            cidadeDigitada.value = "";

            const climaPrincipal = data.weather[0].main;


            switch (climaPrincipal) {
                case "Clear":
                    imageTempElemento.src = "/Images/Icons/colorfull/sun.svg";
                    innerStats.textContent = climaPrincipal;
                    suggestionElemento.textContent = "Dia ensolarado! Use protetor solar, óculos escuros e mantenha-se hidratado.";
                    break;

                case "Clouds":
                    imageTempElemento.src = "/Images/Icons/colorfull/cloud.png";
                    innerStats.textContent = climaPrincipal;
                    suggestionElemento.textContent = "Céu nublado. Pode ser uma boa levar um casaco leve, caso esfrie mais tarde.";
                    break;

                case "Rain":
                case "Drizzle":
                    imageTempElemento.src = "/Images/Icons/colorfull/rain.svg";
                    innerStats.textContent = climaPrincipal;
                    suggestionElemento.textContent = "Chance de chuva! Leve um guarda-chuva ou capa de chuva antes de sair.";
                    break;

                case "Thunderstorm":
                    imageTempElemento.src = "/Images/Icons/colorfull/storm.svg";
                    innerStats.textContent = climaPrincipal;
                    suggestionElemento.textContent = "Tempestade prevista! Evite áreas abertas e leve proteção contra chuva.";
                    break;

                case "Snow":
                    imageTempElemento.src = "/Images/Icons/colorfull/snow.svg";
                    innerStats.textContent = climaPrincipal;
                    suggestionElemento.textContent = "Frio intenso! Use roupas térmicas, luvas e mantenha-se bem agasalhado.";
                    break;

                case "Mist":
                case "Fog":
                case "Haze":
                case "Smoke":
                    imageTempElemento.src = "/Images/Icons/colorfull/cloud.png";
                    innerStats.textContent = climaPrincipal;
                    suggestionElemento.textContent = "Visibilidade reduzida. Redobre a atenção ao dirigir ou caminhar.";
                    break;

                default:
                    imageTempElemento.src = "/Images/Icons/colorfull/cloud.png";
                    innerStats.textContent = climaPrincipal;
                    suggestionElemento.textContent = "Verifique as condições antes de sair e planeje seu dia com cuidado.";
            }


        })

        .catch((error) => console.error("Erro:", error));

    fetch(urlForecast)
        .then(response => {
            if (!response.ok) throw new Error("Erro na previsão");
            return response.json();
        })
        .then(forecastData => {

            const previsoes = forecastData.list.filter(item =>
                item.dt_txt.includes("12:00:00")
            );

            previsoes.slice(1, 4).forEach((dia, index) => {

                const dataDia = new Date(dia.dt * 1000);

                let nomeDia = dataDia.toLocaleDateString("pt-BR", {
                    weekday: "short"
                });

                const temp = Math.floor(dia.main.temp);

                const clima = dia.weather[0].main;
                const weatherIcons = {
                    Clear: "/Images/Icons/colorfull/sun.svg",
                    Clouds: "/Images/Icons/colorfull/cloud.png",
                    Rain: "/Images/Icons/colorfull/rain.svg",
                    Drizzle: "/Images/Icons/colorfull/rain.svg",
                    Thunderstorm: "/Images/Icons/colorfull/storm.svg",
                    Snow: "/Images/Icons/colorfull/snow.svg",
                    Mist: "/Images/Icons/colorfull/cloud.png",
                    Fog: "/Images/Icons/colorfull/cloud.png",
                    Haze: "/Images/Icons/colorfull/cloud.png",
                    Smoke: "/Images/Icons/colorfull/cloud.png"
                };


                const card = dayCards[index];
                const iconUrl = weatherIcons[clima] || "/Images/Icons/colorfull/cloud.png";

                card.querySelector(".day-name").textContent = nomeDia;
                card.querySelector(".day-temp").textContent = temp + "°C";
                card.querySelector(".day-icon").src = iconUrl;
            });

        })
        .catch(error => console.error("Erro forecast:", error));





});
