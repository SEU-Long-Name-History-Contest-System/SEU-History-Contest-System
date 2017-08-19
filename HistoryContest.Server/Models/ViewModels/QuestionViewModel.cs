using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Models.ViewModels
{
    public enum QuestionType
    {
        Choice,
        TrueFalse
    }

    public class QuestionViewModel
    {
        public int ID { get; set; }
        public QuestionType Type { get; set; }
        public string Question { get; set; }
        public string[] Choices { get; set; } // string本身为nullable类型，故不用加上"?"

        public static explicit operator QuestionViewModel(AQuestionBase question)
        { // 类型转换操作符
            var type = GetQuestionType(question);
            return new QuestionViewModel
            {
                ID = question.ID,
                Question = question.Question,
                Type = type,
                Choices = type == QuestionType.Choice ? ((ChoiceQuestion)question).AllChoices : null
            };
        }

        public static QuestionType GetQuestionType(AQuestionBase question)
        {
            var type = question.GetType();
            if (type == typeof(ChoiceQuestion))
            {
                return QuestionType.Choice;
            }
            else if (type == typeof(TrueFalseQuestion))
            {
                return QuestionType.TrueFalse;
            }
            else
            { // TODO: 详细定义类型异常
                throw new TypeLoadException();
            }
        }
    }
}
