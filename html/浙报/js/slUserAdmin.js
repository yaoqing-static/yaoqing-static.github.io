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
        _this.parents(".jiahao1").before(html);
    }else{
        var text=_this.parent().find(".mrtf3").text();
        _this.parents(".tagtag").find(".tags_div").find("[data-original-title='"+text+"']").parents(".chenni").remove();
    };
  }, 100);
});

$(document).on("click",".x_ico",function(){
  var _this=$(this);
  _this.parents(".tagtag").find(".tag_list").find(".mrtf3").each(function(index,el){
    if($(el).text()==_this.parent().next().attr("data-original-title")){
      $(el).parent().find(".checkbox").removeAttr("checked");
    };
  });
  _this.parent().parent().remove();
});

//列表Checkbox选择
$(".table_checkall").click(function() {
  console.log(this.checked);
    $("[name='table_checkbox']").prop("checked",this.checked); 
});
var tableCheckbox = $("[name='table_checkbox']");
tableCheckbox.click(function(){
    $(".table_checkall").prop("checked",tableCheckbox.length == $("[name='table_checkbox']:checked").length ? true : false);
});




    var validateBtn = document.getElementById('clickQr');
      validateBtn.onclick = function () {
           
            

            alert("ok");

            $(".modal-backdrop").remove();
            $(this).parents("#myModal").find(".bj_qx").trigger("click");
          
    };

    $(".oFirst").click(function(){
      var box=$(this).parents(".box");
      $("#myModal").find("#KucunNotNull").val(box.find(".h24").text());
      $("#whichBox").val(box.attr("id"));
    });


$("body").on("click",".edit",function(){
  $("#myModal").css("overflow","visible");
});