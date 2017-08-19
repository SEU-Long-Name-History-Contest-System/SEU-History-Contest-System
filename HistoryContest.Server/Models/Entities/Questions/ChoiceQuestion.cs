using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.Entities
{
    public class ChoiceQuestion : AQuestionBase
    {
        public string ChoiceA { get; set; }
        public string ChoiceB { get; set; }
        public string ChoiceC { get; set; }
        public string ChoiceD { get; set; }

        public ChoiceQuestion()
        {
            Points = 4;
        }

        public string[] AllChoices
        {
            get { return new string[] { ChoiceA, ChoiceB, ChoiceC, ChoiceD }; }
        }
    }
}
