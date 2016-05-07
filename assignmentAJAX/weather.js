document.addEventListener('DOMContentLoaded', bindWeatherButton);

function bindWeatherButton(){

  var apiKey = '836b54781410078b56db66e1bb281ad9';
  document.getElementById("weatherSubmit").addEventListener('click', function(event){

    var userCity = document.getElementById("city").value;
    var userCountry = document.getElementById("country").value;
    var userZip = document.getElementById("zipCode").value;
    var userInput;

    /*Implement better input verification in the future.
    For example, provide a warning if zip code and city doesn't match.
    */
    if (userZip) {
      userInput = '?zip='+userZip+','+userCountry;
    }
    else if (userCity) {
      userInput = '?q='+userCity+','+userCountry;
    }

    var req = new XMLHttpRequest();
    req.open('GET','http://api.openweathermap.org/data/2.5/weather'+userInput+'&appid='+apiKey+'&units=imperial',true);
    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        document.getElementById("temperature").textContent = response.main.temp +" \u00B0F";
        document.getElementById("humidity").textContent = response.main.humidity+"%";
        document.getElementById("curCity").textContent = response.name;
      }
      else {
        console.log("Error in network request: "+request.statusText);
      }
    });
    req.send(null);
    event.preventDefault();
  });
}
