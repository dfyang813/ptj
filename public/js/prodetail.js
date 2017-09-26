/**
 * Created by bjwsl-001 on 2017/8/15.
 */
var Img=document.querySelector("#Img");
var icon=document.querySelector("#icon-list");
var large=document.querySelector("#large");
icon.onmouseover=function(e){
    var tar= e.target;
    if(tar.nodeName=="IMG"){
        var src=tar.src;
        var i=src.indexOf(".");
        Img.src=src.slice(0,i)+"-m"+src.slice(i);
    }
}
var mask=document.querySelector("#mask");
var superMask=document.querySelector("#superMask");

superMask.onmouseover=function(){
    mask.style.display="block";
    large.style.display="block";
    var src=Img.src;
    var i=src.indexOf(".");
    src=src.slice(0,i-1)+"l"+src.slice(i);
    large.style.backgroundImage="url("+src+")";
}
superMask.onmouseout=function(){
    mask.style.display="none";
    large.style.display="none";
}
var ht=125;
superMask.onmousemove=function(e){
    var top= e.offsetY-ht;
    var left= e.offsetX-ht;
    if(top<=0) top=0;
    if(top>=250) top=250;
    if(left<=0) left=0;
    if(left>=250) left=250;
    mask.style.top=top+"px";
    mask.style.left=left+"px";
    large.style.backgroundPosition=-2*left+"px "+ -2*top+"px";
};
$.ajax({
    type:"GET",
    url:"/detail",
    data:{pid:sessionStorage.getItem("pid")},
    success:function(data){
        var html=`
            <h1>【长城干红】${data[0].pname} 整箱装</h1>
            <img src="img/money.png">
            <div class="price">
                <div class="price01"><s>￥${data[0].rprice}</s></div>
                <div class="price02">￥${data[0].price}</div>
            </div>
        `;
        $("#right-main").append(html)
    }
});
$("#cart").click(function(e){
    e.preventDefault();
    var uid=sessionStorage.getItem("uid");
    var pid=sessionStorage.getItem("pid");
    $.ajax({
        type:"GET",
        url:"/addcart",
        data:{uid:uid,pid:pid},
        success:function(data){
            if(data.code>0){
                alert("添加成功"+data.msg);
                location.href="addtoshoppingcart.html";
            }
        }
    })
});