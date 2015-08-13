define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;
    var J_btncomContent = $('#J_btncomContent');

    var J_btncomContext = J_btncomContent.find('#J_btncomContext');

    var J_btncomHref = J_btncomContent.find('#J_btncomHref');



    F.on('renderBtncomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'context':
                    J_btncomContext.val(data[o]);
                    break;
                case 'href':
                    J_btncomHref.val(data[o]);
                    break;
            }
        });
    });

    J_btncomContext.on('input',function(){
        var $that = $(this);
        var value = $that.val();
        F.trigger('btncomContextChange', value);
    });

    J_btncomHref.on('input',function(){
        var $that = $(this);
        var value = $that.val();
        F.trigger('btncomHrefChange', value);
    });

});