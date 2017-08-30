using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HistoryContest.Server.Models.Entities;
using HistoryContest.Server.Data;
using Newtonsoft.Json;

namespace HistoryContest.Server.Services
{
    public class DocParseService
    {
        public const string QuestionSqlFilePattern = @"\('(.*?)', '(.*?)', '(.*?)', '(.*?)', '(.*?)', '(.*?)', '(.*?)'\)";

        public static string[] ParseQuestions(string path, string pattern)
        {
            var choiceQuestions = new List<ChoiceQuestion>();
            var trueFalseQuestions = new List<TrueFalseQuestion>();

            using (StreamReader sr = new StreamReader(path))
            {
                Console.Write("Processing...Parsed ");
                var entries = sr.ReadToEnd().Split('\n');
                for (int i = 0; i < entries.Length; ++i)
                {
                    var progress = string.Format("{0}/{1}", i + 1, entries.Length);
                    Console.Write(progress);

                    string entry = entries[i];
                    // 匹配项这样写是为了及时判断题型以及根据位置分别处理内容
                    var match = Regex.Match(entry, pattern);

                    // ID是不需要记录的，在添加进数据库时自动生成
                    string question = match.Groups[2].Value;
                    byte answer = (byte)(char.Parse(match.Groups[3].Value) - 'a');

                    if (match.Groups.Last().Value != "")
                    { // 选择题
                        choiceQuestions.Add(new ChoiceQuestion { Question = question, Answer = answer, AllChoices = match.Groups.Skip(4).Select(g => g.Value).ToArray() });
                    }
                    else
                    { // 判断题
                        trueFalseQuestions.Add(new TrueFalseQuestion { Question = question, Answer = answer });
                    }

                    Console.Write(new string('\b', progress.Length));
                }
            }

            string choiceSeedPath = ContestContext.GetSeedPath<ChoiceQuestion>();
            string trueFalseSeedPath = ContestContext.GetSeedPath<TrueFalseQuestion>();

            Console.WriteLine("\nSerializing to json file...");

            File.WriteAllText(choiceSeedPath, JsonConvert.SerializeObject(choiceQuestions, Formatting.Indented));
            File.WriteAllText(trueFalseSeedPath, JsonConvert.SerializeObject(trueFalseQuestions, Formatting.Indented));

            Console.WriteLine("Finished.");
            return new string[] { choiceSeedPath, trueFalseSeedPath };
        }
    }
}