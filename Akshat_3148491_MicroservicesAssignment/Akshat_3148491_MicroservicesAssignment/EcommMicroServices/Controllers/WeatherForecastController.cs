﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Users.service.Data;
using Users.service.Models;

namespace EcommMicroServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly DBWrapper _dBWrapper; 
        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            _dBWrapper = new DBWrapper();
        }

        [HttpGet]
        public User Get()
        {
            //var rng = new Random();
            //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            //{
            //  Date = DateTime.Now.AddDays(index),
            //TemperatureC = rng.Next(-20, 55),
            //Summary = Summaries[rng.Next(Summaries.Length)]
            //})
            //.ToArray();
            return _dBWrapper.GetUser("Homer Gramlich");
        }
    }
}
