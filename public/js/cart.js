/**
 * Created by Administrator on 2017/8/19.
 */
$.ajax({
    type:"get",
    url:"/getcart",
    data:{uid:sessionStorage.getItem("uid")},
    success:function(data){
        console.log(data);
        var html="";
        for(var i=0;i<data.length;i++) {
            var o=data[i];
            html += `
            <div id="cart-list" class="clear">
                <div style="float:left"><input class="clist" type="checkbox"/></div>
                <div class="img-box"><img src="${o.pic}"></div>
                <div class="word" style="text-align:left">${o.pname}
        干红葡萄酒6支装整</div>
                <div class="word">${o.price}</div>
                <div class="word">
                    <button class="${o.cid}">-</button>
                    <span>${o.count}</span>
                    <button class="${o.cid}">+</button>
                </div>
                <span class="word total">${o.price*o.count}</span>
                <a class="word del" href="${o.cid}">删除</a>
        </div>
        `;
        }
        $("#pros").append(html);
    }
});
$("#pros").on("click","a.del",function(e){
    e.preventDefault();
    var cid=$(this).attr("href");
    var cart=$(this).parent();
    var rs=window.confirm("确定删除该信息么");
    if(rs==false){
        return;
    }
$.ajax({
    type:"get",
    url:"/delcart",
    data:{cid:cid},
    success:function(data){
        if(data.code>0){
            cart.remove();
            alert(data.msg);
        }else{
            alert(data.msg);
        }
    }
})
});
$("#pros").on("click","button:contains('-')",function(){
    var cid=$(this).attr("class");
    var price=$(this).parent().prev();
    var n=$(this).next();
    var total=$(this).parent().next();
    console.log(n);
    if(n==1){
        var cart = $(this).parent().parent();
        delCartFun(cart,cid);
        return;
    }
    $.ajax({
        type:"get",
        url:"/cart-sub",
        data:{cid:cid},
        success:function(data){
            if(data.code>0){
                var c=parseInt(n.html())-1;
                n.html(c);
                total.html(price.html()*c);
            }
        }
    })
});
$("#pros").on("click","button:contains('+')",function(){
    var cid=$(this).attr("class");
    var price=$(this).parent().prev();
    var n=$(this).prev();
    var total=$(this).parent().next();
    console.log(price,n,total);
    $.ajax({
        type:"get",
        url:"/cart-add",
        data:{cid:cid},
        success:function(data){
            if(data.code<1){
                alert(data.msg);
            }else{
                var c=parseInt(n.html())+1;
                n.html(c);
                total.html(price.html()*c);
            }
        }
    })
});
function delCartFun(cart,cid){
//4:发送ajax请求 get  /delcart cid
    var rs=window.confirm("确定删除该信息么");
    if(rs==false){
        return;
    }
    $.ajax({
        type:"get",
        url:"/delcart",
        data:{cid:cid},
        success:function(data){
            if(data.code>0){
                $("#pros").remove(cart);
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        }
    })
}
$("#sel").change(function(){
    var list=$("#pros input.clist");
    var sum=0;
    if($(this).prop("checked")){
        list.prop("checked",true);
        var tlist=$("span.total");
        console.log(tlist);
        tlist.each(function(idx,obj){
            sum+=parseFloat(obj.innerHTML);
        });
        $("#sum").html(sum);
    }else{
        list.prop("checked",false);
        $("#sum").html(0);
    }
})

