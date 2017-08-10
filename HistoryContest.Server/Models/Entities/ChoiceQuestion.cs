using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.Entities
{
    public class ChoiceQuestion : AQuestionBase
    {
        string ChoiceA { get; set; }
        string ChoiceB { get; set; }
        string ChoiceC { get; set; }
        string ChoiceD { get; set; }

        public ChoiceQuestion()
        {
            Points = 4;
        }
    }
}
