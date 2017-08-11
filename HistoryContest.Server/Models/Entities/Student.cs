using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HistoryContest.Server.Models.Entities
{
    // Entity Framework interprets a property as a foreign key property if it's named <navigation property name><primary key property name>
    public class Student : IEntityBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)] // ID为学生学号，而不是由数据库自动生成
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public int CardID { get; set; }
        public Int64? State { get; set; }
        //public TimeSpan TimeLeft { get; set; }

        // Foreign Keys
        public int CounselorID { get; set; } 
        public int? QuestionSeedID { get; set; }

        // navigation properties
        public Counselor Counselor { get; set; } 
        public QuestionSeed QuestionSeed { get; set; }

        public bool IsTested
        {
            get { return State != null;  }
        }

        [NotMapped]
        public byte[] Choices
        {
            get
            {
                if (State == null)
                    return null;

                byte[] choices = new byte[30];
                for (int i = 0; i < 20; ++i)
                {
                    choices[i] = (byte)((State >> 2 * i) & 0b11);
                }
                for(int i = 0; i < 10; ++i)
                {
                    choices[i] = (byte)((State >> 40 + i) & 0b1);
                }
                return choices;
            }
            set
            {
                if (State == null)
                    State = 0L;

                for (int i = 0; i < 20; ++i)
                {
                    State |= (Int64)value[i] << 2 * i; 
                }
                for(int i = 0; i < 10; ++i)
                {
                    State |= (Int64)value[i] << i + 40;
                }
            }
        }
    }
}
