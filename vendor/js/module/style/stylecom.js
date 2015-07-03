/**
 * Created by wudi on 15/6/29.
 */
/**
 * Created by wudi on 15/6/11.
 */
define(['FFF', 'jquery','spectrum','jqui'], function (FFF, $) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Stylecom() {
        Widget.apply(this, arguments);
    }
    F.extend(Stylecom, Widget, {
        renderUI: function () {
            var that = this;

            that.J_textcomStyle = $('#J_textcomStyle');

            that.J_textcomColor = $('#J_textcomColor');

            that.J_textcomBKColor = $('#J_textcomBKColor');

            that.J_textcomborderStyleSelect = $('#J_textcomborderStyleSelect');

            that.J_fontFamily = $('#J_fontFamily');

            that.J_textcomorderColor = $('#J_textcomorderColor');

            that.J_textcomboxShadowColor = $('#J_textcomboxShadowColor');

            that.J_textcomboxTextShadowColor = $('#J_textcomboxTextShadowColor');

            that.uitl = 'px';



        },
        bindUI: function () {
            var that = this;

        },
        initStylecomData: function (type,ChangeEventNama,data) {
            var that = this;
            that.type =type;
            that.changeEventNama =ChangeEventNama;
            that._initshowItem();
            that._initspectrum();
            that._initselectmenu();
            that._initAllstylecomData(data);
            that._initChangeDom();
        },
        _initshowItem: function () {
            var that = this;
            var valign =  $('#valign'),
                halign = $('#halign'),
                fontstyle = $('#fontstyle'),
                fontcolors = $('#fontcolors'),
                fontsizes = $('#fontsizes'),
                fontfl = $('#fontfl'),
                wenzi = $('#wenzi');
            switch (that.type){
                case 'textcom':
                    valign.show();
                    halign.show();
                    fontstyle.show();
                    fontcolors.show();
                    fontsizes.show();
                    fontfl.show();
                    wenzi.show();
                    wenzi.prev('h3').show();
                    break;
                case 'btncom':
                    that.J_textcomStyle.show();
                    valign.hide();
                    halign.show();
                    fontstyle.show();
                    fontcolors.show();
                    fontsizes.show();
                    fontfl.show();
                    wenzi.show();
                    wenzi.prev('h3').show();
                    break;
                case 'imgcom':
                    that.J_textcomStyle.show();
                    valign.hide();
                    halign.hide();
                    fontstyle.hide();
                    fontcolors.hide();
                    fontsizes.hide();
                    fontfl.hide();
                    wenzi.hide();
                    wenzi.prev('h3').hide();
                    break;
            };
        },
        _textcomStyleChange: function (value, type) {
            var that = this; 
            F.trigger(that.changeEventNama, {
                type: type,
                value: value
            });
        },
        _initAllstylecomData: function (data) {
            var that = this;
            $.each($('.J_textcom'), function (index, textcom) {
                var $textcom = $(textcom);
                var type = $textcom.data('type');
                var value = data[type];
                if (value == "" || value == undefined || value == null) {
                    return;
                }
                if (typeof value != 'string') {
                    value = value.toString();
                }
                if (value && value.indexOf('px') != -1 && type != "boxShadow" && type != "textShadow") {
                    value = value.replace('px', '').replace(';', '');
                }
                switch (type) {
                    case 'color':
                        if (value != "") that.J_textcomColor.spectrum("set", value)
                        that.J_textcomColor.val(value);
                        break;
                    case 'backgroundColor':
                        if (value != "") that.J_textcomBKColor.spectrum("set", value)
                        that.J_textcomBKColor.val(value);
                        break;
                    case 'borderColor':
                        if (value != "") that.J_textcomorderColor.spectrum("set", value)
                        that.J_textcomorderColor.val(value);
                        break;
                    case 'transform':
                        if (value.indexOf('rotate') != -1) {
                            $textcom.val(value.match(/(\d+)/)[0]);
                        }
                        break;
                    case 'opacity':
                        value = parseInt(value * 100).toString();
                        $textcom.val(value);
                        break;
                    case 'boxShadow':
                        var vals = value.split(' ')
                        that.J_textcomboxShadowColor.spectrum("set", vals[4]);
                        that.J_textcomStyle.find("[data-type=boxShadowSP]").val(vals[1].replace('px',''));
                        that.J_textcomStyle.find("[data-type=boxShadowBL]").val(vals[2].replace('px',''));
                        that.J_textcomStyle.find("[data-type=boxShadowY]").val(vals[3].replace('px',''));
                        var d =  that.J_textcomStyle.find("[data-type=boxShadowX]").attr('deg');
                        that.J_textcomStyle.find("[data-type=boxShadowX]").val(d||0);
                        $textcom.attr('boxshadow', value);
                        break;
                    case 'textShadow':
                        var vals = value.split(' ')
                        that.J_textcomboxTextShadowColor.spectrum("set", vals[3]);
                        that.J_textcomStyle.find("[data-type=TextShadowSP]").val(Math.abs(vals[1].replace('px','')));
                        that.J_textcomStyle.find("[data-type=TextShadowBL]").val(Math.abs(vals[2].replace('px','')));
                        var d =  that.J_textcomStyle.find("[data-type=TextShadowX]").attr('deg');
                        that.J_textcomStyle.find("[data-type=TextShadowX]").val(d||0);
                        $textcom.attr('textshadow', value);
                        break;
                    default :
                        $textcom.val(Math.round(value));
                        break;
                }
            });
        },
        _initspectrum: function () {
            var that = this;
            that.J_textcomColor.spectrum({
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
                    that._textcomStyleChange(dddc, 'color');
                }
            });

            that.J_textcomBKColor.spectrum({
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
                    that._textcomStyleChange(dddc, 'backgroundColor');
                }
            });

            that.J_textcomorderColor.spectrum({
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
                    that._textcomStyleChange(dddc, 'borderColor');
                }
            });

            that.J_textcomboxShadowColor.spectrum({
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
                    that._setShadow('color', dddc)
                }
            });

            that.J_textcomboxTextShadowColor.spectrum({
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
                    that._setTextShadow('color', dddc)
                }
            });
        },
        _initselectmenu: function () {
            var that = this;
            that.J_textcomborderStyleSelect.selectmenu({
                width: 120,
                select: function (event, ui) {
                    that._textcomStyleChange(ui.item.value || 'none', 'borderStyle');
                }
            });

            that.J_fontFamily.selectmenu({
                width: 120,
                select: function (event, ui) {
                    that._textcomStyleChange(ui.item.value || 'Microsoft YaHei', 'fontFamily');
                }
            });


        },
        _initChangeDom: function () {
            var that = this;
            $.each($('.J_textcom'), function (index, textcom) {
                var $textcom = $(textcom);
                $textcom.on('change', function () {
                    var type = $textcom.data('type');
                    var value = $textcom.val();
                    if (value == "" || value == undefined || value == null ||
                        type == 'color' || type == 'backgroundColor' || type == 'borderColor' || type == 'boxShadowColor'
                        || type == 'boxShadow' || type == 'textShadow'
                    ) {
                        return false;
                    }
                    switch (type) {
                        case 'transform':
                            $textcom.attr('deg', value)
                            value = 'rotate(' + value + 'deg)';
                            break;
                        case 'opacity':
                            value = parseInt(value) / 100;
                            value = value.toString();
                            break;
                        default :
                            value = value + that.uitl;
                    }
                    that._textcomStyleChange(value, type);
                })
            })

            $.each($('.J_atextcom'), function (index, textcom) {
                var $textcom = $(textcom);
                $textcom.on('click', function (e) {
                    console.log(e.target.tagName)
                    e.stopPropagation()
                    e.preventDefault()
                    var type = $textcom.data('type');
                    var value = $textcom.val();
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
                    var h = that._getRotateSize(p.top, p.left, p.left + w, p.top + h, f);
                    if (value == undefined || value == null) {
                        return false;
                    }
                    switch (type) {
                        case 'totop':
                            value = 0 - (h.top - p.top) + that.uitl;
                            type = 'top';
                            break;
                        case 'tomiddle':
                            value = 255 - h.height / 2 - (h.top - p.top) + that.uitl;
                            type = 'top';
                            break;
                        case 'tobottom':
                            value = 510 - h.height - (h.top - p.top) + that.uitl;
                            type = 'top';
                            break;
                        case 'toleft':
                            value = 0 - (h.left - p.left) + that.uitl;
                            type = 'left';
                            break;
                        case 'toright':
                            value = 320 - h.width - (h.left - p.left) + that.uitl;
                            type = 'left';
                            break;
                        case 'tocenter':
                            value = 160 - h.width / 2 - (h.left - p.left) + that.uitl;
                            type = 'left';
                            break;
                        case 'uptop':
                            var indexs = that.getItemIndex()[0];
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
                            var indexs = that.getItemIndex();
                            indexs = indexs[indexs.length - 1] - 1;
                            value = indexs || 1;
                            type = 'zIndex';
                            break;
                        case 'alignleft':
                            value ='left';
                            type = 'textAlign';
                            break;
                        case 'aligncenter':
                            value ='center';
                            type = 'textAlign';
                            break;
                        case 'alignright':
                            value ='right';
                            type = 'textAlign';
                            break;
                        case 'valigntop':
                            value ='top';
                            type = 'verticalAlign';
                            break;
                        case 'valignmiddle':
                            value ='middle';
                            type = 'verticalAlign';
                            break;
                        case 'valignbottom':
                            value ='bottom';
                            type = 'verticalAlign';
                            break;
                        case 'fontWeight':
                            value ='bold';
                            var res = that._isHasValue($textcom,type,value)
                            if(!res){
                                value ='normal';
                            }
                            break;
                        case 'fontStyle':
                            value ='italic';
                            var res = that._isHasValue($textcom,type,value)
                            if(!res){
                                value ='normal';
                            }
                            break;
                        case 'textDecoration':
                            value ='underline';
                            var res = that._isHasValue($textcom,type,value)
                            if(!res){
                                value ='none';
                            }
                            break;
                    }
                    if (value != "" && value != undefined && value != null) {
                        that._textcomStyleChange(value, type);
                    }
                })
            })

            $.each($('.J_Btextcom'), function (index, textcom) {
                var $textcom = $(textcom);
                $textcom.on('change', function () {
                    var type = $textcom.data('type');
                    var value = $textcom.val();
                    switch (type) {
                        case 'boxShadowSP':
                            that._setShadow(type,value);
                            break;
                        case 'boxShadowBL':
                            that._setShadow(type,value);
                            break;
                        case 'boxShadowY':
                            that._setShadow(type,value);
                            break;
                        case 'boxShadowX':
                            that._setShadow(type,value);
                            $textcom.attr('deg',value);
                            break;
                    }
                })
            })

            $.each($('.J_Ttextcom'), function (index, textcom) {
                var $textcom = $(textcom);
                $textcom.on('change', function () {
                    var type = $textcom.data('type');
                    var value = $textcom.val();
                    switch (type) {
                        case 'TextShadowSP':
                            that._setTextShadow(type,value);
                            break;
                        case 'TextShadowBL':
                            that._setTextShadow(type,value);
                            break;
                        case 'TextShadowX':
                            that._setTextShadow(type,value);
                            $textcom.attr('deg',value);
                            break;
                    }
                })
            })
        },
        _d: function (a, b, c) {
            return {
                x1: Math.round(Math.cos(c * Math.PI / 180) * a + Math.sin(c * Math.PI / 180) * b),
                y1: Math.round(Math.cos(c * Math.PI / 180) * b - Math.sin(c * Math.PI / 180) * a)
            }
        },
        _getRotateSize: function (a, b, c, e, f) {
            var that = this;
            var g = b, h = a, i = c, j = e, k = c - b, l = e - a;
            if (0 !== f) {
                var m = b + k / 2, n = a + l / 2, o = that._d(b - m, n - a, f), p = that._d(c - m, n - a, f), q = that._d(b - m, n - e, f), r = that._d(c - m, n - e, f);
                g = m - Math.abs(Math.min(o.x1, p.x1, q.x1, r.x1)), h = n - Math.abs(Math.max(o.y1, p.y1, q.y1, r.y1)), i = m + Math.abs(Math.max(o.x1, p.x1, q.x1, r.x1)), j = n + Math.abs(Math.min(o.y1, p.y1, q.y1, r.y1))
            }
            return {left: g, top: h, right: i, bottom: j, width: i - g, height: j - h}
        },
        getItemIndex: function () {
            var indexs = [];
            $.each($('.W_item'), function (index, item) {
                var $item = $(item)
                var style = $item.attr('style');
                if(style==undefined || style=="") return false;
                var index = style.match(/z-index: \d/);
                if (index) {
                    index = +index[0].split(':')[1]
                    indexs.push(index);
                }
            })
            indexs = indexs.sort(function (a, b) {
                return b - a
            })
            if(indexs.length===0){
                indexs.push(1);
            }
            return indexs;
        },
        _setShadow: function (type, value) {
            var that = this;
            var allvalue = that.J_textcomboxShadowColor.attr('boxshadow');
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
                that._textcomStyleChange(va, 'boxShadow');
            }
            that.J_textcomboxShadowColor.attr('boxshadow', va);
        },
        _setTextShadow: function (type, value) {
            var that = this;
            var allvalue = that.J_textcomboxTextShadowColor.attr('textshadow');
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
                that._textcomStyleChange(va, 'textShadow');
            }
            that.J_textcomboxTextShadowColor.attr('textshadow', va);
        },
        _isHasValue: function (curdom, attr, value) {
            var curvalue = curdom.attr(attr);
            if(value==curvalue){
                curdom.removeClass('selectBtnstyle');
                curdom.attr(attr,"");
                return false;
            }else{
                curdom.addClass('selectBtnstyle');
                curdom.attr(attr,value);
                return true;
            }
        }
    });
    return {
        Stylecom: Stylecom
    };
});