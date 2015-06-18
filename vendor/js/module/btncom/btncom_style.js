define(['FFF', 'jquery','spectrum'], function (FFF, $) {
    var F = FFF.FFF;
    var J_btncomStyle = $('#J_btncomStyle');

    var J_btncomWidth = $('#J_btncomWidth');
    var J_btncomHeight = $('#J_btncomHeight');
    var J_btncomColor = $('#J_btncomColor');
    var J_btncomLeft = $('#J_btncomLeft');
    var J_btncomTop = $('#J_btncomTop');
    var J_btncomColor = $('#J_btncomColor');
    var J_btncomBKColor = $('#J_btncomBKColor');

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
            F.trigger('btncomStyleChange', {
                type:'color',
                value: dddc
            });



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
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function (color) {
            console.log(color);
            var dddc = 'rgba('+color._r.toFixed()+','+color._g.toFixed()+','+color._b.toFixed()+','+color._a+')';
            F.trigger('btncomStyleChange', {
                type:'color',
                value: dddc
            });



        }
    });


    F.on('renderBtncomContent', function (data) {
        Object.keys(data).forEach(function (o) {
            switch (o) {
                case 'width':
                    J_btncomWidth.val(data[o]);
                    break;
                case 'height':
                    J_btncomHeight.val(data[o]);
                    break;
                case 'left':
                    J_btncomLeft.val(data[o]);
                    break;
                case 'top':
                    J_btncomTop.val(data[o]);
                    break;
                case 'color':
                    if(data[o]!="") J_btncomColor.spectrum("set",data[o])
                    J_btncomColor.val(data[o]);
                    break;
            }
        });
    });


    J_btncomWidth.on('input', function () {
        _btncomStyleChange(this,'width');
    });
    J_btncomHeight.on('input', function () {
        _btncomStyleChange(this,'height');
    });
    J_btncomLeft.on('input', function () {
        _btncomStyleChange(this,'left');
    });
    J_btncomTop.on('input', function () {
        _btncomStyleChange(this,'top');
    });


    function _btncomStyleChange(self,type){
        var $that = $(self);
        var value = $that.val();
        F.trigger('btncomStyleChange', {
            type: type,
            value: value
        });
    }

});