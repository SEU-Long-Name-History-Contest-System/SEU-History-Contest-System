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
using HistoryContest.Server.Services;

namespace HistoryContest.Server.Controllers.APIs
{
    [Authorize(Roles = "Student, Administrator")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly UnitOfWork unitOfWork;
        private readonly QuestionSeedService questionSeedService;

        public StudentController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            questionSeedService = new QuestionSeedService(unitOfWork);
        }

        #region State APIs
        [HttpGet("state")]
        public IActionResult State()
        { // TODO: 写student的state
            return Json(true);
        }

        [HttpGet("state/[action]")]
        public async Task<IActionResult> Initialize()
        {
            if (HttpContext.Session.Get("begintime") != null)
            { // 已经初始化则重定向到State方法
                return RedirectToAction(nameof(State));
            }

            await SetSeed();
            return SetStartTime();
        }

        [HttpPost("state/[action]")]
        public async Task<IActionResult> Reset()
        {
            if (HttpContext.Session.Get("begintime") == null)
            { // 未初始化则重定向到State方法
                return RedirectToAction(nameof(State));
            }

            ClearSeed();
            ClearStartTime();
            await SetSeed();
            return SetStartTime();
        }
        #endregion

        #region Seed APIs
        [HttpPost("seed")]
        public async Task<JsonResult> SetSeed()
        {
            if (HttpContext.Session.GetInt32("seed") == null)
            {
                var seed = await questionSeedService.RollSeed();
                HttpContext.Session.SetInt32("seed", seed.ID);
                return Json(seed);
            }
            return Json(await unitOfWork.QuestionSeedRepository.GetByIDAsync(HttpContext.Session.GetInt32("seed")));
        }

        [HttpDelete("seed")]
        public IActionResult ClearSeed()
        {
            HttpContext.Session.Remove("seed");
            return NoContent();
        }
        #endregion

        #region Time APIs
        [HttpGet("time")]
        public IActionResult GetLeftTime()
        {
            if(HttpContext.Session.Get<DateTime>("begintime") == default(DateTime))
            {
                return NoContent();
            }    
            TimeSpan timeLeft = TimeSpan.FromMinutes(30) - (DateTime.Now - HttpContext.Session.Get<DateTime>("begintime"));
            return Json(timeLeft);
        }

        [HttpPost("time")]
        public IActionResult SetStartTime()
        {
            if(HttpContext.Session.Get<DateTime>("begintime") == default(DateTime))
            {
                DateTime now = DateTime.Now;
                HttpContext.Session.Set<DateTime>("begintime", now);
                return Ok(now);
            }
            return RedirectToAction(nameof(SetStartTime));
        }

        [HttpDelete("time")]
        public IActionResult ClearStartTime()
        {
            HttpContext.Session.Remove("begintime");
            return NoContent();
        }
        #endregion Time APIs
    }
}
