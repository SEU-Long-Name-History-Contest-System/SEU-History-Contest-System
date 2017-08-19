using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace HistoryContest.Server.Data.Migrations
{
    public partial class WebAPIRelease : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administrators",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrators", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Counselors",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Department = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Counselors", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Answer = table.Column<byte>(type: "tinyint", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChoiceA = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChoiceB = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChoiceC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChoiceD = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "QuestionSeeds",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    QuestionIDs = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionSeeds", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    CardID = table.Column<int>(type: "int", nullable: false),
                    CounselorID = table.Column<int>(type: "int", nullable: false),
                    DateTimeFinished = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuestionSeedID = table.Column<int>(type: "int", nullable: true),
                    Score = table.Column<int>(type: "int", nullable: true),
                    State = table.Column<long>(type: "bigint", nullable: true),
                    TimeConsumed = table.Column<TimeSpan>(type: "time", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Students_Counselors_CounselorID",
                        column: x => x.CounselorID,
                        principalTable: "Counselors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Students_QuestionSeeds_QuestionSeedID",
                        column: x => x.QuestionSeedID,
                        principalTable: "QuestionSeeds",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Counselors_Department",
                table: "Counselors",
                column: "Department");

            migrationBuilder.CreateIndex(
                name: "IX_Students_CounselorID",
                table: "Students",
                column: "CounselorID");

            migrationBuilder.CreateIndex(
                name: "IX_Students_QuestionSeedID",
                table: "Students",
                column: "QuestionSeedID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administrators");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Counselors");

            migrationBuilder.DropTable(
                name: "QuestionSeeds");
        }
    }
}
