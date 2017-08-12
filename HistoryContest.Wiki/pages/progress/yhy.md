# yhy

## 7.11-14

  - 了解HTML/CSS以及jQuery,JS的基本语法与运用

------

## 7.21-25

  - 学习C#的基本语法以及特性
  - 项目结构初步学习，暂时还未推进进度

------

## 8.4-8

  ​

  - C#反射,属性,索引器,委托,事件,*集合,泛型（类似函数指针）.......
  - [官方文档](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/)学习部分：

  1. [Adding a controller](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-controller)

     - MVC默认URL路由逻辑/[Controller]/[ActionName]/[Parameters]，路由格式在*Startup.cs*文件中设置

     - 两种访问格式示例:

       /HelloWorld/Welcome?name=Rick&numtimes=4 

       /HelloWorld/Welcome/4?name=Rick

  2. [Adding a view](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-view)

     - **数据从控制器传到视图由ViewData实现，ViewData是字典对象**

  3. [Adding a model](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model)

     - **控制器的构造函数通过**依赖注入来插入数据库context，解耦

       例：

       ```javascript
       public MoviesController(MvcMovieContext context)

           {

               _context = context;

           }
       ```

     - 表达式Lamda 语句Lamda   asnyc  await

     - strongly typed object

       @model IEnumerable<模型名称>

       每个item都会被键入Model

  4. [Working with SQL Server LocalDB](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/working-with-sql)

     - 种子初始化器Models的新类

       在Startup.cs中添加SeedData.Initialize(app.ApplicationServices);

  5. [Controller methods and views](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/controller-methods-views)

     - 新操作：**快速操作和重构，简化using**
     - [Bind]用于防止over-posting
     - [HttpGet]是控制器方法默认特性   [HttpPost]非默认
     - [ValidateAntiForgeryToken]特性用于防止伪造请求，与并与编辑视图文件生成的防伪令对应
     - 关于如何处理Post请求

计划部分：

8.9

 1. [ASP.NET Web API Help Pages using Swagger](https://docs.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger)
 2. [Creating backend services for native mobile applications](https://docs.microsoft.com/en-us/aspnet/core/mobile/native-mobile-backend)
 3. 尝试编写SEUHistoryContest相关API

   1. **系统API的开发**

   ##### 补充：

   1. [Adding Search](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/search)
   2. [Adding a New Field](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/new-field)
   3. [Adding Validation](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/validation)

******

## 8.11-12

* 对API小幅修改，读懂API写法，有很多知识细节还不清楚

* 补文档：

* MVC：

  1.  模型绑定(至自定义验证)

  2. 控制器

  3. 添加搜索

     IQueryable与IList的区别https://zhidao.baidu.com/question/276062888.html

     ToListAsync()与await一起使用，用于提升性能

  4. 添加新字段

  5. 添加验证

     RedirectToAction("Index")调用其他方法

  6. 检查细节和删除方法

     SingleOrDefaultAsync可以提升搜索的性能-异步

* yzh写好的api框架

  question/id GET 根据学号对应的种子 返回种子数组对应id索引上的问题

  （某种请求，比如PUT） 为当前用户新更新一套题目（重新roll一个种子）

  question/ DELETE 删除当前用户的SEED
   result/ GET 如果当前用户已答题 则返回得分情况 否则返回RedirectResult重定向到答题页
   result/answer GET 返回当前学号对应seed对应的所有问题答案
   result/answer/{questionid} 取回question的主键ID对应问题的答案注意如果没有seed时 返回错误信息
   result/ POST POST的是一个数组 里面有问题id+选项    返回的是得分情况
   api/student/status
   student/time  GET 返回当前剩余时间 POST(CREATE?) 设置答题开始时间 
   counselor/scoreSummray/{departmentid}根据院系id获取院系得分概况
   counselor/allScores/{departmentid}获取院系所有学生得分概况
   student/information counselor/information
   student/refresh 刷新状态                  

* 部分API及Repository的实现\修改

  Student添加Score属性存储每个学生的得分(State修改时进行计算)

  StudentRepository功能实现

  * 改为context依赖注入
  * department参数类型改为Department

  QuestionController/GetQuestionById

  * 找不到对应问题则返回NONE？？待补充​​

  StudentController/Delete/id 删除相应学号学生

  ?CounselorController/Get类型不明
