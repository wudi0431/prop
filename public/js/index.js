


require(['zepto', 'page', 'part'], function($, Page, Part) {

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