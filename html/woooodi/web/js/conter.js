//$(".nav-y").height($(".content").height())
//导航控制js
$(".individual").click(function () {
    if ($(this).find("ul").length > 0) {
        $(".individual ul").slideUp(200)
        if ($(this).find("ul").css("display") == "block") {
            $(this).find("ul").slideUp(200)
        } else {
            $(this).find("ul").slideToggle(200)
        }
    }
})


//2

$(".top-name").click(function () {
  		$(".siderDonw").slideUp(200);
		$(".Nlist span").html("+")
        if ($(this).siblings(".siderDonw").css("display") == "block") {
            $(this).siblings(".siderDonw").slideUp(200)
			$(this).find("span").html("+")
        } else {
            $(this).siblings(".siderDonw").slideToggle(200)
			$(this).find("span").html("-")
        }
})



//日期插件
$.datetimepicker.setLocale('ch');//设置中文
$('.datetimepicker').datetimepicker({
    lang:"ch",           //语言选择中文
    value:moment().format('YYYY-MM-DD'),
    format:"Y-m-d",      //格式化日期
    timepicker:false    //关闭时间选项
});