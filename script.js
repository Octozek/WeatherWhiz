$(document).ready(function(){
    $('#search-form').submit(function(event){
        event.preventDefault();
        var city = $('#city-input').val();
        var apiKey = '405662a8857080852e364ac94dc71ed3';
        
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
                // Get the current date
                var currentDate = new Date();
                var formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                // Define emoji based on weather condition
                var emoji = '';
                if (data.weather[0].main === 'Clear') {
                    emoji = '☀️';
                } else if (data.weather[0].main === 'Clouds') {
                    emoji = '☁️';
                } else if (data.weather[0].main === 'Rain') {
                    emoji = '🌧️';
                }

                // Update the current weather card with the fetched current weather data and current date
                $('#current-weather').html(`
                    <h2 class="text-center">Current Weather</h2>
                    <p class="text-center">Date: ${formattedDate}</p>
                    <p class="text-center">Weather: ${emoji}</p>
                    <p class="text-center">Temperature: ${data.main.temp}°C</p>
                    <p class="text-center">Wind Speed: ${data.wind.speed} m/s</p>
                    <p class="text-center">Humidity: ${data.main.humidity}%</p>
                `);
                
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
                    success: function(forecastData) {
                        // Update the HTML content for the forecast cards
                        var forecastCards = '';
                        for (var i = 0; i < 5; i++) {
                            var forecastDate = new Date(forecastData.list[i].dt_txt);
                            var formattedForecastDate = forecastDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                            // Define emoji based on weather condition for each day
                            var forecastEmoji = '';
                            if (forecastData.list[i].weather[0].main === 'Clear') {
                                forecastEmoji = '☀️';
                            } else if (forecastData.list[i].weather[0].main === 'Clouds') {
                                forecastEmoji = '☁️';
                            } else if (forecastData.list[i].weather[0].main === 'Rain') {
                                forecastEmoji = '🌧️';
                            }

                            forecastCards += `
                                <div class="col-md-2">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${formattedForecastDate}</h5>
                                            <p class="card-text">Weather: ${forecastEmoji}</p>
                                            <p class="card-text">Temperature: ${forecastData.list[i].main.temp}°C</p>
                                            <p class="card-text">Wind Speed: ${forecastData.list[i].wind.speed} m/s</p>
                                            <p class="card-text">Humidity: ${forecastData.list[i].main.humidity}%</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        $('#forecast-cards').html(forecastCards);
                    },
                    error: function(xhr, status, error) {
                        console.error('Error fetching forecast data:', error);
                    }
                });
            },
            error: function(xhr, status, error){
                console.error('Error fetching current weather data:', error);
            }
        });
    });
});