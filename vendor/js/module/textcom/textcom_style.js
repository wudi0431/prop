define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;
    var J_textcomStyle = $('#J_textcomStyle');

    var J_textcomWidth = $('#J_textcomWidth');
    var J_textcomHeight = $('#J_textcomHeight');


    F.on('renderTextcomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'width':
                    J_textcomWidth.val(data[o]);
                    break;
                case 'height':
                    J_textcomHeight.val(data[o]);
                    break;
            }
        });
    });


    J_textcomWidth.on('input', function () {
        var $that = $(this);
        var value = $that.val();
        F.trigger('textcomStyleChange', {
            type: 'width',
            value: value
        });
    });

    J_textcomHeight.on('input', function () {
        var $that = $(this);
        var value = $that.val();
        F.trigger('textcomStyleChange', {
            type: 'height',
            value: value
        });
    });

});