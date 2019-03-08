var alertHtml='<div class="relativeNew" style="position:absolute; z-index:11;"><div class="modal-content w335">'+
                            '<div class="modal-header">'+
                                '<div class="mai_box hei_box">'+
                                    '<img src="images/z-icon13.png"> 确认删除？'+
                                '</div>'+
                                '<div class="mai_box_one hei_box">'+
                                    '<p style="text-align: center">（删除后该菜单内的所有内容将失效）</p>'+
                                '</div>'+
                                '<div class="bt_box">'+
                                    '<div id="myButtons1" class="bs-example" style="text-align: center">'+
                                        '<button type="button" class="btn btn-primary bj_che ">确认</button>'+
                                        '<button type="button" class="btn btn-primary bj_qx">取消</button>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="xiaj">'+
                                    '<img src="images/jiankk.png" />'+
                                '</div>'+
                            '</div>'+
                  '</div></div>';

//$("body").append(alertHtml);
var saved=false;
var rulerName=$(".rulerName");
$(document).on('keyup', ".rulerName",inputLint(6, true, function () {
  var _this=this;
  changeDelBtn(_this);

}));

var keyword1=$(".keyword1");
$(document).on('keyup', ".keyword1",inputLint(600, true, function () {
  var _this=this;
  changeDelBtn(_this);

}));

var keyword2=$(".keyword2");
$(document).on('keyup', ".keyword2",inputLint(600, true, function () {
  var _this=this;
  changeDelBtn(_this);

}));

var dute=$(".dute");
$(document).on('keyup', ".dute",inputLint(600, true, function () {
  var _this=this;
  changeDelBtn(_this);

}));

var urlurl=$(".url");
$(document).on('keyup', ".url",inputLint(6000, true, function () {
  var _this=this;
  changeDelBtn(_this);

}));

var urlDynamic=$(".urlDynamic");
$(document).on('keyup', ".urlDynamic",inputLint(6000, true, function () {
  var _this=this;
  changeDelBtn(_this);

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

/////////////////////////

$(document).on("click",".yxj",function() {
  $(this).addClass("yxjhui").siblings().removeClass("yxjhui");
});

///validata/////////////
/*var validataFunc = function () {
  var validator = new Validator();
  validator.add(rulerName, [{
    strategy: 'isNotEmpty',
    errorMsg: function () {
      $('#rulerNameError').show();
    }
  }, {
    strategy: 'maxLength:12',
    errorMsg: function () {
      $('#rulerNameError').show();
    }
  }]);  
  validator.add(keyword1, [{
    strategy: 'isNotEmpty',
    errorMsg: function () {
      $('#keyword1Error').show();
    }
  }]);
  validator.add(keyword2, [{
    strategy: 'isNotEmpty',
    errorMsg: function () {
      $('#keyword2Error').show();
    }
  }]);
  validator.add(mess_1_text_content, [{
    strategy: 'isNotEmpty',
    errorMsg: function () {
      $('#mess_1_text_contentError').show();
    }
  }, {
    strategy: 'maxLength:12',
    errorMsg: function () {
      $('#mess_1_text_contentError').show();
    }
  }]);

  validator.add(urlurl, [{
    strategy: 'isNotEmpty',
    errorMsg: function () {
      $('#urlError').show();
    }
  }]);

  var errorMsg = validator.start();
  return errorMsg;
};*/
$("#dui1,#dui2").on("click",function(){
  $("#zhuantanError").hide();
});
//改变删除按键的状态
var cancelCount=null;
function changeDelBtn(obj){
  clearInterval(cancelCount);
  cancelCount=setInterval(function(){
    var empty=0;
    for(var i=0;i<$(obj).parents(".panel-group").find("input").length;i++){
      $(obj).parents(".panel-group").find("input[type='text']").eq(i).val()=="" ? empty++ :empty+=0;
    };
    for(var j=0;j<$(obj).parents(".panel-group").find("textarea").length;j++){
      $(obj).parents(".panel-group").find("textarea").eq(j).val()=="" ? empty++ :empty+=0;
    };
    //console.log(empty);
    if($(obj).parents(".panel-group").find(".error:visible").length==0 && empty==0 ){
      $(obj).parents(".panel-group").find(".quxiao").addClass('del').val("删除");
    }else{
      $(obj).parents(".panel-group").find(".quxiao").removeClass('del').val("取消");
      //$(".add").removeClass('addword')
    };
  },300);
};
////////
$(document).on('click','.qued', function () {
      var danxuan=false;

      
      if($(this).next(".quxiao").val()=="取消"){
        $("input[type='text'],textarea").trigger("keyup");
        return false;
      }else{
        alert("ok");
        $(".add").addClass('addword');
      }
    });




//下拉
$(document).on("click",".xial",function(){
  $(this).parents(".panel-group").find(".xiangn").toggle(200);
  $(this).parents(".panel-group").find(".neir").toggle(200);
});
//删除
$("body").on('click','.del',function(){
  var _this=$(this);
  _this.parent().find('.relativeNew').show();
  var modalContent=_this.parent().find('.modal-content');
  modalContent.css({"left":"50%","margin-left":-(modalContent.width()/2),"top":"50%","margin-top":-(modalContent.height()/2)});
  $("body").scrollTop(0).append('<div class="mask" style="height:'+(parseInt($("body").height())+parseInt(22))+'px; width:'+$("body").width()+'px;"></div>');

  $('.bj_che').off().on('click',function() {
        _this.parent().find('.relativeNew').hide();        
        $(".mask").remove();
        _this.parents(".panel-group").remove();
        if($(".panel-group").length==0){
          $(".add").addClass("addword");
        };
  });
  $('.bj_qx').off().on('click',function() {
        _this.parent().find('.relativeNew').hide();
        $(".mask").remove();
  });
})
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
    var wbHtml="<div><input id='url' type='text' class='form-control w540 url' placeholder='Url:'/></div><div id='urlError' class='error' style='display:none;'>请输入URL</div>";
  var wbHtml1="<div><input id='urlDynamic' type='text' class='form-control w540 urlDynamic' placeholder='动态Url:'/></div><div id='urlError' class='error' style='display:none;'>请输入URL</div>";
    var wbHtml2='<div class="wenben">'+
                            '<textarea class="dute"></textarea>'+
                        '</div>'+
                        '<div id="wenben" class="error" style="display:none;">请输入文本</div>';   
    $(document).on('click','.aa',function(){
      var _this=this;
      changeDelBtn(_this);
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
      
     
     


    $(document).on("click",".addword",function(){
      $(this).removeClass("addword");
      $(".relativeNew").hide();
      $(".xiangn").show();
      $(".neir").hide();
      var html = '<div class="fuize w730 panel-group" id="panelGroup0">'+
                    '<div class="jianx">'+
                        '<img src="images/jian1.png" />'+
                    '</div>'+
                    '<div class=" guanjx">'+
                        '<div class="xiangm fll">新规则</div>'+
                        '<div class="xial frr">'+
                            '<img src="images/xia.png" />'+
                        '</div>'+
                    '</div>'+

                    '<div class="xiangn display_none">'+
                        '<div class="rong">'+
                            '<ul>'+
                                '<li class="fabu w380 fll">关键词</li>'+
                                '<li class="fabu fll">积分；我的积分；积分查询；活动积分</li>'+
                            '</ul>'+
                            '<ul>'+
                                '<li class="fabu w380 fll">回复</li>'+
                                '<li class="fabu fll">1条（1条文本，0条素材，0条动态获取。）</li>'+
                            '</ul>'+
                        '</div>'+
                    '</div>'+

                    '<div class="neir clearfix">'+
                        '<div class="guize mrt15">'+
                            '<div class="fll kay nameu">规则名称</div>'+
                            '<div class="fll">'+
                                '<input id="rulerName" type="text" class="rulerName form-control w540 fll" />'+
                                '<span class="fen">0/6</span>'+
                            '</div>'+
                            '<p id="rulerNameError" class="rulerNameError display_none fll error">规则名称不能为空且长度不超过6个汉字或12个英文字母</p>'+
                        '</div>'+
                        '<div class="guize mrt15 qixiang_div">'+
                            '<div class="fll kay nameu">有限期</div>'+
                            /*'<div class=" mrl10 fll">'+
                                '<div class="mrt10 fll">'+
                                    '<div class="quan fll wuxiaoqidi" id="zhuan2">'+
                                        '<div id="tiao2">'+
                                            '<img src="images/dianjh.png" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="fll">'+
                                        '<div class="gudx">'+
                                            '无限期'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class=" mrl70 fll">'+
                                '<div class="mrt10 fll">'+
                                    '<div class="quan fll youxiaoqidi" id="zhuan3">'+
                                        '<div id="tiao3" class="di">'+
                                            '<img src="images/dianjh.png" />'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="fll relative youxiaoqi">'+
                                        '<div class="error date_error">结束时间不能大于开始时间</div>'+
                                        '<span class="fll">有效期</span>'+
                                        '<div class="data_paker fll display_none">'+
                                            '<input type="text" name="start_date" class="form-control fll ml10 mt9 w150 dataStart2" id="dataStart2">'+
                                            '<span class="fll">&nbsp;至</span>'+
                                            '<input type="text" name="end_date" class="form-control fll ml10 mt9 w150 dataStart3" id="dataStart3">'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+*/

                            '<div class="relative qixiang_div1">'+
                                '<div class="btn-group fll" data-toggle="buttons">'+
                                  '<label class="btn btn-primary wqx active">'+
                                    '<input type="radio" name="options" id="option1" checked>无限期'+
                                  '</label>'+
                                  '<label class="btn btn-primary yqx">'+
                                    '<input type="radio" name="options" id="option2"> 有效期'+
                                  '</label>'+
                                '</div>'+
                                    '<div class="data_paker fll display_none">'+
                                 '<div class="error date_error"  style="left: 275px;">结束时间不能大于开始时间</div>'+
                                        '<input type="text" name="start_date" class="form-control fll ml10 w150 dataStart2" id="dataStart2">'+
                                        '<span class="fll">&nbsp;至</span>'+
                                        '<input type="text" name="end_date" class="form-control fll ml10 w150 dataStart3" id="dataStart3">'+
                                    '</div>'+
                             '</div>'+

                        '</div>'+
                        '<div class="guize mrt15">'+
                            '<div class="fll kay nameu">优先级</div>'+
                            '<div class="w540 bob fll">'+
                                '<div class=" yxj fll mrl10 yxjhui">0</div>'+
                                '<div class=" yxj fll mrl35">1</div>'+
                                '<div class=" yxj fll mrl35">2</div>'+
                                '<div class=" yxj fll mrl35">3</div>'+
                                '<div class=" yxj fll mrl35">4</div>'+
                                '<div class=" yxj fll mrl35">5</div>'+
                                '<div class=" yxj fll mrl35">6</div>'+
                                '<div class=" yxj fll mrl35">7</div>'+
                                '<div class=" yxj fll mrl35">8</div>'+
                                '<div class=" yxj fll mrl35">9</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="guize mrt15 ">'+
                            '<div class="fll kay nameu">状态</div>'+
                            '<div class="btn-group" data-toggle="buttons">'+
                              '<label class="btn btn-primary active">'+
                                '<input type="radio" name="options" id="option1" checked>启用'+
                              '</label>'+
                              '<label class="btn btn-primary">'+
                                '<input type="radio" name="options" id="option2"> 停用'+
                              '</label>'+
                            '</div>'+
                            /*'<div class="zhuangt fll" id="dui1">'+
                                '<div class="fll wi20 di" id="fn1" style="display: block;"><img src="images/dui.png" /></div>'+
                                '<div class="fll wi20" id="fa1" style="display: none;"><img src="images/kongf.png" /></div>'+
                                '<div class="xiaozi fll">启用</div>'+
                            '</div>'+
                            '<div class="zhuangt fll mrl55" id="dui2">'+
                                '<div class="fll wi20 di" id="fn2"><img src="images/dui.png" /></div>'+
                                '<div class="fll wi20" id="fa2"><img src="images/kongf.png" /></div>'+
                                '<div class="xiaozi fll">停用</div>'+
                            '</div>'+*/
                        '</div>'+
                        //'<p id="zhuantanError" class="display_none error" style="margin-left: 130px;">请选择一种状态</p>'+
                        '<div class="clearfix mrt15">'+
                            '<div class="fll kay nameu">精准关键词</div>'+
                            '<div class="fll">'+
                                '<textarea class="dute keyword1" id="keyword1" placeholder="关键词之间逗号分隔"></textarea>'+
                            '</div>'+
                            '<p id="keyword1Error" class="display_none fll error keyword1" style="margin-left: 130px;">精准关键词不能为</p>'+
                        '</div>'+
                        '<div class="clearfix mrt15">'+
                            '<div class="fll kay nameu">模糊关键词</div>'+
                            '<div class="fll">'+
                                '<textarea class="dute keyword2" id="keyword2" placeholder="关键词之间逗号分隔"></textarea>'+
                            '</div>'+
                            '<p id="keyword2Error" class="display_none fll error keyword2" style="margin-left: 130px;">模糊关键词不能为</p>'+
                        '</div>'+
                        '<div class="guize mrt15">'+
                            '<div class="fll kay nameu">内容设置</div>'+
                            '<div class="bo_box mrt5">'+
                                '<div class="fll mrlf10 aa" id="autoText">'+
                                    '<span class="radi radi1 zu_radi"></span>'+
                                    '<span class=" xiaozi">文本</span>'+
                                '</div>'+
                                '<div class="fll mrl40 aa" id="imgPic">'+
                                    '<a id="tablist2-tab" href="#tablist2" aria-controls="tablist2" role="tab" data-toggle="tab" aria-expanded="false"> <span class="radi"></span>'+
                                        '<span class="xiaozi">图文</span></a>'+
                                '</div>'+
                                '<div class="fll mrl40 aa" id="imgWord">'+
                                    '<a id="tablist2-tab" href="#tablist2" aria-controls="tablist2" role="tab" data-toggle="tab" aria-expanded="false"> <span class="radi"></span>'+
                                        '<span class="xiaozi">图片</span></a>'+
                                '</div>'+
                                '<div class="fll mrl40 aa" id="media">'+
                                    '<span class="radi"></span>'+
                                    '<span class="xiaozi">影音</span>'+
                                '</div>'+
                                '<div class="fll mrl40 aa" id="URL1">'+
                                    '<span class="radi radi1"></span>'+
                                    '<span class="xiaozi">跳转页面</span>'+
                                '</div>'+
                                '<div class="fll mrl40 aa" id="URL2">'+
                                    '<span class="radi radi1"></span>'+
                                    '<span class="xiaozi">动态获取</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="guize mrt15 mrl130" id="Control">'+
                            
                                '<div class="wenben"><textarea class="dute"></textarea></div>'+
                                '<div id="wenben" class="error" style="display:none;">请输入文本</div>'+
                            
                        '</div>'+
                        '<div class="shangs frr">'+
                            '<input type="button" class=" qued fll" value="确定" />'+
                            '<input type="button" class="quxiao frr" value="取消" />'+


                            /*'<div class="relativeNew" style="top: -20px;left: 84px; z-index:11;"><div class="modal-content w335">'+
                                      '<div class="modal-header">'+
                                          '<div class="mai_box hei_box">'+
                                              '<img src="images/z-icon13.png"> 确认删除？'+
                                          '</div>'+
                                          '<div class="mai_box_one hei_box">'+
                                              '<p style="text-align: center">（删除后该菜单内的所有内容将失效）</p>'+
                                          '</div>'+
                                          '<div class="bt_box">'+
                                              '<div id="myButtons1" class="bs-example" style="text-align: center">'+
                                                  '<button type="button" class="btn btn-primary bj_che ">确认</button>'+
                                                  '<button type="button" class="btn btn-primary bj_qx">取消</button>'+
                                              '</div>'+
                                          '</div>'+
                                          '<div class="xiaj">'+
                                              '<img src="images/jiankk.png" />'+
                                          '</div>'+
                                      '</div>'+
                                '</div>'+
                            '</div>'+*/

                            '<div class="relativeNew" style="position: static;">'+
                                '<div class="modal-content w335 alert_cos">'+
                                    '<div class="modal-header">'+
                                        '<div class="mai_box hei_box"> 确认删除？</div>'+
                                        '<div class="mai_box_one hei_box clearfix">'+
                                            '<img src="images/u74.png">'+
                                            '<p class="fll">'+
                                                '<div class="title">删除提醒</div>'+
                                                '<div class="con">删除后该规则内的所有关键词将失效</div>'+
                                            '</p>'+
                                        '</div>'+
                                        '<div class="bt_box">'+
                                            '<div id="myButtons1" class="bs-example" style="text-align: center">'+
                                                '<button type="button" class="btn btn-primary bj_che ">确认</button>'+
                                                '<button type="button" class="btn btn-primary bj_qx">取消</button>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+


                        '</div>'+
                    '</div>'+

                '</div>';
      $(this).after(html);

        $(".panel-group:first").find('.dataStart2').val(moment().format('YYYY-MM-DD')).datetimepicker({
            lang: "ch",
            format: "Y-m-d H:i",
            timepicker: true,
            minDate: moment().format('YYYY/MM/DD'),
            startDate: moment().format('YYYY/MM/DD'),
            onClose: function() {
                dateStartGtdateEnd1($(".panel-group:first").find('.dataStart2'), $(".panel-group:first").find('.dataStart3'), $(".panel-group:first").find('.qixiang_div1'));
            }
        });
        $(".panel-group:first").find('.dataStart3').val(moment().format('YYYY-MM-DD')).datetimepicker({
            lang: "ch",
            format: "Y-m-d H:i",
            timepicker: true,
            minDate: moment().format('YYYY/MM/DD'),
            startDate: moment().format('YYYY/MM/DD'),
            onClose: function() {
                dateStartGtdateEnd1($(".panel-group:first").find('.dataStart2'), $(".panel-group:first").find('.dataStart3'), $(".panel-group:first").find('.qixiang_div1'));
            }
        });
    });