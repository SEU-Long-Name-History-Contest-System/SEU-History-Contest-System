using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Models.ViewModels
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string RealName { get; set; }
        public string Role { get; set; }
    }
}
