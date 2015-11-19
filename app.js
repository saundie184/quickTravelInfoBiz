//use city for api calls
//make api call to zipCodeApi for distance
  //need zip codes for distance API call
//make api call to open weather for weather
//use returned data to update page
//convert Kelvin to Farhenhiet

var button = $('button');
var milesAway = $('#location');

//get input from user
//user types data
$(button).on('click', function(event) {
  event.preventDefault();
  var city = $('#cityInput').val();
  var state = $('#stateInput').val();

  //first make api call to city-zips for zipcode, then use distance method for distance
  $.ajax({
    url: 'https://www.zipcodeapi.com/rest/js-LBhdfkYfMBR0maS4xEb61s2d65PBRqVC2cQhxOwkpolLydQ6R2cTve6BkVcbm8Oo/city-zips.json/' + city + '/' + state,
    method: "GET",
    success: function(data) {
      var zip = JSON.parse(data.zip_codes[0]);
      // console.log(zip);

      //ajax call to get the distance
      $.ajax({
        url: 'https://www.zipcodeapi.com/rest/js-LBhdfkYfMBR0maS4xEb61s2d65PBRqVC2cQhxOwkpolLydQ6R2cTve6BkVcbm8Oo/distance.json/80521/' + zip + '/mile',
        method: "GET",
        success: function(data2) {
          var distanceFromFoCo = data2.distance;
          // console.log(city);

          //ajax call to get the weather
          $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=2de143494c0b295cca9337e1e96b00e0',
            method: "GET",
            success: function(data3) {
              var currentTemp = JSON.stringify(data3.main['temp']);
              // console.log(convertKtoF(currentTemp));
              $('#location').append(city + ', ' + state + ', ');
              $('#distance').append(distanceFromFoCo);
              $('#weather').append(convertKtoF(currentTemp) + " degrees Farenheit");
            }

          });
        }
      });
    }
  });
});

function convertKtoF(kevlinTemp) {
  var FarhenhietTemp = kevlinTemp * 9 / 5 - 459.67;
  return Math.round(FarhenhietTemp, 0);
}
