define(['FFF', 'jquery'], function (FFF, $) {
    var F = FFF.FFF;
    var J_textcomContent = $('#J_textcomContent');

    var J_textcomContext = J_textcomContent.find('#J_textcomContext');


    F.on('renderTextcomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'context':
                    J_textcomContext.val(data[o]);
                    break;
            }
        });
    });

    J_textcomContext.on('input',function(){
        var $that = $(this);
        var value = $that.val();
        F.trigger('textcomContextChange', value);
    });

});