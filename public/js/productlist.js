//1:第一个模块功能 用户登录
//2:查找登录按钮绑定点击事件
$("#bt-login").click(function(){
//3:获取用户名和密码
  var u = $("#uname").val();
  var p = $("#upwd").val();
//4:发送ajax port /user_login
  $.ajax({
    type:"POST",
    url:"/user_login",
    data:{uname:u,upwd:p},
    success:function(data){
      if(data.code>0){
        console.log("登录成功");
        //隐藏模态框
        $(".modal").hide();
        //保存uname uid cookie
        document.cookie='uname='+u;
        document.cookie='uid='+data.uid;
      }else{
        //修改提示信息 “用户名或密码错误”
        $("p.alert").html(data.msg);
      }
    },
    error:function(){
      alert("网络出错故障，请重试");
    }
  });
//5:并且接收返回结果 json
});
function loadProduct(pageNo) {
    $.ajax({
        type: "GET",
        url: "/productlist",
        data: {pageNo: pageNo},
        success: function (data) {
            var html = "";
            for (var i = 0; i < data.length; i++) {
                var o = data[i];
                html += `
        <li>
                            <a href=""><img src="${o.pic}" alt=""/></a>
                            <p>${o.price}</p>
                            <h1><a href="">${o.pname}</a></h1>
                            <div>
                                <a href="" class="contrast"><i></i>对比</a>
                                <a href="" class="p-operate"><i></i>关注</a>
                                <a href="" class="addcart"><i></i>加入购物车</a>
                            </div>
                        </li>
      `;
            }
            $("#plist ul").html(html);
        }
    });

        $.ajax({
            type: "GET",
            url: "/productpage",

            success: function (data) {
                var p = data.page;
                //2:拼接页码
                var html = "";
                for (var i = 1; i <= p; i++) {
                    html += `
         <li><a href="#">${i}</a></li>
       `;
                }
                //3:保存
                $("ol.pager").html(html);
            }
        })

}
function page(start) {
    $.ajax({
        type: "Get",
        url: "/product",
        data:{start:start},
        success: function (data) {
            var html = "";
            for (var i = 0; i < data.length; i++) {
                var o = data[i];
                html += `
         <div class="product01">
        	<a href="product-nextpage.html" name="${o.pid}" class="pro-list"><img src="${o.pic}"></a>
            <div class="info">
            <span class="pname">${o.pname}</span>
            <span  class="price">￥${o.price}</span>
            </div>
        </div>
            `
            }
            $("#num").append(html);

        }
    })
}
page(1);
$(".knowmore").click(function(start){
    $.ajax({
        type:'GET',
        url:'/getmore',
        data:{start:start},
        success:function(data){
            var html = "";
            for (var i = 0; i < data.length; i++) {
                var o = data[i];
                html += `
         <div class="product01">
        	<a href="product-nextpage.html" name="${o.pid}" class="pro-list"><img src="${o.pic}"></a>
            <div class="info">
            <span class="pname">${o.pname}</span>
            <span  class="price">￥${o.price}</span>
            </div>
        </div>
            `
            }
            $("#num").append(html);
        }
    })
});
$("#num").on("click","a.pro-list",function(){
    var pid=$(this).attr("name");
    sessionStorage.setItem("pid",pid);
})



