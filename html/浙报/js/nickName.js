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
      window.setTimeout(function(){
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

