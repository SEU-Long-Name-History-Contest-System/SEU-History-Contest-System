using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using HistoryContest.Server.Models;
using HistoryContest.Server.Models.ViewModels;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Controllers.APIs
{
    [Authorize(Roles = "Counselor, Administrator")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CounselorController : Controller
    {
        private readonly UnitOfWork unitOfWork;

        public CounselorController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            unitOfWork.StudentRepository.LoadStudentsFromCounselors();
        }

        // 按院系代码获取所有学生分数
        [HttpGet("scores/all/{id}")]
        public async Task<IActionResult> AllScoresByDepartment(Department id)
        {
            if (!HttpContext.User.IsInRole("Administrator") 
                && 
                id != unitOfWork.CounselorRepository.GetByID(int.Parse(HttpContext.Session.GetString("id"))).Department)
            { // 不允许辅导员查询不同系学生的数据
                return Forbid();
            }

            return Json((await unitOfWork.StudentRepository.GetByDepartment(id)).AsQueryable().Select(s => (StudentViewModel)s));
        }

        // 按学号获取单个学生分数
        [HttpGet("scores/single/{id}")]
        public async Task<IActionResult> StudentScoreById(int id)
        {
            var student = await unitOfWork.StudentRepository.GetByIDAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            if (!HttpContext.User.IsInRole("Administrator") && student.CounselorID != int.Parse(HttpContext.Session.GetString("id")))
            { // 不允许辅导员查询不同系学生的数据
                return Forbid();
            }

            return Json((StudentViewModel)student);
        }

        // 获取全校分数概况
        [HttpGet("scores/summary")]
        public async Task<IActionResult> ScoreSummaryOfSchool()
        {
            // TODO: Score Summary放入缓存
            var model = new ScoreSummaryViewModel
            {
                MaxScore = await unitOfWork.StudentRepository.HighestScore(),
                AverageScore = await unitOfWork.StudentRepository.AverageScore(),
                ScoreBandCount =
                {
                    HigherThan90 = await unitOfWork.StudentRepository.ScoreHigherThan(90),
                    HigherThan75 = await unitOfWork.StudentRepository.ScoreHigherThan(75),
                    HigherThan60 = await unitOfWork.StudentRepository.ScoreHigherThan(60)
                }
            };
            model.ScoreBandCount.Failed = await unitOfWork.StudentRepository.SizeAsync() - model.ScoreBandCount.HigherThan60;
            return Json(model);
        }

        // 按照院系ID获取概况
        [HttpGet("scores/summary/{id}")]
        public async Task<IActionResult> ScoreSummaryByDepartment(Department id)
        {
            var counselor = await unitOfWork.CounselorRepository.FirstOrDefaultAsync(c => c.Department == id);
            if (counselor == null)
            {
                return NotFound();
            }

            // TODO: Score Summary放入缓存
            var model = new ScoreSummaryViewModel
            {
                DepartmentID = counselor.Department,
                CounselorName = counselor.Name,
                MaxScore = await unitOfWork.StudentRepository.HighestScoreByDepartment(counselor.Department),
                AverageScore = await unitOfWork.StudentRepository.AverageScoreByDepartment(counselor.Department),
                ScoreBandCount =
                {
                    HigherThan90 = await unitOfWork.StudentRepository.ScoreHigherThanByDepartment(90, counselor.Department),
                    HigherThan75 = await unitOfWork.StudentRepository.ScoreHigherThanByDepartment(75, counselor.Department),
                    HigherThan60 = await unitOfWork.StudentRepository.ScoreHigherThanByDepartment(60, counselor.Department)
                }
            };
            model.ScoreBandCount.Failed = await unitOfWork.StudentRepository.SizeByDepartment(counselor.Department) - model.ScoreBandCount.HigherThan60;
            return Json(model);
        }
    }
}