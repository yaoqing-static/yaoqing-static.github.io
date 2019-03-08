var dute=$(".dute");
$(document).on('keyup', ".dute",inputLint(600, true, function () {
}));

var urlurl=$(".url");
$(document).on('keyup', ".url",inputLint(6000, true, function () {
}));

var urlDynamic=$(".urlDynamic");
$(document).on('keyup', ".urlDynamic",inputLint(6000, true, function () {
}));

///////////
function inputLint(len, isNotEmpty, callback) {
  if (isNotEmpty) {
    return function () {
      var l = $(this).val().length;
      var blen = 0;
      for (i = 0; i < l; i++) {
        if (($(this).val().charCodeAt(i) & 0xff00) != 0) {
          blen++;
        }
        blen++;
      }
      $(this).next().text(parseInt(blen / 2) + '\/' + len);
      if ((blen / 2) <= len && blen !== 0) {
        $(this).next().css({color: 'rgb(51, 51, 51)'});
        $(this).parent().next().hide();
      } else {
        $(this).next().css({color: 'red'});
        $(this).parent().next().show();
      }
      callback.call(this);
    }
  } else {
    return function () {
      var l = $(this).val().length;
      var blen = 0;
      for (i = 0; i < l; i++) {
        if (($(this).val().charCodeAt(i) & 0xff00) != 0) {
          blen++;
        }
        blen++;
      }
      $(this).next().text(parseInt(blen / 2) + '\/' + len);
      if ((blen / 2) <= len) {
        $(this).next().css({color: 'rgb(51, 51, 51)'});
        $(this).parent().next().hide();
      } else {
        $(this).next().css({color: 'red'});
        $(this).parent().next().show();
      }
      callback.call(this);
    }
  }
};


////////
$(document).on('click','.qued', function () {
      $("input,textarea").trigger("keyup");
      if($(".error:visible").length==0){
        alert("ok");
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
    var wbHtml="<div><input id='url' type='text' class='form-control url' placeholder='Url:'/></div><div id='urlError' class='error' style='display:none;'>请输入URL</div>";
  var wbHtml1="<div><input id='urlDynamic' type='text' class='form-control urlDynamic' placeholder='动态Url:'/></div><div id='urlError' class='error' style='display:none;'>请输入URL</div>";
    var wbHtml2='<div class="wenben">'+
                            '<textarea class="dute" style="width:670px;height:120px;"></textarea>'+
                        '</div>'+
                        '<div id="wenben" class="error" style="display:none;">请输入文本</div>';   
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