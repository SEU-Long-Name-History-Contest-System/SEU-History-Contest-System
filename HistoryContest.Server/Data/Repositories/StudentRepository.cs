using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Data.Repositories
{
    public class StudentRepository : GenericRepository<Student>
    {
        internal ContestContext _context;

        public StudentRepository(ContestContext context) : base(context)
        {
            _context = context;
        }

        IEnumerable<Student> GetByDepartment(Department departmentID)
        {
            var Students = from m in _context.Students
                           select m;
            Students = Students.Where(m => m.Counselor.Department==departmentID);
            return new List<Student>(Students);
        }

        public double AverageScore()
        {
            var Students = _context.Students.Where(m => m.IsTested);
            int total = 0, sum = 0;
            foreach(Student m in Students)
            {
                    sum++;
                    total += m.Score;
            }
            double average = (double)total / sum;
            return average;
        }

        public double HighestScore()
        {
            var Students = _context.Students.Where(m => m.IsTested);
            int maximum = 0;
            foreach (Student m in Students)
                if (maximum<m.Score)
                {
                    maximum = m.Score;
                }
            return maximum;
        }

        public int ScoreHigherThan(double bandScore)
        {
            var Students = _context.Students.Where(m => m.IsTested);
            int num = Students.Count(m => m.Score>=bandScore);
            return num;
        }

        public double AverageScoreByDepartment(Department departmentID)
        {
            var Students = _context.Students.Where(m => (m.IsTested&&m.Counselor.Department==departmentID));
            int total = 0, sum = 0;
            foreach (Student m in Students)
            {
                sum++;
                total += m.Score;
            }
            double average = (double)total / sum;
            return average;
        }

        public double HighestScoreByDepartment(Department departmentID)
        {
            var Students = _context.Students.Where(m => (m.IsTested && m.Counselor.Department == departmentID));
            int maximum = 0;
            foreach (Student m in Students)
                if (maximum < m.Score)
                {
                    maximum = m.Score;
                }
            return maximum;
        }

        int ScoreHigherThanByDepartment(double bandScore, Department departmentID)
        {
            var Students = _context.Students.Where(m => (m.IsTested && m.Counselor.Department == departmentID));
            int num = Students.Count(m => m.Score >= bandScore);
            return num;
        }
    }
}
