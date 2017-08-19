using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HistoryContest.Server.Data;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Services
{
    public class QuestionSeedService
    {
        private UnitOfWork unitOfWork;
        private Random rdGenerator;

        public QuestionSeedService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            rdGenerator = new Random();
        }

        public async Task<IEnumerable<AQuestionBase>> GetQuestionsBySeedID(int id)
        {
            var seed = await unitOfWork.QuestionSeedRepository.GetByIDAsync(id);
            if (seed == null)
            {
                return null;
            }

            var questionIDs = seed.QuestionIDs;
            var questions = new AQuestionBase[questionIDs.Length];
            for (int i = 0; i < 30; i++)
            {
                questions[i] = await unitOfWork.QuestionRepository.GetByIDAsync(questionIDs[i]);
            }
            return questions;
        }

        public async Task<QuestionSeed> CreateNewSeed()
        { // TODO: 解决随机数重复问题
            var choiceQuestionsSize = await unitOfWork.QuestionRepository.SizeAsync<ChoiceQuestion>();
            var trueFalseQuestionsSize = await unitOfWork.QuestionRepository.SizeAsync<TrueFalseQuestion>();
            var questionIDs = new int[30];
            for (int i = 0; i < 20; i++)
            {
                questionIDs[i] = rdGenerator.Next(0, choiceQuestionsSize);
            }
            for (int i = 20; i < 30; i++)
            {
                questionIDs[i] = rdGenerator.Next(choiceQuestionsSize, choiceQuestionsSize + trueFalseQuestionsSize);
            }
            QuestionSeed newSeed = new QuestionSeed { QuestionIDs = questionIDs };
            newSeed.Save();
            await unitOfWork.QuestionSeedRepository.InsertAsync(newSeed);
            return newSeed;
        }

        public async Task<QuestionSeed> RollSeed()
        {
            return await unitOfWork.QuestionSeedRepository.GetByIDAsync(rdGenerator.Next(0, unitOfWork.QuestionSeedRepository.Size()));
        }

        public void Save()
        {

        }
    }
}
