/**
 * Created by hzt-123 on 2018/6/25.
 */

var tempApp = angular.module('myApp', ['ngRoute',"oc.lazyLoad"]);
tempApp.config(["$provide","$compileProvider","$controllerProvider","$filterProvider",
    function($provide,$compileProvider,$controllerProvider,$filterProvider){
        tempApp.controller = $controllerProvider.register;
        tempApp.directive = $compileProvider.directive;
        tempApp.filter = $filterProvider.register;
        tempApp.factory = $provide.factory;
        tempApp.service  =$provide.service;
        tempApp.constant = $provide.constant;
    }]);

$(function() {
    FastClick.attach(document.body);
});
//IOS注册
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}


//native回调H5方法
function applyCallback(callbackName, params) {
    if (callbackMap.hasOwnProperty(callbackName)) {
        console.log(callbackMap)
        callbackMap[callbackName](params);
    }
}

window.alert=function (msg) {
  //信息框
  layer.open({
    content: msg
    ,btn: '确定'
  });
}
