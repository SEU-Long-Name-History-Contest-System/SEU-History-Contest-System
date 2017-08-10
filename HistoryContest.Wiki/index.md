Just Another Dev Wiki
=====
by 这是一个答案提交给隔壁选手的校史系统



## About Wiki
----

### Wiki架构

这个wiki是一个纯客户端应用，由一个html文件渲染生成。

wiki的所有文件存放在码云上，由码云的[pages](http://www.oschina.net/news/73980/gitosc-pages)功能转成一个网站。因此，我们可以用git来管理、修改wiki。

其html文件通过解析[markdown](http://www.jianshu.com/p/1e402922ee32/)的语法，渲染成对应的页面，其中：

1. 每页wiki的正文对应一个md文件，即我们可以用markdown来写wiki的内容；

  `（这个md文件紧紧跟在网址栏上.html后，用#!作为判断及分隔标记）`

2. wiki上的导航栏由与html文件同一目录的`navigation.md`决定。它有另一套解析方法，在这个md文件中有注释说明；

3. 直接进入该html时，该html会寻找同目录下的`index.md`，并将其作为首页解析出来。

  *（如果我们把这个html命名为index.html，那么进入网址对应目录会自动跳转到这个html，因此我们平时在地址栏上并没有看到这个html文件（但是#!还是没有省去））*


关于该wiki语法的详细解释，可以参考官方文档：
[Quick Start - MDWiki](http://dynalon.github.io/mdwiki/#!quickstart.md)
　　

### Wiki意义

* 作为开发时的文档，方便随时查阅，备忘；

* 可以作为其他学习资料或资源堆放与整合的地方；

* 所有内容存放在码云上，可以用来作为git的练手项目；

* 将开发的过程记录下来，方便答辩时整理。

  ​

附：有兴趣的话可以考虑完善一下wiki的架构，以及润色润色内容=v=。


