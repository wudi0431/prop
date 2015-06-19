define(['FFF', 'jquery','spectrum'], function (FFF, $) {
    var F = FFF.FFF;
    var J_btncomStyle = $('#J_btncomStyle');

    var J_btncomColor = $('#J_btncomColor');
    var J_btncomBKColor = $('#J_btncomBKColor');

    var J_btncom = $('.J_btncom');

    J_btncomColor.spectrum({
        allowEmpty:true,
        color: "#ECC",
        showInput: true,
        containerClassName: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        showAlpha: true,
        maxPaletteSize: 10,
        preferredFormat: "hex",
        localStorageKey: "spectrum.demo",
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function (color) {
            console.log(color);
            var dddc = 'rgba('+color._r.toFixed()+','+color._g.toFixed()+','+color._b.toFixed()+','+color._a+')';
            _btncomStyleChange(dddc,'color');
        }
    });

    J_btncomBKColor.spectrum({
        allowEmpty:true,
        color: "#ECC",
        showInput: true,
        containerClassName: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        showAlpha: true,
        maxPaletteSize: 10,
        preferredFormat: "hex",
        localStorageKey: "spectrum.demo",
        hide: function (color) {
            console.log(color);
            var dddc = 'rgba('+color._r.toFixed()+','+color._g.toFixed()+','+color._b.toFixed()+','+color._a+')';
            _btncomStyleChange(dddc,'backgroundColor');
        }
    });


    F.on('renderBtncomContent', function (data) {
            $.each(J_btncom, function (index,btncom) {
                var $btncom  = $(btncom); 
                var type = $btncom.data('type');
                var value = data[type].replace('px','');
                switch (type) {
                    case 'width':
                        $btncom.val(value);
                        break;
                    case 'height':
                        $btncom.val(value);
                        break;
                    case 'left':
                        $btncom.val(value);
                        break;
                    case 'top':
                        $btncom.val(value);
                        break;
                    case 'color':
                        if(value!="") J_btncomColor.spectrum("set",value)
                        J_btncomColor.val(value);
                        break;
                    case 'backgroundColor':
                        if(value!="") J_btncomBKColor.spectrum("set",value)
                        J_btncomBKColor.val(value);
                        break;
                }
            });

    });

    $.each(J_btncom, function (index,btncom) {
        var $btncom =$(btncom);
        var type = $btncom.data('type');
        var value = $btncom.val()+'px';
        _btncomStyleChange(value,type);
    })

    function _btncomStyleChange(value,type){
        F.trigger('btncomStyleChange', {
            type: type,
            value: value
        });
    }

});