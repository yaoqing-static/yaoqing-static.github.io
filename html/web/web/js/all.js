// JavaScript Document

//ͼƬ�б����

function score (){
	$(".score").each(function(idx){
		var tempScore = $(".score").eq(idx).text();
		$(".score").eq(idx).html("<img src='img/"+tempScore+".png'>");
		})	
	}
//����Ч
function taFocus(ev,text){
	if($(ev).val()==text){
		$(ev).css("color","#56575A");
		$(ev).val("");
		}
	}
function taBlur(ev,text){
	if($(ev).val()==""|$(ev).val()==text){
		$(ev).css("color","#CCCCC8");
		$(ev).val(text);
		}
	}

function gotop(){
	if($(window).scrollTop()>0){
		$("#pic_top").fadeIn();
		}
	else{
		$("#pic_top").fadeOut();
		}
	}
