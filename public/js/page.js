define(['FFF'], function (FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Page() {
        Widget.apply(this, arguments);
    }

    Page.ATTRS = {
        boundingBox: {
            value: $('<div class="pages"></div>')
        }
    };  
    F.extend(Page, Widget, {
        renderUI: function () {
            var that = this;
            
            that.guid = 'page_'+that.guidGenerator();
            
            var html ='<div class="page-item j_page page-active" id="'+that.guid+'">'
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
            
            var $reomve = $dom.find(".j_page_remove");
            
            
            


        },
        
		guidGenerator:function () {
		    var S4 = function() {
		       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		    };
		    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
		}
    });

    return {
        Page: Page
    };
});