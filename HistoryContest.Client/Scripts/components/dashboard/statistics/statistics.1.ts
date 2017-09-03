import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import { Component } from 'vue-property-decorator';//不能被注释掉！
import $ from 'jquery';
import Chartist from 'chartist';
var download = require('../download.js').download;

var departmentInfo = {
    "maxScore": 0,
    "averageScore": 0,
    "scoreBandCount":
    {
        "higherThan90": 0,
        "higherThan75": 0,
        "higherThan60": 0,
        "failed": 0,
        "notTested": 0
    },
    "updateTime": "2017-09-01T18:46:26.2034528+08:00"
}


var undo = {'students': []};
var done = {'students': []};
var tot;




var by = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? 1 : -1;
            }
            return typeof a < typeof b ? 1 : -1;
        }
        else {
            throw ("error");
        }
    }
}

function setUndo(UNDO) {
    var undoContent = ""
    for (var undoIteratorIndex = 0; undoIteratorIndex < UNDO.students.length; undoIteratorIndex++) {
        undoContent += '<tr><td>' + UNDO.students[undoIteratorIndex].studentID
            + '</td><td>' + UNDO.students[undoIteratorIndex].name
            + '</td><td>' + UNDO.students[undoIteratorIndex].cardID + '</td></tr>'
    }
    // $("#tableundo").append("<tbody>" + undoContent + "</tbody>");
    $("#table-undo").find("tbody").html(undoContent);

}
function setDone(DONE) {
    // var DONE = JSON.stringify(done);
    var doneContent = "";
    // console.log(DONE.students.length);
    for (var doneIteratorIndex = 0; doneIteratorIndex < DONE.students.length; doneIteratorIndex++) {
        doneContent += '<tr><td>' + DONE.students[doneIteratorIndex].studentID
            + '</td><td>' + DONE.students[doneIteratorIndex].name
            + '</td><td>' + DONE.students[doneIteratorIndex].score
            + '</td><td>' + DONE.students[doneIteratorIndex].cardID + '</td></tr>'
    }
    $("#table-done").find("tbody").html(doneContent);
    // $("#tabledone").append("<tbody>" + doneContent + "</tbody>");
    // console.log(doneContent);
}
function initChartist() {
    
    // console.log("initChart");        
    var labelForDone = Math.round(100 * (done.students.length / tot)) + "%";
    var labelForUndo = Math.round(100 * (undo.students.length / tot)) + "%";
    //以下总人数还没有和上面的数据统一
    var labelA = Math.round(100 * (departmentInfo.scoreBandCount.higherThan90 / done.students.length)) + "%";
    var labelB = Math.round(100 * (departmentInfo.scoreBandCount.failed / done.students.length)) + "%";
    var labelC = Math.round(100 * (departmentInfo.scoreBandCount.higherThan75 / done.students.length)) + "%";
    var labelD = Math.round(100 * (departmentInfo.scoreBandCount.higherThan60 / done.students.length)) + "%";

    new Chartist.Pie('#completion-chart', {

        labels: [labelForDone,
            (undo.students.length == 0 ? '' : labelForUndo)],
        series: [done.students.length, undo.students.length]
    });
    new Chartist.Pie('#overall-chart', {
        labels: [labelA, labelB, labelC, labelD],
        series: [departmentInfo.scoreBandCount.higherThan90,
        departmentInfo.scoreBandCount.failed,
        departmentInfo.scoreBandCount.higherThan75,
        departmentInfo.scoreBandCount.higherThan60
        ]
    });
}

function commonSet() {
    var config = {
        comments: {
            dones: {
                perfect: "大家都很听话，全部完成作答了哦！",
                common: done.students.length + "人已完成答题,"
            },
            undos: {
                worst: "偌大的学院，到现在还没有一人完成，大家都去哪儿浪了呢？",
                common: "仍有" + undo.students.length + "人未完成。"
            }
        }
    
    }
    // $("#school-name").html(DepartmentNameMap[departmentInfo.DepartmentID]);
    if (undo.students.length == 0) {
        $("#done-info").html(config.comments.dones.perfect);
        $("#undo-info").hide();
        $("#empty-comment").show();
    }
    else if (done.students.length == 0) {
        $("#done-info").hide();
        $("#undo-info").html(config.comments.undos.worst);
        $("#empty-comment").hide();
    }
    else {
        $("#done-info").html(config.comments.dones.common);
        $("#undo-info").html(config.comments.undos.common);
        $("#empty-comment").hide();
    }
    $("#average-score").html(departmentInfo.averageScore);
    $("#max-score").html(departmentInfo.maxScore);

}







export default {
    data() {
        return {
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.refresh()
        })
    },
    methods: {
        //function01 seperate tested and untested students
        setUndoAndDone:function(){
            $.ajax({
                url: '/api/Counselor/Scores/All', //请求的url地址
                type: "GET", //请求方式
                dataType: "json", //返回格式为json
                async: true,
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (res) {
                    undo = {
                        'students': [
                        ]
                    };
                    done = {
                        'students': [
                        ]
                    };
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].isCompleted) {
                            done.students.push(res[i]);
                        }else undo.students.push(res[i]);
                    }
                    tot = res.length;
                    console.log(JSON.stringify(undo));
                    console.log(JSON.stringify(done));
                    console.log(JSON.stringify(tot));

                },
                complete: function () {
                },
                error: function (request) {
                    console.log("get scores/all/{id}error:" + JSON.stringify(request));
                }
            });    
        },
        //function02 get students Info for this department
        getDepartmentInfo:function(){
            $.ajax({
                url: '/api/Counselor/Scores/Summary', //请求的url地址
                type: "GET", //请求方式
                dataType: "json", //返回格式为json
                async: false,
                contentType: "application/json",
                beforeSend: function () {
                },
                success: function (res) {
                    departmentInfo = res;
                    console.log(JSON.stringify(departmentInfo));
                },
                complete: function () {
                },
                error: function (request) {
                    console.log("get scores/summary/{id} error:" + JSON.stringify(request));
                }
            });
        },
        //function03 download excel
        exportExcellofDepartment: function () {
            $.ajax({
                url: '/api/Counselor/ExportExcelofDepartment', //请求的url地址
                type: "POST", //请求方式
                // dataType: "json", //返回格式为json
                async: true,
                crossDomain: true,
                contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                beforeSend: function () {
                    console.log('start download');
                },
                success: function (req) {
                    download(req);
                },
                complete: function () {
                },
                error: function (request) {
                    console.log("error:" + JSON.stringify(request));
                }
            });
        },
        refresh: function () {
            var temp = $.extend(true, done);//深拷贝 !important
            var cnt = 0;            
            this.setUndoAndDone();
            this.getDepartmentInfo();
            setUndo(undo);
            setDone(done);
            initChartist();
            commonSet();
            console.log(done);
            $("#table-done").find("th.score").click((function () {
                if (cnt % 3 == 0) {
                    $("#sort").hide();
                    $("#triangle-bottom").show();
                    $("#triangle-top").hide();
                    if (cnt == 0) {
                        temp.students.sort(by("Score"));
                        setDone(temp);
                        cnt++;
                        return;
                    }
                    temp.students.reverse();
                    cnt++;
                    setDone(temp);

                }
                else if (cnt % 3 == 1) {
                    $("#sort").hide();
                    $("#triangle-bottom").hide();
                    $("#triangle-top").show();
                    temp.students.reverse();
                    cnt++;
                    setDone(temp);

                }
                else if (cnt % 3 == 2) {
                    $("#sort").show();
                    $("#triangle-bottom").hide();
                    $("#triangle-top").hide();
                    cnt++;
                    setDone(done);
                }
            }))
            //先隐藏再筛选
            $("#search-undo-text").keyup(function () {
                var $key = $('#search-undo-text').val();
                $('#table-undo table tbody tr').hide().filter(":contains('" + $key + "')").show();
            });
            $("#search-done-text").keyup(function () {
                var $key = $('#search-done-text').val();
                $('#table-done table tbody tr').hide().filter(":contains('" + $key + "')").show();
            });

        }
    }
}