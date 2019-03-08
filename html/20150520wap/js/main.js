var phoneWidth = parseInt(window.screen.width)
var phoneScale = phoneWidth/640
var ua = navigator.userAgent
if (/Android (\d+\.\d+)/.test(ua)){
var version = parseFloat(RegExp.$1)
if(version>2.3){
document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">')
}else{
document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">')
}
} else {
document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">')
}



$(function(){
	$(".topbanner b").click(function(){
		$(".topbanner").css("display","none")
		})
	
	$(".sy3 .sy3link a").click(function(){
		$(".sy3 .sy3link a").removeClass("dq")
		$(this).addClass("dq")
		
		$(".sy3 ul").css("display","none");
		$(".sy3 ul").eq($(this).index()).css("display","block");
		})
	
	
	
	})