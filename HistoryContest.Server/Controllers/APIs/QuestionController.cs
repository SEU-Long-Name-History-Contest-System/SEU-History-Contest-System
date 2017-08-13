using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Models.ViewModels;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Controllers.APIs
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly UnitOfWork _unitofwork;

        public QuestionController(UnitOfWork unitofwork)
        {
            _unitofwork = unitofwork;
        }

        [HttpGet]
        public IEnumerable<string> GetQuestionSet()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string GetQuestionById(int id)
        {
            var question = _unitofwork.context.Questions.Where(m=>m.ID==id);
            foreach(AQuestionBase m in question)
            {
                if (m.ID == id)
                    return m.Question;
            }
            return "NONE";
        }

        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSeed(int id)
        {
            var questionseeds = _unitofwork.context.QuestionSeeds.FirstOrDefault(t => t.ID== id);
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
