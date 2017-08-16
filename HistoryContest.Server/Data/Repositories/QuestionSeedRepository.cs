using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Data.Repositories
{
    public class QuestionSeedRepository : GenericRepository<QuestionSeed>
    {

        public QuestionSeedRepository(ContestContext context) : base(context)
        {
            
        }

        public IEnumerable<IEnumerable<AQuestionBase>> GetQuestionsByID(int id)
        {
            return new List<List<AQuestionBase>>();
        }

        public QuestionSeed CreateNewSeed()
        {
            return new QuestionSeed();
        }

        public void Save()
        {
            foreach(var seed in dbSet)
            {
                seed.Save();
            }
        }
    }
}
