using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using HistoryContest.Server.Data;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Models.ViewModels;

namespace HistoryContest.Server.Services
{
    public class AccountContext
    {
        public UserViewModel User { get; set; }
        public IEnumerable<Claim> Claims { get; set; }
    }

    public class AccountService
    {
        private UnitOfWork unitOfWork;

        public AccountService(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<AccountContext> ValidateUser(string userName, string password)
        {
            UserViewModel userViewModel = null;
            var userClaims = new List<Claim>();

            /*下面的方法重复写是为了看得清楚，若种类变多的话，可改为泛型*/

            IUserBase user;
            if(false && (user = await GetUser<Administrator>(userName))!= null && user.CheckPassword(password))
            { // Check Administrators
                userViewModel = new UserViewModel { UserName = userName, RealName = user.Name, Role = "Administrator" };
                userClaims.Add(new Claim(ClaimTypes.Role, userViewModel.Role));
            }
            else if ((user = await GetUser<Counselor>(userName)) != null && user.CheckPassword(password))
            { // Check Counselors
                userViewModel = new UserViewModel { UserName = userName, RealName = user.Name, Role = "Counselor" };
                userClaims.Add(new Claim(ClaimTypes.Role, userViewModel.Role));
            }
            else if ((user = await GetUser<Student>(userName)) != null && user.CheckPassword(password))
            { // Check Students
                userViewModel = new UserViewModel { UserName = userName, RealName = user.Name, Role = "Student" };
                userClaims.Add(new Claim(ClaimTypes.Role, userViewModel.Role));
            }

            if (userViewModel != null) 
            {
                userClaims.AddRange(new List<Claim>
                {
                    new Claim("displayName", userViewModel.RealName),
                    new Claim("username", userViewModel.UserName)
                });
            }

            return new AccountContext { User = userViewModel, Claims = userClaims };
        }

        public UserViewModel CreateUser(string username, string password, string role)
        {

            return new UserViewModel();
        }

        public async Task<IUserBase> GetUser<TUser>(string userName) where TUser : class, IUserBase
        {
            if(typeof(TUser) == typeof(Administrator))
            {
                return await unitOfWork.context.Set<Administrator>().FirstOrDefaultAsync(user => user.UserName == userName);
            }
            else if (typeof(TUser) == typeof(Student) || typeof(TUser) == typeof(Counselor))
            {
                return await unitOfWork.context.Set<TUser>().FindAsync(int.Parse(userName));
            }
            throw new ArgumentException();
        }
    }
}
