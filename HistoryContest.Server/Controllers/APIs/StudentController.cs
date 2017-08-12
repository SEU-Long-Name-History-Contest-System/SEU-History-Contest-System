using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Controllers.APIs
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly UnitOfWork _unitofwork;

        public StudentController(UnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        
        // PUT: api/Student/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var Students = _unitofwork.context.Students.FirstOrDefault(t => t.ID==id);
            if (Students == null)
            {
                return NotFound();
            }
            _unitofwork.context.Students.Remove(Students);
            _unitofwork.context.SaveChanges();
            return new NoContentResult();
        }
    }
}
