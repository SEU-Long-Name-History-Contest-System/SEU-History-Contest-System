using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HistoryContest.Server.Services;
using HistoryContest.Server.Models;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Data
{
    public static class DbInitializer
    {
        /// <summary>
        /// Seed Test Data
        /// </summary>
        public static void Initialize(ContestContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Students.Any())
            {
                return;   // DB has been seeded
            }

            var students = new Student[]
            {
                new Student { ID = 09016319, Name = "叶志浩", CardID = 213162022, CounselorID = 1 },
                new Student { ID = 09016407, Name = "胡黛琳", CardID = 213160842, CounselorID = 1 },
                new Student { ID = 09016435, Name = "杨航源", CardID = 213161269, CounselorID = 1 }
            };
            foreach (var s in students)
            {
                context.Students.Add(s);
            }

            var counselors = new Counselor[]
            {
                new Counselor { ID = 1, Name = "郭佳", Department = Department.CS, PhoneNumber = 123456789 }
            };
            foreach (var c in counselors)
            {
                context.Counselors.Add(c);
            }

            var administrators = new Administrator[]
            {
                new Administrator{ UserName = "vigilans", Name = "叶志浩", Email = "vigilans@foxmail.com", Password = "19970821" }
            };
            foreach (var a in administrators)
            {
                context.Administrators.Add(a);
            }

            context.SaveChanges();
        }
    }
}
