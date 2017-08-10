using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.Entities
{
    public class TrueFalseQuestion : AQuestionBase
    {
        // 似乎不需要添加什么特殊属性……

        public TrueFalseQuestion()
        {
            Points = 2;
        }
    }
}
