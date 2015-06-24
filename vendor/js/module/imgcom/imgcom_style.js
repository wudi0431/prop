define(['FFF', 'jquery','spectrum', 'jqui'], function (FFF, $) {
    var F = FFF.FFF;
    var J_imgcomStyle = $('#J_imgcomStyle');

    var J_imgcomColor = $('#J_imgcomColor');

    var J_imgcomBKColor = $('#J_imgcomBKColor');

    var J_borderStyleSelect = $('#J_imgcomborderStyleSelect');

    var J_imgcomorderColor = $('#J_imgcomorderColor');

    var J_imgcomboxShadowColor = $('#J_imgcomboxShadowColor');

    var J_imgcomboxTextShadowColor = $('#J_imgcomboxTextShadowColor');



    var uitl = 'px';



    J_imgcomorderColor.spectrum({
        allowEmpty: true,
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
            var dddc = 'rgba(' + color._r.toFixed() + ',' + color._g.toFixed() + ',' + color._b.toFixed() + ',' + color._a + ')';
            _imgcomStyleChange(dddc, 'borderColor');
        }
    });

    J_imgcomboxShadowColor.spectrum({
        allowEmpty: true,
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
            var dddc = 'rgba(' + color._r.toFixed() + ',' + color._g.toFixed() + ',' + color._b.toFixed() + ',' + color._a + ')';
            setShadow('color', dddc)
        }
    });

    J_imgcomboxTextShadowColor.spectrum({
        allowEmpty: true,
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
            var dddc = 'rgba(' + color._r.toFixed() + ',' + color._g.toFixed() + ',' + color._b.toFixed() + ',' + color._a + ')';
            setTextShadow('color', dddc)
        }
    });

    J_borderStyleSelect.selectmenu({
        width: 120,
        select: function (event, ui) {
            _imgcomStyleChange(ui.item.value || 'none', 'borderStyle');
        }
    });


    F.on('renderImgcomContent', function (data) {
        $.each($('.J_imgcom'), function (index, imgcom) {
            var $imgcom = $(imgcom);
            var type = $imgcom.data('type');
            var value = data[type];
            if (value == "" || value == undefined || value == null) {
                return false;
            }
            if (typeof value != 'string') {
                value = value.toString();
            }
            if (value && value.indexOf('px') != -1 && type != "boxShadow" && type != "textShadow") {
                value = value.replace('px', '');
            }
            switch (type) {
                case 'width':
                    $imgcom.val(Math.round(value));
                    break;
                case 'height':
                    $imgcom.val(Math.round(value));
                    break;
                case 'top':
                    $imgcom.val(Math.round(value));
                    break;
                case 'right':
                    $imgcom.val(Math.round(value));
                    break;
                case 'bottom':
                    $imgcom.val(Math.round(value));
                    break;
                case 'left':
                    $imgcom.val(Math.round(value));
                    break;
                case 'borderColor':
                    if (value != "") J_imgcomorderColor.spectrum("set", value)
                    J_imgcomorderColor.val(value);
                    break;
                case 'transform':
                    if (value.indexOf('rotate') != -1) {
                        $imgcom.val(value.match(/(\d+)/)[0]);
                    }
                    break;
                case 'opacity':
                    value = parseInt(value * 100).toString();
                    $imgcom.val(value);
                    break;
                case 'boxShadow':
                    var vals = value.split(' ')
                    J_imgcomboxShadowColor.spectrum("set", vals[4]);
                    $("[data-type=boxShadowSP]").val(vals[1].replace('px',''));
                    $("[data-type=boxShadowBL]").val(vals[2].replace('px',''));
                    $("[data-type=boxShadowY]").val(vals[3].replace('px',''));
                    var d =  $("[data-type=boxShadowX]").attr('deg');
                    $("[data-type=boxShadowX]").val(d||0);
                    $imgcom.attr('boxshadow', value);
                    break;
                case 'textShadow':
                    var vals = value.split(' ')
                    J_imgcomboxTextShadowColor.spectrum("set", vals[3]);
                    $("[data-type=TextShadowSP]").val(Math.abs(vals[1].replace('px','')));
                    $("[data-type=TextShadowBL]").val(Math.abs(vals[2].replace('px','')));
                    var d =  $("[data-type=TextShadowX]").attr('deg');
                    $("[data-type=TextShadowX]").val(d||0);
                    $imgcom.attr('textshadow', value);
                    break;
            }
        });

    });

    $.each($('.J_imgcom'), function (index, imgcom) {
        var $imgcom = $(imgcom);
        $imgcom.on('change', function () {
            var type = $imgcom.data('type');
            var value = $imgcom.val();
            if (value == "" || value == undefined || value == null || type == 'borderColor' || type == 'boxShadow') {
                return false;
            }
            switch (type) {
                case 'transform':
                    $imgcom.attr('deg', value)
                    value = 'rotate(' + value + 'deg)';
                    break;
                case 'opacity':
                    value = parseInt(value) / 100;
                    value = value.toString();
                    break;
                default :
                    value = value + uitl;
            }
            _imgcomStyleChange(value, type);
        })
    })

    $.each($('.J_aimgcom'), function (index, imgcom) {
        var $imgcom = $(imgcom);
        $imgcom.on('click', function () {
            var type = $imgcom.data('type');
            var value = $imgcom.val();
            var curcom = $('.select');
            var w = curcom.width(), h = curcom.height();
            var p = curcom.position();
            var f = curcom.attr('style');
            f = f.match(/\d+deg/)[0].replace('deg', '');
            var style = curcom.attr('style');
            var index = style.match(/z-index: \d/);
            if (index) {
                index = +index[0].split(':')[1];
            } else {
                index = 1;
            }
            var h = getRotateSize(p.top, p.left, p.left + w, p.top + h, f);
            if (value == undefined || value == null) {
                return false;
            }
            switch (type) {
                case 'totop':
                    value = 0 - (h.top - p.top) + uitl;
                    type = 'top';
                    break;
                case 'tomiddle':
                    value = 255 - h.height / 2 - (h.top - p.top) + uitl;
                    type = 'top';
                    break;
                case 'tobottom':
                    value = 510 - h.height - (h.top - p.top) + uitl;
                    type = 'top';
                    break;
                case 'toleft':
                    value = 0 - (h.left - p.left) + uitl;
                    type = 'left';
                    break;
                case 'toright':
                    value = 320 - h.width - (h.left - p.left) + uitl;
                    type = 'left';
                    break;
                case 'tocenter':
                    value = 160 - h.width / 2 - (h.left - p.left) + uitl;
                    type = 'left';
                    break;
                case 'uptop':
                    var indexs = getItemIndex()[0];
                    value = indexs + 1;
                    type = 'zIndex';
                    break;
                case 'up':
                    value = index + 1;
                    type = 'zIndex';
                    break;
                case 'down':
                    value = index - 1 || 1;
                    type = 'zIndex';
                    break;
                case 'upbottom':
                    var indexs = getItemIndex();
                    indexs = indexs[indexs.length - 1] - 1;
                    value = indexs || 1;
                    type = 'zIndex';

                    break;
            }
            if (value != "" && value != undefined && value != null) {
                _imgcomStyleChange(value, type);
            }
        })
    })

    $.each($('.J_Bimgcom'), function (index, imgcom) {
        var $imgcom = $(imgcom);
        $imgcom.on('change', function () {
            var type = $imgcom.data('type');
            var value = $imgcom.val();
            switch (type) {
                case 'boxShadowSP':
                    setShadow(type,value);
                    break;
                case 'boxShadowBL':
                    setShadow(type,value);
                    break;
                case 'boxShadowY':
                    setShadow(type,value);
                    break;
                case 'boxShadowX':
                    setShadow(type,value);
                    $imgcom.attr('deg',value);
                    break;
            }
        })
    })

    $.each($('.J_Timgcom'), function (index, imgcom) {
        var $imgcom = $(imgcom);
        $imgcom.on('change', function () {
            var type = $imgcom.data('type');
            var value = $imgcom.val();
            switch (type) {
                case 'TextShadowSP':
                    setTextShadow(type,value);
                    break;
                case 'TextShadowBL':
                    setTextShadow(type,value);
                    break;
                case 'TextShadowX':
                    setTextShadow(type,value);
                    $imgcom.attr('deg',value);
                    break;
            }
        })
    })

    function _imgcomStyleChange(value, type) {
        F.trigger('imgcomStyleChange', {
            type: type,
            value: value
        });
    }

    function d(a, b, c) {
        return {
            x1: Math.round(Math.cos(c * Math.PI / 180) * a + Math.sin(c * Math.PI / 180) * b),
            y1: Math.round(Math.cos(c * Math.PI / 180) * b - Math.sin(c * Math.PI / 180) * a)
        }
    };

    function getRotateSize(a, b, c, e, f) {
        var g = b, h = a, i = c, j = e, k = c - b, l = e - a;
        if (0 !== f) {
            var m = b + k / 2, n = a + l / 2, o = d(b - m, n - a, f), p = d(c - m, n - a, f), q = d(b - m, n - e, f), r = d(c - m, n - e, f);
            g = m - Math.abs(Math.min(o.x1, p.x1, q.x1, r.x1)), h = n - Math.abs(Math.max(o.y1, p.y1, q.y1, r.y1)), i = m + Math.abs(Math.max(o.x1, p.x1, q.x1, r.x1)), j = n + Math.abs(Math.min(o.y1, p.y1, q.y1, r.y1))
        }
        return {left: g, top: h, right: i, bottom: j, width: i - g, height: j - h}
    }

    function getItemIndex() {
        var indexs = [];
        $.each($('.W_item'), function (index, item) {
            var $item = $(item)
            var style = $item.attr('style');
            var index = style.match(/z-index: \d/);
            if (index) {
                index = +index[0].split(':')[1]
                indexs.push(index);
            }
        })
        indexs = indexs.sort(function (a, b) {
            return b - a
        })
        return indexs;
    }

    function setShadow(type, value) {
        var allvalue = J_imgcomboxShadowColor.attr('boxshadow');
        if (allvalue) {
            allvalue = allvalue.split(' ')
        }
        var a = allvalue[1].replace('px', ""),
            b = allvalue[2].replace('px', ""),
            c = allvalue[3].replace('px', ""),
            d = allvalue[4],
            e = allvalue[0].replace('px', "");
        switch (type) {
            case 'color':
                d = value;
                break;
            case 'boxShadowSP':
                a=value;
                break;
            case 'boxShadowBL':
                b=value;
                break;
            case 'boxShadowY':
                c=value;
                break;
            case 'boxShadowX':
                e=value;
                break;
        }
        var f = Math.sqrt(Math.pow(e, 2) / (1 + Math.pow(Math.tan((90 - a) * Math.PI / 180), 2))),
            g = Math.sqrt(Math.pow(e, 2) - Math.pow(f, 2));
        a > 0 && 90 >= a ? (f = f, g = 0 - g) : a > 90 && 180 >= a ? (f = f, g = g) : a > 180 && 270 >= a ? (f = 0 - f, g = g) : (f = 0 - f, g = 0 - g);

        var va = Math.round(f) + "px " + Math.round(g) + "px " + b + "px " + c + "px " + d;
        if (va != "" && va != undefined && va != null) {
            _imgcomStyleChange(va, 'boxShadow');
        }
        J_imgcomboxShadowColor.attr('boxshadow', va);

    }

    function setTextShadow(type, value) {
        var allvalue = J_imgcomboxTextShadowColor.attr('textshadow');
        if (allvalue) {
            allvalue = allvalue.split(' ')
        }
        var a = allvalue[0].replace('px', ""),
            b = allvalue[1].replace('px', ""),
            c = allvalue[3],
            d = allvalue[2].replace('px', "");
        switch (type) {
            case 'color':
                c = value;
                break;
            case 'TextShadowSP':
                d=value;
                break;
            case 'TextShadowBL':
                b=value;
                break;
            case 'TextShadowX':
                a=value;
                break;
        }
        var e = Math.sqrt(Math.pow(d, 2) / (1 + Math.pow(Math.tan((90 - a) * Math.PI / 180), 2))),
            f = Math.sqrt(Math.pow(d, 2) - Math.pow(e, 2));
        a > 0 && 90 >= a ? (e = e, f = 0 - f) : a > 90 && 180 >= a ? (e = e, f = f) : a > 180 && 270 >= a ? (e = 0 - e, f = f) : (e = 0 - e, f = 0 - f);

        var va= Math.round(e) + "px " + Math.round(f) + "px " + Math.abs(b) + "px " + c;
        if (va != "" && va != undefined && va != null) {
            _imgcomStyleChange(va, 'textShadow');
        }
        J_imgcomboxTextShadowColor.attr('textshadow', va);

    }



});