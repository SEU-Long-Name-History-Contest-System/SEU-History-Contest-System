var $ = require("../../../node_modules/jquery/dist/jquery.min.js");
	var answerQues = new Array(30);
	answerQues[0] = "curAns"
	exports.saveAns=function(clickID){
		var ans = clickID.value;
		var id=clickID;
		var ID = (id.length == 8 ? parseInt(id[6]) : parseInt(id[6])*10+parseInt(id[7]));
		var testing;
		var ans = parseInt(id[id.length-1])-1;
		var check ={};						
		check.ID=ID;
		check.answer=ans;
		//answerQues.push(check);//用push方法传入数组
		answerQues[ID-1] = check;
		testing=JSON.stringify(answerQues);
		console.log(testing);
		$("#question"+ID).addClass("answered");
		setTimeout(function(){
			$("#question"+ID).click();
		},300);
	}
	exports.submit=function(){
		var tot = 0;
		for(var i = 0; i<30; i++)
			if(answerQues[i] == null) tot++;
		if(tot!=0)
			alert("您还有未作答题目哦！");
		else {
			alert("已提交！");
		/*	$.ajax(
				{ 
					'url':'login.php',//第一个参数url
					'data':testing,
					'success':function(data){//success表示，当服务器返回数据成功后，该做什么，返回的数据储存在data中，我们直接把data传入函数中。
				}, 
				'type':'post',//type是ajax的方法，可以用post可以用get，两种方法的区别可以自己查阅资料 
				'dataType':'json',//传递的数据类型，对应我上面的数据格式，这里用json。数据类型也可以是html/xml等 });*/
		}
	}