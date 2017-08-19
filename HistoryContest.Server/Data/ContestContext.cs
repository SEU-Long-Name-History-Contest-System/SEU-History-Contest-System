using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HistoryContest.Server.Models.Entities;

namespace HistoryContest.Server.Data
{
    public class ContestContext : DbContext
    {
        public ContestContext(DbContextOptions<ContestContext> options) : base(options)
        {

        }

        // TODO: 修复administrator object已存在与不能读取related data的bug
        #region Entity Sets
        public DbSet<Student> Students { get; set; }
        public DbSet<Counselor> Counselors { get; set; }
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<ChoiceQuestion> ChoiceQuestions { get; set; }
        public DbSet<TrueFalseQuestion> TrueFalseQuestions { get; set; }
        public DbSet<AQuestionBase> Questions { get; set; }
        public DbSet<QuestionSeed> QuestionSeeds { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuestionSeed>()
                .Property(s => s._questionIDs).HasColumnName("QuestionIDs");

            modelBuilder.Entity<Counselor>()
                .HasIndex(c => c.Department);
        }
    }
}
