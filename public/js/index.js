


require(['zepto', 'page', 'part'], function($, Page, Part) {

var PAGES={};

// 全局配置项，放置到window作用域的目的是
// 在页面作为编辑入口的时候可以在取到已有数据的js中动态修改该配置项内容
// 若不考虑编辑功能，可将该变量改为本作用域内
window.SETTINGS = {
    DEFAULT_INDEX : 1,
    CURRENT_INDEX : -1,
    CURRENT_STAGE : null,
    CURRENT_PAGE: null,
    STAGE_ARRAY : [],
    STAGE_DATA : [],
    SCALE: 0.375,
    TRANSLIST: [
        'noAnimate', 'movedown', 'moveup', 'moveright', 'moveleft', 'zoomin', 'zoomout', 'rotatein', 'rotateout',
        // 整合animate.css
        'mi-bounce', 'mi-flash', 'mi-pulse', 'mi-rubberBand', 'mi-shake', 'mi-swing', 'mi-tada', 'mi-wobble', 'mi-bounceIn', 'mi-bounceInDown', 'mi-bounceInLeft', 'mi-bounceInRight', 'mi-bounceInUp', 'mi-fadeIn', 'mi-fadeInDown', 'mi-fadeInDownBig', 'mi-fadeInLeft', 'mi-fadeInLeftBig', 'mi-fadeInRight', 'mi-fadeInRightBig', 'mi-fadeInUp', 'mi-fadeInUpBig', 'mi-flip', 'mi-flipInX', 'mi-flipInY', 'mi-lightSpeedIn', 'mi-rotateIn', 'mi-rotateInDownLeft', 'mi-rotateInDownRight', 'mi-rotateInUpLeft', 'mi-rotateInUpRight', 'mi-hinge', 'mi-rollIn', 'mi-zoomIn', 'mi-zoomInDown', 'mi-zoomInLeft', 'mi-zoomInRight', 'mi-zoomInUp', 'mi-slideInDown', 'mi-slideInLeft', 'mi-slideInRight', 'mi-slideInUp'
    ]
};
 
  // Dom Elements
    var $doc = $(document),
        $createpage =$("#addPage"),
        $createtext =$("#addtext"),
        $createpimage =$("#addimage"),
        $createbutton =$("#addbutton"),
        $pageList=$('.page-list');

 /*
     * ** 添加页面按钮点击事件 **
     * 1、创建舞台元素
     * 2、创建缩略图
     * 3、更新序号
     */
     $createpage .on("click", function(ev){
        // var tsb = tSet.find(".mi-set-bd");
        if (pageList.find('.per-page').length >= maxPage) {
            infoTip.show('warn', 'Oops，最多只支持添加' + maxPage + "个页面！");
            return false;
        }
        PAGES.createPage();

        // update index number
        PAGES.updateIndex();
        // edit stage
        PAGES.edit('stage');
        // SETTINGS.SCROLLBAR.reset();
        setTimeout(function(){
            $('#J_ScrollContainer').trigger('rollbar', [1, 0]);
        }, 500);
        PAGES.saveCurrentStage(null, $("#J_ReToken").val());
    });


	//TODO  暂不做处理 勿添加多个page
	var curPage = null;


	(function($) {
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
	})($);




});