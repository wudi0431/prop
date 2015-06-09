define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;
    var J_btncomStyle = $('#J_btncomStyle');

    var J_btncomWidth = $('#J_btncomWidth');
    var J_btncomHeight = $('#J_btncomHeight');


    F.on('renderBtncomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'width':
                    J_btncomWidth.val(data[o]);
                    break;
                case 'height':
                    J_btncomHeight.val(data[o]);
                    break;
            }
        });
    });


    J_btncomWidth.on('input', function () {
        var $that = $(this);
        var value = $that.val();
        F.trigger('btncomStyleChange', {
            type: 'width',
            value: value
        });
    });

    J_btncomHeight.on('input', function () {
        var $that = $(this);
        var value = $that.val();
        F.trigger('btncomStyleChange', {
            type: 'height',
            value: value
        });
    });

});