/**
 * Created by Administrator on 2017/9/4.
 */
$("#header").load("header.html");
$.ajax({
    type:"GET",
    url:"/uname",
    data:{uid:sessionStorage.getItem("uid")},
    success:function(data){
        if(data.length>0){
        var o=data[0];
            $("#header #main").html("欢迎您！"+o.uname);}
    }
})