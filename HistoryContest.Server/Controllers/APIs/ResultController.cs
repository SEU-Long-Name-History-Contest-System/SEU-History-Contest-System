using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HistoryContest.Server.Controllers.APIs
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ResultController : Controller
    {
        
        [HttpGet]
        public IActionResult GetResult()
        {

            return NoContent();
        }

        [HttpGet("[action]")]
        public IActionResult Answer()
        {
            return NoContent();
        }

        [HttpGet("[action]/{id}")]
        public IActionResult Answer(int id)
        {
            return NoContent();
        }

        [HttpPost]
        public IActionResult CountScore([FromBody]IEnumerable<string> answers)
        {
            return NoContent();
        }
    }
}