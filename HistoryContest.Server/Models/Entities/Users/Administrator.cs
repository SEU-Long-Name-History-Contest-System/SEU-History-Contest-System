using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HistoryContest.Server.Services;

namespace HistoryContest.Server.Models.Entities
{
    public class Administrator : IUserBase
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }

        public string Password
        {
            set
            {
                Salt = EncryptionService.CreateSalt();
                HashedPassword = EncryptionService.EncryptPassword(value, Salt);
            }
        }

        public bool CheckPassword(string password)
        {
            return EncryptionService.EncryptPassword(password, Salt) == HashedPassword;
        }
    }
}
