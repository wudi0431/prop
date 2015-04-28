define(['FFF', 'zepto'], function(FFF, $) {
	var F = FFF.FFF;
	var Widget = F.Widget;

	function UILoading() {
		Widget.apply(this, arguments);
	}

	UILoading.ATTRS = {
		boundingBox: {
			value: $('<div class="W_s_shade"></div>')
		},
		title: {
			value: '',
			changeFn: function(obj) {
				var that = this;
				that.$title && that.$title.text(obj.value);
			}
		},
		typeclass: {
			value: 'glyphicon-info-sign',
			changeFn: function(obj) {
				var that = this;
				that.$icon && that.$icon.text(obj.value);
			}
		},
		isshowclosed: {
			value: false
		}
	}
	F.extend(UILoading, Widget, {
		initialize: function() {

		},
		renderUI: function() {
			var that = this;
			var html = '<span class="glyphicon glyphicon-remove-circle W_s_shadeClose W_uiloading_closed"></span><div class="W_s_shadeMsg"><span class="glyphicon ' + that.getTypeclass() + ' J_icon"></span><span class="W_s_shadeTxt">' + that.getTitle() + '</span></div>';

			that.getBoundingBox().append(html);


		},
		bindUI: function() {
			var that = this;
			that.$dom = that.getBoundingBox();
			that.$icon = that.$dom.find('.glyphicon');
			that.$title = that.$dom.find('.W_s_shadeTxt');
			var $laoding_Closed = that.$dom.find('.W_s_shadeClose');
			var isshowclosed = that.getIsshowclosed();
			isshowclosed && $laoding_Closed.removeClass('W_uiloading_closed');
			$laoding_Closed.on('click', function() {
				that.hideLoading();
			});
		},
		destructor: function() {

		},
		showLoading: function() {
			this.$dom.show();
		},
		hideLoading: function() {
			this.$dom.hide();
		},
		removeLoading: function() {
			this.$dom.remove();
		}
	});
	return {
		UILoading: UILoading
	}
});