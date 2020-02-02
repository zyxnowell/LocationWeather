using LocationWeather.Interfaces;
using LocationWeather.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace LocationWeather.Services
{
    public class HomeRepository : IHomeRepository
    {
        private readonly IConfiguration _config;
        public HomeRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IpApiResponse> GetLocation(string ipAddress)
        {
            using (var client = new HttpClient())
            {
                var url = new Uri($"http://ip-api.com/json/{ipAddress}");

                var response =
                    await client.GetAsync(url);

                string json;

                using (var content = response.Content)
                {
                    json = await content.ReadAsStringAsync();
                }

                return JsonConvert.DeserializeObject<IpApiResponse>(json);
            }
        }

        public async Task<OpenWeatherResult> GetWeather(int latitude, int longitude)
        {
            using (var client = new HttpClient())
            {

                var appId = _config.GetSection("OpenWeather").Get<List<string>>()[0];

                var uri = $"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&APPID={appId}";

                var url = new Uri(uri);

                var response =
                    await client.GetAsync(url);

                string json;

                using (var content = response.Content)
                {
                    json = await content.ReadAsStringAsync();
                }

                return JsonConvert.DeserializeObject<OpenWeatherResult>(json);
            }
        }
    }
}
