require(['zepto', 'page', 'part'], function($, Page, Part) {

	var PAGES = {};

	// 全局配置项，放置到window作用域的目的是
	// 在页面作为编辑入口的时候可以在取到已有数据的js中动态修改该配置项内容
	// 若不考虑编辑功能，可将该变量改为本作用域内
	window.SETTINGS = {
		DEFAULT_INDEX: 1,
		CURRENT_INDEX: -1,
		CURRENT_STAGE: null,
		CURRENT_PAGE: null,
		STAGE_ARRAY: [],
		STAGE_DATA: [],
		SCALE: 0.375,
		TRANSLIST: [
			'noAnimate', 'movedown', 'moveup', 'moveright', 'moveleft', 'zoomin', 'zoomout', 'rotatein', 'rotateout',
			// 整合animate.css
			'mi-bounce', 'mi-flash', 'mi-pulse', 'mi-rubberBand', 'mi-shake', 'mi-swing', 'mi-tada', 'mi-wobble', 'mi-bounceIn', 'mi-bounceInDown', 'mi-bounceInLeft', 'mi-bounceInRight', 'mi-bounceInUp', 'mi-fadeIn', 'mi-fadeInDown', 'mi-fadeInDownBig', 'mi-fadeInLeft', 'mi-fadeInLeftBig', 'mi-fadeInRight', 'mi-fadeInRightBig', 'mi-fadeInUp', 'mi-fadeInUpBig', 'mi-flip', 'mi-flipInX', 'mi-flipInY', 'mi-lightSpeedIn', 'mi-rotateIn', 'mi-rotateInDownLeft', 'mi-rotateInDownRight', 'mi-rotateInUpLeft', 'mi-rotateInUpRight', 'mi-hinge', 'mi-rollIn', 'mi-zoomIn', 'mi-zoomInDown', 'mi-zoomInLeft', 'mi-zoomInRight', 'mi-zoomInUp', 'mi-slideInDown', 'mi-slideInLeft', 'mi-slideInRight', 'mi-slideInUp'
		]
	};

	// Dom Elements
	var $doc = $(document),
		$createpage = $("#addPage"),
		$createtext = $("#addtext"),
		$createpimage = $("#addimage"),
		$createbutton = $("#addbutton"),
		$createInfo = $('a[data-controltype]'),
		$pageList = $('.page-list');

	/*
	 * ** 添加页面按钮点击事件 **
	 * 1、创建舞台元素
	 * 2、创建缩略图
	 * 3、更新序号
	 */
	$createpage.on("click", function(ev) {
		// var tsb = tSet.find(".mi-set-bd");
		if ($pageList.length >= 30) {
			//infoTip.show('warn', 'Oops，最多只支持添加' + 30 + "个页面！");
			return false;
		}
		PAGES.createPage();

		// update index number
		PAGES.updateIndex();
		// edit stage
		PAGES.edit('stage');

		setTimeout(function() {
			$('#J_ScrollContainer').trigger('rollbar', [1, 0]);
		}, 500);
		PAGES.saveCurrentStage(null, $("#J_ReToken").val());
	});

	$('a[data-controltype]').on('click', function(e) {
		var $that = $(this);
		var type = $that.data('controltype');
		switch (type) {
			case 'addPage':
				curPage = new Page.Page().render({
					container: $('.page-list')
				});
				break;
			case 'addImg':
				new Part.Part({
					type: 'img',
					url: 'resource/img/100.png'
				}).render({
					container: curPage.getBoundingBox()
				});

				break;
			case 'addText':
				new Part.Part({
					type: 'text',
					text: '请输入文字',
					name: '默认图片'
				}).render({
					container: curPage.getBoundingBox()
				});
				break;

		}

	});


	PAGES.createPage = function() {
		// 	 var thumb = $('<div class="per-page clearfix active" data-index="' + SETTINGS.DEFAULT_INDEX + '" data-id="opa_page_' + SETTINGS.DEFAULT_INDEX + '">'),
		//          stage = $('<div class="opa-stage stage" data-index="' + SETTINGS.DEFAULT_INDEX + '" data-id="opa_stage_' + SETTINGS.DEFAULT_INDEX + '" style="background-image:url(http://img12.360buyimg.com/cms/jfs/t688/139/1295390968/6927/2b7f5b2a/54ca0b26Nd81df9f5.png);">');
		//
		//      thumb.html('<div class="J_PageThumb sort-bar">'
		//          + '<span class="mi-icons mi-icons-page"></span>'
		//          + '<p class="mi-num">' + SETTINGS.DEFAULT_INDEX + '</p>'
		//          + '</div>'
		//          + '<div class="act-bar">'
		//          + '<span class="J_PrevPage mi-icons mi-icons-up"></span>'
		//          + '<span class="J_NextPage mi-icons mi-icons-down"></span>'
		//          + '<span class="J_DeletePage mi-icons mi-icons-del"></span>'
		//          + '</div>');
		curPage = new Page.Page({
			index: SETTINGS.DEFAULT_INDEX
		}).render({
			container: $('.page-list'),
		});


		if (SETTINGS.CURRENT_PAGE) {
			curPage.removeActive();
		}
		if (SETTINGS.CURRENT_INDEX != -1) {
			if (SETTINGS.STAGE_DATA[SETTINGS.CURRENT_INDEX] != tStage.html()) {
				SETTINGS.STAGE_DATA[SETTINGS.CURRENT_INDEX] = tStage.html().replace(/(\s+)(select-mark|current)/g, "").replace(/(-\w+-)?animation(-(name|delay|duration))?:[\s\w\.]+;/g, '');
				PAGES.saveCurrentStage();
				// setThumb();
			}
		}
		//      $pageList.append(thumb);
		//      tStage.html("").append(stage);
		//      SETTINGS.STAGE_ARRAY[SETTINGS.DEFAULT_INDEX] = stage;
		SETTINGS.CURRENT_PAGE = curPage;
		//      SETTINGS.CURRENT_STAGE = stage;
		//      SETTINGS.STAGE_DATA[SETTINGS.DEFAULT_INDEX] = tStage.html();
		SETTINGS.CURRENT_INDEX = +SETTINGS.DEFAULT_INDEX;
		SETTINGS.DEFAULT_INDEX++;




	}











	//TODO  暂不做处理 勿添加多个page
	var curPage = null;


	(function($) {

	})($);




});