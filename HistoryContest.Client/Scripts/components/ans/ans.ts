import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';

var init={'questions':[{'question':'南京高等师范学校继三所师范学校成为我国成立的最早的第四所国立高等师范学校，其中不是这三所学校之一的是：','answers':['武昌高师','北京高师','长沙高师','广州高师'],'correctAnswer':3},
{'question':'江谦认为国家的富强有赖于科学、实业的发达，先后增设了三个专修科，其中哪一个不属于这三科之一？','answers':['农业','工业','商业','教育业'],'correctAnswer':4},
{'question':'下面哪一项不属于郭秉文的“自动主义”？','answers':['学习上的自学和自力研究','思想上的自律和自强','生活上的自立和自理','学术、文化、体育活动的自行组织和主办'],'correctAnswer':2},
{'question':'下面哪一项不是南京高等师范学院办学者的宗旨（南京高等师范学院教育的特色）？','answers':['倡导学生的爱国精神，为国家培养科学人才','调和文理，沟通中西，积极引进国外的先进科学技术','用科学的精神办教育，用科学的方法育才','促进教育、科学的共同发展，促进科学人才的成长和脱颖而出'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1},
{'question':'我是问题','answers':['我是答案','我是选项','我是选项','我是选项'],'correctAnswer':1}],
'TFs':[{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2},
{'question':'三江师范时期的速成科学制是1年。','correctAnswer':2}]


};


	
       
var content = '',
    questionsIteratorIndex,
    answersIteratorIndex;
    
    //生成网页
function set(){
    //生成多选题html
    for (questionsIteratorIndex = 0; questionsIteratorIndex < init.questions.length; questionsIteratorIndex++) {
        content += '<section class="panel"><div class="inner columns" id="q'+(questionsIteratorIndex + 1)+'">'//题目id，为网页内链接表示（实现按钮跳转到下一题）
        +'<div class="intro joined"><h1>'+(questionsIteratorIndex + 1)+'</h1></div>'//网页上显示的题目序号
        +'<div class="span-3-25"><h3 class="major">'+ init.questions[questionsIteratorIndex].question+'</h3>';//问题内容
        for (answersIteratorIndex = 0; answersIteratorIndex < 4; answersIteratorIndex++) {//四个选项
            content += '<div class="field quarter"><input type="radio"'
            +' id="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)//选项id，该id名称应与后端协商确定，与提交表单有关
            +'" value="'+answersIteratorIndex
            +'" onclick="saveAns(this)"'
            +'" name="question'+(questionsIteratorIndex + 1)+'" class="color2" />'//单选radio的name，同上
            +'<label for="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)+'">'//同上 关于for属性可以参见参考文档
            +init.questions[questionsIteratorIndex].answers[answersIteratorIndex] +'</label></div><br>';//选项内容
        }
        content += '</div>';
    //    if(questionsIteratorIndex+1!= init.questions.length){
            content += '<div class="intro  joined"><ul class="actions"><li><a href="#q'+(questionsIteratorIndex + 2)+'" class="button  color1 circle icon fa-angle-right">Next</a></li></ul></div></div></section>';        
            content+='<section class="panel spotlight large right" ><div class="image  tinted" data-position="top left"><img src="images/background'+(questionsIteratorIndex%9)+'.jpg" alt="" /></div></section>'
    //    }
    }

    //生成判断题html
     for (; questionsIteratorIndex < init.questions.length+init.TFs.length; questionsIteratorIndex++) {//延续之前的索引
        content += '<section class="panel"><div class="inner columns" id="q'+(questionsIteratorIndex + 1)+'">'
        +'<div class="intro joined"><h1>'+(questionsIteratorIndex + 1)+'</h1></div>'
        +'<div class="span-3-25"><h3 class="major">'+ init.questions[questionsIteratorIndex-init.TFs.length].question+'</h3>';
        for (answersIteratorIndex = 0; answersIteratorIndex < 2; answersIteratorIndex++) {//两个选项
            content += '<div class="field quarter"><input type="radio" id="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)
            +'" value="'+answersIteratorIndex
            +'" onclick="saveAns(this)"'
            +'" name="question'+(questionsIteratorIndex + 1)+'" class="color2" />'
            +'<label for="choice'+(questionsIteratorIndex + 1)+(answersIteratorIndex+1)+'">'
            +(answersIteratorIndex==0?'正确':'错误') +'</label></div><br>';//判断题，选项为正确或错误
        }
        content += '</div>';
        if(questionsIteratorIndex+1!= init.questions.length+init.TFs.length){//如果是最后一题，那么不需要有下一页按钮
            content += '<div class="intro  joined"><ul class="actions"><li><a href="#q'+(questionsIteratorIndex + 2)+'" class="button  color1 circle icon fa-angle-right">Next</a></li></ul></div></div></section>'; 
               
        content+='<section class="panel spotlight large right" ><div class="image  tinted" data-position="top left"><img src="images/background'+(questionsIteratorIndex %9)+'.jpg" alt="" /></div></section>'
        }
        else{
             content += '<div class="intro  joined"><ul class="actions"><li><a href="#submission" class="button  color1 circle icon fa-angle-right">Next</a></li></ul></div></div></section>'; 
        }
        
    }
    $('#quiz-container').append(content);//生成html
    $('#multiple-sum').text(init.questions.length); //欢迎页显示选择题数量
    $('#TF-sum').text(init.TFs.length);     //判断题数量
}

var contentFooter='';
function answerCard(){
    
    for(var i=0;i<init.questions.length+init.TFs.length;i++){
        contentFooter +='<a href="#q'+(i+1)+'" id="question'+(i+1)+'" class="questionId">'+(i+1)+"</a>";
        
    }
    $("#answerCard").html(contentFooter);
}

$(function(){
    set();//初始化
    answerCard();

}
)



export default class AppComponent extends Vue {
}
