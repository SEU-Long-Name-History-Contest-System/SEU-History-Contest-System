	var answerQues=[];//name,answer(id)
	exports.saveAns=function(clickID){
		var ans = clickID.value;//获取this的id，即事件拥有者的id，即选项的id（item0，1，2，3...）
		var id=clickID.id;
		var name=$("#"+id).prop('name');
		var testing;
		
		for(var i=0;i<answerQues.length;i++){//这个循环用来覆盖保存答案
		if( answerQues[i].name==name&&answerQues[i].answer!=ans){
					
			answerQues[i].answer =ans;
				testing=JSON.stringify(answerQues);
				console.log(testing);
			return;
		
		}
			else if(answerQues[i].name==name&&answerQues[i].answer==ans)
				return;			
		}
			var check ={};						
			check.name=name;
			check.answer=ans;
			answerQues.push(check);//用push方法传入数组
			
			testing=JSON.stringify(answerQues);
			console.log(testing);
			$("#"+name).addClass("answered");
		
			console.log(parseInt(name[name.length-1]));
			console.log(name[name.length-1]);
			console.log(name.length);
			console.log(name);
			setTimeout(function(){
				var next=parseInt(name.substr(8))+1;
				name='question'+next;
				$("#"+name).click();
			
			},300);
	}
	exports.submit=function(){
		console.log(answerQues.length);
		if(answerQues.length!=30)
			alert("您还有未作答题目哦！");
	}