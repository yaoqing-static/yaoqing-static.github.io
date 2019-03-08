/**
 * 调用native
 * @param api
 * @param version
 * @param param
 * @param callback
 * @param ignoreType 0:不可忽略, 1:android, 2:ios, 3:android&ios
 */

var callbackMap = {};
var callbackSeq = 0;
function callNative(api, version, param, callback) {
    try {
        var callbackId = null;
        if (callback) {
            callbackId = "callback" + (callbackSeq++);
            callbackMap[callbackId] = callback;
        }

        HztUtil.callFun(api, version, param, callbackId);
    } catch (e) {
        console.warn(e);
    }

    ///IOS
    setupWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler('IosJs', function(data, responseCallback) {
            responseCallback(data)
        })
        bridge.callHandler(api, param, callback)
    })
}