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
        internal DbSet<Counselor> CounselorSet;

        public StudentRepository(ContestContext context) : base(context)
        {
            CounselorSet = context.Counselors;
        }

        IEnumerable<Student> GetByDepartment(int departmentID)
        {
            return new List<Student>();
        }

        double AverageScore()
        {
            return 60.0;
        }

        double HighestScore()
        {
            return 90.0;
        }

        int ScoreHigherThan(double bandScore)
        {
            return 10;
        }
            
        double AverageScoreByDepartment(int departmentID)
        {
            return 1.0;
        }

        double HighestScoreByDepartment(int departmentID)
        {
            return 1.0;
        }

        int ScoreHigherThanByDepartment(int bandScore, int departmentID)
        {
            return 0;
        }
    }
}
