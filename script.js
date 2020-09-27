$(document).ready(function() {

	var city = "";
	var APIKey = "";
	var currentWeatherUrl = "";
	var weatherUrl = "";
	searchClicker();
	var hiddenDiv = document.getElementById("#hidDiv");
	function searchClicker() {
		$("#submitBtn").on("click", function (e) {
			$("#hidDiv").css("display", "block");
			$("#recommendedActivities").css("display", "block");
			event.preventDefault();
			city = $(this).prev().val().trim();
			APIcalls();
		})
		function APIcalls() {
			weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
			APIkey = "&appid=ea42a1210d1c0c2d7b6990d0d1323fe7";
			currentWeatherUrl = weatherUrl + city + APIkey;
			$("#cityName").text("Today's Weather in " + jsUcFirst(city));
			$.ajax({
				url: currentWeatherUrl,
				method: "GET",
			}).then(function (currentData) {
				console.log(currentData);
				var temp = Math.round(((currentData.main.temp - 273.15) * 9 / 5 + 32))
				console.log("The temperature in " + city + " is: " + temp);
				$("#todayTemp").text("Temperature: " + temp + String.fromCharCode(176) + "F");
				$("#todayHumidity").text("Humidity: " + currentData.main.humidity);
				$("#todayWindSpeed").text("Wind Speed: " + currentData.wind.speed);
				$("#todayImgSection").attr({
					"src": "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png",
					"height": "100px", "width": "100px"
				});
			})

		}
	}
	function jsUcFirst(string) {
		return string.charAt().toUpperCase() + string.slice(1);
	}
});


















