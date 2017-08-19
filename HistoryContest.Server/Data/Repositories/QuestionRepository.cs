using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Data.Repositories
{
    public class QuestionRepository : GenericRepository<AQuestionBase>
    {
        DbSet<ChoiceQuestion> choiceQuestionSet;
        DbSet<TrueFalseQuestion> trueFalseQuestionSet;

        public QuestionRepository(ContestContext context) : base(context)
        {
            choiceQuestionSet = context.Set<ChoiceQuestion>();
            trueFalseQuestionSet = context.Set<TrueFalseQuestion>();
        }

        public TQuestion GetByID<TQuestion>(object id) where TQuestion : AQuestionBase
        {
            return context.Set<TQuestion>().Find(id);
        }

        public async Task<TQuestion> GetByIDAsync<TQuestion>(object id) where TQuestion : AQuestionBase
        {
            return await context.Set<TQuestion>().FindAsync(id);
        }

        public int Size<TQuestion>() where TQuestion : AQuestionBase
        {
            return context.Set<TQuestion>().Count();
        }

        public async Task<int> SizeAsync<TQuestion>() where TQuestion : AQuestionBase
        {
            return await context.Set<TQuestion>().CountAsync();
        }
    }
}
