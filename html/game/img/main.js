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
	$(".user2 ul .sex a").click(function(){
		$(".user2 ul .sex a").removeClass("dq");
		$(this).addClass("dq");
		})
	$(".user3 ul li").click(function(){
		$(".user3 ul li").removeClass("dq");
		$(this).addClass("dq");
		})
	$(".userpage3a ul li").click(function(){
		var classa=$(this).attr("class")
		if(classa!="disabled")
		{
		$(".userpage3a ul li").removeClass("dq");
		$(this).addClass("dq");
		}
		else
		{
			alert("么有了,请选择别的时间段")
		}
		})
		
		
	//$(".userpage4b .a1 a").click(function(){
		//$(".userpage4b .a1 a").removeClass("dq");
		//$(".userpage4b .liscon").css("display","none");
		//$(this).addClass("dq");
		//$(".userpage4b .liscon").eq($(this).index()).css("display","block")
		
		//})	
		
			
	$(".userpage2 ul li:last").append("<p></p>");
	
	
	
	
	$(".sel_wrap").on("change", function() {
var o;
var opt = $(this).find('option');
opt.each(function(i) {
if (opt[i].selected == true) {
o = opt[i].innerHTML;
}
})
$(this).find('label').html(o);
}).trigger('change');
	
	
	
	})



