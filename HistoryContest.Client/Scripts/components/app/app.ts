import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';

//import boolstrap from 'boolstrap';
$(function(){

var bgCounter = 0;
var backgrounds = [
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
