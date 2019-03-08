/**
 * 构造方法传递参数(iniData参数可选，当无已选消息数据时可不传) param = { callback : 回调方法名称 , btn_value :
 * '确定按钮名称' , remark : '备注(显示在确定按钮右侧)' , msgtypes :
 * ['text','news','music','image','voice','video'] }
 * 
 * 不同消息类型传不同的值 iniData = { msgtype : '消息类型', content : '文字消息内容', articles :
 * '图文消息内容', media_url : '图片/语音/视频 的资源链接地址', music_url : '音乐资源的链接地址', title :
 * '音乐消息标题', description : '音乐消息描述', thumb_path : '音乐封面的链接地址' }
 */
// 构造方法
function MessageSelector(param, iniData) {
	param = param || {};
	this._param = {
			callback : (param && param.callback) ? param.callback : null,
			msgtypes : (param && param.msgtypes) ? param.msgtypes : ['news', 'image', 'voice','video', 'coupon'],
			tab_names : {
				text : '文本',
				mater : '素材',
				third : '动态获取',
				view : '访问页面'
			},
			tabs: (param && param.tabs) ? param.tabs : ['text', 'mater', 'third'],//view
			face_position: (param && param.face_position) ? param.face_position : 'up',
			view_oauth_btn: (param && param.view_oauth_btn) ? true : false //是否显示访问网页时授权按钮
	};
	this._isDocument = false;
	this._clickTab = 'text';
	this._oldClickTab = 'text';
	this._data = null;

	this._selectedData = {
		tab: 'text',
		msgtype : 'text',
		materialId : -1,
		url: '',
		content : '',
		is_oauth: 0
	};
	MessageSelector.ID++;
	this._id = MessageSelector.ID;
	if (window.Face) {
		this._wxFace = new Face(
				this._getId(MessageSelector.DEFINE.WX_FACE_ID)
				,this._getId(MessageSelector.DEFINE.TEXT_CONTENT)
				,{position: this._param.face_position});
	};
	this.setData(iniData);
			
};
//设置初始化数据或reset数据
MessageSelector.prototype.setData = function(data) {
	this._data = data || null;

	if (this._data) {
		this._selectedData.msgtype = this._data[MessageSelector.DATA.TYPE] || 'text';
		this._selectedData.materialId = this._data[MessageSelector.DATA.MATERIAL_ID] || -1;
		var con = this._data[MessageSelector.DATA.CONTENT] || '';
		if (this._wxFace) {
			con = Face.toEditMode(con);
			this._data[MessageSelector.DATA.CONTENT] = con;
		}
		this._selectedData.content = con;
		this._selectedData.is_oauth = this._data[MessageSelector.DATA.IS_OAUTH] || 0;
	}
};
MessageSelector.prototype._init = function() {
	if (this._data) {
		var msgtype = this._data[MessageSelector.DATA.TYPE];
		if ('text' == msgtype) {
			this._clickTab = 'text';
			$(this._getId(MessageSelector.DEFINE.TEXT_CONTENT, '#')).val(this._selectedData.content||'');
		} else if ('third' == msgtype) {
			this._clickTab = 'third';
			$(this._getId(MessageSelector.DEFINE.THIRD_CONTENT, '#')).val(this._data[MessageSelector.DATA.URL]||'');
		} else if ('view' == msgtype) {
			this._clickTab = 'view';
			$(this._getId(MessageSelector.DEFINE.VIEW_CONTENT, '#')).val(this._data[MessageSelector.DATA.URL]||'');
			var view_oauth_state = this._data[MessageSelector.DATA.IS_OAUTH];
			if (view_oauth_state && view_oauth_state != '0' && view_oauth_state != 0 && view_oauth_state != '') {
				$(this._getId(MessageSelector.DEFINE.VIEW_OAUTH_BTN, '#')).attr('checked', true);
			} else {
				$(this._getId(MessageSelector.DEFINE.VIEW_OAUTH_BTN, '#')).attr('checked', false);
			}
		} else {
			this._clickTab = 'mater';
			//show default data
			var con = '';
			switch (msgtype) {
				case 'news':
					con = materialSelecter.newsOneTpl(this._data);
					break;
				case 'voice':
					con = materialSelecter.voiceTplOne(this._data);
					break;
				case 'video':
					con = materialSelecter.videoTplOne(this._data);
					break;
				case 'image':
					con = materialSelecter.imageTplOne(this._data);
					break;
				case 'coupon':
					con = materialSelecter.newsOneTpl(this._data);
					break;	
			}
			$(this._getId(MessageSelector.DEFINE.MATER_BOX, '#')).html(con);
			this._afterListen();
		}
	}
	this._switchTab(false);
};

//显示组件
MessageSelector.prototype.render = function(containorId) {
	if (this._isDocument == true) {
		return;
	}
	$("#" + containorId).append(this._createFrame());
	if (this._param.view_oauth_btn == true) {
		$(this._getId(MessageSelector.DEFINE.VIEW_OAUTH_BOX, '#')).show();
	}
	this._listen();
	this._init();
	
};
MessageSelector.prototype.get = function() {
	// 文字消息内容赋值操作
	var con = $(this._getId(MessageSelector.DEFINE.TEXT_CONTENT, '#')).val();
	var url = '';
	if (this._wxFace) {
		var conArr = Face.filterFace(con);
		con = conArr ? conArr[0] : con;
	}
	
	if ('third' == this._clickTab) {
		url = $(this._getId(MessageSelector.DEFINE.THIRD_CONTENT, '#')).val();
	} else if ('view' == this._clickTab) {
		url = $(this._getId(MessageSelector.DEFINE.VIEW_CONTENT, '#')).val();
		var is_oauth = $(this._getId(MessageSelector.DEFINE.VIEW_OAUTH_BTN, '#')).is(':checked');
		this._selectedData.is_oauth = is_oauth == true ? 1 : 0;
	}
	this._selectedData[MessageSelector.DATA.URL] = url;
	this._selectedData[MessageSelector.DATA.CONTENT] = con;
	return this._selectedData;
};
MessageSelector.prototype._switchTab = function(flag) {
	flag = flag || false;
	$(this._getId(MessageSelector.DEFINE.TAB_LI, '#'+this._clickTab)).parent().find('li').removeClass('aaa');
	$(this._getId(MessageSelector.DEFINE.TAB_LI, '#'+this._clickTab)).parent().find('input').prop('checked', false);
	$(this._getId(MessageSelector.DEFINE.TAB_LI, '#'+this._clickTab)).addClass('aaa').find('input').prop('checked',true);
	$(this._getId(MessageSelector.DEFINE.TEXT_BOX, '#')).hide();
	$(this._getId(MessageSelector.DEFINE.MATER_BOX, '#')).hide();
	$(this._getId(MessageSelector.DEFINE.THIRD_BOX, '#')).hide();
	$(this._getId(MessageSelector.DEFINE.VIEW_BOX, '#')).hide();
	if ('text' == this._clickTab) {
		this._selectedData.msgtype = 'text';
		this._selectedData.tab = 'text';
		$(this._getId(MessageSelector.DEFINE.TEXT_BOX, '#')).show();
	} else if ('third' == this._clickTab) {
		this._selectedData.msgtype = 'third';
		this._selectedData.tab = 'third';
		$(this._getId(MessageSelector.DEFINE.THIRD_BOX, '#')).show();
	} else if ('view' == this._clickTab) {
		this._selectedData.msgtype = 'view';
		this._selectedData.tab = 'view';
		$(this._getId(MessageSelector.DEFINE.VIEW_BOX, '#')).show();
	} else {
		$(this._getId(MessageSelector.DEFINE.MATER_BOX, '#')).show();
		if (true == flag) {
			var param = {
					ok_callback: MessageSelector.bind(this._okCallbakck, this),
					cancel_callback: MessageSelector.bind(this._cancelCallback, this),
					msg_types: this._param.msgtypes
				};
				materialSelecter.show(param);
		}
	}
};
//监听标签和tab切换事件
MessageSelector.prototype._listen = function() {
	var _this = this;
	$(this._getId(MessageSelector.DEFINE.RADIO, '.')).click(function() {
		_this._oldClickTab = _this._clickTab;
		_this._clickTab = $(this).attr('value');
		_this._switchTab(true);
	});
	if (this._wxFace) {
		$(this._getId(MessageSelector.DEFINE.WX_FACE_ID, '#')).click(
			function() {_this._wxFace.init();}
		);
	}
};
MessageSelector.prototype._afterListen = function () {
	$('.video_play').click(function(event){
		event.stopPropagation();
		//materialSelecter.look = true;
		materialSelecter.catVideo($(this).attr('video_url'));
		return false;
	});
	$('.play-voice').click(function(event){
		event.stopPropagation();
		JPlayer($(this).attr('data-id'), $(this).attr('data-url'));
		return false;
	});
};

//选择素材确定回调
MessageSelector.prototype._okCallbakck = function(data) {
	this._selectedData.tab = 'mater';
	$(this._getId(MessageSelector.DEFINE.MATER_BOX, '#')).html('').append(data.node);
	this._selectedData.msgtype = data.type;
	this._selectedData.materialId = data.materialId;
	this._afterListen();
};
//选择素材cancel回调
MessageSelector.prototype._cancelCallback = function(data) {
	this._clickTab = this._oldClickTab;
	this._switchTab(false);
}

//创建组件显示框架
MessageSelector.prototype._createFrame = function() {
	var html = '<div class="tab-wrap">';//div1
	html += '<div class="xzj-main-tab" style="margin-top: 20px;"><ul>';//div2
	var tabs = this._param.tabs;
	var radio_css = this._getId(MessageSelector.DEFINE.RADIO);
	var text_box = this._getId(MessageSelector.DEFINE.TEXT_BOX);
	var text_id = this._getId(MessageSelector.DEFINE.TEXT_CONTENT);
	var face_id = this._getId(MessageSelector.DEFINE.WX_FACE_ID);
	var mater_id = this._getId(MessageSelector.DEFINE.MATER_BOX);
	var third_id = this._getId(MessageSelector.DEFINE.THIRD_BOX);
	var third_con = this._getId(MessageSelector.DEFINE.THIRD_CONTENT);
	var view_id = this._getId(MessageSelector.DEFINE.VIEW_BOX);
	var view_con = this._getId(MessageSelector.DEFINE.VIEW_CONTENT);
	var view_oauth_con = this._getId(MessageSelector.DEFINE.VIEW_OAUTH_BOX);
	var view_oauth_id = this._getId(MessageSelector.DEFINE.VIEW_OAUTH_BTN);
	for (var i=0,len=tabs.length; i<len; i++) {
		var tab_li = this._getId(MessageSelector.DEFINE.TAB_LI, tabs[i]);
		html += '<li id="'+tab_li+'"><label><input type="radio" name="lab_'+this._id +'" class="qq '+radio_css+'" value="'+tabs[i]+'"/><span>'+this._param.tab_names[tabs[i]]+'</span></label></li>';
	}
	html += '</ul></div>';//div2
	html += '<div class="zzzzz-jjjj" style="width:700px;">';//div3
	html += '<div id="'+text_box+'">';//text div
	html += '<div  class="xzj-main-tab-main-one-kuang" style="width: 100%;">';
	html += '<p class="p1"><span><img src="images/lian.png" id="'+face_id+'"></span></p>';
	html += '<textarea id="'+text_id+'" name="yj" class="wenbenyu" maxlength="600" style="width: 540px;font-size: 12px;"></textarea>';
	html += '</div>';
	html += '<h3 style="float: right;margin-top:2px; font-size:12px;">最多可以输入600字</h3>';
	html += '</div>';//text div
	html += '<div id="'+mater_id+'" class="xzj-main-tab-main-one" style="display: none"></div>';//msg content
	html += '<div id="'+third_id+'" class="xzj-main-tab-main-one" style="margin-top: 20px;display: none">';//third content
	html += '<span class="hui">请填写动态获取URL(http://)</span><br/><input id="'+third_con+'" class="mater_input" />';
	html += '</div>';
	html += '<div id="'+view_id+'" class="xzj-main-tab-main-one" style="margin-top: 20px;display: none">';//third content
	html += '<span class="hui">请填写访问页面URL(http://)</span><br/><input id="'+view_con+'" class="mater_input" />';
	html += '<div id="'+view_oauth_con+'" style="display:none;padding:5px 0;">';
	html += '是否授权：<input type="checkbox" id="'+view_oauth_id+'"></input><br/><span class="hui">授权会先获取用户信息后跳转到指定URL地址；<span style="color:red;">如果是活动地址请不要选择授权</span></span>';
	html += '</div>';
	html += '</div>';
	html += '</div>';//div3
	html += '</div>';//div1
	return html;
};
//获取生成相应的ID
MessageSelector.prototype._getId = function(id, suffix) {
	suffix = suffix || '';
	return suffix + 'mess_' + this._id + '_' + id;
};
//组件编号
MessageSelector.ID = 0;
//ID常量设置
MessageSelector.DEFINE = {
	TEXT_BOX: 'text_box',
	THIRD_BOX: 'third_box',
	MATER_BOX: 'mater_box',
	VIEW_BOX: 'view_box',
	TEXT_CONTENT : 'text_content',
	THIRD_CONTENT: 'third_con',
	VIEW_CONTENT: 'view_con',
	WX_FACE_ID: 'wxFaceId',
	RADIO: 'radio',
	TAB_LI: 'tab_li',
	VIEW_OAUTH_BOX: 'v_oauth_box',
	VIEW_OAUTH_BTN: 'v_oauth_btn'
};
//数据常量设置
MessageSelector.DATA = {
	TYPE : 'msgtype',
	CONTENT : 'content',
	MATERIAL_ID : 'm_id',
	URL: 'url',
	IS_OAUTH: 'is_oauth'
};
MessageSelector.bind = function(fn, selfObj, var_args) {
	if (!fn) {
		throw new Error();
	}
	if (arguments.length > 2) {
		var boundArgs = Array.prototype.slice.call(arguments, 2);
		return function() {
			var newArgs = Array.prototype.slice.call(arguments);
			Array.prototype.unshift.apply(newArgs, boundArgs);
			return fn.apply(selfObj, newArgs);
		};
	} else {
		return function() {
			return fn.apply(selfObj, arguments);
		};
	}
};
//验证数据
MessageSelector.checkData = function(data){
    if(!data){
        return false;
    }
    if(!data['msgtype']){
       return false;
    }
    switch(data['msgtype']){
        case 'text':
           if(data['content']==''){
		          loadMack({ off : 'on',Limg : 0,text :'消息文本内容不能为空',set : 1000});
              return false;
           }
           break;
        case 'third':
        case 'view':
          if(data['url']==''){
		          loadMack({ off : 'on',Limg : 0,text :'链接地址不能为空',set : 1000});
              return false;
          }
          //正则todo
          break;
        default:
          if(data['materialid']==''){
		          loadMack({ off : 'on',Limg : 0,text :'请选择素材',set : 1000});
              return false;
          }
    }
    return true;
}
/**
 * 素材显示js
 */
var materialSelecter = {
	type: '',
	materialId:0,
	param: {},
	config: {
		news: {name:'图文', url:'./index.php?a=MaterialSelecter&m=news'},
		image: {name:'图片', url:'./index.php?a=MaterialSelecter&m=get&msgtype=image'},
		voice: {name:'语音', url:'./index.php?a=MaterialSelecter&m=get&msgtype=voice'},
		video: {name:'视频', url:'./index.php?a=MaterialSelecter&m=get&msgtype=video'},
		music: {name:'音乐', url:'./index.php?a=MaterialSelecter&m=get&msgtype=music'},
		coupon: {name:'优惠券', url:'./index.php?a=MaterialSelecter&m=news&msgtype=coupon'},
	},
	/**
	 * @param string url ajax传递地址
	 * @param function() ok_callback 确定按钮后置事件
	 * @param function() cancel_callback 取消按钮后置事件
	 */
	show : function(param) {
		materialSelecter.materialId = 0;
		param = param || {};
		this.param = {
			empty: param.empty || '<div style="padding-top:50px;text-align:center;">对不起！暂时无数据。</div>',
			ok_callback : param.ok_callback || null,
			cancel_callback : param.cancel_callback || null,
			msg_types: (param.msg_types) ? param.msg_types : ['news', 'image', 'voice','video', 'coupon']
		};
		this.type = param.type ? param.type : 'news';
		this.dialog();
		this.listen();
		this.getData();
		
	},
	dialog: function () {
		var width= '710px',height='410px';
		$.dialog(
				{	id: 'materialSelecter',
				    title: '选择素材',
				    content: this.createFram({w:width, h:height}),
				    width: width,
				    height: height,
				    padding: 0,
				    drag: true,
				    resize: false,
				    lock: true,
				    ok: materialSelecter.ok,
				    cancel: materialSelecter.cancel,
				    min: false,
				    max: false
				}
		);
	},
	
	listen: function () {
		var _this = this;
		$('.cont-right-tab ul li').click(function(){
	        $('.cont-right-tab ul li').removeClass('acti');
	        $(this).addClass('acti').siblings().removeClass('acti');
	        _this.type = $(this).attr('tvalue');
	        materialSelecter.materialId = 0;
	        _this.getData();
	    });
	},
	afterLiten: function () {
		$('.video_play').click(function(event){
			event.stopPropagation();
			materialSelecter.catVideo($(this).attr('video_url'));
    		return false;
		});
		$('.play-voice').click(function(event){
			event.stopPropagation();
			JPlayer($(this).attr('data-id'), $(this).attr('data-url'));
    		return false;
		});
		
		/*========弹层加蒙版=========*/
	    $('.cont-right-main .mengbanya').click(function(){
	    	if(materialSelecter.look == true) return; 
	    	var obj = $(this).find('.mengban');
	    	var display = obj.css('display');
	    	$('.cont-right-main .mengbanya').find('.mengban').hide();
	    	if ('none' == display) {
	    		obj.show();
	    		materialSelecter.materialId = $.trim($(this).attr('data'));
	    	} else {
	    		materialSelecter.materialId = 0;
	    	}
	    });
	},
	
	getData: function (page) {
		//alert(type);
		page = page || 1;
		var url = this.config[this.type] ? this.config[this.type]['url'] : '';
		var _obj = this;
		loadMack();
		$.post(url, {page:page,callback:'materialSelecter.getData'}, function(result) {
			loadMack({off:'off'});
			result = eval("("+result+")");
			_obj.tpl(result);
		});
		
	},
	
	tpl: function (data) {
		if (!data || data.msgtype != this.type) {
			return;
		}
		switch (this.type) {
			case 'news':
				this.newsTpl(data);
				break;
			case 'image':
				this.imageTpl(data);
				break;
			case 'voice':
				this.voiceTpl(data);
				break;
			case 'video':
				this.videoTpl(data);
				break;
			case 'coupon':
				this.couponTpl(data);
				break;
		}
		this.afterLiten();
	},
	newsTpl: function (data) {
		var html1 = '', html2 = '',html3='';
		data = data || {};
		var newsArr = data['content'] || [];
		for (var i = 0,len = newsArr.length; i<len; i++) {
			var con = this.newsOneTpl(newsArr[i]);
			switch (i%3) {
				case 0 :
					html1 += con;break;
				case 1:
					html2 += con;break;
				case 2:
					html3 += con;break;
			}
		}
		if (!html1) {
			html1 = '&nbsp;';
			html2 = this.param.empty;
			html3 = '&nbsp;';
		}
		$('#cc_con_1').html(html1);
		$('#cc_con_2').html(html2);
		$('#cc_con_3').html(html3);
		$('#cc_con_page').html(data['page'] || '');
		$('#news_cc_con').show();
		$('#msg_cc_con').hide();
	},
	newsOneTpl: function (news) {
		var con = '';
		var articles = news['articles'];
		if (!articles || articles.length <= 0) return con;
		if (articles.length <= 1) {
			con += '<div class="cont-right-main-two mengbanya" data="'+news['m_id']+'" id="material_'+news['m_id']+'">';
			con += '<span class="news-title">'+articles[0]['title']+'</span>';
			con += '<p class="p1">'+(news['create_time']||'')+'</p>';
			con += '<div class="img"><img src="'+articles[0]['picurl']+'" style="width:200px;height:100px;"></div>';
			con += '<div class="text">'+(articles[0]['description']||'')+'</div>';
			con += '<div class="mengban" style="display: none;"><i class="img-zhengque img-zhengque1"></i></div>';
			con += '</div>';
		} else {//ab
			con += '<div class="cont-right-main-three mengbanya" data="'+news['m_id']+'" id="material_'+news['m_id']+'">';
			for (var ii=0,len2=articles.length; ii<len2; ii++) {
				if (ii == 0) {
					con += '<div class="cont-right-main-three-img">';
					con += '<img src="'+articles[ii]['picurl']+'" style="width:200px;height:100px;">';
					con += '<div class="xs-text"><span>'+articles[ii]['title']+'</span></div>';
					con += '</div>';
				} else {
					con += '<div class="cont-right-main-three-dl"><dl>';
					con += '<dd>'+articles[ii]['title']+'</dd><dt><img src="'+articles[ii]['picurl']+'" style="width:50px;height:50px;"></dt>';
					con += '</div></dl>';
				}
			}
			con += '<div class="mengban" style="display: none;"><i class="img-zhengque img-zhengque1"></i></div>';
			con += '</div>';
		}////ab
		return con;
	},
	
	imageTpl: function (data) {
		data = data || {};
		var images = data['content'] || [];
		var con = '';
		for (var i = 0, len=images.length; i < len; i++) {
			con += this.imageTplOne(images[i]);
		}
		if (!con) {
			con = this.param.empty;
		}
		$('#news_cc_con').hide();
		$('#msg_cc_con').html(con).show();
		$('#cc_con_page').html(data['page'] || '');
	},
	imageTplOne: function (image) {
		image = image || {};
		var con = '';
		con += '<div class="cont-right-main-two mengbanya" data="'+image['m_id']+'" id="material_'+image['m_id']+'">';
		con += '<div class="img"><img src="'+image['url']+'" style="width:180px;height:100px;"></div>';
		con += '<p class="img-title">'+image['title']||''+'</p>';
		con += '<div class="mengban" style="display: none;"><i class="img-zhengque img-zhengque2"></i></div>';
		con += '</div>';
		return con;
	},
	voiceTpl:function (data) {
		data = data || {};
		var content = data['content'] || [];
		var con = '';
		
		for (var i = 0, len=content.length; i < len; i++) {
			con += this.voiceTplOne(content[i]);
		}
		if (!con) {
			con = this.param.empty;
		}
		$('#news_cc_con').hide();
		$('#msg_cc_con').html(con).show();
		$('#cc_con_page').html(data['page'] || '');
	},
	voiceTplOne: function(voice) {
		voice = voice || {};
		var con = '';
		var mid = voice['m_id'];
		con += '<div class="cont-right-main-two mengbanya" data="'+mid+'" id="material_'+mid+'">';
		con += '<div class="voice-img jp-img">'
			+'<div title="点击播放" class="play-voice" id="jp_container_'+mid+'" data-id="'+mid+'" data-url="'+voice['url']+'" style="width:80px;margin: 0 auto;">' //jplayer 
			+'<div class="jp-jplayer" id="jquery_jplayer_'+mid+'"></div>'
			+'<a tabindex="1" class="jp-play jp-play-p" href="javascript:;"></a>'
			+'<a tabindex="1" style="display: none;" class="jp-pause jp-pause-p" href="javascript:;"></a>'
			+'</div>' //jplayer
			+'</div>';
		con += '<p class="img-title">'+voice['title']||''+'</p>';
		con += '<div class="mengban" style="display: none;"><i class="img-zhengque img-zhengque2"></i></div>';
		con += '</div>';
		return con;
	},
	videoTpl: function (data) {
		data = data || {};
		var content = data['content'] || [];
		var con = '';
		for (var i = 0, len=content.length; i < len; i++) {
			con += this.videoTplOne(content[i]);
		}
		if (!con) {
			con = this.param.empty;
		}
		$('#news_cc_con').hide();
		$('#msg_cc_con').html(con).show();
		$('#cc_con_page').html(data['page'] || '');
	},
	videoTplOne: function (video) {
		video = video || {};
		var con = '';
		con += '<div class="cont-right-main-two mengbanya" data="'+video['m_id']+'" id="material_'+video['m_id']+'">';
		con += '<p class="pic-text">'+video['title']+'</p>';
		con += '<div class="video-bg" id="video_'+video['m_id']+'"><img title="点击播放" name="video_play" class="video_play" video_url="'+video['url']+'" src="./images/management/video-btn.png" style="cursor: pointer;"></div>';
		con += '<p class="pic-text">'+video['description']||''+'</p>';
		con += '<div class="mengban" style="display: none;"><i class="img-zhengque img-zhengque3"></i></div>';
		con += '</div>';
		return con;
	},
	couponTpl: function (data) {
		this.newsTpl(data);
	},
	createFram: function (p) {
		var html = '<div class="" style="padding:10px 0 10px 10px;text-align:center;">';//div1
		html += '<div class="cont-right-tab" style=""><ul>';//div2
		var msgtypes = this.param.msg_types;
		var li_css = '';
		for (var i =0,len=msgtypes.length; i<len; i++) {
			li_css = '';if (msgtypes[i] == this.type) li_css = 'acti'; 
			html += '<li class="'+li_css+'" tvalue="'+msgtypes[i]+'"><a href="javascript:void(0);">'+this.config[msgtypes[i]]['name']+'</a></li>';
		}
		html += '';
		html += '</ul></div>';//div2
		html += ' <div class="tjtwsc" style="width:'+p.w+';height:'+p.h+';overflow-y:auto;text-align:center;">';//msgdiv
		html += '<div class="cont-right-main">';//msg_main
		html += '<div id="news_cc_con" style="display:none;">';
		html += '<div id="cc_con_1" style="width:33%;float:left;text-align:left;">&nbsp;</div>';
		html += '<div id="cc_con_2" style="width:33%;float:left;text-align:left;">&nbsp;</div>';
		html += '<div id="cc_con_3" style="width:33%;float:left;text-align:left;">&nbsp;</div>';
		html += '</div>';
		html += '<div id="msg_cc_con" style="text-align:left;"></div>';
		html += '</div>';//msg_main
		html += '</div>';//msgdiv
		html += '<div id="cc_con_page"></div>';
		html += '</div>';//div1
		return html;
	},
	ok: function () {
		var _this = materialSelecter;
		var node = $('#material_'+_this.materialId).clone();
		node.find('.mengban').hide();
		if (_this.param.ok_callback) {
			var param = {
				materialId: _this.materialId,
				type: _this.type,
				node:node
			}
			_this.param.ok_callback.call(null, param);
		}
		
	},
	cancel: function () {
		var _this = materialSelecter;
		if (_this.param.cancel_callback) {
			_this.param.cancel_callback.call(null, {type: _this.type});
		}
	},
	jPlayer: function(id, url) {
		JPlayer(id, url);
		//event.stopPropagation();
	},
	catVideo:function(url) {
		$.dialog(
				{	id: 'materialSelecter_catVideo',
				    title: '观看视频',
				    content: '<div id="materialSelecter_catVideo_con" class="back-loading">加载中。。。</di>',
				    width: 315,
				    height: 250,
				    padding: 0,
				    drag: false,
				    resize: false,
				    lock: true,
				    ok: null,
				    cancel: null,
				    close: function(){materialSelecter.look = false},
				    min: false,
				    max: false
				}
		);
		ckplayer('materialSelecter_catVideo_con', url, {w:315, h:250, p:1,allowFullScreen:true});
	}
}
