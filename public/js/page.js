define(['FFF'], function (FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Page() {
        Widget.apply(this, arguments);
    }

    Page.ATTRS = {
        boundingBox: {
            value: $('<div class="pages"></div>')
        },
        index:{
        		value:0,
        		changeFn:function(obj){
        			
        		}
        }
    };  
    F.extend(Page, Widget, {
        renderUI: function () {
            var that = this;
            
            var html ='<div class="page-item j_page page-active" data-index="' + that.getIndex() + '" data-id="opa_page_' + that.getIndex() + '">'
						+'<div class="page-img-wrapper">'
						+'	<div class="page-cont" style="background-color: rgb(240, 237, 240);"></div>'
						+'</div>'
						+'<a href="javascript:;" class="icon j_page_remove"></a>'
					+'</div>';
					
					that.getBoundingBox().append(html);
            

        },
        bindUI: function () {
            var that = this;
            
            var $dom =that.getBoundingBox();
            
            that.$reomve = $dom.find(".j_page_remove");
              that.$reomveActive =$dom.find('.page-item')

        },
		 removeActive:function(){
		 	 this.$reomveActive.removeClass('page-active');
		 }
    });

    return {
        Page: Page
    };
});