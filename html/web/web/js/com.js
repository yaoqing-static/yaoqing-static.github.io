
/*

  PChome web
  by:yunfei
  time:2013-10-12 
  
*/
$(document).ready(function(e) {

	//���ض���
	$(".retuenTop").click(function(){
		  $('body,html').animate({scrollTop:0},90); 
		  return false;
	});  

    //����ҳ�� ȥ�����һ��li�»���
	$(".csNameList li:last").css("borderBottom","none");
	$(".slideList dl dt:last").css("borderBottom","none");
	$(".Quotation_list ul li:last").css("borderBottom","none");
	
	//ȫ��������չ��
	$(".slideList dl dt").click(function(){
       $(this).siblings("dd").slideToggle(150).parent().siblings().children("dd").slideUp(150).siblings().children("span").removeClass("hoverBg");
	   $(this).children("span").toggleClass("hoverBg");
	});	
	$(".slideList dl dd").click(function(){
	   $(this).slideToggle(150).siblings().children("span").removeClass("hoverBg");
	});
	
	//��¼ ע�� �л�
	$(function(){
		 $(".loginInfo").children("div").eq(0).show();
         $(".loginTabCut a").click(function(){
	           var index = $(this).index();
			   $(".loginTabCut a").removeClass("TabHover").eq(index).addClass("TabHover");
			   $(".loginInfo").children("div").eq(index).css("display","block").siblings("div").hide();
		 });
	});
	
	//��߲˵�  �������
	$(".icon-menu").click(function(){		
        $(".PupNav_wrap").toggleClass("PupNav_wrapTo");
		 return false;      
	});
	//��������ջ�
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
	
	// Ԫ�� ���붥���ĸ߶� �����marginTopֵ
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
		
	//��߲˵� 
    $(".PupNav_wrap").html("<div class='Pchome_PupNav'><div class='center-btn3'><ul class='clearfix bg-blue font-white btn'><li><a href='' title=''>����</a></li><li><a href='' title=''>����</a></li><li><a href='' title=''>���</a></li><li><a href='' title=''>���ɽ</a></li></ul></div><div class='center-btn2'><ul class='clearfix bg-white btn'><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li><li><a href='' title=''>�ֻ�</a></li></ul></div><div class='center-btn'><a href='' title='' class='bg-blue btn' style='color:#FFF;'>�ƶ��ͻ��˸�����</a> <a href='' title='' class='bg-white bd btn'>��Ҫ�����</a></div></div>")
	
});

