using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HistoryContest.Server.Data;
using HistoryContest.Server.Services;
using HistoryContest.Server.Extensions;
using HistoryContest.Server.Models.ViewModels;

namespace HistoryContest.Server.Controllers.APIs
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ResultController : Controller
    {
        private readonly UnitOfWork unitOfWork;
        private readonly QuestionSeedService questionSeedService;

        public ResultController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            questionSeedService = new QuestionSeedService(unitOfWork);
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> GetResult(int? id)
        {
            if (id == null && HttpContext.User.IsInRole("Student") && HttpContext.Session.Get("id") != null)
            { // 如果不输入id，且当前用户认证为学生，则取Session中的学号作为id
                id = int.Parse(HttpContext.Session.GetString("id"));
            }
            else
            {
                return BadRequest("Empty argument request invalid");
            }

            var model = new ResultViewModel();
            // TODO: 将model从缓存中取出（按Ctrl + Alt + K打开TODO列表）
            
            var student = await unitOfWork.StudentRepository.GetByIDAsync(id);
            model.Score = (int)student.Score;
            model.Details = student.QuestionSeed.QuestionIDs.Zip(student.Choices, (ID, choice) => new ResultDetailViewModel
            {
                ID = ID,
                RightAnswer = (unitOfWork.QuestionRepository.GetByID(ID)).Answer,
                SubmittedAnswer = choice
            }).ToList();

            return Json(model);
        }

        [HttpPost]
        public async Task<IActionResult> CountScore([FromBody]List<AnswerViewModel> answers)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Body JSON content invalid");
            }

            var student = await unitOfWork.StudentRepository.GetByIDAsync(int.Parse(HttpContext.Session.GetString("id")));
            student.Score = 0;
            student.DateTimeFinished = DateTime.Now;
            student.TimeConsumed = student.DateTimeFinished - HttpContext.Session.Get<DateTime>("begintime");
            student.Choices = answers.Select(a => (byte)a.Answer).ToArray();

            var model = new ResultViewModel
            {
                Details = new List<ResultDetailViewModel>(capacity: 30),
                TimeFinished = (DateTime)student.DateTimeFinished,
                TimeConsumed = (TimeSpan)student.TimeConsumed
            };
            foreach(var a in answers)
            {
                var item = await unitOfWork.QuestionRepository.GetByIDAsync(a.ID);
                if (item == null)
                {
                    return BadRequest("Encounter invalid ID in answer set: " + a.ID);
                }
                student.Score += a.Answer == item.Answer ? item.Points : 0;
                model.Details.Add(new ResultDetailViewModel { ID = item.ID, RightAnswer = item.Answer, SubmittedAnswer = a.Answer });
            }
            model.Score = (int)student.Score;

            // TODO: 将model存到缓存
            unitOfWork.StudentRepository.Update(student);
            await unitOfWork.SaveAsync();
            return Json(model);
        }

        [HttpGet("answer")]
        public async Task<IActionResult> GetAllAnswers()
        {
            var seed = HttpContext.Session.GetInt32("seed");
            if (seed == null)
            {
                return BadRequest("Question seed not created");
            }

            var source = await questionSeedService.GetQuestionsBySeedID((int)seed);
            if (source == null)
            {
                // TODO: 详细定义异常
                throw new Exception("Improper seed created, ID: " + seed);
            }

            return Json(source.Select(q => new AnswerViewModel { ID = q.ID, Answer = q.Answer, Points = q.Points }));
        }

        [HttpGet("answer/{id}")]
        public async Task<IActionResult> GetAnswerByID(int id)
        {
            var item = await unitOfWork.QuestionRepository.GetByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Json(new AnswerViewModel { ID = item.ID, Answer = item.Answer, Points = item.Points });
        }
    }
}