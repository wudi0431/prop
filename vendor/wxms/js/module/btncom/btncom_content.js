define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;
    var J_btncomContent = $('#J_btncomContent');

    var J_btncomContext = J_btncomContent.find('#J_btncomContext');


    F.on('renderBtncomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'context':
                    J_btncomContext.val(data[o]);
                    break;
            }
        });
    });

    J_btncomContext.on('input',function(){
        var $that = $(this);
        var value = $that.val();
        F.trigger('btncomContextChange', value);
    });

});