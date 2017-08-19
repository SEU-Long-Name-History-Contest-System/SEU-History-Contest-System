using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.ViewModels
{
    public class ResultDetailViewModel
    {
        public int ID { get; set; }
        public int RightAnswer { get; set; }
        public int SubmittedAnswer { get; set; }
    }

    public class ResultViewModel
    {
        public double Score { get; set; }
        public DateTime TimeFinished { get; set; }
        public TimeSpan TimeConsumed { get; set; }
        public List<ResultDetailViewModel> Details { get; set; }
    }
}
