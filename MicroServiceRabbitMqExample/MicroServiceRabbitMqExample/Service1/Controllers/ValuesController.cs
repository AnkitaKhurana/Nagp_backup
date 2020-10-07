using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Service1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IBusControl _bus;
        private readonly IConfiguration _config;

        public ValuesController(IBusControl bus, IConfiguration config)
        {
            _bus = bus;
            _config = config;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Service1";
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> GetAsync(int id)
        {
            Uri uri = new Uri($"rabbitmq://{_config.GetValue<string>("RabbitMQHostName")}/nagpsession");
            var session = new Common.Session();
            session.SessionNumber = id;
            session.Technology = "MicroService";
            session.Year = 2020;
            var endPoint = await _bus.GetSendEndpoint(uri);
            await endPoint.Send(session);
            return "ID: "+id;

        }

        
    }
}
