import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import $ from 'jquery';
var verify = require("./verify.js").verify;
var matchCookie = require("./verify.js").matchCookie;
var clearCookie = require("./verify.js").clearCookie;
//validator malfunctioning at present.
require('../../../Images/background0.jpg');
require('../../../Images/background1.jpg');
require('../../../Images/background2.jpg');
require('../../../Images/background3.jpg');
require('../../../Images/background4.jpg');
require('../../../Images/background5.jpg');
require('../../../Images/background6.jpg');
require('../../../Images/background7.jpg');
require('../../../Images/background8.jpg');

// $(window).load(function() {
//   clearCookie();
// });

//import boolstrap from 'boolstrap';
$(function () {
  matchCookie();

  var bgCounter = 0;
  var bgCounter2 = 0;
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
  function changeBackground() {


    $('#bg1').fadeOut(500, function () { $(this).attr('src', backgrounds[bgCounter]) }).fadeIn(500);
    bgCounter = (bgCounter + 1) % backgrounds.length;
    setTimeout(changeBackground, 5000);
  }
  function changeBackground2() {


    $('#bg2').fadeOut(500, function () { $(this).attr('src', backgrounds[bgCounter2]) }).fadeIn(500);
    bgCounter2 = (bgCounter2 + 1) % backgrounds.length;
    setTimeout(changeBackground2, 5000);
  }
  setTimeout(changeBackground, 1500);
  setTimeout(changeBackground2, 1875);
  $("#go-to-sign-in").click(function () {
    $("#signin").css("display", "");
    $("#signup").css("display", "none");
  });
  $("#go-to-sign-up").click(function () {
    $("#signin").css("display", "none");
    $("#signup").css("display", "");
  });

});
var username = "";
var password = "";

export default {
  data() {
    return {
    }
  },
  mounted: function(){
    clearCookie();
  },
  methods: {
    isStu: function () {
      this.$router.replace({ path: '/ans/sheet' })
    },
    isAdmin: function () {
      this.$router.replace({ path: '/dashboard/statistics' })
    },
    signup: function () {
      // alert("click!");
        var info = {
          "UserName": "",
          "Password": "",
          "RealName": "",
          "Role":"Student"
        }
        info.UserName = $("#signup-username").val();
        info.Password = $("#signup-password").val();
        info.RealName = $("#signup-name").val();
        var _this = this;
        $.ajax({
          url: '/api/Account/Register', //请求的url地址
          type: "POST", //请求方式
          dataType: "json", //返回格式为json
          async: false, //一定要设置为同步orz
          data: JSON.stringify(info),
          contentType: "application/json;charset=utf-8",
          beforeSend: function () {
            alert(this.data)
          },
          success: function (req,status,xhr) {
            // alert(JSON.stringify(req))
            console.log(req);
            // console.log(xhr.getResponseHeader("Set-Cookie"));
            if(req.isSuccessful==true){
<<<<<<< HEAD
              _this.isStu();         
              // alert("successful!");                 
            }
            else alert("unsuccessful!");
              // _this.$router.replace({path:'/login'})
=======
              $("#register-message").removeClass().addClass("text-success");
              $("#register-message").text("注册成功,即将进入答题系统...").fadeIn();          
              setTimeout(_this.isStu(),1000);                          
            }
            else{
              $("#register-message").removeClass().addClass("text-danger");
              $("#register-message").text("注册失败，用户已存在").fadeIn(); 
               _this.$router.replace({path:'/login'});
            }
>>>>>>> 283995245f520d3e86abb12fde54a8b3c65043a9
          },
          complete: function () {
            alert("complete");
          },
          error: function (request) {
            alert("sign up error:" + JSON.stringify(request));
            $("#register-message").removeClass().addClass("text-danger");
            $("#register-message").text("注册失败，请检查网络").fadeIn(); 
          }
        });
    },
    submit: function () {
      if (verify() == true) {
        username = $("#username").val();
        password = $("#password").val();
        var info = {
          "userName": "",
          "password": ""
        };
        info.userName = username;
        info.password = password;
        var _this = this;
        $.ajax({
          url: '/api/Account/Login', //请求的url地址
          type: "POST", //请求方式
          dataType: "json", //返回格式为json
          async: false, //一定要设置为同步orz
          data: JSON.stringify(info),
          contentType: "application/json-patch+json;charset=utf-8",
          beforeSend: function () {
          },
          success: function (req) {
            if (req.isSuccessful) {
              if (req.userViewModel.role == "Student") {
                (<any>window).user.isLoggedIn = true;
                (<any>window).user.id = JSON.stringify(info.userName);
                (<any>window).user.role = JSON.stringify(req.userViewModel.role);
                _this.isStu();
                // alert("successful");
              }
              else {
                (<any>window).user.isLoggedIn = true;
                (<any>window).user.id = JSON.stringify(info.userName);
                (<any>window).user.role = JSON.stringify(req.userViewModel.role);
                // alert("other successful");
                _this.isAdmin();
              }
              // else alert("管理员页面尚未开放！请直接ctrl+L，手动输入网址，蟹蟹~")
            } 
            // else alert("登录失败,请检查用户名或密码是否正确")
            else {
              if (req.message == "User already logged in") {
                  $("#common-error").text("当前用户已登录")
                      .fadeIn(setTimeout(function () {
                          $("#common-error").fadeOut();
                      }, 2000));
              } 
              else {
                  $("#common-error").text("用户名或密码错误，或尚未注册账号")
                      .fadeIn(setTimeout(function () {
                          $("#common-error").fadeOut();
                      }, 2000));
              }
          }
          },
          complete: function () {
          },
          error: function (request) {
            alert("error:" + JSON.stringify(request));
            // alert("登录失败,请检查网络是否通畅");
            $("#common-error").text("登录失败,请检查网络是否通畅")
            .fadeIn(setTimeout(function () {
                $("#common-error").fadeOut();
            }, 2000));
          }
        });

      }

    }

  }

  // }
}