//登录注册

$(function() {
	function email_check() {
		var _reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var _email = $('input[name="email"]').val();
		return _reg.test(_email);
	}

	function mobile_check() {
		var _reg = /^1\d{10}$/;
		var _moblie = $('input[name="mobile"]').val();
		return _reg.test(_moblie);
	}

	$('.js-yzm-email').click(function() {
		if (!email_check()) {
			alert('请填写正确的邮箱');
		} else {
			//发送验证码
			$.ajax({
				type: 'post',
				url: '/index.php?m=api&c=yzm&a=email',
				data: {
					'type': $('.js-yzm-email').data('type'),
					'email': $('input[name="email"]').val()
				},
				dataType: 'json',
				success: function(res) {
					alert(res.desc);
				}
			});
		}
	});

	$('.js-yzm-mobile').click(function() {
		if (!mobile_check()) {
			alert('请填写正确的手机号');
		} else {
			//发送验证码
			$.ajax({
				type: 'post',
				url: '/index.php?m=api&c=yzm&a=mobile',
				data: {
					'type': $('.js-yzm-mobile').data('type'),
					'mobile': $('input[name="mobile"]').val()
				},
				dataType: 'json',
				success: function(res) {
					alert(res.desc);
				}
			});
		}
	});

	$('.form_email,.form_moblie').submit(function(e) {
		var arr = $(this).serializeArray();
		for (var i in arr) {
			if (!arr[i].value) {
				alert('请填写完整的注册信息');
				return false;
			}
		};
		return true;
	});
});