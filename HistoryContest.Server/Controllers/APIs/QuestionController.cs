using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Models.ViewModels;
using HistoryContest.Server.Data;
using HistoryContest.Server.Services;

namespace HistoryContest.Server.Controllers.APIs
{
    [Authorize(Roles = "Student, Administrator")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly UnitOfWork unitOfWork;
        private readonly QuestionSeedService questionSeedService;

        public QuestionController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            questionSeedService = new QuestionSeedService(unitOfWork);
        }

        [HttpGet]
        public async Task<IActionResult> GetQuestionSet()
        {
            var seed = HttpContext.Session.GetInt32("seed");
            if (seed == null)
            {
                return BadRequest("Question seed not created");
            }
            
            var source = await questionSeedService.GetQuestionsBySeedID((int)seed);
            if (source == null)
            {
                throw new Exception("Improper seed created, ID: " + seed);
            }

            return Json(source.Select(q => (QuestionViewModel)q));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestionById(int id)
        {
            var item = await unitOfWork.QuestionRepository.GetByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Json((QuestionViewModel)item);
        }

        [HttpPost]
        public async Task<IActionResult> GetQuestionIDSet()
        {
            var seed = HttpContext.Session.GetInt32("seed");
            if (seed == null)
            {
                return BadRequest("Question seed not created");
            }

            return Json((await unitOfWork.QuestionSeedRepository.GetByIDAsync(seed)).QuestionIDs);
        }
    }
}