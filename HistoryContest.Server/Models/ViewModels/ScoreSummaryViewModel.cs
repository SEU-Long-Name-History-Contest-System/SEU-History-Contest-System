using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.ViewModels
{
    public class ScoreBandCountViewModel
    {
        public int HigherThan90 { get; set; }
        public int HigherThan75 { get; set; }
        public int HigherThan60 { get; set; }
        public int Failed { get; set; }
    }

    public class ScoreSummaryViewModel
    {
        public Department? DepartmentID { get; set; }
        public string CounselorName { get; set; }
        public int MaxScore { get; set; }
        public double AverageScore { get; set; }
        public ScoreBandCountViewModel ScoreBandCount { get; set; }
    }
}
