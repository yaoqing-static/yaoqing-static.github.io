(function($){
	//zyj的tab
	$.fn.extend({
		all_tab:function(l){
			l = $.extend({
				defaultIndex: 0,
				titOnClassName: "cur",
				titCell: ".tab a",
				mainCell: ".tab_con",
				delayTime: 250,
				interTime: 0,
				trigger: "hover",
				effect: "",
				omitLinks: false,
				version: 120
			}, l);
			this.each(function() {
				var b;
				var c = -1;
				var d = $(this);
				if (l.omitLinks) {
					l.titCell = l.titCell + "[href^='#']"
				}
				var e = d.find(l.titCell);
				var f = d.find(l.mainCell);
				var g = e.length;
				var h = function(a) {
						if (a != c) {
							e.eq(c).removeClass(l.titOnClassName);
							f.hide();
							d.find(l.titCell + ":eq(" + a + ")").addClass(l.titOnClassName);
							if (l.delayTime < 250 && l.effect != "") l.effect = "";
							if (l.effect == "fade") {
								d.find(l.mainCell + ":eq(" + a + ")").fadeIn({
									queue: false,
									duration: 250
								})
							} else if (l.effect == "slide") {
								d.find(l.mainCell + ":eq(" + a + ")").slideDown({
									queue: false,
									duration: 250
								})
							} else {
								d.find(l.mainCell + ":eq(" + a + ")").show()
							}
							c = a
						}
					};
				var j = function() {
						e.eq(c).removeClass(l.titOnClassName);
						f.hide();
						if (++c >= g) c = 0;
						e.eq(c).addClass(l.titOnClassName);
						f.eq(c).show()
					};
				h(l.defaultIndex);
				if (l.interTime > 0) {
					var k = setInterval(function() {
						j()
					}, l.interTime)
				}
				e.each(function(i, a) {
					if (l.trigger == "click") {
						$(a).click(function() {
							h(i);
							return false
						})
					} else if (l.delayTime > 0) {
						$(a).hover(function() {
							b = setTimeout(function() {
								h(i);
								b = null
							}, l.delayTime)
						}, function() {
							if (b != null) clearTimeout(b)
						})
					} else {
						$(a).mouseover(function() {
							h(i)
						})
					}
				})
			});
			return this;
		}
	});
})($);