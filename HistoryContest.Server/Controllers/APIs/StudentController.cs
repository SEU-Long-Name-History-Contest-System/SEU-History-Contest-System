using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HistoryContest.Server.Data;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Extensions;

namespace HistoryContest.Server.Controllers.APIs
{
    [Authorize(Roles = "Student, Administrator")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly UnitOfWork _unitOfWork;

        public StudentController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Student
        [HttpGet]
        public IEnumerable<Student> GetAll()
        {
            return _unitOfWork.context.Students.ToList();
        }

        // GET: api/Student/5
        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetById(long id)
        {
            var item = _unitOfWork.context.Students.FirstOrDefault(t => t.ID == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        // POST: api/Student
        [HttpPost]
        public IActionResult Post([FromBody]Student item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _unitOfWork.context.Students.Add(item);
            _unitOfWork.context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.ID }, item);
        }

        // PUT: api/Student/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody]Student item)
        {
            if (item == null || item.ID != id)
            {
                return BadRequest();
            }

            var todo = _unitOfWork.context.Students.FirstOrDefault(t => t.ID == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.Name = item.Name;
            todo.CardID = item.CardID;
            todo.Choices = item.Choices;
            todo.Counselor = item.Counselor;
            todo.CounselorID = item.CounselorID;
            todo.State = item.State;
            todo.QuestionSeed = item.QuestionSeed;
            todo.QuestionSeedID = item.QuestionSeedID;

            _unitOfWork.context.Students.Update(todo);
            _unitOfWork.context.SaveChanges();
            return new NoContentResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var Students = _unitOfWork.context.Students.FirstOrDefault(t => t.ID == id);
            if (Students == null)
            {
                return NotFound();
            }
            _unitOfWork.context.Students.Remove(Students);
            _unitOfWork.context.SaveChanges();
            return new NoContentResult();
        }


        #region Special APIs
        [HttpGet("[action]")]
        public IActionResult Status()
        {
            return Json(true);
        }
        
        [HttpGet("time")]
        public IActionResult GetLeftTime()
        {
            TimeSpan timeLeft = TimeSpan.FromMinutes(30) - (DateTime.Now - HttpContext.Session.Get<DateTime>("begintime"));
            return Json(timeLeft);
        }

        [HttpPost("time")]
        public IActionResult SetStartTime()
        {
            DateTime now = DateTime.Now;
            HttpContext.Session.Set<DateTime>("begintime", now);
            return Ok(now);
        }

        [HttpDelete("time")]
        public IActionResult ClearStartTime()
        {
            return NoContent();
        }
        #endregion

    }
}
