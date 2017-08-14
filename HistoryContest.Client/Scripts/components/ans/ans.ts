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
		alert("click start");
		//$('#sec1').css("display","none");
		$('#sec1').fadeOut(1000);
		$('#sec2').fadeOut(1000);
		
		//$('#sec2').css("display","none");
	})
}
)
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
