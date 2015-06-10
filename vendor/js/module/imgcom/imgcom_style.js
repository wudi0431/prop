define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;
    var J_imgcomStyle = $('#J_imgcomStyle');

    var J_imgcomWidth = $('#J_imgcomWidth');
    var J_imgcomHeight = $('#J_imgcomHeight');


    F.on('renderImgcomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'width':
                    J_imgcomWidth.val(data[o]);
                    break;
                case 'height':
                    J_imgcomHeight.val(data[o]);
                    break;
            }
        });
    });


    J_imgcomWidth.on('input', function () {
        var $that = $(this);
        var value = $that.val();
        F.trigger('imgcomStyleChange', {
            type: 'width',
            value: value
        });
    });

    J_imgcomHeight.on('input', function () {
        var $that = $(this);
        var value = $that.val();
        F.trigger('imgcomStyleChange', {
            type: 'height',
            value: value
        });
    });

});