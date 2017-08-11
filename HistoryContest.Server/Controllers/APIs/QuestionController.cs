using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HistoryContest.Server.Models.ViewModels;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Controllers.APIs
{
    [Route("api/Question")]
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
            return "value";
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
        public void DeleteSeed(int id)
        {

        }
    }
}
