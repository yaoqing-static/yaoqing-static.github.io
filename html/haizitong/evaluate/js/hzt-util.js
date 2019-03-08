/**
 * 调用native
 * @param api
 * @param version
 * @param param
 * @param callback
 * @param ignoreType 0:不可忽略, 1:android, 2:ios, 3:android&ios
 */

function callNative(api, version, param, callback) {
    try {
        HztUtil.callFun(api, version, param, callback);
    } catch (e) {
        console.warn(e);
    }
}