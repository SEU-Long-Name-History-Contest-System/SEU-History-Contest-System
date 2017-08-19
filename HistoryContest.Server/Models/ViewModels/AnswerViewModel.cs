using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.ViewModels
{
    public class AnswerViewModel
    {
        public int ID { get; set; }
        public int Answer { get; set; }
        public int? Points { get; set; }
    }
}
