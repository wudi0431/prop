define(['FFF','zepto'], function(FFF,$) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Btncom() {
        Widget.apply(this, arguments);
    }
    Btncom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_iteam"></div>')
        }
    };
    F.extend(Btncom, Widget, {
        renderUI: function() {
            var that = this;
            var $box = that.getBoundingBox();
            var tpl = '<button type="button" class="W_btn">按钮文字</button>';
            $box.append(tpl);
            that.$box = $box;
            that.$boxContent = $box.find('.W_btn');
        },
        bindUI: function() {
            var that = this;
            that.$box.on('click', function(e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    $('#J_btncomContent').show().siblings('.W_editIteam').hide();
                } 
            });


        }
    });
    return {
        Btncom: Btncom
    };
});