console.log("script loaded");
const weatherBackgrounds = {
  Clear: "url('images/clear.jpg')",
  Clouds: "url('images/cloudy.jpg')",
  Rain: "url('images/rain.jpg')",
  Snow: "url('images/snow.jpg')",
  Mist: "url('images/mist.jpg')",
  Drizzle: "url('images/rain.jpg')", // reuse rain if you don't have drizzle
  Thunderstorm: "url('images/thunderstroom.jpg')" // reuse rain or add thunder.jpg
};

window.weather={
	apikey:"79306a00587f71673296e99ec94f6590",
	fetchWeather: function(city){
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=" 
			+ city 
			+ "&units=metric&appid=" 
			+ this.apikey
		)
		.then((response) => response.json())
		.then((data)=> this.displayWeather(data));
	},
	displayWeather: function(data){
		// Implementation goes here
		console.log("displayWeather running:",data);
		console.log("main weather condition:", data.weather[0].main);
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		const weatherCondition = data.weather[0].main;

// Convert to Title Case
const formattedCondition = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1).toLowerCase();

// Debug logs
console.log("Raw weather condition:", weatherCondition);
console.log("Final condition key:", formattedCondition);
console.log("Matched background image:", weatherBackgrounds[formattedCondition]);

// Apply the background
document.body.style.backgroundImage = weatherBackgrounds[formattedCondition] || "url('images/cloudy.jpg')";
		console.log(name, icon, description, temp, humidity, speed);
		document.querySelector(".city").innerText = "Weather in " + name;
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = temp + "°C";
		document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
		document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
// 		const weatherBackgrounds = {
//   Clear: "url('images/clear.jpg')",
//   Clouds: "url('images/cloudy.jpg')",
//   Rain: "url('images/rain.jpg')",
//   Snow: "url('images/snow.jpg')",
//   Mist: "url('images/mist.jpg')",
//   Drizzle: "url('images/rain.jpg')", // reuse rain if you don't have drizzle
//   Thunderstorm: "url('images/thunderstroom.jpg')" // reuse rain or add thunder.jpg
// };
const condition = data.weather[0].main;
		console.log("weather condition:", condition);
document.body.style.backgroundImage = weatherBackgrounds[data.weather[0].main] || "url('images/default.jpg')";
		document.querySelector(".weather").classList.remove("loading");
		//document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D==" + name + "')";//
	},
	search: function(){
		this.fetchWeather(document.querySelector(".search-bar").value);
	}
};
console.log("weather object created",window.weather);
document.querySelector(".search button").addEventListener("click", function(){
weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event){
	if(event.key == "Enter"){
		weather.search();
	}
});
weather.fetchWeather("London"); // Default city