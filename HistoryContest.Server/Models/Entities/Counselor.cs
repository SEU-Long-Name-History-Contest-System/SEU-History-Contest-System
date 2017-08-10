using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace HistoryContest.Server.Models.Entities
{
    public class Counselor : IEntityBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }
        public string Name { get; set; }
        public Department? Department { get; set; }

        public ICollection<Student> Students { get; set; }
    }
}
