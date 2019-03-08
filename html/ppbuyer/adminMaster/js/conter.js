$(".nav-y").height($(".content").height())

$(".dilog-box,.dilog-box2").click(function(){
    $(this).hide()
})
$(".dilog-box .con").click(function(e){
    e.stopPropagation()
})
$(".user a").click(function(e){
    e.stopPropagation()
    $(".select-down").show()
})
$("body").click(function(){
    $(".select-down").hide()
})
$(".handover-merchant").click(function(event) {
	/* Act on the event */
	  $(".dilog-box2").css("display","flex")
});
$(".dilog-box2 .con").click(function(event) {
	/* Act on the event */
	event.stopPropagation();
});

