//功能点三:完成用户登录
//1:获取按钮 bt-login
//2:绑定点击事件
$("#bt-login").click(function(){
  //3:获取用户名,验证正则表达式
  var unamereg = /^[a-z0-9]{6,12}$/i;
  //4:获取密码,  验证正则表达式
  if(!unamereg.test($("#uname").val())){
    alert("用户名格式不正确，请检查");
    return;
  }
  if(!unamereg.test($("#upwd").val())){
    alert("密码格式不正确，请检查");
    return;
  }

  //5:验证通过
  //6:ajax post /login.do
  var u = $("#uname").val();
  var p = $("#upwd").val();
  $.ajax({
    type:"POST",
    url:"/login.do",
    data:{uname:u,upwd:p},
    success:function(data){
        console.log(data);
        if(data.code>0){
         sessionStorage.setItem("uid",data.uid);
            sessionStorage.setItem("uname",u);
            console.log(u);
          location.href="index.html";
        }else{
            alert(data.msg);
        }
    }
  });
});


