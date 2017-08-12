import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
require('../../../Images/background0.jpg');
require('../../../Images/background1.jpg');
require('../../../Images/background2.jpg');
require('../../../Images/background3.jpg');
require('../../../Images/background4.jpg');
require('../../../Images/background5.jpg');
require('../../../Images/background6.jpg');
require('../../../Images/background7.jpg');
require('../../../Images/background8.jpg');

//import boolstrap from 'boolstrap';
$(function(){

var bgCounter = 0;
var backgrounds = [
      "/dist/Images/background0.jpg",
      "/dist/Images/background1.jpg",
      "/dist/Images/background2.jpg",
      "/dist/Images/background3.jpg",
      "/dist/Images/background4.jpg",
      "/dist/Images/background5.jpg",
      "/dist/Images/background6.jpg",
      "/dist/Images/background7.jpg",
      "/dist/Images/background8.jpg"

    ];
  function changeBackground()
  {
    bgCounter = (bgCounter+1) % backgrounds.length;

    $('.bg').fadeOut(1000,function(){$(this).attr('src',backgrounds[bgCounter])}).fadeIn(1000);
    setTimeout(changeBackground, 10000);
  }
  changeBackground();
});



@Component({
    components: {
        MenuComponent: require('../navmenu/navmenu.vue.html'),
        LoginComponent: require('../login/login.vue.html')
    }
})

export default class AppComponent extends Vue {
}
