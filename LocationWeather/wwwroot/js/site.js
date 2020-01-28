$(document).ready(function () {

    $("#weatherDetails").hide();
    $("#exceedAlert").hide();

    $.ajax({
        type: 'GET',
        url: 'https://ipapi.co/json/',
        success: function (result) {
            $("#location").val(result.city);
            getLocation(result.ip);
        }
    });


    function getLocation(ip) {
        $.ajax({
            type: 'GET',
            url: `api/get-location/${ip}`,
            success: function (result) {
                $("#locationTxt").text(`${result.city}, ${result.country}`);

                $().getWeather(parseInt(result.lat), parseInt(result.lon));
            },
            error: function (error) {
                
            }
        });
    }

    function populateWeatherDetails(details) {
        var wDesc = details.weather[0].description.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
        $("#weatherDescription").text(wDesc);
        $("#temp").text((details.main.temp / 10).toFixed(2));
        $("#feelsLikeTemp").text((details.main.feels_like / 10).toFixed(2));
        $("#windSpeed").text(details.wind.speed);
        $("#pressure").text(details.main.pressure);
        $("#humidity").text(details.main.humidity);
        $("#weatherIcon").attr("src", `http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`);
    }

    $.fn.getWeather = function (lat, lon) {
        $.ajax({
            type: 'GET',
            url: `api/get-weather?&lat=${lat}&lon=${lon}`,
            success: function (result) {
                populateWeatherDetails(result);
                $("#weatherDetails").show();
            },
            error: function () {
                $().exceedAlert();
            }
        });
    }

    $.fn.exceedAlert = function () {
        $("#weatherDetails").hide();
        $("#exceedAlert").fadeTo(2000, 500).slideUp(500, function () {
            $("#exceedAlert").slideUp(500);
        });
    }
});