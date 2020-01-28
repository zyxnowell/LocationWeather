using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocationWeather.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace LocationWeather
{
    [Route("api")]
    public class HomeController : Controller
    {
        private readonly IHomeRepository _home;

        public HomeController(IHomeRepository home)
        {
            _home = home;
        }

        [HttpGet("get-location/{ipAddress}")]
        public async Task<IActionResult> GetLocation(string ipAddress)
        {
            var result = await _home.GetLocation(ipAddress);

            return Ok(result);
        }

        [HttpGet("get-weather")]
        public async Task<IActionResult> GetWeather(int lat, int lon)
        {
            var result = await _home.GetWeather(lat, lon);

            return Ok(result);
        }
    }
}
