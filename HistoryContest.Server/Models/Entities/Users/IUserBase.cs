using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HistoryContest.Server.Models.Entities
{
    public interface IUserBase : IEntityBase
    {
        string Name { get; set; }
        bool CheckPassword(string password);
    }
}
