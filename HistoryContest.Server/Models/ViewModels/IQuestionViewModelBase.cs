using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.ViewModels
{
    interface IQuestionViewModelBase
    {
        Guid HashKey { get; set; }
    }
}
