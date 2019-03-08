/**
 * 构造方法传递参数(iniData参数可选，当无已选消息数据时可不传) param = { callback : 回调方法名称 , btn_value :
 * '确定按钮名称' , remark : '备注(显示在确定按钮右侧)' , msg_types :
 * ['text','news','music','image','voice','video'] }
 * 
 * 不同消息类型传不同的值 iniData = { msg_type : '消息类型', content : '文字消息内容', articles :
 * '图文消息内容', media_url : '图片/语音/视频 的资源链接地址', music_url : '音乐资源的链接地址', title :
 * '音乐消息标题', description : '音乐消息描述', thumb_path : '音乐封面的链接地址' }
 */

// 构造方法
function MessageSelector(param, iniData) {
	this._param = {
		callback : (param && param.callback) ? param.callback : null,
		btn_value : (param && param.btn_value) ? param.btn_value : '确定',
		remark : (param && param.remark) ? param.remark : '',
		msg_types : (param && param.msg_types) ? param.msg_types : [ 'text', 'news', 'music' ],
		msg_type_names : {
			text : '文字消息',
			news : '图文消息',
			music : '音乐消息',
			image : '图片消息',
			voice : '语音消息',
			video : '视频消息'
		},
		msg_type_pull_names : {
			text : '文字',
			news : '图文',
			music : '音乐',
			image : '图片',
			voice : '语音',
			video : '视频'
		},
		oauth_set: false,//(param && param.oauth_set) ? param.oauth_set : false,//auth选项
		oauth_checked:(param && param.oauth_checked) ? param.oauth_checked : false,
		mode : (param && param.mode) ? param.mode : 'tab',// 风格类型 tab, button, // pull_down
		face_position: (param && param.face_position) ? param.face_position : 'up'
	};
	this._isDocument = false;
	this._clickType = '';

	this._selectedData = {
		msg_type : 'text',
		material_id : -1,
		content : ''
	};
	MessageSelector.ID++;
	this._id = MessageSelector.ID;

	if (window.Face) {
		this._wxFace = new Face(
				this._getId(MessageSelector.DEFINE.WX_FACE_ID)
				,this._getId(MessageSelector.DEFINE.TEXT_CONTENT)
				,{position: this._param.face_position});
	}
	this.setData(iniData);
};

// 组件编号
MessageSelector.ID = 0;

// 设置初始化数据或reset数据
MessageSelector.prototype.setData = function(data) {
	this._data = data || null;

	if (this._data) {
		this._selectedData[MessageSelector.DATA.TYPE] = this._data[MessageSelector.DATA.TYPE] || 'text';
		this._selectedData[MessageSelector.DATA.MATERIAL_ID] = this._data[MessageSelector.DATA.MATERIAL_ID] || -1;
		var con = this._data[MessageSelector.DATA.CONTENT] || '';
		if (this._wxFace) {
			con = Face.toEditMode(con);
			this._data[MessageSelector.DATA.CONTENT] = con;
		}
		this._selectedData[MessageSelector.DATA.CONTENT] = con;
	}
};
// 显示组件
MessageSelector.prototype.render = function(containorId) {
	if (this._isDocument == true) {
		return;
	}

	$("#" + containorId).append(this._createFrame());
	$(this._getId(MessageSelector.DEFINE.MENU, '#')).append(this._createMenu());
	$(this._getId(MessageSelector.DEFINE.BODY, '#')).append(this._createBody());

	if(this._param.mode == 'pull_down'){
		$(this._getId(MessageSelector.DEFINE.MENU_PULL, '#')).append(this._createPullDown());
	}
	this._listen();
	if (this._param.oauth_set && 'news' == this._selectedData[MessageSelector.DATA.TYPE]) {
		$(this._getId(MessageSelector.DEFINE.OAUTH_SET_CON, '#')).show();
		if (this._param.oauth_checked) {
			$(this._getId(MessageSelector.DEFINE.IS_OAUTH, '#')).attr('checked',true);
		}
	}
	this._isDocument = true;
};
// 获取编辑后数据
MessageSelector.prototype.getData = function() {
	// 文字消息内容赋值操作
	var con = $(this._getId(MessageSelector.DEFINE.TEXT_CONTENT, '#')).val();
	if (this._wxFace) {
		var conArr = Face.filterFace(con);
		con = conArr ? conArr[0] : con;
	}
	this._selectedData[MessageSelector.DATA.CONTENT] = con;
	var isOAuth = $(this._getId(MessageSelector.DEFINE.IS_OAUTH, '#')).attr('checked');
	this._selectedData[MessageSelector.DATA.IS_OAUTH] = isOAuth ? 1 : 0;
	return this._selectedData;
};

// 设置事件
MessageSelector.prototype._listen = function() {
	// 确定提交按钮事件处理
	$(this._getId(MessageSelector.DEFINE.SUBMIT_BTN, '#')).die().click(MessageSelector.bind(this.submitMaterial, this));
	//pull_down按钮事件处理
	if(this._param.mode == 'pull_down'){
		$(this._getId(MessageSelector.DEFINE.MENU, '#')).die().click(function(){
			var $obj = $(this);
			$obj.addClass('jda');
			$obj.parent().find('.udul').show(function(){
				parentSH(30);
			});
			return false;
		});
		$('body').die().click(function(){
			$('div.jda').removeClass('jda').parent().find('.udul').hide();
		});
	}
	// 消息类型切换事件处理
	var _this = this;
	// TODO mod
	var obj = null;
	if (this._param.mode == 'button') {
		obj = $(this._getId(MessageSelector.DEFINE.MENU, '#') + ' .processUl>li');
	} else if (this._param.mode == 'pull_down') {
		obj = $(this._getId(MessageSelector.DEFINE.PULL_DOWN, '#') + ' .udul>li');
	} else {
		obj = $(this._getId(MessageSelector.DEFINE.MENU, '#') + ' .tab>li');
	}
	obj.die().click(
			function() {
				var idArr = $(this).attr('id').split('_');
				_this._clickType = idArr[0];

				var param = {
					ok_callback : MessageSelector.bind(_this._selectedCallback, _this),
					height : 630
				};
				if (_this._clickType != 'text') {
					var obj = $(_this._getId(MessageSelector.DEFINE.MATERIAL_CONTENT,'#'));
					if (obj.attr(MessageSelector.DEFINE.MSG_TYPE) == _this._clickType && $.trim(obj.html())) {
						_this._switchTab(_this._clickType);
					}
				}
				if (_this._clickType!='news' || !_this._param.oauth_set) {
					$(_this._getId(MessageSelector.DEFINE.OAUTH_SET_CON, "#")).hide();
				}
				switch (_this._clickType) {
				case 'text':
					_this._switchTab(_this._clickType);
					break;
				case 'news':
					materialSelecter.showNews(MessageSelector.URLS.GET_NEWS_URL, param);
					break;
				case 'music':
					materialSelecter.showMusic(MessageSelector.URLS.GET_MUSIC_URL, param);
					break;
				case 'image':
					materialSelecter.showImage(MessageSelector.URLS.GET_IMAGE_URL, param);
					break;
				case 'voice':
					materialSelecter.showVoice(MessageSelector.URLS.GET_VOICE_URL, param);
					break;
				case 'video':
					materialSelecter.showVideo(MessageSelector.URLS.GET_VIDEO_URL, param);
					break;
				}
				if(_this._param.mode == 'pull_down'){
					$('div.jda').removeClass('jda').parent().find('.udul').hide();
				}
			});
	if (this._wxFace) {
		$(this._getId(MessageSelector.DEFINE.WX_FACE_ID, '#')).click(
			function() {_this._wxFace.init();}
		);
	}
};

// 素材确定按钮回调函数
MessageSelector.prototype._selectedCallback = function(materialId, html, msgType) {
	this._switchTab(msgType);
	var defaultMtId = (msgType != 'text') ? -1 : 0;
	this._selectedData[MessageSelector.DATA.TYPE] = msgType || 'text';// 消息类型赋值操作
	this._selectedData[MessageSelector.DATA.MATERIAL_ID] = materialId || defaultMtId;// 消息ID赋值操作
	$(this._getId(MessageSelector.DEFINE.MATERIAL_CONTENT, '#')).attr(MessageSelector.DEFINE.MSG_TYPE, msgType).html(html || '');
	
	parentSH();
};

// 验证get后的数据有效性
MessageSelector.check = function(selectData) {
	var msgType = selectData[MessageSelector.DATA.TYPE];
	var materialId = selectData[MessageSelector.DATA.MATERIAL_ID];
	var textContent = selectData[MessageSelector.DATA.CONTENT];
	if ('text' == msgType) {
		if (isEmpty(textContent)) {
			loadMack({
				off : 'on',
				Limg : 0,
				text : '文字消息不能为空',
				set : 1000
			});
			return false;
		}
	} else {
		if (isEmpty(materialId) || materialId == 0) {
			loadMack({
				off : 'on',
				Limg : 0,
				text : '请选择消息素材',
				set : 1000
			});
			return false;
		}
	}
	return true;
};

// 确认修改
MessageSelector.prototype.submitMaterial = function() {
	if (!MessageSelector.check(this.getData()))
		return;
	if (this._param.callback) {
		this._param.callback.call(null, this.getData());
	}
};

// 切换消息类型标签
MessageSelector.prototype._switchTab = function(msgType, resetH) {
	// TODO mod
	if (this._param.mode == 'button') {
		$(this._getId(MessageSelector.DEFINE.MENU, '#')).find('.processUl li')
				.removeClass('activeLi').parent().find(
						this._getId(MessageSelector.DEFINE.MENU_ID, '#' + msgType + '_')).addClass('activeLi');
	} else if (this._param.mode == 'pull_down') {
	} else {
		$(this._getId(MessageSelector.DEFINE.MENU, '#')).find('.tab li')
				.removeClass('tab_xz').parent().find(
						this._getId(MessageSelector.DEFINE.MENU_ID, '#' + msgType + '_')).addClass('tab_xz');
	}

	if ('text' == msgType) {
		$(this._getId(MessageSelector.DEFINE.TEXT_CONTENT_BOX, '#')).show();
		$(this._getId(MessageSelector.DEFINE.MATERIAL_CONTENT_BOX, '#')).hide();
	} else {
		$(this._getId(MessageSelector.DEFINE.TEXT_CONTENT_BOX, '#')).hide();
		$(this._getId(MessageSelector.DEFINE.MATERIAL_CONTENT_BOX, '#')).show();
		$(this._getId(MessageSelector.DEFINE.TEXT_CONTENT, '#')).val('');
	}
	this._selectedData[MessageSelector.DATA.TYPE] = msgType;
	if (this._param.oauth_set && msgType == 'news') {
		$(this._getId(MessageSelector.DEFINE.OAUTH_SET_CON, "#")).show();
	}
	if (resetH !== false) {
		parentSH();
	}
};

// 创建组件显示框架
MessageSelector.prototype._createFrame = function() {
	// TODO mod
	if (this._param.mode == 'button') {
		return this._createButtonFrame();
	} else if (this._param.mode == 'pull_down') {
		return this._createPullDownFrame();
	} else {
		return this._createTabFrame();
	}
};
// 生成tab风格组件显示框架
MessageSelector.prototype._createTabFrame = function() {
	var uiStr = '<div class="qf_module nav2">';
	// tab菜单栏
	uiStr += '<div id="' + this._getId(MessageSelector.DEFINE.MENU) + '"></div>';
	uiStr += '<div class="tab_n">';

	// 消息主体和默认数据显示内容
	uiStr += '<div class="n_content" style="display: block;" id="' + this._getId(MessageSelector.DEFINE.BODY) + '"></div>';

	uiStr += '<div style="padding: 5px 15px 20px 15px;">';
	// 提交按钮
	uiStr += '<div id="' + this._getId(MessageSelector.DEFINE.SUBMIT_BTN) + '" class="button green medium">' + this._param.btn_value + '</div>';

	// 备注信息
	if ((this._param.remark)) {
		uiStr += '<div style="display:inline-block;" class="hui">&nbsp;' + this._param.remark + '</div>';
	}
	uiStr += '</div>';
	uiStr += '</div>';
	uiStr += '</div>';
	return uiStr;
};
// 生成button风格组件显示框架
MessageSelector.prototype._createButtonFrame = function() {
	var html = '<div>';
	html += '<div id="' + this._getId(MessageSelector.DEFINE.MENU) + '"></div>';
	html += '<div style="padding-top:30px" id="' + this._getId(MessageSelector.DEFINE.BODY) + '"></div>';
	html += '</div>';
	return html;
};
// 生成pull_down风格组件显示框架
MessageSelector.prototype._createPullDownFrame = function() 
{
	var html = '<div class="dhk_t_x dhk_t_x_test">';
	html += '<div class="keyword_ud czmove " id="' + this._getId(MessageSelector.DEFINE.MENU) + '"></div>';
	if(this._param.mode == 'pull_down'){
		html += '<div id="' + this._getId(MessageSelector.DEFINE.MENU_PULL) + '"></div>';
	}
	html += '</div>';
	html += '<div style="padding-top:50px" id="' + this._getId(MessageSelector.DEFINE.BODY) + '"></div>';
	html += '</div>';
	return html;
};

// 生成消息类型 html
MessageSelector.prototype._createMenu = function() {
	// TODO mod
	if (this._param.mode == 'button') {
		return this._createButtonMenu();
	} else if (this._param.mode == 'pull_down') {
		return this._createPullDownMenu();
	} else {
		return this._createTabMenu();
	}
};
// 生成tab风格html
MessageSelector.prototype._createTabMenu = function() {
	var msgType = 'text';
	if (this._data) {
		msgType = this._data[MessageSelector.DATA.TYPE];
	}
	var menuStr = '<div>';
	menuStr += '<ul class="tab">';

	for ( var i = 0, len = this._param.msg_types.length; i < len; i++) {

		var css = this._param.msg_types[i] == msgType ? 'class="tab_xz"' : '';
		var id = this._getId(MessageSelector.DEFINE.MENU_ID, this._param.msg_types[i] + '_');

		menuStr += '<li ' + css;
		menuStr += ' id="' + id + '">' + this._param.msg_type_names[this._param.msg_types[i]] + '</li>';
	}
	menuStr += '</ul>';
	menuStr += '</div>';
	return menuStr;
};
// 生成button风格html
MessageSelector.prototype._createButtonMenu = function() {
	var msgType = 'text';
	if (this._data) {
		msgType = this._data[MessageSelector.DATA.TYPE];
	}
	var html = '<div>';
	html += '<ul class="processUl clear">';
	for ( var i = 0, len = this._param.msg_types.length; i < len; i++) {
		var css = this._param.msg_types[i] == msgType ? 'activeLi' : '';
		var id = this._getId(MessageSelector.DEFINE.MENU_ID, this._param.msg_types[i] + '_');
		if (len == i + 1)
			css += ' last';
		html += '<li class="' + css + '"';
		html += ' id="' + id + '">' + this._param.msg_type_names[this._param.msg_types[i]] + '</li>';
	}
	html += '</ul>';
	html += '</div>';
	return html;
};
// 生成pull_down风格html
MessageSelector.prototype._createPullDownMenu = function() 
{	
	var html = '<span style="color: #0C82CC !important; font-size: 12px;">选择推送类型</span>';
	html += '<div class="arrowT">';
	html += '<div class="arrowt"></div>';
	html += '</div>';
	
	return html;
};
MessageSelector.prototype._createPullDown = function() 
{	
	var html = '<div id="'+this._getId(MessageSelector.DEFINE.PULL_DOWN)+'">';
	html += '<ul style="display: non;" class="udul udul2">';
	for ( var i = 0, len = this._param.msg_types.length; i < len; i++) {
		var css = '';
		switch  (this._param.msg_types[i]) {
			case 'text' :
				css = 'wenzi_keyword';
				break;
			case 'news' :
				css = 'tuwen_keyword';
				break;
			case 'music' :
				css = 'yinyue_keyword';
				break;
			case 'image' :
				css = 'tupian_keyword';
				break;
			case 'voice' :
				css = 'yuyin_keyword';
				break;
			case 'video' :
				css = 'shipin_keyword';
				break;
		}
		var id = this._getId(MessageSelector.DEFINE.MENU_ID, this._param.msg_types[i] + '_');
		html += '<li id="'+id+'" class="'+((i==len-1)?'pd10':'')+'">';
		html += '<a class="add_gjc '+css+'" href="javascript:;">'+
				this._param.msg_type_pull_names[this._param.msg_types[i]] + '</a>' ;
		html += '</li>';
	}
	html += '</ul>';
	html += '</div>';
	return html;
};
// 生成消息主体和默认数据显示内容
MessageSelector.prototype._createBody = function() {
	var msgType = 'text';
	if (this._data) {
		msgType = this._data[MessageSelector.DATA.TYPE];
	}

	var textContentId = this._getId(MessageSelector.DEFINE.TEXT_CONTENT);
	var materialContentId = this._getId(MessageSelector.DEFINE.MATERIAL_CONTENT);
	var textContentBoxId = this._getId(MessageSelector.DEFINE.TEXT_CONTENT_BOX);
	var materialContentBoxId = this._getId(MessageSelector.DEFINE.MATERIAL_CONTENT_BOX);
	var oauthSetId = this._getId(MessageSelector.DEFINE.IS_OAUTH);
	var oauthSetCon = this._getId(MessageSelector.DEFINE.OAUTH_SET_CON);
	var materialContent = (msgType == 'text') ? '' : this._createInitMessage();
	var newsCss = 'qfText';
	var textCss = '';
	switch (this._param.mode) {
	case 'button':
	case 'pull_down':
		newsCss = 'qf_button';
		textCss = 'qf_button';
		break;
	}
	var bodyStr = '';
	if (msgType != 'text') {
		bodyStr = '<div id="' + textContentBoxId + '" class="hide ' + textCss + '">';
	} else {
		bodyStr = '<div id="' + textContentBoxId + '" class="' + textCss + '">';
	}
	bodyStr += '<div id="'+this._getId(MessageSelector.DEFINE.WX_FACE_ID)+'" class="face_btn"></div>';
	bodyStr += '<textarea id="' + textContentId + '" class="qfText">' + (this._data ? (this._data[MessageSelector.DATA.CONTENT] || '') : '') + '</textarea>';
	bodyStr += '</div>';
	bodyStr += '<div id="' + materialContentBoxId + '" ';
	if (msgType == 'text') {
		bodyStr += 'class="hide"';
	}
	bodyStr += '>';
	bodyStr += '<div class="' + newsCss + '">';
	bodyStr += '<div id="' + materialContentId + '">' + materialContent + '</div>';
	bodyStr += '<div class="hide" id="'+oauthSetCon+'" style="margin:0 0 10px 10px;">是否OAUTH验证：<input type="checkbox"id="'+oauthSetId+'" style="vertical-align: middle;cursor: pointer;"/></div>';
	bodyStr += '</div>';
	bodyStr += '</div>';
	return bodyStr;
};
// 初始化消息数据
MessageSelector.prototype._createInitMessage = function() {
	if (!this._data)
		return;

	var msgType = this._data[MessageSelector.DATA.TYPE];
	var msgHtml = '';

	switch (msgType) {
	case 'text':
		msgHtml = this._data[MessageSelector.DATA.CONTENT];
		break;
	case 'coupon':
	case "news":
		var news_data = this._data[MessageSelector.DATA.ARTICLES];
		msgHtml = '<div class="TW_box" style="width: 320px;">';
		if (news_data) {
			var news_count = news_data.length;
			
			if (news_count > 1) {
				msgHtml += '<div class="appTwb1">';
				msgHtml += '<div class="reveal news_first" style="background-image:url(\'' + news_data[0][MessageSelector.DATA.PICURL] + '\')">';
				msgHtml += '<h5 class="tw_z"><a class="z_title" href="javascript:;">' + news_data[0][MessageSelector.DATA.TITLE] + '</a></h5>';
				msgHtml += '</div></div>';
				msgHtml += '<div class="appTwb2">';
				for ( var i = 1; i < news_count; i++) {
					msgHtml += '<div class="tw_li">';
					msgHtml += '<a class="atext" href="javascript:;">' + news_data[i][MessageSelector.DATA.TITLE] + '</a>';
					msgHtml += '<img width="70" height="70" src="' + news_data[i][MessageSelector.DATA.PICURL] + '" />';
					msgHtml += '</div>';
				}
				msgHtml += '</div>';
			} else if (news_count > 0) {
				msgHtml += '<div class="appTwb1">';
				msgHtml += '<h3 class="twh3"><a href="javascript:;">' + news_data[0][MessageSelector.DATA.TITLE] + '</a></h3>';
				msgHtml += '<div class="reveal news_first" style="background-image:url(\'' + news_data[0][MessageSelector.DATA.PICURL] + '\')"></div>';
				msgHtml += '</div>';
				msgHtml += '<div class="appTwb2">';
				msgHtml += '<div class="tw_text">';
				msgHtml += '<p>' + news_data[0][MessageSelector.DATA.DESC] + '</p>';
				msgHtml += '</div></div>';
			}
		}
		msgHtml += '</div>';
		break;
	case "image":
		var picUrl = this._data[MessageSelector.DATA.MEDIA_URL];
		var title = this._data[MessageSelector.DATA.TITLE];
		msgHtml = '<div class="TW_box" style="width: 320px;">';
		msgHtml += '<div class="appTwb1">';
		msgHtml += '<h3 class="twh3">';
		msgHtml += '<a href="javascript:void(0);">' + title + '</a>';
		msgHtml += '</h3>';
		msgHtml += '<div style="height:auto;" class="reveal news_first">';
		msgHtml += '<img src="' + picUrl + '" />';
		msgHtml += '</div>';
		msgHtml += '</div>';
		msgHtml += '</div>';
		break;
	case "music":
		var title = MessageSelector.cutStr(this._data[MessageSelector.DATA.TITLE], 34);
		var description = MessageSelector.cutStr(this._data[MessageSelector.DATA.DESC], 128);
		var musicUrl = this._data[MessageSelector.DATA.MUSIC_URL];
		var thmubUrl = this._data[MessageSelector.DATA.THUMB_PATH];
		msgHtml = '<div class="TW_box" style="width: 320px;">';
		msgHtml += '<div class="appTwb1">';
		msgHtml += '<div class="con_Ivredit" style="overflow:hidden;">';
		msgHtml += '<div class="twp" style="height: 100px;width: 100px;float:left;overflow:hidden;">';
		msgHtml += '<img width="100" height="100" id="img" style="position:absolute;" src="' + thmubUrl + '">';
		msgHtml += '<div style="position:absolute;left:10px;top:35px;"><div class="jp-jplayer" id="jquery_jplayer_0"></div>';
		msgHtml += '<div class="jp-audio" id="jp_container_0" onclick="JPlayer(\'0\',\'' + musicUrl + '\');">';
		msgHtml += '<a tabindex="1" class="jp-play audioImgBarBtn audioPlayBtn" href="javascript:;" style="margin: 2px 0 0 30px"></a>';
		msgHtml += '<a tabindex="1" class="jp-pause audioImgBarBtn audioStopBtn" href="javascript:;" style="margin: 2px 0 0 30px;display:none;"></a>';
		msgHtml += '</div></div></div><div class="twp" style="float:left;width:180px; max-width:none;"><h3>';
		msgHtml += '<a href="javascript:void(0);">' + title + '</a></h3><p>' + description + '</p>';
		msgHtml += '</div></div></div></div>';
		break;
	case "voice":
		var voiceUrl = '/media.php?url=' + this._data[MessageSelector.DATA.MEDIA_URL];
		var title = this._data[MessageSelector.DATA.TITLE];
		msgHtml = '<div class="TW_box" style="width: 320px;">';
		msgHtml += '<div class="appTwb1">';
		msgHtml += '<h3 class="twh3">';
		msgHtml += '<a href="javascript:void(0);">' + title + '</a>';
		msgHtml += '</h3>';
		msgHtml += '<div class="dhLb he">';
		msgHtml += '<div class="cloud cloudText">';
		msgHtml += '<div class="cloudPannel">';
		msgHtml += '<div class="cloudBody" style="width:290px;">';
		msgHtml += '<div class="cloudContent">';
		msgHtml += '<div class="jp-jplayer" id="jquery_jplayer_0"></div>';
		msgHtml += '<div style="background-color: #B2CF73;width:270px;" class="jp-audio" id="jp_container_181" onclick="JPlayer(\'0\',\'' + voiceUrl + '\')">';
		msgHtml += '<a tabindex="1" class="jp-play" href="javascript:;"></a>';
		msgHtml += '<a tabindex="1" style="display:none;" class="jp-pause" href="javascript:;"></a>';
		msgHtml += '</div></div></div>';
		msgHtml += '<div class="cloudArrow"></div>';
		msgHtml += '</div></div></div></div></div>';
		break;
	case "video":
		var video_url = this._data[MessageSelector.DATA.MEDIA_URL];
		var title = this._data[MessageSelector.DATA.TITLE];
		var description = this._data[MessageSelector.DATA.DESC];
		var date = new Date();
		date = date.Format("yyyy-MM-dd");
		
		msgHtml = '<div class="TW_box" style="width: 320px;">';
		msgHtml += '<div class="appTwb1" style="margin:10px;">';
		msgHtml += '<h3 style="margin-left:0px;" class="twh3">';
		msgHtml += '<a href="javascript:void(0);">' + title + '</a>';
		msgHtml += '</h3>';
		msgHtml += '<p style="margin-left:0px;" class="twp create_time">' + date + '</p>';
		msgHtml += '<div style="position:relative;z-index: 100;" id="video_0">';
		msgHtml += '<div id="a244_176" style="color: rgb(255, 221, 0);">';
		msgHtml += '<object width="300" align="middle" height="250" name="ckplayer_a_0" id="ckplayer_a_0"';
		msgHtml += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0"';
		msgHtml += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" pluginspage="http://www.macromedia.com/go/getflashplayer">';
		msgHtml += '<param value="always" name="allowScriptAccess" />';
		msgHtml += '<param value="false" name="allowFullScreen" />';
		msgHtml += '<param value="high" name="quality" />';
		msgHtml += '<param value="#000" name="bgcolor" />';
		msgHtml += '<param value="/Admin/Public_1/cj/ckplayer/ckplayer.swf?v=2.1" name="movie" />';
		msgHtml += '<param value="f=' + video_url + '&amp;c=0&amp;b=1" name="flashvars" />';
		msgHtml += '<embed width="300" align="middle" height="250" pluginspage="http://www.macromedia.com/go/getflashplayer"';
		msgHtml += 'type="application/x-shockwave-flash" id="ckplayer_a_0" name="ckplayer_a_0" flashvars="f=' + video_url + '&amp;c=0&amp;b=1"';
		msgHtml += 'src="/Admin/Public_1/cj/ckplayer/ckplayer.swf?v=2.1" bgcolor="#000" quality="high" allowfullscreen="false"';
		msgHtml += 'allowscriptaccess="always" />';
		msgHtml += '</object>';
		msgHtml += '</div></div></div>';
		msgHtml += '<div class="appTwb2">';
		msgHtml += '<div style="padding-left:10px;min-height: 50px;">';
		msgHtml += '<p>' + description + '</p>';
		msgHtml += '</div>';
		msgHtml += '</div>';
		msgHtml += '</div>';
		break;
	}
	return msgHtml;
};

// 获取生成相应的ID
MessageSelector.prototype._getId = function(id, suffix) {
	suffix = suffix || '';
	return suffix + 'mess_' + this._id + '_' + id;
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

// 截取字符串，str:待截取的字符串， len：需截取的长度
MessageSelector.cutStr = function(str, len) {
	if (! str) return '';
	var str_length = 0;
	var str_len = 0;
	str_cut = new String();
	str_len = str.length;
	for ( var i = 0; i < str_len; i++) {
		a = str.charAt(i);
		str_length++;
		if (escape(a).length > 4) {
			// 中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if (str_length >= len) {
			str_cut = str_cut.concat("...");
			return str_cut;
		}
	}
	// 如果给定字符串小于指定长度，则返回源字符串；
	if (str_length < len) {
		return str;
	}
};

// ID常量设置
MessageSelector.DEFINE = {
	BODY : 'body',
	MENU : 'menuTab',
	MSG_TYPE : 'msg_type',
	SUBMIT_BTN : 'submit_material',
	MATERIAL_CONTENT : 'material_content',
	MENU_ID : 'menu_li',
	TEXT_CONTENT : 'text_content',
	MATERIAL_CONTENT : 'material_content',
	TEXT_CONTENT_BOX : 'text_content_box',
	MATERIAL_CONTENT_BOX : 'material_content_box',
	MENU_PULL : 'menu_pull',
	PULL_DOWN :'pull_down',
	IS_OAUTH: 'is_oauth',
	OAUTH_SET_CON: 'oauth_set_con',
	WX_FACE_ID: 'wxFaceId'
};

// 数据常量设置
MessageSelector.DATA = {
	TYPE : 'msg_type',
	CONTENT : 'content',
	ARTICLES : 'articles',
	TITLE : 'title',
	DESC : 'description',
	MEDIA_URL : 'media_url',
	THUMB_PATH : 'thumb_url',
	PICURL : 'picurl',
	MUSIC_URL : 'music_url',
	MATERIAL_ID : 'material_id',
	IS_OAUTH: 'is_oauth'
};

// URL常量设置
MessageSelector.URLS = {
	GET_NEWS_URL : '/Admin/index.php?a=MaterialNews&m=showMaterial', //获取图文url
	GET_MUSIC_URL : '/Admin/index.php?a=MaterialMusic&m=showMaterial', //获取音乐url
	GET_IMAGE_URL : '/Admin/index.php?a=MaterialImage&m=showMaterial', //获取图片url
	GET_VOICE_URL : '/Admin/index.php?a=MaterialVoice&m=showMaterial', //获取语音url
	GET_VIDEO_URL : '/Admin/index.php?a=MaterialVideo&m=showMaterial' //获取视频url
};