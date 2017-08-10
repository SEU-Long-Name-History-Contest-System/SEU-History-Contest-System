using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HistoryContest.Server.Models.Entities
{
    [Table("Questions")]
    public abstract class AQuestionBase : IEntityBase 
    {
        public int ID { get; set; }
        public string Question { get; set; }
        public byte Answer { get; set; }
        public int Points { get; set; }
    }
}
