//自定义alert
function alert_msg(a, callback, t) {
	t = t || 2000;
	$('.js-alert-msg').remove();
	$('body').append('<div class="js-alert-msg">' + a + '</div>');
	setTimeout(function() {
		$('.js-alert-msg').fadeOut(500, callback);
	}, t);
}

//加分弹窗
function alert_jifen(a, b, callback) {
	$('.js-alert-jifen').remove();
	$('body').append('<div class="js-alert-jifen"><div class="name1">' + a + '</div><div class="con1">获得<i></i>+<em>' + b + '</em></div></div>');
	setTimeout(function() {
		$('.js-alert-jifen').fadeOut(500, callback);
	}, 2000);
}

//浏览计数
$(function() {
	var _catid = $('html').data('catid');
	var _id = $('html').data('id');

	if (_catid && _id) {
		$.ajax({
			type: 'post',
			url: '/index.php?m=api&c=view&a=add',
			data: {
				'catid': _catid,
				'id': _id
			}
		});
	}
});

//点赞
$(function() {
	$('.icon_zan a').click(function() {
		var _this = $(this);
		var _catid = _this.data('catid');
		var _id = _this.data('id');

		$.ajax({
			type: 'post',
			url: '/index.php?m=api&c=like&a=add',
			data: {
				'catid': _catid,
				'id': _id
			},
			dataType: 'json',
			success: function(res) {
				console.info(_catid, _id);
				if (res.data == 1) {
					//success
					var _dom = _this.find('span');
					_dom.text(parseInt(_dom.text()) + 1);
					alert_jifen(res.desc, 5);
				} else if (res.data == 2) {
					//had like
					alert_msg(res.desc);
				} else {
					//no login
					var _url = MEMBER_PATH + '&forward=' + encodeURIComponent(location.href);
					location.href = _url;
				}
			}
		});
	});
});

//收藏关注
$(function() {
	var likename_type = function($a) {
		if ($.inArray($a, [1, 2]) > -1) {
			return '收藏';
		} else {
			return '关注';
		}
	}

	var js_like_url = '/index.php?m=api&c=collect&a=';
	var js_like_arr = $('.js_like');
	$.each(js_like_arr, function(k, _this) {
		$.ajax({
			type: 'post',
			url: js_like_url + 'is',
			data: {
				'catid': $(_this).data('catid'),
				'id': $(_this).data('id')
			},
			dataType: 'json',
			success: function(res) {
				_this = $(_this);
				_desc = likename_type(_this.data('catid'));

				if (res.data == 1) { //like
					if (_this.data('text') !== 0) {
						_this.html('已' + _desc);
					}
					_this.addClass('js_css_liked');
				}
			}
		});
	});

	//关注操作
	js_like_arr.click(function(e) {
		var _this = $(this);
		$.ajax({
			type: 'post',
			url: js_like_url + 'ex',
			data: {
				'catid': _this.data('catid'),
				'id': _this.data('id')
			},
			dataType: 'json',
			success: function(res) {
				_desc = likename_type(_this.data('catid'));

				if (res.data == 1) {
					//like
					if (_this.data('text') !== 0) {
						_this.html('已' + _desc);
					}
					_this.addClass('js_css_liked');
					alert_msg(_desc + '成功');
				} else if (res.data == 2) {
					//cancel like
					if (_this.data('text') !== 0) {
						_this.html(_desc);
						_this.removeClass('js_css_liked');
					}
					_this.removeClass('js_css_liked');
					alert_msg('取消' + _desc + '成功');
				} else {
					//no login
					var _url = MEMBER_PATH + '&forward=' + encodeURIComponent(location.href);
					location.href = _url;
				}
			}
		});
	});
});

function is_pc() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}