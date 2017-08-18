var undo={
    'students':[
        {"ID":"09016435","Name":"杨航源","CardID":"213161269"},
        {"ID":"09016423","Name":"陈启宣","CardID":"213161299"},
        {"ID":"09016414","Name":"罗崟洪","CardID":"213163210"}
    ]
};
var done={
    'students':[
        {"ID":"09016435","Name":"杨航源","Score":60,"CardID":"213161269"},
        {"ID":"09016423","Name":"陈启宣","Score":100,"CardID":"213161299"},
        {"ID":"09016414","Name":"罗崟洪","Score":0,"CardID":"213163210"}
        ]
};
var by = function(name){
    return function(o, p){
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
   
function setUndo(UNDO){
    var undoContent=""       
    for(var undoIteratorIndex=0;undoIteratorIndex<UNDO.students.length;undoIteratorIndex++){
        undoContent+='<tr><td>'+UNDO.students[undoIteratorIndex].ID
        +'</td><td>'+UNDO.students[undoIteratorIndex].Name
        +'</td><td>'+UNDO.students[undoIteratorIndex].CardID+'</td></tr>'
    }
   
    $("#table-undo").find("tbody").html(undoContent);
   
}
function setDone(DONE){
    var  doneContent="";
    for(var doneIteratorIndex=0;doneIteratorIndex<DONE.students.length;doneIteratorIndex++){
        doneContent+='<tr><td>'+DONE.students[doneIteratorIndex].ID
        +'</td><td>'+DONE.students[doneIteratorIndex].Name
        +'</td><td>'+DONE.students[doneIteratorIndex].Score
        +'</td><td>'+DONE.students[doneIteratorIndex].CardID+'</td></tr>'
    }
    $("#table-done").find("tbody").html(doneContent);
}
function initChartist(){ 
    Chartist.Pie('#chartPreferences', {
    labels: ['62%','38%'],
    series: [50, 50]
    });   
    Chartist.Pie('#chartOverallPreferences', {
    labels: ['2%','80%',"10%","8%"],
    series: [2, 80,10,8]
    });   
}

var temp=$.extend(true,done);//深拷贝 !important
var cnt=0;
$(function () {
    setUndo(undo);
    setDone(done);
    console.log(done);
    $("#table-done").find("th.score").click((function(){
       if(cnt%3==0){
        $("#sort").hide();
        $("#triangle-bottom").show();
        $("#triangle-top").hide();
           if(cnt==0){
            temp.students.sort(by("Score"));
            setDone(temp);
            cnt++;
            return;
           }
           temp.students.reverse();
           cnt++;
           setDone(temp);
   
       }
       else if(cnt%3==1){
        $("#sort").hide();
        $("#triangle-bottom").hide();
        $("#triangle-top").show();
        temp.students.reverse();
        cnt++;
        setDone(temp);

       }
       else if(cnt%3==2){
        $("#sort").show();
        $("#triangle-bottom").hide();
        $("#triangle-top").hide();
        cnt++;
        setDone(done);

       }
       
       
      
    }))
    //先隐藏再筛选
     $("#search-undo-text").keyup(function () {
         var $key=$('#search-undo-text').val();
         $('#table-undo table tbody tr').hide().filter(":contains('"+$key+"')").show();
     });
     $("#search-done-text").keyup(function () {
         var $key=$('#search-done-text').val();        
         $('#table-done table tbody tr').hide().filter(":contains('"+$key+"')").show();
     });

     initChartist()

 $.notify({
     icon: 'glyphicon glyphicon-heart-empty',
     message: "你好，XXX，欢迎来到校史校情知识竞赛管理系统"

 }, {
     type: 'info',
     timer: 3000
 });



});



