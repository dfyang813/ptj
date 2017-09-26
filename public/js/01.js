var moved=0;
var width=1200;
var timer=null;
$(".btn").children(":eq(0)").addClass("hover");
function play(){
timer=setInterval(function(){
	moved++;
	$(".img_box").animate({
		left:-moved*width+"px"
	},1000,function(){
		if(moved==3){
			moved=0;
			$(".img_box").css("left",0)
		}
		$(".btn").children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");
	})
},3000)
}
play();
$("#list").hover(()=>{
    clearInterval(timer);
    timer=null;
},()=>{
    play();
});
$(".btn").on("click","li",function(e){
    moved=$(e.target).index();
    $(".img_box").stop(true).animate({
        left:-moved*width
    },1000,()=>{
        $(e.target).addClass("hover").siblings().removeClass("hover");
    })
})