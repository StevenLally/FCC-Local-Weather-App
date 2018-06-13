$("document").ready(function() {
  var lat;
  var long;
  var weatherURL;
  var tempC;
  var tempF;
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position);
  }
  
  // position function to be used with geolocation for lat and long
  function position(coordinates) {
    lat = coordinates.coords.latitude;
    long = coordinates.coords.longitude;
    weatherURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
    weatherAPI(weatherURL);
  } 
  
  function weatherAPI(URL) {
    // get weather info from API
    $.getJSON(weatherURL, function(weather) {
      // store info from API
      var city = weather.name + ", " + weather.sys.country;
      var description = weather.weather[0].main;
      tempC = weather.main.temp;
      var humid = weather.main.humidity;
      
      // get temp in farenheit
      tempF = (tempC * (9/5)) + 32;
      
      // title case description
      description = description.split(" ");
      for (var i = 0; i < description.length; i++) {
        description[i] = description[i].charAt(0).toUpperCase() + description[i].slice(1);
      }
      description = description.join(" ");
      
      // write gathered info to HTML
      $("#location").html(city);
      $("#description").html(description);
      $("#temperature").html(tempC + '&#176; <i class="tUnit">C</i>');
      $("#humidity").html("Humidity: " + humid + "%");
      
      convertTemp();
      weatherIcon(weather.weather[0].main);
    });
  }
  
  // convert temperature between C and F upon clicking it
  function convertTemp() {  
    $("#temperature").on('click', function(){
      if ($("i.tUnit").html() === "C") {
        $("#temperature").html(tempF + '&#176; <i class="tUnit">F</i>');
      }
      else {
        $("#temperature").html(tempC + '&#176; <i class="tUnit">C</i>');
      }
    });
  }
  
  // determine which weather icon gets inserted
  function weatherIcon(desc) {
    desc = desc.toLowerCase();
    switch (desc) {
      case "drizzle":
        $("div.driz").removeClass("hide");
        break;
        
      case "clouds":
        $("div.clouds").removeClass("hide");
        break;
        
      case "rain":
        $("div.rain").removeClass("hide");
        break;
        
      case "snow":
        $("div.snow").removeClass("hide");
        break;
        
      case "clear":
        $("div.clear").removeClass("hide");
        break;
        
      case "thunderstorm":
        $("div.thunderstorm").removeClass("hide");
        break; 
    }
  }
  
  // bold temperature when hovered over
  $("#temperature").hover(
    function() {
      $(this).css("font-weight", "bold");
    }, function() {
      $(this).css("font-weight", "normal");
    }
  );  
});