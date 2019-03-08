//初始化
var slTuwenInfoArr=[
  {
    "id":0,
    "title":"",
    "author":"",
    "img":"",
    "desc":"",
    "content":"",
    "link":""
  }
];
var flag=false;
var titleName="标题";
var authorName="作者";
var imgName="封面";

var _indexOld,_indexNow=0;

var title_max = 64;
  // 作者限制字数
var author_max = 8;
  // 摘要限制字数
var desc_max = 120;

//
var slTuwenEdit={
  init:function(){
    var html='';
    for(var i=0,len=slTuwenInfoArr.length;i<len;i++){
      html+='<div class="tuwen" id="id'+slTuwenInfoArr[i].id+'">'+
                '<p class="default_tip" style="left: 100%;"><img class="edit" src="images/edit.gif"><img class="del" src="images/del.gif"></p>'+
                '<div class="tipq"><img id="image" src="'+slTuwenInfoArr[i].img+'"></div>'+
                '<div class="sib fon169">'+
                  '<span class="mrl10">'+slTuwenInfoArr[i].title+'</span>'+
                '</div>'+
              '</div>';
    };
    $(".xinou").before(html);
    $(".tuwen").eq(0).find(".del").hide();
    $("#title").val(slTuwenInfoArr[0].title);
    $("#author").val(slTuwenInfoArr[0].author);
    $("#img").attr("src",slTuwenInfoArr[0].img);
    $("#desc").val(slTuwenInfoArr[0].desc);
    //$("#content").val(slTuwenInfoArr[0].content);    
    //ue.setContent(slTuwenInfoArr[0].content);
    ue.ready(function(){
      ue.setContent(slTuwenInfoArr[0].content);
    })
    $("#link").val(slTuwenInfoArr[0].link);
    $(".youoi").attr("id","idd"+slTuwenInfoArr[0].id);
    _indexOld=slTuwenInfoArr[0].id;
  },
  add:function(){
    var newId=parseInt($(".tuwen:last").attr("id").replace("id",""))+1;//最好改成由后台生成Id，能过Ajax传回来。
    var newJson='{'+
        '"id":'+newId+','+
        '"title":"",'+
        '"author":"",'+
        '"img":"",'+
        '"desc":"",'+
        '"content":"",'+
        '"link":""'+
        '}';
    slTuwenInfoArr.push($.parseJSON(newJson));//新加一个元素
    
    $(".xinou").before('<div class="tuwen" id="id'+newId+'">'+
                '<p class="default_tip" style="left: 100%;"><img class="edit" src="images/edit.gif"><img class="del" src="images/del.gif"></p>'+
                '<div class="tipq"><img id="image" src=""></div>'+
                '<div class="sib fon169">'+
                  '<span class="mrl10"></span>'+
                '</div>'+
              '</div>');
    _indexNow=_indexOld+1;
    slTuwenEdit.edit($(".tuwen:last").find(".edit"));
    $("#title",".youoi").val("");
    $("#author",".youoi").val("");
    $("#img",".youoi").attr("src","");
    $("#desc",".youoi").val("");
    //$("#content",".youoi").val("");
    //ue.setContent("");
    ue.ready(function(){
      ue.setContent("");
    })
    $("#link",".youoi").val("");
  },
  edit:function(obj){
    var tuwen=$(".tuwen");
   _indexOld=$(".youoi").attr("id").replace("idd","");
   _indexNow=obj.parents(".tuwen").attr("id").replace("id","");
    //将当前的保存到临时Json中。
    var oldJson;//原来Json
    oldJson={
      "id":_indexOld,
      "title":$("#title").val(),
      "author":$("#author").val(),
      "img":$("#id"+_indexOld).find("#image").attr("src"),
      "desc":$("#desc").val(),
      "content":ue.getContent(),
      "link":$("#link").val()
    };

    $.each(slTuwenInfoArr,function(index, el) {
      if(el.id==_indexOld){
        $.extend(slTuwenInfoArr[index],oldJson);
      };
      if(el.id==_indexNow){
        $("#title").val(slTuwenInfoArr[index].title);
        $("#author").val(slTuwenInfoArr[index].author);
        $("#img").attr("src",slTuwenInfoArr[index].img);
        $("#desc").val(slTuwenInfoArr[index].desc);
        ue.ready(function(){
          ue.setContent(slTuwenInfoArr[index].content);
        })
        $("#link").val(slTuwenInfoArr[index].link);
        $(".youoi").attr("id","idd"+slTuwenInfoArr[index].id).find("div.error").remove();
      };
    });
    $(".youoi").attr("id","idd"+_indexNow);

    //移动右边
    $(".youoi").css("margin-top",$("#id"+_indexNow).position().top);
   slTuwenEdit.validate("#title",title_max);
   slTuwenEdit.validate("#author",author_max);
   slTuwenEdit.validate("#desc",desc_max);

  },
  delete:function(obj){
    var _index=obj.parents(".tuwen").attr("id").replace("id","");
    $("#id"+_index).remove();
    $.each(slTuwenInfoArr,function(index,el){
      if(el.id==_index){
        slTuwenInfoArr.splice(index,1);
        return false;
      };
    });
    $("#title").val(slTuwenInfoArr[0].title);
    $("#author").val(slTuwenInfoArr[0].author);
    $("#img").attr("src",slTuwenInfoArr[0].img);
    $("#desc").val(slTuwenInfoArr[0].desc);
    ue.ready(function(){
      ue.setContent(slTuwenInfoArr[0].content);
    })
    $("#link").val(slTuwenInfoArr[0].link);
    $(".youoi").attr("id","idd"+slTuwenInfoArr[0].id);
    _indexNow=slTuwenInfoArr[0].id;
    //移动右边
    $(".youoi").css("margin-top",$("#id"+_indexNow).position().top);
   slTuwenEdit.validate("#title",title_max);
   slTuwenEdit.validate("#author",author_max);
   slTuwenEdit.validate("#desc",desc_max);

  },
  save:function(obj){
    slTuwenEdit.validatePage();
    if(flag==true){
      $.ajax({
        //接收保存信息的URL
        url:"http://localhost/newmedia/%E9%A1%B5%E9%9D%A2%E5%88%B6%E4%BD%9C/%E5%88%B6%E4%BD%9C%E7%A8%BF(%E6%AD%A3%E7%89%88%E7%89%88)/%E8%BF%90%E8%90%A5%EF%BC%8D%E7%B4%A0%E6%9D%90%E7%AE%A1%E7%90%86-%E6%96%B0%E5%BB%BA%E5%9B%BE%E6%96%87_%E4%BF%AE%E6%94%B9.html",
        data:slTuwenInfoArr,
        success:function(data){
          console.log("Ok");
        }
      });
    };
  },
  validate:function(id,max){//验证各输入框
    var describe_content = $(id).val();
    if (len(describe_content) <= desc_max) {
      $(id).next(".fen").removeClass('error').text(len(describe_content)+"/"+max);
    } else {
      $(id).next(".fen").addClass('error').text(len(describe_content)+"/"+max);
    }
  },
  validatePage:function(){
    var titleDiv=$("#title").parents(".w450");
    titleDiv.find("div.error").remove();
    var authorDiv=$("#author").parents(".w450");
    authorDiv.find("div.error").remove();
    var imgDiv=$("#img").parents(".w450");
    imgDiv.find("div.error").remove();
    var contentDIv=$("#content").parent();
    contentDIv.find("div.error").remove();
    slTuwenEdit.edit($(".tuwen:last").find(".edit"));
    $.each(slTuwenInfoArr,function(index,el){
      var html="";
      var arrcontent;
      if(slTuwenInfoArr[index].content=="" || slTuwenInfoArr[index].content.length>20000){
        contentDIv.prepend('<div class="error">正文不能为空且不能超过20000个字</div>');
        html='<div class="error">正文不能为空且不能超过20000个字</div>';
      };
      if($("#desc").next(".fen").hasClass('error')){
        html='<div class="error">'+descName+'不能为空且长度不能超过'+desc_max+'个字</div>';
      };
      if(slTuwenInfoArr[index].img==""){
        imgDiv.prepend('<div class="error" style="margin-left: 70px;">必需插入一张图片</div>');
        html='<div class="error">必需插入一张图片</div>';
      };
      if(slTuwenInfoArr[index].author==""|| $("#author").next(".fen").hasClass('error')){
        authorDiv.prepend('<div class="error" style="margin-left: 70px;">'+authorName+'不能为空且长度不能超过'+author_max+'个字</div>');
        html='<div class="error">'+authorName+'不能为空且长度不能超过'+author_max+'个字</div>';
      };
      if(slTuwenInfoArr[index].title=="" || $("#title").next(".fen").hasClass('error')){
        titleDiv.prepend('<div class="error" style="margin-left: 70px;">'+titleName+'不能为空且长度不能超过'+title_max+'个字</div>');
        html='<div class="error">'+titleName+'不能为空且长度不能超过'+title_max+'个字</div>';
      };
      $("#fixedErrorDiv").remove();
      if(html != ""){
        $("body").append('<div id="fixedErrorDiv"><span>'+html+'</span></div>');
      }
      
      window.setTimeout(function(){
        $("#fixedErrorDiv").fadeOut(300);
        clearTimeout();
      },2000);
       if($(".youoi").find(".error").length>0){
        //移动右边
        var positionTop=$("#id"+index).position().top;
        $(".youoi").attr("id","idd"+slTuwenInfoArr[index].id).css("margin-top",positionTop);
        $("#title").val(slTuwenInfoArr[index].title);
        $("#author").val(slTuwenInfoArr[index].author);
        $("#img").attr("src",slTuwenInfoArr[index].img);
        $("#desc").val(slTuwenInfoArr[index].desc);
        ue.ready(function(){
          ue.setContent(slTuwenInfoArr[index].content);
        })
        $("#link").val(slTuwenInfoArr[index].link);
        //滚动条平滑移动
        $("html,body").animate({scrollTop:positionTop+140},1000);
        flag=false;
        return false;
       }else{
        flag=true; 
       };
    });
  }
};


//文本编辑器

var ue = UE.getEditor('content');   
//文本编辑器结束

slTuwenEdit.init();
$(".jiaop").on("click",function(){
  slTuwenEdit.add();
});
$(document).on('mouseover','.tuwen',function(){
    $(this).children('.default_tip').css('left',0);
});
$(document).on('mouseout','.tuwen',function(){
    $(this).children('.default_tip').css('left',100+'%');
});
$(document).on('click','.edit',function(){
    slTuwenEdit.edit($(this));
});
$(document).on('click','.del',function(){
    slTuwenEdit.delete($(this));
});
$(document).on('click','#submit',function(){
    slTuwenEdit.save();
});

//自动保存正文
var autoSaveContent=window.setInterval(function(){
  slTuwenInfoArr[_indexNow].content=ue.getContent();
  var myDate=new Date();      
  var year=myDate.getFullYear();
  var month=myDate.getMonth()+1;
  var date=myDate.getDate();
  var hours=myDate.getHours();
  var minutes=myDate.getMinutes();
  var seconds=myDate.getSeconds();
  parseInt(month)<10 ? month=("0"+ month) : month=month;
  parseInt(date)<10 ? date=("0"+ date) : date=date;
  parseInt(hours)<10 ? hours=("0"+ hours) : hours=hours;
  parseInt(minutes)<10 ? minutes=("0"+ minutes) : minutes=minutes;
  parseInt(seconds)<10 ? seconds=("0"+ seconds) : seconds=seconds;
  $("#autoSave").html(year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds);
},10000);
      /////////////
//验证
$("#title").off().bind(
      "change keyup",
      function() {
        var _this=$(this);
        var title_content = $("#title").val();
        _this.parents(".w450").find(".error").remove();
        if (len(title_content) <= title_max) {
          _this.next(".fen").removeClass('error').text(len(title_content)+"/"+title_max);
          var tuwenId="id"+$(_this.parents(".youoi")).attr("id").replace("idd","");
          $("#"+tuwenId).find(".sib").text(title_content);
        } else {
          _this.next(".fen").addClass('error').text(len(title_content)+"/"+title_max);;
        }
      });

  $("#author").off().bind(
      "change keyup",
      function() {
        var _this=$(this);
        var author_content = $("#author").val();
        _this.parents(".w450").find(".error").remove();
        if (len(author_content) <= author_max) {
          _this.next(".fen").removeClass('error').text(len(author_content)+"/"+author_max);
        } else {
          _this.next(".fen").addClass('error').text(len(author_content)+"/"+author_max);
        }
      });

  $("#desc").off().bind(
      "change keyup",
      function() {
        var _this=$(this);
        var describe_content = $("#desc").val();
        _this.parents(".w450").find(".error").remove();
        if (len(describe_content) <= desc_max) {
          _this.next(".fen").removeClass('error').text(len(describe_content)+"/"+desc_max);
        } else {
          _this.next(".fen").addClass('error').text(len(describe_content)+"/"+desc_max);
        }
      });
  //删除图片
  $("#delImg").off().bind("click", function() {
    $('#img').attr('src', 'images/jiahao.png');
    var tuwenId="id"+$(this).parents(".youoi").attr("id").replace("idd","");
    $("#"+tuwenId).find("#image").attr("src","");
  });
  //编辑器内容发生改变时
  ue.addListener( 'selectionchange', function() {
    if(ue.getContent()!=""){
     $("#content").parent().find(".error").remove();
    }
  });

var len = function(content) {
  return content.replace(/[^\x00-\xff]/g, "**").length; // 将中文认为是两个字，返回2
};
