import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
require('../../../node_modules/font-awesome/css/font-awesome.min.css');
var set = require('./questions.js').set;
var answercard = require('./questions.js').answercard;
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
    set();//初始化
    answercard();
	$('#start').click(function(){
		//$('#sec1').css("display","none");
		$('#sec1').fadeOut(1000);
		$('#sec2').fadeOut(1000);
		$('#quiz-container').fadeOut(1000);
		$('#banner').fadeOut(1000);
		$('#submission').fadeOut(1000);

		setTimeout(function(){
			$('#quiz-container').fadeIn(1000);
			$('#q21').fadeIn(1000);
		},1000);
		/////////////////

	});
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
	
});

new Vue({
	el:"#ans",
	data:{
	}
})

export default{
//export default class AppComponent extends Vue {
    	data(){
			return{
				msg:'hahahhahhhhhhh!'
			}
		}
}
