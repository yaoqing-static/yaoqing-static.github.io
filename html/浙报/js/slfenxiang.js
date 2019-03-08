$('[data-toggle="tooltip"]').tooltip();

var flag=true;

$(".jiahao").click(function(event) {
  $(this).parent().find(".fenxf ").toggle();
  
});
$(".fenxf").click(function(event) {
  $(this).show();
  //event.stopPropagation();
});

$(document).on("mouseover",".up",function(){
  $(this).children(".x_ico").show();
});
$(document).on("mouseout",".up",function(){
  $(this).children(".x_ico").hide();
});

$(document).on("click",".checkbox",function(){
  flag=false;
  var _this=$(this);
  var thetimeout=setTimeout(function() {
    if(_this.is(":checked")){
      var html='<div class="fll w27 tu27 mrl05 pointer relative up" data-toggle="tooltip" data-placement="bottom" data-original-title="'+_this.parent().find(".nizi").text()+'">'+
                        '<img src="images/x.gif" class="x_ico" title="删除" />'+
                        '<img src="'+_this.next().children().attr("src")+'" />'+
                    '</div>'
        $(".fenxiang_div").append(html);
        $('[data-toggle="tooltip"]').tooltip();
    }else{
        var text=_this.parent().find(".nizi").text();
        $(".fenxiang_div").find(".up[data-original-title='"+text+"']").remove();
    };
  }, 200);
});

$(document).on("click",".x_ico",function(){
  var _this=$(this);
  _this.parent().remove();
  $(".tooltip").remove();
  $(".gundon").find(".nizi").each(function(index,el){
    if($(el).text()==_this.parent().attr("data-original-title")){
      $(el).parent().find(".checkbox").removeAttr("checked");
    };
  });
});


$(".jiahao").mouseout(function(event) {
  flag=true;
});
$(".jiahao").mouseover(function(event) {
  flag=false;
});
$(".fenxf").mouseleave(function(event) {
  flag=true;
});

$(document).click(function(){
  if(flag==true){
    $(".fenxf").hide();
  }
});