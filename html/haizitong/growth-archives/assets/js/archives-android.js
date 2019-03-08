/**
 * Created by maoting on 2017/11/30.
 */
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
console.log("current is Android = " + isAndroid + ", ua=" + u);

var node = document.createElement('link');
node.rel = 'stylesheet';
node.href = 'assets/css/archives-android.css';
document.getElementsByTagName('head')[0].appendChild(node);