//-- Copyright 2011 PChome
//-- All Rights Reserved
//-- Edit by zhangjunjie 2011-12-13

/* tab切换(鼠标滑过) */
function hTab(tab_controler,tab_con){
	this.tab_controler = tab_controler;
	this.tab_con = tab_con;
	var tabs = $(tab_controler).children("li");
	var panels = $(tab_con).children("div");
	$(tab_con).children("div").css("display","none");
	$(tab_con).children("div:first").css("display","block");
	$(tabs).hover(function(){
		var index = $.inArray(this,tabs);
		tabs.removeClass("current")
		.eq(index).addClass("current");
		panels.css("display","none")
		.eq(index).css("display","block");
	});
};

/* tab切换(点击) */
function cTab(tab_controler,tab_con){
	this.tab_controler = tab_controler;
	this.tab_con = tab_con;
	var tabs = $(tab_controler).children("li");
	var panels = $(tab_con).children("div");
	$(tab_con).children("div").css("display","none");
	$(tab_con).children("div:first").css("display","block");
	$(tabs).click(function(){
		var index = $.inArray(this,tabs);
		tabs.removeClass("current")
		.eq(index).addClass("current");
		panels.css("display","none")
		.eq(index).css("display","block");
	});
};

/* 滑动弹出框 */
function blockchange(nav_controler,block_con){
	this.nav_controler = nav_controler;
	this.block_con = block_con;
	var navs = $(nav_controler).children("li");
	var panels = $(block_con).children("div");
	$(navs).mouseover(function(){
		var index = $.inArray(this,navs);
		panels.css("display","none")
		.eq(index).css("display","block");
		navs.removeClass("current")
		.eq(index).addClass("current");
		$(this).mouseout(function(){
			panels.css("display","none");
			navs.removeClass("current");
		});
	});
	$(panels).mouseover(function(){
		var index2 = $.inArray(this,panels);
		panels.css("display","none")
		.eq(index2).css("display","block");
		navs.removeClass("current")
		.eq(index2).addClass("current");
		$(this).mouseout(function(){
			panels.css("display","none");
			navs.removeClass("current");
		});
	});
};

/* 跑马灯(左右) */
function marquee(mcon,speed){
	this.mcon = mcon;
	this.speed = speed;
	$(mcon).children("ul").html($(mcon).children("ul").html() + $(mcon).children("ul").html());
	$(mcon).children("ul").width($(mcon).children("ul").children("li").width() * $(mcon).children("ul").children("li").length);
	var x = 0;
	var t;
	function init(){
		var self = arguments.callee;
		t = setTimeout(function(){
			$(mcon).scrollLeft(x);
			x++;
			self();
			if(x == $(mcon).children("ul").width() / 2){
				x = 0;
			};
		},speed);
	};
	init();
	$(mcon).mouseover(function(){
		clearTimeout(t);
	});
	$(mcon).mouseout(function(){
		init();
	});
};

/* 跑马灯(左右-带控制器) */
function marquee_control(maincon,speed,up,down){
	$(maincon).children('ul').html($(maincon).children('ul').html() + $(maincon).children('ul').html() + $(maincon).children('ul').html());
	$(maincon).children("ul").width($(maincon).children("ul").children("li:first").width() * $(maincon).children("ul").children("li").length);
	var x = $(maincon).children('ul').width()/3;
	var t;
	var chg;
	$(maincon).scrollLeft(x);
	function init1(){
		var self = arguments.callee;
		t = setTimeout(function(){
			$(maincon).scrollLeft(x);
			x--;
			self();
			if(x <= 0){
				x = $(maincon).children('ul').width()/3;
			};
		},speed);
		chg = 1;
	};
	function init2(){
		var self = arguments.callee;
		t = setTimeout(function(){
			$(maincon).scrollLeft(x);
			x++;
			self();
			if(x >= $(maincon).children('ul').width()*2/3){
				x = $(maincon).children('ul').width()/3;
			};
		},speed);
		chg = 2;
	};
	init2();
	$(down).click(function(){
		clearTimeout(t);
		init1();
		chg = 1;
	});
	$(up).click(function(){
		clearTimeout(t);
		init2();
		chg = 2;
	});
	$(maincon).mouseover(function(){
		clearTimeout(t);
	});
	$(maincon).mouseout(function(){
		if(chg == 1){
			init1();
		};
		if(chg == 2){
			init2();
		};
	});
};

/* 跑马灯(上下) */
function scroll(mcon,speed){
	this.mcon = mcon;
	this.speed = speed;
	$(mcon).children("ul").html($(mcon).children("ul").html() + $(mcon).children("ul").html());
	$(mcon).children("ul").height($(mcon).children("ul").children("li").height() * $(mcon).children("ul").children("li").length);
	var x = 0;
	var t;
	function init(){
		var self = arguments.callee;
		t = setTimeout(function(){
			$(mcon).scrollTop(x);
			x++;
			self();
			if(x == $(mcon).children("ul").height() / 2){
				x = 0;
			};
		},speed);
	};
	init();
	$(mcon).mouseover(function(){
		clearTimeout(t);
	});
	$(mcon).mouseout(function(){
		init();
	});
};

/* 跑马灯(上下-带控制器) */
function scroll_control(maincon,speed,up,down){
	$(maincon).children('ul').html($(maincon).children('ul').html() + $(maincon).children('ul').html() + $(maincon).children('ul').html());
	$(maincon).children("ul").height($(maincon).children("ul").children("li:first").height() * $(maincon).children("ul").children("li").length);
	var x = $(maincon).children('ul').height()/3;
	var t;
	var chg;
	$(maincon).scrollTop(x);
	function init1(){
		var self = arguments.callee;
		t = setTimeout(function(){
			$(maincon).scrollTop(x);
			x--;
			self();
			if(x <= 0){
				x = $(maincon).children('ul').height()/3;
			};
		},speed);
		chg = 1;
	};
	function init2(){
		var self = arguments.callee;
		t = setTimeout(function(){
			$(maincon).scrollTop(x);
			x++;
			self();
			if(x >= $(maincon).children('ul').height()*2/3){
				x = $(maincon).children('ul').height()/3;
			};
		},speed);
		chg = 2;
	};
	init2();
	$(down).click(function(){
		clearTimeout(t);
		init1();
		chg = 1;
	});
	$(up).click(function(){
		clearTimeout(t);
		init2();
		chg = 2;
	});
	$(maincon).mouseover(function(){
		clearTimeout(t);
	});
	$(maincon).mouseout(function(){
		if(chg == 1){
			init1();
		};
		if(chg == 2){
			init2();
		};
	});
};

/* 自动切换(左右) */
function auto_pic(slidercon,speed1,speed2,speed3){
	this.slidercon = slidercon;
	this.speed1 = speed1;
	this.speed2 = speed2;
	this.speed3 = speed3;
	$(slidercon).children("ul").html($(slidercon).children("ul").html() + $(slidercon).children("ul").html());
	$(slidercon).children("ul").width($(slidercon).children("ul").children("li:first").width() * $(slidercon).children("ul").children("li").length);
	var x = 0;
	var y = 0;
	var t;
	function init(){
		y++;
		if(y > $(slidercon).children("ul").children("li").length/2){
			y = 1;
		};
		function mycase(){
			var self = arguments.callee;
			t = setTimeout(function(){
				$(slidercon).scrollLeft(x);
				if(x > $(slidercon).children("ul").width() / 2){
					x = 0;
				};
				if(x <= $(slidercon).children("ul").children("li:first").width() * y - 45){
					x+=speed3;
				};
				if(x > $(slidercon).children("ul").children("li:first").width() * y - 45){
					x++;
				};
				self();
				if(x > $(slidercon).children("ul").children("li:first").width() * y){
					clearTimeout(t);
				};
			},speed1);
		};
		mycase();
	};
	var move = setInterval(init,speed2);
	$(slidercon).mouseover(function(){
		clearInterval(move);
	});
	$(slidercon).mouseout(function(){
		move = setInterval(init,speed2);
	});
};

/* 手动切换(左右) */
function autopic_control(maincon,speed1,speed2,up,down){
	$(maincon).children('ul').html($(maincon).children('ul').html() + $(maincon).children('ul').html() + $(maincon).children('ul').html());
	$(maincon).children("ul").width($(maincon).children("ul").children("li:first").width() * $(maincon).children("ul").children("li").length);
	var x = $(maincon).children('ul').width()/3;
	var y = $(maincon).children("ul").children("li").length/3;
	var t;
	$(maincon).scrollLeft(x);
	function init1(){
		y--;
		if(y < 0){
			y = $(maincon).children("ul").children("li").length/3 - 1;
		};
		function mycase(){
			var self = arguments.callee;
			t = setTimeout(function(){
				$(maincon).scrollLeft(x);
				if(x < 0){
					x = $(maincon).children("ul").width()/3;
				};
				if(x >= $(maincon).children("ul").children("li:first").width() * y + 45){
					x-=speed2;
				};
				if(x < $(maincon).children("ul").children("li:first").width() * y + 45){
					x--;
				};
				self();
				if(x < $(maincon).children("ul").children("li:first").width() * y){
					clearTimeout(t);
				};
			},speed1);
		};
		mycase();
	};
	function init2(){
		y++;
		if(y > $(maincon).children("ul").children("li").length*2/3){
			y = $(maincon).children("ul").children("li").length/3 + 1;
		};
		function mycase(){
			var self = arguments.callee;
			t = setTimeout(function(){
				$(maincon).scrollLeft(x);
				if(x > $(maincon).children("ul").width()*2/3){
					x = $(maincon).children("ul").width()/3;
				};
				if(x <= $(maincon).children("ul").children("li:first").width() * y - 45){
					x+=speed2;
				};
				if(x > $(maincon).children("ul").children("li:first").width() * y - 45){
					x++;
				};
				self();
				if(x > $(maincon).children("ul").children("li:first").width() * y){
					clearTimeout(t);
				};
			},speed1);
		};
		mycase();
	};
	$(down).click(function(){
		init1();
	});
	$(up).click(function(){
		init2();
	});
};

/* 自动切换(上下) */
function auto_txt(slidercon,speed1,speed2){
	this.slidercon = slidercon;
	this.speed1 = speed1;
	this.speed2 = speed2;
	$(slidercon).children("ul").html($(slidercon).children("ul").html() + $(slidercon).children("ul").html());
	$(slidercon).children("ul").height($(slidercon).children("ul").children("li:first").height() * $(slidercon).children("ul").children("li").length);
	var x = 0;
	var y = 0;
	var t;
	function init(){
		y++;
		if(y > $(slidercon).children("ul").children("li").length/2){
			y = 1;
		};
		function mycase(){
			var self = arguments.callee;
			t = setTimeout(function(){
				$(slidercon).scrollTop(x);
				if(x > $(slidercon).children("ul").height() / 2){
					x = 0;
				};
				x++;
				self();
				if(x > $(slidercon).children("ul").children("li:first").height() * y){
					clearTimeout(t);
				};
			},speed1);
		};
		mycase();
	};
	var move = setInterval(init,speed2);
	$(slidercon).mouseover(function(){
		clearInterval(move);
	});
	$(slidercon).mouseout(function(){
		move = setInterval(init,speed2);
	});
};

/* 手动切换(上下) */
function autotxt_control(maincon,speed1,speed2,up,down){
	$(maincon).children('ul').html($(maincon).children('ul').html() + $(maincon).children('ul').html() + $(maincon).children('ul').html());
	$(maincon).children("ul").height($(maincon).children("ul").children("li:first").height() * $(maincon).children("ul").children("li").length);
	var x = $(maincon).children('ul').height()/3;
	var y = $(maincon).children("ul").children("li").length/3;
	var t;
	$(maincon).scrollTop(x);
	function init1(){
		y--;
		if(y < 0){
			y = $(maincon).children("ul").children("li").length/3 - 1;
		};
		function mycase(){
			var self = arguments.callee;
			t = setTimeout(function(){
				$(maincon).scrollTop(x);
				if(x < 0){
					x = $(maincon).children("ul").height()/3;
				};
				if(x >= $(maincon).children("ul").children("li:first").height() * y + 45){
					x-=speed2;
				};
				if(x < $(maincon).children("ul").children("li:first").height() * y + 45){
					x--;
				};
				self();
				if(x < $(maincon).children("ul").children("li:first").height() * y){
					clearTimeout(t);
				};
			},speed1);
		};
		mycase();
	};
	function init2(){
		y++;
		if(y > $(maincon).children("ul").children("li").length*2/3){
			y = $(maincon).children("ul").children("li").length/3 + 1;
		};
		function mycase(){
			var self = arguments.callee;
			t = setTimeout(function(){
				$(maincon).scrollTop(x);
				if(x > $(maincon).children("ul").height()*2/3){
					x = $(maincon).children("ul").height()/3;
				};
				if(x <= $(maincon).children("ul").children("li:first").height() * y - 45){
					x+=speed2;
				};
				if(x > $(maincon).children("ul").children("li:first").height() * y - 45){
					x++;
				};
				self();
				if(x > $(maincon).children("ul").children("li:first").height() * y){
					clearTimeout(t);
				};
			},speed1);
		};
		mycase();
	};
	$(down).click(function(){
		init1();
	});
	$(up).click(function(){
		init2();
	});
};

/* 新焦点图(渐隐) */
function new_slider(slidercon,mainspeed,inspeed,outspeed){
	this.slidercon = slidercon;
	this.mainspeed = mainspeed;
	this.inspeed = inspeed;
	this.outspeed = outspeed;
	var i = 1;
	var listcon = '<li class="current">' + 1 + '</li>';
	$(slidercon).append(
		'<div id="slider_title"></div>'
	);
	$(slidercon).children("#slider_title").html($(slidercon).children("ul:first").children("li:eq(0)").children("a").children("img").attr("title"));
	$(slidercon).append(
		'<ul id="slider_counter"></ul>'
	);
	for(var j = 2; j <= $(slidercon).children("ul:first").children("li").length; j ++){
		listcon = listcon + "<li>" + j + "</li>";
	};
	$(slidercon).children("#slider_counter").html(listcon);
	$(slidercon).children("#slider_counter").children("li").mouseover(function(){
		var index = $.inArray(this,$(slidercon).children("#slider_counter").children("li"));
		$(slidercon).children("#slider_counter").children("li").removeClass("current")
		.eq(index).addClass("current");
		$(slidercon).children("ul:first").children("li").fadeOut(outspeed)
		.eq(index).fadeIn(inspeed);
		$(slidercon).children("#slider_title").html($(slidercon).children("ul:first").children("li:eq(" + parseInt($(this).html()-1)  + ")").children("a").children("img").attr("title"));
		i = $(this).index() + 1;
		if(i == $(slidercon).children("ul:first").children("li").length){
			i = 0;
		};
	});
	function init(){
		$(slidercon).children("ul:first").children("li:not(" + i + ")").fadeOut(outspeed);
		$(slidercon).children("ul:first").children("li:eq(" + i + ")").fadeIn(inspeed);
		$(slidercon).children("#slider_counter").children("li:not(" + i + ")").removeClass("current");
		$(slidercon).children("#slider_counter").children("li:eq(" + i + ")").addClass("current");
		$(slidercon).children("#slider_title").html($(slidercon).children("ul:first").children("li:eq(" + i + ")").children("a").children("img").attr("title"));
		i++;
		if(i >= $(slidercon).children("ul:first").children("li").length){
			i = 0;
		};
	};
	var move = setInterval(init,mainspeed);
	$(slidercon).mouseover(function(){
		clearInterval(move);
	});
	$(slidercon).mouseout(function(){
		move = setInterval(init,mainspeed);
	});
};

/* 滑过事件(滑动) */
function hover_change(obj){
	this.obj = obj;
	var ch_obj = $(obj).children("ul").children("li");
	ch_obj.hover(function(){
		var index = $.inArray(this,ch_obj);
		ch_obj.removeClass("current")
		.eq(index).addClass("current");
	});
	ch_obj.mouseout(function(){
		var index = $.inArray(this,ch_obj);
		ch_obj.removeClass("current")
		.eq(index).removeClass("current");
	});
};

/* 滑过事件(停留) */
function hover_stay(obj){
	this.obj = obj;
	var ch_obj = $(obj).children("ul").children("li");
	$(obj).children("ul").children("li:first").addClass("current");
	ch_obj.hover(function(){
		var index = $.inArray(this,ch_obj);
		ch_obj.removeClass("current")
		.eq(index).addClass("current");
	});
};