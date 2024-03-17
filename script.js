$(document).ready(function(){
    $('#search-form').submit(function(event){
        event.preventDefault();
        var city = $('#city-input').val();
        var apiKey = '405662a8857080852e364ac94dc71ed3'; // Replace 'YOUR_API_KEY' with your actual API key
        
        // API call to fetch current weather data
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather',
            method: 'GET',
            dataType: 'json',
            data: {
                q: city,
                appid: apiKey,
                units: 'metric'
            },
            success: function(data){
                // Update the current weather card with the fetched data
                $('#current-weather').html(`
                    <h2 class="text-center">Current Weather</h2>
                    <p class="text-center">Temperature: ${data.main.temp}°C</p>
                    <p class="text-center">Wind Speed: ${data.wind.speed} m/s</p>
                    <p class="text-center">Humidity: ${data.main.humidity}%</p>
                `);
            },
            error: function(xhr, status, error){
                console.error('Error:', error);
            }
        });

        // API call to fetch 5-day forecast data
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast',
            method: 'GET',
            dataType: 'json',
            data: {
                q: city,
                appid: apiKey,
                units: 'metric'
            },
            success: function(data){
                // Clear previous forecast cards
                $('#forecast-cards').empty();

                // Iterate over the forecast data for the next 5 days
                for (var i = 0; i < data.list.length; i += 8) {
                    var forecast = data.list[i];
                    var date = new Date(forecast.dt * 1000);
                    var day = date.toLocaleDateString('en-US', { weekday: 'long' });
                    var temp = forecast.main.temp;
                    var windSpeed = forecast.wind.speed;
                    var humidity = forecast.main.humidity;

                    // Create a forecast card for each day
                    var forecastCard = `
                        <div class="col-md-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${day}</h5>
                                    <p class="card-text">Temperature: ${temp}°C</p>
                                    <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
                                    <p class="card-text">Humidity: ${humidity}%</p>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#forecast-cards').append(forecastCard);
                }
            },
            error: function(xhr, status, error){
                console.error('Error:', error);
            }
        });
    });
});