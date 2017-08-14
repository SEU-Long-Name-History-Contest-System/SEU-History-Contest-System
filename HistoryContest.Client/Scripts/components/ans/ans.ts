import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
var set = require('./questions.js').set;
var answercard = require('./questions.js').answercard;


$(function(){
    set();//初始化
        alert('ant.ts jquery in action');
    answercard();
}
)

export default{
//export default class AppComponent extends Vue {
    	data(){
			return{
				msg:'hahahhahhhhhhh!'
			}
		}
}
