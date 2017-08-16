using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Controllers.APIs
{
    [Authorize(Roles = "Counselor, Administrator")]
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
        public IEnumerable<Counselor> GetAll()
        {
            return _unitofwork.context.Counselors.ToList();
        }

        // GET: api/Counselor/5
        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetById(long id)
        {
            var item = _unitofwork.context.Counselors.FirstOrDefault(t => t.ID == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        // POST: api/Counselor
        [HttpPost]
        public IActionResult Post([FromBody]Counselor item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _unitofwork.context.Counselors.Add(item);
            _unitofwork.context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.ID }, item);
        }

        // PUT: api/Counselor/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody]Counselor item)
        {
            if (item == null || item.ID != id)
            {
                return BadRequest();
            }

            var todo = _unitofwork.context.Counselors.FirstOrDefault(t => t.ID == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.Department = item.Department;
            todo.Name = item.Name;
            todo.Students = item.Students;
            _unitofwork.context.Counselors.Update(todo);
            _unitofwork.context.SaveChanges();
            return new NoContentResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var Counselors = _unitofwork.context.Counselors.FirstOrDefault(t => t.ID == id);
            if (Counselors == null)
            {
                return NotFound();
            }
            _unitofwork.context.Counselors.Remove(Counselors);
            _unitofwork.context.SaveChanges();
            return new NoContentResult();
        }
    }
}