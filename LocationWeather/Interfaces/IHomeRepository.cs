using LocationWeather.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LocationWeather.Interfaces
{
    public interface IHomeRepository
    {
        Task<IpApiResponse> GetLocation(string ipAddress);
        Task<OpenWeatherResult> GetWeather(int latitude, int longitude);
    }
}
