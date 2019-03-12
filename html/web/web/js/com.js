
/*

  PChome web
  by:yunfei
  time:2013-10-12 
  
*/
$(document).ready(function(e) {

	//返回顶部
	$(".retuenTop").click(function(){
		  $('body,html').animate({scrollTop:0},90); 
		  return false;
	});  

    //报价页面 去除最后一个li下划线
	$(".csNameList li:last").css("borderBottom","none");
	$(".slideList dl dt:last").css("borderBottom","none");
	$(".Quotation_list ul li:last").css("borderBottom","none");
	
	//全部分类点击展开
	$(".slideList dl dt").click(function(){
       $(this).siblings("dd").slideToggle(150).parent().siblings().children("dd").slideUp(150).siblings().children("span").removeClass("hoverBg");
	   $(this).children("span").toggleClass("hoverBg");
	});	
	$(".slideList dl dd").click(function(){
	   $(this).slideToggle(150).siblings().children("span").removeClass("hoverBg");
	});
	
	//登录 注册 切换
	$(function(){
		 $(".loginInfo").children("div").eq(0).show();
         $(".loginTabCut a").click(function(){
	           var index = $(this).index();
			   $(".loginTabCut a").removeClass("TabHover").eq(index).addClass("TabHover");
			   $(".loginInfo").children("div").eq(index).css("display","block").siblings("div").hide();
		 });
	});
	
	//侧边菜单  点击滑出
	$(".icon-menu").click(function(){		
        $(".PupNav_wrap").toggleClass("PupNav_wrapTo");
		 return false;      
	});
	//点击本身收回
	$(".PupNav_wrap").click(function(e){
		 $(this).toggleClass("PupNav_wrapTo");		
	});
	
	$(window).scroll( function() { 
	 scrll('.topNav',0,0);
	 scrll('.downNav','3.1em',0);
	});
	
	$(window).resize(function() { 
	  scrll('.topNav',0,0);
	  scrll('.downNav','3.1em',0);
	});
	
	// 元素 距离顶部的高度 本身的marginTop值
	function scrll(obj,Oftop,target){
	   var t = $(window).scrollTop();	 
	   var hg = $(obj).width();	 	
	   if(t > 0){
		   $(obj).css({"marginLeft":-(hg/2)+'px',"position":"fixed","top":Oftop,"left":"50%","marginTop":0});		   
	   }	  
	   else{
		  $(obj).css({"marginLeft":"auto","marginRight":"auto","position":"relative","top":"auto","left":"auto","marginTop":target});  
	   };
	};
		
	//侧边菜单 
    $(".PupNav_wrap").html("<div class='Pchome_PupNav'><div class='center-btn3'><ul class='clearfix bg-blue font-white btn'><li><a href='' title=''>报价</a></li><li><a href='' title=''>排行</a></li><li><a href='' title=''>软件</a></li><li><a href='' title=''>宽带山</a></li></ul></div><div class='center-btn2'><ul class='clearfix bg-white btn'><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li><li><a href='' title=''>手机</a></li></ul></div><div class='center-btn'><a href='' title='' class='bg-blue btn' style='color:#FFF;'>移动客户端更精彩</a> <a href='' title='' class='bg-white bd btn'>我要提意见</a></div></div>")
	
});

