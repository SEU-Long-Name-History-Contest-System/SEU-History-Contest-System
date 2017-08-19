using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HistoryContest.Server.Models;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Data.Repositories
{
    public class StudentRepository : GenericRepository<Student>
    {
        internal DbSet<Counselor> counselorSet;

        public StudentRepository(ContestContext context) : base(context)
        {
            counselorSet = context.Set<Counselor>();
        }

        public void LoadStudentsFromCounselors()
        {
            counselorSet.Include(c => c.Students);
            //counselorSet.Load();
        }

        public async Task<ICollection<Student>> GetByDepartment(Department departmentID)
        {
            var a = (await counselorSet.FirstOrDefaultAsync(c => c.Department == departmentID));
            return a.Students;
        }

        public async Task<int> SizeByDepartment(Department departmentID)
        {
            return (await GetByDepartment(departmentID)).Count;
        }

        public async Task<double> AverageScore()
        {
            return await dbSet.Select(s => (int)s.Score).AverageAsync();
        }

        public async Task<int> HighestScore()
        {
            return await dbSet.Select(s => (int)s.Score).MaxAsync();
        }

        public async Task<int> ScoreHigherThan(double bandScore)
        {
            return await dbSet.CountAsync(s => s.IsTested && s.Score >= bandScore);
        }

        public async Task<double> AverageScoreByDepartment(Department departmentID)
        {
            return await (await GetByDepartment(departmentID)).AsQueryable().Select(s => (int)s.Score).AverageAsync();
        }

        public async Task<int> HighestScoreByDepartment(Department departmentID)
        {
            return await (await GetByDepartment(departmentID)).AsQueryable().Select(s => (int)s.Score).MaxAsync();
        }

        public async Task<int> ScoreHigherThanByDepartment(double bandScore, Department departmentID)
        {
            return await(await GetByDepartment(departmentID)).AsQueryable().CountAsync(s => s.IsTested && s.Score >= bandScore);
        }
    }
}
