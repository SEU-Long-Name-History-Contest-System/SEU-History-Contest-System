# yhy

## 7.11-14

  - 了解HTML/CSS以及jQuery,JS的基本语法与运用

------

## 7.21-25

  - 学习C#的基本语法以及特性
  - 项目结构初步学习，暂时还未推进进度

------

## 8.4-8

  

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

## 8.13-14

* 学习了git 若干指令的用法.....

* 部分API方法

  StudentController/Delete/id

  CounselorController/Delete/id

* 文档:

  应用启动、中间件、使用静态文件、路由、依赖注入 、会话和应用状态

  ​



## 8.15

API功能实现:

* StudentController
* CounselorController
* QuestionController(except GetQuestionSet)

## 8.16

改动若干：

* ChoiceQuestion.cs 中属性改为public(访问),便于生成返回前端的Model
* 注释CounselorController和StudentController中的Post和Put
* 新增ChoiceQuestionView，TrueFalseQuestionView，QuestionSetView

API实现

* api/Result/GetResult  json返回值  一个得分数组 int[30]

* api/Result/Answer json返回值 当前用户对应问题SEED的答案序列 byte[30]

  其中0-19选择{0,1,2,3}  20-29判断{0,1}

* api/Result/Answer/ID json返回值 对应ID问题的Answer （一个Byte值）

* api/Result/CountScore/?    byte[] answer作为参数传入答案  

  json返回值为一个总得分

  设置当前用户的State｛修改Choices｝

* api/Question/GetQuestionSet 返回当前用户的问题集 json格式见 LYH的log

* api/Question/GetQuestionById 返回对应ID的任务  json格式 同LYH的log

  * api/Question/Put 重新随机当前用户种子?  unsolved  重新生成？

* api/Question/DeleteSeed 删除当前用户的问题种子


关于Student和Counselor中的Action还尚待补充



## 8.17

* 改动

  * Counselor的Department非空

* API改动补充

  * api/Student/GetAll json返回的是所有学生的得分情况数组  数组元素为一个对象

    ScoreOfAStudent：{

    'ID':09016435,

    'Name':‘杨航源’,

    'Score':60,

    'DepartmentID':090

    }

  * api/Counselor/ScoreSummary/{departmentid}json返回的是对应departmentid的学生的得分情况数组 元素格式 同上

。。。。。。

## 8.18

* 晨：
* api/Counselor/Getundo 返回当前辅导员院系未完成的学生名单



​	[{"ID":09016435,"Name":杨航源,CardID:213161269},      {"ID":09016423,"Name":陈启宣,CardID:213161299}] 

* api/Counselor/ScoreSummary 辅导员登录状态下      返回院系学生成绩

  ​

  [{"ID":09016435,"Name":杨航源,"Score":60,CardID:213161269},{"ID":09016423,"Name":陈启宣,"Score":100,CardID:213161299}] 

* api/Question/GetQuestionSet 返回当前学生对应题集

  ​

  {
    'CQs':[
  ​    {'Question':'南京高等师范学校继三所师范学校成为我国成立的最早的第四所国立高等师范学校，其中不是这三所学校之一的是：',
  ​     'Choices':['武昌高师','北京高师','长沙高师','广州高师'],
  ​     'Answer':2},
  ​    {'Question':'江谦认为国家的富强有赖于科学、实业的发达，先后增设了三个专修科，其中哪一个不属于这三科之一？',
  ​     'Choices':['农业','工业','商业','教育业'],
  ​     'Answer':3},
  ​    {'Question':'下面哪一项不属于郭秉文的“自动主义”？',
  ​     'Choices':['学习上的自学和自力研究','思想上的自律和自强','生活上的自立和自理','学术、文化、体育活动的自行组织和主办'],
  ​     'Answer':1},
  ​    {'Question':'下面哪一项不是南京高等师范学院办学者的宗旨（南京高等师范学院教育的特色）？',
  ​     'Choices':['倡导学生的爱国精神，为国家培养科学人才','调和文理，沟通中西，积极引进国外的先进科学技术','用科学的精神办教育，用科学的方法育才','促进教育、科学的共同发展，促进科学人才的成长和脱颖而出'],
  ​     'Answer':0}],

  ​

    'TFQs':[ {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

   {'Question':'三江师范时期的速成科学制是1年。','Answer':1},

  {'Question':'三江师范时期的速成科学制是1年。','Answer':1}]

  }

  //注：选择答案0A 1B 2C 3D 判断题0正确  1错误

* api/Result/CountScore 传入得分(完成交卷),答题详情  **ID  0~29**

  [{'ID':0,'answer':0},{'ID':1,'answer':0},{'ID':2,'answer':0},{'ID':3,'answer':0},{'ID':4,'answer':0},{'ID':5,'answer':0},{'ID':6,'answer':0},{'ID':7,'answer':0},{'ID':8,'answer':0},{'ID':9,'answer':0},{'ID':10,'answer':0},{'ID':11,'answer':0},{'ID':12,'answer':0},{'ID':13,'answer':0},{'ID':14,'answer':0},{'ID':15,'answer':0},{'ID':16,'answer':0},{'ID':17,'answer':0},{'ID':18,'answer':0},{'ID':19,'answer':0},{'ID':20,'answer':0},{'ID':21,'answer':0},{'ID':22,'answer':0},{'ID':23,'answer':0},{'ID':24,'answer':0},{'ID':25,'answer':0},{'ID':26,'answer':0},{'ID':27,'answer':0},{'ID':28,'answer':0},{'ID':29,'answer':0}]

  返回得分细节[3]

  ​

  {

  ​     'score':80

  ​     'details':{

  ​	{'ID':0,'rightAnswer':1,'submittedAnswer':1,'isCorrect':true},

  ​        {'ID':1,'rightAnswer':1,'submittedAnswer':0,'isCorrect':false},

  ​        {'ID':2,'rightAnswer':1,'submittedAnswer':2,'isCorrect':false},

  ​        ............

  ​     }

  }

* api/Student/GetResult 学生登陆时返回得分细节 无参数

  得分细节格式同上

* api/Counselor/GetResult 辅导员登陆时返回学生得分细节   传入学生学号(ID)参数

  得分细节格式同上

  ​

* 移除QuestionSet返回问题中的所有Answer

* api/Result/ScoreProfile 无参数 辅导员登陆时获取院系得分整体概况

  {

  ​	'above90':37,

  ​	'between7590':64,

  ​	'between6075':53,

  ​	'below60':27,

  ​	‘average’:78.123,

  ​	'done':181,

  ​	'undone':29

  }

* api/Counselor/GetName 获取当前辅导员姓名