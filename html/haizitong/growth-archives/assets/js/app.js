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

myApp.directive('templateMould', ['$document', function($document) {
    return {
        restrict: 'AE',
        scope: {
            type: '=type',
            modelData:'=modelData'
        },
        templateUrl:'components/template-archives.html',
        link: function(scope, element, attr) {}
    };
}]);

// console.log("headerVersion:"+$.cookie("headerVersion"))
var bgColor=$.cookie("themeColor");
//    bgColor='ff2157f3'
var THEME_ORANGE = 0;
var THEME_BLUE = 1;
if(bgColor && bgColor.length > 7) {
    bgColor = "#" + bgColor.substring(3);
} else {
    bgColor = "#FF5722";
}
bgColor = bgColor.toUpperCase();











