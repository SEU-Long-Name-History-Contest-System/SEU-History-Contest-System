using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;


namespace HistoryContest.Server
{
    public class Program
    {
        public static bool FromMain { get; set; } = false;

        public static void Main(string[] args)
        {
            FromMain = true;

            var host = new WebHostBuilder()
                .UseKestrel()
#if DEBUG
                .UseContentRoot(Directory.GetParent(Directory.GetCurrentDirectory()).FullName)
#else
                .UseContentRoot(Directory.GetCurrentDirectory())
#endif
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

#if DEBUG
            if (args.Length > 0 && (args[0] == "/runbrowser" || args[0] == "/rb"))
            {
                string url = @"http://localhost:5000";
                Console.WriteLine(@"Starting " + url + " with default browser...");
                System.Diagnostics.Process.Start("explorer", url);
            }
#endif

            host.Run();
        }
    }
}
