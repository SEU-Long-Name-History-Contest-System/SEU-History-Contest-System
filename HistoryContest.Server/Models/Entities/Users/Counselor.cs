using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HistoryContest.Server.Models.Entities
{
    public class Counselor : IUserBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public string Name { get; set; }
        //[Phone]
        public int PhoneNumber { get; set; }
        public Department? Department { get; set; }

        public ICollection<Student> Students { get; set; }

        public bool CheckPassword(string password)
        {
            return PhoneNumber == int.Parse(password);
        }
    }
}
