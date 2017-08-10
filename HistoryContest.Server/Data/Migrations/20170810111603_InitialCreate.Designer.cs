using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using HistoryContest.Server.Data;

namespace HistoryContest.Server.Data.Migrations
{
    [DbContext(typeof(ContestContext))]
    [Migration("20170810111603_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HistoryContest.Server.Models.Entities.AQuestionBase", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<byte>("Answer");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<int>("Points");

                    b.Property<string>("Question");

                    b.HasKey("ID");

                    b.ToTable("Questions");

                    b.HasDiscriminator<string>("Discriminator").HasValue("AQuestionBase");
                });

            modelBuilder.Entity("HistoryContest.Server.Models.Entities.Counselor", b =>
                {
                    b.Property<int>("ID");

                    b.Property<int?>("Department");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Counselors");
                });

            modelBuilder.Entity("HistoryContest.Server.Models.Entities.QuestionSeed", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("_questionIDs")
                        .IsRequired()
                        .HasColumnName("QuestionIDs");

                    b.HasKey("ID");

                    b.ToTable("QuestionSeeds");
                });

            modelBuilder.Entity("HistoryContest.Server.Models.Entities.Student", b =>
                {
                    b.Property<int>("ID");

                    b.Property<int>("CardID");

                    b.Property<int>("CounselorID");

                    b.Property<string>("Name");

                    b.Property<int?>("QuestionSeedID");

                    b.Property<long?>("State");

                    b.HasKey("ID");

                    b.HasIndex("CounselorID");

                    b.HasIndex("QuestionSeedID");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("HistoryContest.Server.Models.Entities.ChoiceQuestion", b =>
                {
                    b.HasBaseType("HistoryContest.Server.Models.Entities.AQuestionBase");


                    b.ToTable("Questions");

                    b.HasDiscriminator().HasValue("ChoiceQuestion");
                });

            modelBuilder.Entity("HistoryContest.Server.Models.Entities.TrueFalseQuestion", b =>
                {
                    b.HasBaseType("HistoryContest.Server.Models.Entities.AQuestionBase");


                    b.ToTable("Questions");

                    b.HasDiscriminator().HasValue("TrueFalseQuestion");
                });

            modelBuilder.Entity("HistoryContest.Server.Models.Entities.Student", b =>
                {
                    b.HasOne("HistoryContest.Server.Models.Entities.Counselor", "Counselor")
                        .WithMany("Students")
                        .HasForeignKey("CounselorID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HistoryContest.Server.Models.Entities.QuestionSeed", "QuestionSeed")
                        .WithMany()
                        .HasForeignKey("QuestionSeedID");
                });
        }
    }
}
