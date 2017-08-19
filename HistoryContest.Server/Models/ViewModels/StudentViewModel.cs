using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Models.ViewModels
{
    public class StudentViewModel
    {
        public int StudentID { get; set; }
        public int CardID { get; set; }
        public string Name { get; set; }
        public bool IsCompleted { get; set; }
        public int? Score { get; set; }

        public static explicit operator StudentViewModel(Student student)
        {
            return new StudentViewModel
            {
                StudentID = student.ID,
                CardID = student.CardID,
                Name = student.Name,
                IsCompleted = student.IsTested,
                Score = student.Score
            };
        }
    }
}
