using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HistoryContest.Server.Models.Entities
{
    public class QuestionSeed : IEntityBase
    {
        public int ID { get; set; }
        [Required]
        internal string _questionIDs { get; set; }

        private int[] questionIDs;
        [NotMapped]
        public int[] QuestionIDs
        {
            get { return questionIDs ?? (questionIDs = _questionIDs.Split(',').Select(int.Parse).ToArray()); } // 未来或许可以优化的地方（换成for loop）
            set { questionIDs = value; }
        }

        public void Save()
        {
            _questionIDs = String.Join(",", questionIDs.Select(id => id.ToString()).ToArray());
        }
    }
}
