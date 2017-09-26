/**
 * Created by bjwsl-001 on 2017/7/25.
 */
    $("#bt-register").click(function(){
        var reg = /^[0-9a-z]{6,12}$/i;
        if(!reg.test($("#uname").val())){
            return;
        }
        var pwd = /^[0-9a-z]{6,12}$/i;
        if(!pwd.test($("#upwd").val())){
            return;
        }
        if($("#upwd").val()!=$("#umail").val()){
            $("#rpwd").html("*密码请与上面保持一致");
            return;
        }
        var url=/^1[34578]\d{9}$/;
        if(!url.test($("#phone").val())){
            $("#pmsg").html("*请输入正确的手机号格式");
            return;
        }
        if($("h3.error").length>0){
            alert("该用户名已被注册");
            return;
        }
        var attr=/^\w{5,50}$/;
        if(!attr.test($("#attr").val())){
            return;
        }
        var u=$("#uname").val();
        var p=$("#upwd").val();
        var h=$("#phone").val();
        var a=$("#attr").val();
        console.log("1"+h);
        $.ajax({
            type:"POST",
            url:"/reg.do",
            data:{uname:u,upwd:p,uphone:h,uattr:a},
            success:function(data){
                if(data.code==1){
                    location.href="login.html";
                }else{
                    alert("请输入正确的格式");
                }
            }
        });
    });
uname.onblur=function(){
    var u=this.value;
    $.ajax({
        type:"GET",
        url:"/testuname",
        data:{uname:u},
        success:function(data){
            if(data.code==1){
                $("#tip").html(data.msg);
                $("tip").removeClass("error")
            }
            else {
                $("#tip").html(data.msg);
                $("#tip").addClass("error")
            }
        }
    })
}

