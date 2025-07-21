const apiKey = "4aed7cfc7aba8120a35f340a27372e4d";
// ***************************************** WEATHER CONDITION OF A CITY YOU SEARCHED *****************************************
document.getElementById("search-input-id").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let city = this.value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    alert("❌City is not found");
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Weather data:", data);
                console.log(data.main.temp);
                document.getElementById("temperature-value").innerText = `${data.main.temp}°C`;
                document.getElementById("city-name").innerText = `${data.name}`;
                document.getElementById("feels-like-para").innerText = `${data.main.feels_like}°C`;
                document.getElementById("humidity-para").innerText = `${data.main.humidity}%`;
                document.getElementById("wind-speed-para").innerText = `${data.wind.speed} m/s`;

                const weatherImages = {
                    Clear: "myImg/sun.png",
                    Clouds: "myImg/breakingCloud.png",
                    Rain: "myImg/rain.png",
                    Thunderstorm: "myImg/thunderstorm.png",
                    Drizzle: "myImg/Drizzle.png",
                    Snow: "myImg/Snow.png",
                    Mist: "myImg/mist.png",
                    Smoke: "myImg/breakingCloud.png",
                    Haze: "myImg/haze.png",
                    Dust: "myImg/breakingCloud.png",
                    Fog: "myImg/haze.png",
                    Sand: "myImg/breakingCloud.png",
                    Ash: "myImg/breakingCloud.png",
                    Squall: "myImg/thunderstorm.png",
                    Tornado: "myImg/Tornado.png"
                };
                let condition = data.weather[0].main;
                let imageSrc = weatherImages[condition] || "myImg/sun.png";
                document.getElementById("weather-condition-img").src = imageSrc;
                console.log("Condition:", condition);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
});

// *********************************************** GET WEATHER CONDITION @ YOUR LOCATION ***********************************************
function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                alert("❌ Could not fetch weather for your location")
                throw new Error("Fetch failed");
            }
            return response.json();
        })
        .then(data => {

            const weatherImages = {
                Clear: "myImg/sun.png",
                Clouds: "myImg/breakingCloud.png",
                Rain: "myImg/rain.png",
                Thunderstorm: "myImg/thunderstorm.png",
                Drizzle: "myImg/Drizzle.png",
                Snow: "myImg/Snow.png",
                Mist: "myImg/mist.png",
                Smoke: "myImg/breakingCloud.png",
                Haze: "myImg/haze.png",
                Dust: "myImg/breakingCloud.png",
                Fog: "myImg/haze.png",
                Sand: "myImg/breakingCloud.png",
                Ash: "myImg/breakingCloud.png",
                Squall: "myImg/thunderstorm.png",
                Tornado: "myImg/Tornado.png"
            };

            const temp = data.main.temp;
            const city = data.name;
            const condition = data.weather[0].main;
            const imageSrc = weatherImages[condition] || "myImg/sun.png";

            document.getElementById("temperature-value").innerText = `${temp}°C`;
            document.getElementById("city-name").innerText = city;
            document.getElementById("weather-condition-img").src = imageSrc;
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            },
            (error) => {
                alert("❌ Geolocation error")
                console.error("Geolocation error:", error);
            }
        );
    } else {
        alert("❌ Geolocation is not supported by this browser")
    }
});
