var availableTags = new Array();
var stageTags=new Array();//现在显示的标签

var nickNameOpt={
  setTags:function(){
    $(".sltag").each(function(index, el) {
      stageTags.push($(el).text());
      $.unique(stageTags);      
    });
    $(document).on("keyup change;","#tags",function(){
      //有没有匹配
      var _this=$(this);
      var timeout=setTimeout(function(){
        if($(".ui-autocomplete").is(":hidden")){
          $("#ulClear").remove();
          var ul='<ul id="ulClear" style="top:'+(parseInt(_this.offset().top)+34)+'px; left:'+_this.offset().left+'px; width:630px;"><li class="ui-menu-item no_match">无匹配结果，清空（）</li></ul>';
          $("body").append(ul);
        }else{
          $("#ulClear").remove();
        };        
      },300);
    });
    //点击清除后清除输入框内容并移除此Div
    $(document).on("click","#ulClear",function(){
      $("#tags").val("");
      $(this).remove();
    });
  },
  delTags:function(){
    $(document).on("click",".delIco",function(){
      var text=$(this).parent().next().text();
      $(this).parents(".chenni").remove();
      $.each(stageTags,function(index, el) {
        if(text==el){
          stageTags.splice(index,1);
        };
      });
    });
  },
  citySelect:function(){    
    $("#city_1").citySelect({
      nodata:"none",
      required:false
    }); 
  }
};

nickNameOpt.setTags();
nickNameOpt.delTags();
nickNameOpt.citySelect();
$.ajax({
  url:"js/tags.json",
  success:function(data){
    availableTags=data.tags;
    $("#tags").autocomplete({
      source: availableTags,
      select: function( event, ui ){
        var item = ui.item.value;
        if($.inArray(item,stageTags)<0){
          stageTags.push(item);
          $(".nic").append('<div class="fll chenni mr20"><div class="guanbi"><img src="images/guanbi.png" class="delIco" /></div><div class="nizi mrtf10 mrl10 mrr10 sltag">'+item+'</div></div>'); 
        };
      }
    });
  }
});

var htmlobj=$.ajax({url:"dialog.html",type:"GET",dataType:"html",async:false}).responseText;
  //弹框
  function showModal($control,$syControl,$dqControl) {
    var d = dialog({
      title: '选择素材',
      content: htmlobj,
        button: [
      {
        value: '确定',
        callback: function () {
          $control.html($(".tab-content").find(".in").find(".active").html());
          $syControl.removeClass("zu_radi");
          $dqControl.toggleClass("zu_radi");
        },
        autofocus: true
      },
      {
        value: '取消'
      }
    ]
    });
    
    d.showModal();
    $(".newimg .col-md-3").click(function(){
      $(".newimg .col-md-3").removeClass("active");
      $(this).addClass("active");
     }) 
    
  };
//内容设置
    var wbHtml="<div><input id='url' type='text' class='form-control url' placeholder='Url:' style='margin-left: 85px;width: 540px;'/></div><div id='urlError' class='error' style='display:none;margin-left: 85px;'>请输入URL</div>";
  var wbHtml1="<div><input id='urlDynamic' type='text' class='form-control urlDynamic' placeholder='动态Url:' style='margin-left: 85px;width: 540px;'/></div><div id='urlError' class='error' style='display:none;margin-left: 85px;'>请输入URL</div>";
    var wbHtml2='<div class="wenben">'+
                            '<textarea class="dute" style="height:120px;"></textarea>'+
                        '</div>'+
                        '<div id="wenben" class="error" style="display:none;margin-left: 85px;">请输入文本</div>';    
    $(document).on('click','.aa',function(){
      var _this=this;
      //changeDelBtn(_this);
        var $syControl=$(this).parents(".panel-group").find(".radi");
        var $dqControl=$(this).find(".radi");
        var $control = $(this).parents(".panel-group").find("#Control");
        if($(this).attr('id')=='URL1'){
          $syControl.removeClass("zu_radi");
          $dqControl.toggleClass("zu_radi");
          $control.html(wbHtml);
        }
        if($(this).attr('id')=='URL2'){
          $syControl.removeClass("zu_radi");
          $dqControl.toggleClass("zu_radi");
          $control.html(wbHtml1);
        }
        if($(this).attr('id')=='autoText'){
          $syControl.removeClass("zu_radi");
          $dqControl.toggleClass("zu_radi");
          $control.html(wbHtml2);
        }
        if($(this).attr('id')=='imgWord'){
          showModal($control,$syControl,$dqControl);
          $(".nav-tabs li").removeClass("active").eq(1).addClass("active");
        }
        if($(this).attr('id')=='imgPic'){
          showModal($control,$syControl,$dqControl);
        }
        if($(this).attr('id')=='media'){
          showModal($control,$syControl,$dqControl);
          $(".nav-tabs li").removeClass("active").eq(2).addClass("active");
        }
      })  

// 点击加号
var flag=true;
$(".jh").click(function(){
  $(this).parent().find(".tag_list").toggle();
});
$(".tag_list").children("ul").click(function(event) {
  $(this).parent().show();
  flag=false;
  //event.stopPropagation();
});
$(".jh").mouseout(function(event) {
  flag=true;
});
$(".jh").mouseover(function(event) {
  flag=false;
});
$(".tag_list").mouseleave(function(event) {
  flag=true;
});

$(document).click(function(){
  if(flag==true){
    $(".tag_list").hide();
  }
});

$(document).on("click",".checkbox",function(){
  flag=false;
  var _this=$(this);
  var thetimeout1=setTimeout(function() {
    if(_this.is(":checked")){
      var html='<div class="fll chenni mr20">'+
                    '<div class="guanbi">'+
                        '<img src="images/guanbi.png" class="x_ico">'+
                    '</div>'+
                    '<div class="nizi mrtf10 mrl10 mrr10 sltag" data-original-title="'+_this.next().text()+'">'+_this.next().text()+'</div>'+
                '</div>';
        $(".tags_div").append(html);
    }else{
        var text=_this.parent().find(".mrtf3").text();
        $(".tags_div").find("[data-original-title='"+text+"']").parents(".chenni").remove();
    };
  }, 100);
});

$(document).on("click",".x_ico",function(){
  var _this=$(this);
  $(".tag_list").find(".mrtf3").each(function(index,el){
    if($(el).text()==_this.parent().next().attr("data-original-title")){
      $(el).parent().find(".checkbox").removeAttr("checked");
    };
  });
  _this.parent().parent().remove();
});