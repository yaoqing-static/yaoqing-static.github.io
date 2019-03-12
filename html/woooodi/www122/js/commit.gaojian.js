$(function() {
	$(".js-commit,.js-commit-bak").css({
		height: $(document).height() + "px",
	});
	$('#myEva').click(function() {
		$('.js-commit').css('display', 'block');
		$('.teacherEvaluation11').css('bottom', 0);
	});

	//关闭
	$('.js-commit-bak').click(function() {
		$(this).parent().hide();
	});

	$('.js-commit-star span').click(function(e) {
		var _this = $(this);
		var _c = e.pageX - _this.offset().left;

		var _star = Math.round(_c / 15);
		// console.log(_star);

		_this.attr('class', 'star' + _star).data('star', _star);
	});

	//提交
	$('#js-commmit-send').click(function() {
		var _obj = $('.js-commit-star span');
		var _str = $('.js-commit-body textarea').val();

		$.ajax({
			type: 'post',
			url: '/index.php?m=api&c=commit&a=add',
			data: {
				'catid': _obj.data('catid'),
				'id': _obj.data('id'),
				'star': _obj.data('star'),
				'content': _str
			},
			dataType: 'json',
			success: function(res) {
				console.info(res);
				if (res.data > 0) {
					alert_jifen(res.desc, res.data, function() {
						location.hash = 'commit';
						location.reload();
					});
				} else {
					alert_msg(res.desc, function() {
						location.hash = 'commit';
						location.reload();
					});
				}
			}
		});
	});
});