using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Models.ViewModels;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Controllers.APIs
{
    [Authorize(Roles = "Student, Administrator")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly UnitOfWork _unitofwork;

        public QuestionController(UnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        // GET: api/Question
        [HttpGet]
        public IEnumerable<AQuestionBase> GetQuestionSet()
        {
            return new List<AQuestionBase>();
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        public IActionResult GetQuestionById(long id)
        {
            var item = _unitofwork.context.Questions.FirstOrDefault(t => t.ID == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        // POST: api/Question
        [HttpPost]
        public IActionResult Post([FromBody]AQuestionBase item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _unitofwork.context.Questions.Add(item);
            _unitofwork.context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.ID }, item);
        }

        // PUT: api/Question/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody]AQuestionBase item)
        {
            if (item == null || item.ID != id)
            {
                return BadRequest();
            }

            var todo = _unitofwork.context.Questions.FirstOrDefault(t => t.ID == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.Answer = item.Answer;
            todo.Points = item.Points;
            todo.Question = item.Question;

            _unitofwork.context.Questions.Update(todo);
            _unitofwork.context.SaveChanges();
            return new NoContentResult();
        }

        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSeed(long id)
        {
            var questionseeds = _unitofwork.context.QuestionSeeds.FirstOrDefault(t => t.ID == id);
            if (questionseeds == null)
            {
                return NotFound();
            }
            _unitofwork.context.QuestionSeeds.Remove(questionseeds);
            _unitofwork.context.SaveChanges();
            return new NoContentResult();
        }
    }
}