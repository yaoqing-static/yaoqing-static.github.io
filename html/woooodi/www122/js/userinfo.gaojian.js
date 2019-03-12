$(function() {

	//选择
	$('input[data-reveal=modal-main]').live('click', function(e) {
		e.preventDefault();
		var _text = $(this).siblings('div').text();
		var _name = $(this).data('name');
		var _val = $(this).val();

		$('#modal-main h1').text(_text);
		$('#modal-main-input').data('name', _name);
		$('#modal-main-input').val(_val);

		$('#modal-main').reveal();
	});

	//提交
	$('#modal-main-submit').click(function() {
		var _name = $('#modal-main-input').data('name');
		var _val = $('#modal-main-input').val();

		$.ajax({
			type: 'post',
			url: '/index.php?m=member&c=edit&a=part',
			data: {
				'name': _name,
				'val': _val
			},
			dataType: 'json',
			success: function(res) {
				console.log(res);
				if (res.status == 100) {
					$('input[data-name=' + _name + ']').val(_val);
					$('.close-reveal-modal').trigger('click');

					if (res.data == 'all') {
						alert_jifen(res.desc, 200);
					}
				} else {
					alert_msg(res.desc);
				}
			}
		});
	});

	//年龄日期选择
	$("#USER_AGE").mobiscroll({
		theme: 'android-ics light', //皮肤样式
		display: 'modal', //显示方式 
		mode: 'scroller', //日期选择模式
		dateFormat: 'yyyy-mm-dd',
		lang: 'zh',
		showNow: true,
		nowText: "今天",
		startYear: 2015 - 100, //开始年份
		endYear: 2015, //结束年份
		preset: 'date'
	});
	$('#USER_AGE').change(function() {
		var _ymd = $('#USER_AGE').attr('alt');
		$.ajax({
			type: 'post',
			url: '/index.php?m=member&c=edit&a=part',
			data: {
				'name': 'birthday',
				'val': _ymd
			},
			dataType: 'json',
			success: function(res) {
				console.log(res);
				if (res.status == 100) {
					$('input[data-name=birthday]').attr('alt', _ymd);
					$('.close-reveal-modal').trigger('click');

					if (res.data == 'all') {
						alert_jifen(res.desc, 200);
					}
				} else {
					alert_msg(res.desc);
				}
			}
		});
	})

	//性别
	$('input[data-reveal=modal-sex]').live('click', function(e) {
		e.preventDefault();
		$('#modal-sex').reveal();
	});

	$('#modal-sex a').live('click', function() {
		var _sex = $(this).data('val');
		$.ajax({
			type: 'post',
			url: '/index.php?m=member&c=edit&a=part',
			data: {
				'name': 'sex',
				'val': _sex
			},
			dataType: 'json',
			success: function(res) {
				console.log(res);
				if (res.status == 100) {
					if (res.data == 'all') {
						alert_jifen(res.desc, 200, function() {
							location.reload();
						});
					} else {
						location.reload();
					}
				} else {
					alert_msg(res.desc);
				}
			}
		});
	});

});