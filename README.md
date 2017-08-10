#  东南大学·校史知识竞赛答题系统

### 网站目录结构

| Route    | Description                       |
| -------- | --------------------------------- |
| /        | 主页面，由前端组负责所有内容。可以尝试使用SPA（单页应用）技术。 |
| /wiki    | Wiki文档入口。                         |
| /swagger | 后端API文档入口。                        |

网站地址：https://history-contest.azurewebsites.net

控制台地址：https://history-contest.scm.azurewebsites.net

数据库地址：https://history-contest.database.windows.net

Azure管理中心:https://portal.azure.com

### 配置 & 开发流程

1. **项目Clone到本地后，请先运行`build.bat`, 安装前端（NPM），后端（Nuget）的各种包依赖并生成项目。**
2. 对于后端：在Server文件夹中工作。打开`HistoryContest.sln`，用Visual Studio开发。
3. 对于前端：在Client文件夹中工作。运行`run_server.bat`自动配置、运行服务端程序于本地。
   Development环境下，前端文件的更改会被自动更新，无需运行`webpack_build.bat`重新打包。
   推荐使用[Visual Studio Code](https://code.visualstudio.com/)开发。
4. 对于wiki：所有页面都通过Wiki文件夹里的Markdown文件生成。在本地写好md后提交到github远程库上，便可在网站上看到实时更新。
   因此，这是一个共享工作状态与文档的地方，请尽量将自己的进度、项目新增/改动的结构，自己的文档与心得放在Wiki上。
5. 使用Github：每次开发前最好都检查一下自己与远程库是否有版本差距，但也不是一定要pull下来。可以善用github的issue。
6. 网站服务器使用Azure。服务器使用了**自动部署功能**，与此Github仓库相关联。每当此仓库有新版本时，服务器都会自动将更新抓取过来，重新部署，反馈在网页上。
   因此，我们在本地开发、测试好后，直接将更新push到Github即可，无需考虑其他东西。

### 使用组件

**Note**:请将后续的所有新增组件添加在这里，并附上一个易于学习的网址=v=

* 后端

  1. [ASP.NET Core MVC](https://docs.microsoft.com/en-us/aspnet/core/tutorials/)
     * [Web API](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api)
     * [StaticFiles Middleware](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files)
     * [Routing Middleware](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing)
  2. [Entity Framework Core](https://docs.microsoft.com/zh-cn/ef/core/)
  3. [.NET Core SPA Services](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/)
     * [Server-side Prerendering](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#server-side-prerendering)
     * [Webpack Middleware](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#webpack-dev-middleware)
     * [Hot Module Replacement](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#webpack-hot-module-replacement)
* 前端
  1. [TypeScript](https://www.tslang.cn/docs/home.html)
  2. [Webpack](http://www.jianshu.com/p/42e11515c10f)
  3. [Vue.js](https://cn.vuejs.org/v2/guide/)
* 文档
  1. [Swagger](https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger)
  2. [MDWiki](http://dynalon.github.io/mdwiki/#!quickstart.md)
