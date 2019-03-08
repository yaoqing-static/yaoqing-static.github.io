
setIphoneScreenSize();

function setIphoneScreenSize() {
    var u = navigator.userAgent;
    var isIPhone = u.indexOf("iPhone") > -1;

    if(isIPhone) {
        // var head=document.getElementsByTagName('HEAD')[0];
        // var style=document.createElement('link');
        // style.href='css/iphone-screen.css';
        // style.rel='stylesheet';
        // style.type='text/css';
        // head.appendChild(style);
    }
}

function setMinHeightChangeListener(minHeight) {
	var myWin = window, myTid;
	myWin.addEventListener('resize', function() {
	    clearTimeout(myTid);
	    myTid = setTimeout(function(){calMinHeight(minHeight);}, 100);
	}, false);
	myWin.addEventListener('pageshow', function(e) {
	    if (e.persisted) {
	        clearTimeout(myTid);
	        myTid = setTimeout(function(){calMinHeight(minHeight);}, 100);
	    }
	}, false);
	calMinHeight(minHeight);
}

function calMinHeight(targetMinHeight) {
	var cWidth = getWindowWidth();
	cWidth = cWidth > 720 ? 720 : cWidth;
	var minHeight = parseInt(cWidth) * targetMinHeight / 720.0;
	minHeight = minHeight < targetMinHeight ? targetMinHeight : minHeight;
	console.log("minHeight:" + minHeight);
	$("body").css("min-height", minHeight);
	$("html").css("min-height", minHeight);
	$(".wrap").css("min-height", minHeight);
	$(".main").css("min-height", minHeight);
	$(".search-item-layer").css("min-height", minHeight);
}

function getWindowWidth() {
	return $(window).width();
}

function getWindowHeight() {
	return $(window).height();
}

function goBack() {
	if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {             
		// window.location.href = window.document.referrer;
		window.history.back();
    } else { 
    	window.history.go(-1); 
    }
}

function copyToClipboard(selector, type) {
	if(type == 1) {
		try {
			window.touch.setAppClipboardData(location.href);
		} catch (e) {
			console.log('it will never see');
		}
	} else if(type == 2) {

	} else {
		var clipboard = new Clipboard(selector, {
	    	text: function() {
	    		return location.href;
	    	}
	    });

	    clipboard
	        .on("success", function(e) {
	        	$("#modalTitle").html("活动链接复制成功");
	        	$("#modalBody").html("链接已复制到黏贴板!");
	        	$("#myModal").modal();
	        })
	        .on("error", function(e) {
	        	$("#modalTitle").html("活动链接复制失败，请手动复制");
	        	$("#modalBody").html("<input class='share-selection' readonly=readonly value='" + location.href + "'/>");
	        	$("#myModal").modal();
	        	$("#myModal").on("shown.bs.modal", function() {
	        		$(".share-selection").on("touchend", function(e) {
	        			e.preventDefault();
	        			// setTimeout(function(){
			        		this.selectionStart = 0;
			        		this.selectionEnd = this.value.length;
	        			// }, 200);
	        		});
	        		$(".share-selection").focus(function() {
	        			setTimeout(function(){
	        				$(".share-selection").select();
			        		// this.selectionStart = 0;
			        		// this.selectionEnd = $(this).val().length;
	        			}, 200);
	        		});
	        	});
	        });
	/*		var client = new ZeroClipboard(document.getElementById("share"));
			client.on("ready", function(readyEvent) {
				client.on("copy", function(event) {
					var clipboard = event.clipboardData;
					clipboard.setData("text/plain", "Copy me!!!");
				});
				client.on("aftercopy", function(event) {
					event.target.style.display = "none";
					alert("copied: " + event.data["text/plain"]);
				})
			});

			client.on("error", function(event) {
				alert("copy failed");
				ZeroClipboard.destroy();
			});
	*/
	}
	
}

function mobileClick(selector, fun) {
	$(selector)
		.on('click', fun)
		.on('touchend', fun);
}

//解决移动端:active伪类失效问题,如果使用这种方式，有个小bug，按下并移出，touchend事件没有被执行
function mobilePressCss(selector, noActiveCss, activeCss) {
	$(selector)
		.on("touchend", function() {
			var _that = this;
			setTimeout(
				function(){$(_that).css(noActiveCss)},
				100);
		})
		.on("touchstart", function() {$(this).css(activeCss)});
}

//预加载图片防止图片闪烁
function preloadImg() {
	var images = new Array();
	for(var i=0; i<preloadImg.arguments.length; i++) {
		images[i] = new Image();
		images[i].src = preloadImg.arguments[i];
	}
}

function getAllWindowHeight() {
	alert("winH:" + $(window).height() + //浏览器时下窗口可视区域高度
	"\ndocH:" + $(document).height() + //浏览器时下窗口文档的高度
	"\nbodyH:" + $(document.body).height() + //浏览器时下窗口文档body的高度
	"\nbodyOuterH:" + $(document.body).outerHeight(true) + //浏览器时下窗口文档body的总高度 包括border padding margin
	"\nwinW:" + $(window).width() + //浏览器时下窗口可视区域宽度
	"\ndocW:" + $(document).width() + //浏览器时下窗口文档对于象宽度
	"\nbodyW:" + $(document.body).width() + //浏览器时下窗口文档body的高度
	"\nbodyOuterW:" + $(document.body).outerWidth(true) + //浏览器时下窗口文档body的总宽度 包括border padding margin
	  
	"\nscrollTop:" + $(document).scrollTop() + //获取滚动条到顶部的垂直高度
	"\nscrollLeft:" + $(document).scrollLeft()); //获取滚动条到左边的垂直宽度
}


function checkCookieEnable() {  
	if(window.navigator.cookieEnabled)  
	   return true;  
	else{
	   return false;
	}  
}  

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

/*var fixScreen = function() {
	doc = $(document);
    var metaEl = doc.querySelector('meta[name="viewport"]'),
        metaCtt = metaEl ? metaEl.content : '',
        matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
        matchWidth = metaCtt.match(/width=([^,\s]+)/);

    if ( !metaEl ) { // REM
        var docEl = doc.documentElement,
            maxwidth = docEl.dataset.mw || 720, // 每 dpr 最大页面宽度
            dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
            scale = 1 / dpr,
            tid;

        alert(dpr);
        docEl.removeAttribute('data-mw');
        docEl.dataset.dpr = dpr;
        metaEl = doc.createElement('meta');
        metaEl.name = 'viewport';
        metaEl.content = 'initial-scale=' + ratio + ',maximum-scale=' + ratio + ', minimum-scale=' + scale;
        docEl.firstElementChild.appendChild(metaEl);

        var refreshRem = function() {
            var width = docEl.getBoundingClientRect().width;
            if (width / dpr > maxwidth) {
                width = maxwidth * dpr;
            }
            var rem = width / 16;
            docEl.style.fontSize = rem + 'px';
        };

        refreshRem();
    }
}*/

function fullScreen() {
	var docElm = document.documentElement;
	//W3C  
	if (docElm.requestFullscreen) {  
	    docElm.requestFullscreen();  
	}
	//FireFox  
	else if (docElm.mozRequestFullScreen) {  
	    docElm.mozRequestFullScreen();  
	}
	//Chrome等  
	else if (docElm.webkitRequestFullScreen) {  
	    docElm.webkitRequestFullScreen();  
	}
	//IE11
	else if (elem.msRequestFullscreen) {
	  elem.msRequestFullscreen();
	}
}

function getBubbleTextWidth(text) {
	var sensor = $("<span class='bubble'>" + text + "</span>").css({display: 'none'});
	$("body").append(sensor);
	var width = sensor.width();
	sensor.remove();
	return width;
}
