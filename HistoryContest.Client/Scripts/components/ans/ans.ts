import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
require('../../../node_modules/font-awesome/css/font-awesome.min.css');
var skel = require('./skel.min.js');
var set = require('./questions.js').set;
var answerCard = require('./questions.js').answerCard;
import saveAns from './ans.js';
import submit from'./ans.js';
//import skel from "./skel.min.js";

require('../../../Images/banner.jpg');
require('../../../Images/bg.jpg');
require('../../../Images/overlay.png');
require('../../../Images/pic01.jpg');
require('../../../Images/background0.jpg');
require('../../../Images/background1.jpg');
require('../../../Images/background2.jpg');
require('../../../Images/background3.jpg');
require('../../../Images/background4.jpg');
require('../../../Images/background5.jpg');
require('../../../Images/background6.jpg');
require('../../../Images/background7.jpg');
require('../../../Images/background8.jpg');


$(function(){
	
	$(document).on("click",".fa-angle-right",function(e){
		var v_id = $(e.target).attr('id'); 
		if(v_id == "start"){
			$('#wrapper').animate({
				left:"-=115rem"
			});	
		}else{
			$('#wrapper').animate({
				left:"-=120rem"
			});							
		}
		


	});
/*
	$("a").click(function(){
		alert("clicked!");
		$('#wrapper').animate({
			left:"-=1858.3px"
		});

	});*/
	/*
	$('#toQ2').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q1').fadeOut(1000);
		$('#picq1').fadeOut(1000);

		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q2').fadeIn(1000);
		},1000);
	});
	$('#toQ3').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q2').fadeOut(1000);
		$('#picq2').fadeOut(1000);

		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q3').fadeIn(1000);
		},1000);
	});
	$('#toQ4').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q3').fadeOut(1000);
		$('#picq3').fadeOut(1000);

		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q4').fadeIn(1000);
		},1000);
	});
	$('#toQ5').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q4').fadeOut(1000);
		$('#picq4').fadeOut(1000);

		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q5').fadeIn(1000);
		},1000);
	});
	$('#toQ6').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q5').fadeOut(1000);
		$('#picq5').fadeOut(1000);

		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q6').fadeIn(1000);
		},1000);
	});
	$('#toQ7').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q6').fadeOut(1000);
		$('#picq6').fadeOut(1000);
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q7').fadeIn(1000);
		},1000);
	});
	$('#toQ8').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q7').fadeOut(1000);
		$('#picq7').fadeOut(1000);
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q8').fadeIn(1000);
		},1000);
	});
	$('#toQ9').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q8').fadeOut(1000);
		$('#picq8').fadeOut(1000);
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q9').fadeIn(1000);
		},1000);
	});
	$('#toQ10').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q9').fadeOut(1000);
		$('#picq9').fadeOut(1000);
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q10').fadeIn(1000);
		},1000);
	});
	$('#toQ11').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q10').fadeOut(1000);
		$('#picq10').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q11').fadeIn(1000);
		},1000);
	});
	$('#toQ12').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q11').fadeOut(1000);
		$('#picq11').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q12').fadeIn(1000);
		},1000);
	});
	$('#toQ13').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q12').fadeOut(1000);
		$('#picq12').fadeOut(1000);
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q13').fadeIn(1000);
		},1000);
	});
	$('#toQ14').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q13').fadeOut(1000);
		$('#picq13').fadeOut(1000);
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q14').fadeIn(1000);
		},1000);
	});
	$('#toQ15').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q14').fadeOut(1000);
		$('#picq14').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q15').fadeIn(1000);
		},1000);
	});
	$('#toQ16').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q15').fadeOut(1000);
		$('#picq15').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q16').fadeIn(1000);
		},1000);
	});
	$('#toQ17').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q16').fadeOut(1000);
		$('#picq16').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q17').fadeIn(1000);
		},1000);
	});
	$('#toQ18').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q17').fadeOut(1000);
		$('#picq17').fadeOut(1000);
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q18').fadeIn(1000);
		},1000);
	});
	$('#toQ19').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q18').fadeOut(1000);
		$('#picq18').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q19').fadeIn(1000);
		},1000);
	});
	$('#toQ20').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q19').fadeOut(1000);
		$('#picq19').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q20').fadeIn(1000);
		},1000);
	});
	$('#toQ21').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q20').fadeOut(1000);
		$('#picq20').fadeOut(1000);
		
		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q21').fadeIn(1000);
		},1000);
	});
	$('#toQ22').click(function(){
		$('#quiz-container').fadeOut(1000);
		$('#q21').fadeOut(1000);
		$('#picq21').fadeOut(1000);
		setTimeout(function(){
			//$('#quiz-container').fadeIn(1000);
			$('#submission').fadeIn(1000);
		},1000);
	});
	*/

	var mm = 30;//分
	var ss = 0;//秒
	var timeState = false;//时间状态 默认为true 开启时间

	/*实现计时器*/
	
	var time= setInterval(function () {
		if (timeState) {
			if(mm==0&&ss==1){
				ss--;
				alert("时间到！");
				$(".time").hide();
				
			}
			else{
				var str = "";
				if (ss-- == 0) {
					--mm;
					ss = 59;
				}
				
				
				str += mm < 10 ? "0" + mm : mm;
				str += ":";
				str += ss < 10 ? "0" + ss : ss;
				$(".time").text(str);
			}
		
		} 
		else {
			$(".time").text(' ');
		}
	}, 1000);

	var answerQues=[];//name,answer(id)
    set();//初始化
    answerCard();
$(document).ready(function(){

    $("#start").click(function () {
		 $("#footer").show();
        timeState = true;
	});


});
		
});

new Vue({
	el:"#ans",
	data:{
	}
})

export default{
//export default class AppComponent extends Vue {
}
