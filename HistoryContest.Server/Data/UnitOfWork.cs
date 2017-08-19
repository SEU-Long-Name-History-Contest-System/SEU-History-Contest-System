using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Data.Repositories;
using System;
using System.Threading.Tasks;

namespace HistoryContest.Server.Data
{
    public class UnitOfWork : IDisposable
    {
        public ContestContext context;
        public StudentRepository StudentRepository { get; set; }
        public GenericRepository<Counselor> CounselorRepository { get; set; }
        public GenericRepository<Administrator> AdminRepository { get; set; }
        public QuestionRepository QuestionRepository { get; set; }
        public GenericRepository<QuestionSeed> QuestionSeedRepository { get; set; }
        
        public UnitOfWork(ContestContext context)
        {
            this.context = context;
            StudentRepository = new StudentRepository(context);
            CounselorRepository = new GenericRepository<Counselor>(context);
            AdminRepository = new GenericRepository<Administrator>(context);
            QuestionRepository = new QuestionRepository(context);
            QuestionSeedRepository = new GenericRepository<QuestionSeed>(context);
        }

        //#region Repository Properties
        //public StudentRepository StudentRepository
        //{
        //    get { return studentRepository ?? (studentRepository = new StudentRepository(context)); }
        //    set { studentRepository = value; }
        //}

        //public GenericRepository<Counselor> CounselorRepository
        //{
        //    get { return counselorRepository ?? (counselorRepository = new GenericRepository<Counselor>(context)); }
        //    set { counselorRepository = value; }
        //}

        //public GenericRepository<Administrator> AdminRepository
        //{
        //    get { return adminRepository ?? (adminRepository = new GenericRepository<Administrator>(context)); }
        //    set { adminRepository = value; }
        //}

        //public QuestionSeedRepository QuestionSeedRepository
        //{
        //    get { return questionSeedRepository ?? (questionSeedRepository = new QuestionSeedRepository(context)); }
        //    set { questionSeedRepository = value; }
        //}
        //#endregion

        public int Save()
        {
            return context.SaveChanges();
        }

        public async Task<int> SaveAsync()
        {
            return await context.SaveChangesAsync();
        }
        
        #region Disposal Setting
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if(!disposed && disposing)
            {
                context.Dispose();
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true); // 调用context的回收方法
            GC.SuppressFinalize(this); // 阻止系统自己回收
        }
        #endregion
    }
}
