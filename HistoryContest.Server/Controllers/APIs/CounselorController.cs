using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Controllers.APIs
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CounselorController : Controller
    {
        private readonly UnitOfWork _unitofwork;

        public CounselorController(UnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        // GET: api/Counselor
        [HttpGet]
        public IEnumerable<string> Get()
        {

            return new string[] { "value1", "value2" };
        }

        // GET: api/Counselor/5
        [HttpGet("{id}", Name = "Get"),ActionName("scoreSummary")]
        public string Get(Department departmentid)
        {
            //
            return "value";
        }
        
        // POST: api/Counselor
        [HttpPost]
        public void Post([FromBody]string value)
        {

        }
        
        // PUT: api/Counselor/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {

        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
