define(['FFF','zepto'], function(FFF,$) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Imgcom() {
        Widget.apply(this, arguments);
    }
    Imgcom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_iteam" data-type="imgcom"></div>')
        }
    };
    F.extend(Imgcom, Widget, {
        renderUI: function() {
            var that = this;
            var $box = that.getBoundingBox();
            var tpl = '<img src="/img/xuanzhuan.ico" class="W_imgcom" />';
            $box.append(tpl);
            that.$box = $box;
            that.$boxContent = $box.find('.W_imgcom');
        },
        bindUI: function() {
            var that = this;
            that.$box.on('click', function(e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    $('#J_imgcomContent').show().siblings('.W_editIteam').hide();
                } 
            });

        }
    });
    return {
        Imgcom: Imgcom
    };
});