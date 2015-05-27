define(['FFF'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function BtncomContent() {
        Widget.apply(this, arguments);
    }
    Btncom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_iteam"></div>')
        },
        color: {
            value: YELLOW,
            changeFn: function(args) {
                var that = this;
                if (args.value !== args.prevValue) {
                    that.$boxContent.css({
                        backgroundColor: args.value
                    });
                }
            }
        }
    };
    F.extend(Btncom, Widget, {
        renderUI: function() {
            var that = this;
            var $box = that.getBoundingBox();
            var tpl = '<button type="button" class="W_btn>按钮文字</button>';
            $box.append(tpl);
            that.$box = $box;
            that.$boxContent = $box.find('.W_btn');
        },
        bindUI: function() {
            var that = this;
            that.$box.on('click', function(e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    //右侧属性设置渲染
                } 
            });
        },
        setBtncomStyle:function(){
            
        }
    });
    return {
        Btncom: Btncom
    };
});