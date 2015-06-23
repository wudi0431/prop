define(['FFF', 'jquery','spectrum'], function (FFF, $) {
    var F = FFF.FFF;
    var J_btncomStyle = $('#J_btncomStyle');

    var J_btncomColor = $('#J_btncomColor');
    var J_btncomBKColor = $('#J_btncomBKColor');

    var uitl = 'px';

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
            $.each($('.J_btncom'), function (index,btncom) {
                var $btncom  = $(btncom);
                var type = $btncom.data('type');
                var value = data[type];
                if(value =="" || value==undefined || value==null) {
                    return false;
                }
                if(typeof value !='string'){
                    value = value.toString();
                }
                if(value && value.indexOf('px')!=-1){
                    value = value.replace('px','');
                }
                switch (type) {
                    case 'width':
                        $btncom.val(value);
                        break;
                    case 'height':
                        $btncom.val(value);
                        break;
                    case 'top':
                        $btncom.val(value);
                        break;
                    case 'right':
                        $btncom.val(value);
                        break;
                    case 'bottom':
                        $btncom.val(value);
                        break;
                    case 'left':
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
                    case 'transform':
                    if(value.indexOf('rotate')!=-1){
                         $btncom.val(value.match(/(\d+)/)[0]);
                    }
                        break;
                    case 'opacity':
                        value = parseInt(value*100).toString();
                        $btncom.val(value);
                        break;
                }
            });

    });

    $.each($('.J_btncom'), function (index,btncom) {
        var $btncom =$(btncom);
        $btncom.on('change', function () {
            var type = $btncom.data('type');
            var value = $btncom.val();
            if(value =="" || value==undefined || value==null) {
                return false;
            }
            switch(type){
                case 'transform':
                    $btncom.attr('deg',value)
                    value='rotate('+value+'deg)';
                    break;
                case 'opacity':
                    value=parseInt(value)/100;
                    value =value.toString();
                    break;
                default :
                    value= value+uitl;
            }
            _btncomStyleChange(value,type);
        })
    })

    $.each($('.J_abtncom'), function (index,btncom) {
        var $btncom =$(btncom);
        $btncom.on('click', function () {
            var type = $btncom.data('type');
            var value = $btncom.val();
            var curcom  = $('.select');
            var w = curcom.width(),h=curcom.height();
            var p = curcom.position();
            var f = curcom.attr('style');
            f=f.match(/\d+deg/)[0].replace('deg','');
            var h = getRotateSize(p.top, p.left,  p.left + w, p.top + h, f);
            if(value==undefined || value==null) {
                return false;
            }
            switch(type){
                case 'totop':
                    value=  0 - (h.top - p.top)+uitl;
                    type='top';
                    break;
                case 'tomiddle':
                    value=255 - h.height / 2 - (h.top - p.top)+uitl;
                    type='top';
                    break;
                case 'tobottom':
                    value= 510 - h.height - (h.top - p.top)+uitl;
                    type='top';
                    break;
                case 'toleft':
                    value= 0 - (h.left -  p.left)+uitl;
                    type='left';
                    break;
                case 'toright':
                    value = 320 - h.width - (h.left - p.left)+uitl;
                    type='left';
                    break;
                case 'tocenter':
                    value = 160 - h.width / 2 - (h.left - p.left)+uitl;
                    type='left';
                    break;
            }
            _btncomStyleChange(value,type);
        })
    })

    function _btncomStyleChange(value,type){
        F.trigger('btncomStyleChange', {
            type: type,
            value: value
        });
    }
     function d(a, b, c) {
        return {x1: Math.round(Math.cos(c * Math.PI / 180) * a + Math.sin(c * Math.PI / 180) * b),y1: Math.round(Math.cos(c * Math.PI / 180) * b - Math.sin(c * Math.PI / 180) * a)}
    };
     function getRotateSize(a, b, c, e, f) {
        var g = b, h = a, i = c, j = e, k = c - b, l = e - a;
        if (0 !== f) {
            var m = b + k / 2, n = a + l / 2, o = d(b - m, n - a, f), p = d(c - m, n - a, f), q = d(b - m, n - e, f), r = d(c - m, n - e, f);
            g = m - Math.abs(Math.min(o.x1, p.x1, q.x1, r.x1)), h = n - Math.abs(Math.max(o.y1, p.y1, q.y1, r.y1)), i = m + Math.abs(Math.max(o.x1, p.x1, q.x1, r.x1)), j = n + Math.abs(Math.min(o.y1, p.y1, q.y1, r.y1))
        }
        return {left: g,top: h,right: i,bottom: j,width: i - g,height: j - h}
    }


});