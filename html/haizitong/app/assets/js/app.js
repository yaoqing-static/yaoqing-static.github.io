var myApp = angular.module('myApp',[]);
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
if(getQueryString('web')==1){
    if (getQueryString('role') == 1 || getQueryString('role') == 2) {
        var authInfo = 'Basic NTUyNTAyOGYzMTNiMzcyNzJkMDAwMDE5OjlmMTVlZmE4YjljN2E3ODBlZDIwNWFkYjZlN2YyMjg4' //家长的
    } else {
        var authInfo = 'Basic NTkzNTE5YTRiNjIzY2E3OWIzOWE2ZmZjOjlkNDUwYjc4Y2JhNGMzYTI5MGJlMjliNDZkMzI5ZTcy';
    }
}


var openPhotoSwipe = function(items) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    // build items array
    // define options (if needed)
    //按钮样式设置
    var options = {
        // history & focus options are disabled on CodePen
        index:1,//控制打开的一张图片
        history: false,
        focus: false,
        closeEl:true,
        barsSize:{top:0,bottom:0},
        captionEl:false,
        fullscreenEl:false,
        shareEl:false,
        bgOpacity:0.85,
        tapToClose:true,
        tapToToggleControls:false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        indexIndicatorSep: ' / ',

    };
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};


