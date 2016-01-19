define(['FFF', 'zepto', 'jquery','stylecom','wxms_config'], function (FFF, $, jq,Stylecom,WXMS_config) {
    var F = FFF.FFF,
        Widget = F.Widget,
       Stylecom = Stylecom.Stylecom;
    WXMS_config.domain = WXMS_config.domain || '';

    function Textcom() {
        Widget.apply(this, arguments);
    }

    Textcom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_item" data-type="textcom"></div>')
        },
        data: {
            value: null
        },
        pageId: {
            value: null
        },
        context: {
            value: '请输入文字',
            changeFn: function (args) {
                var that = this;
                var data = that.getData();
                if (args.value !== args.prevValue) {
                    that.$boxContent.html(args.value);
                    data.context = args.value;
                    that.setData(data);
                    that.update();
                }

            }
        }
    };
    F.extend(Textcom, Widget, {
        renderUI: function () {
            var that = this;
            that.stylecom =  new Stylecom();
            that._addTextcom(that._bindUI);
        },

        update: function () {
            var that = this;
            var textcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: WXMS_config.domain+"/updateTextcom",
                data: textcomEntity
            }).done(function (msg) {
                if (msg.success) {
                    F.trigger('comChange', {type: 'textcom', comData: msg.model, isUpdate: true});
                }
            }).fail(function (msg) {
            });
        },
        _bindUI: function () {
            var that = this;
            var data = that.getData();
            var $box = that.getBoundingBox();
            that.stylecom.render();
            that.$box=$box;
            that.$boxContent = that.$box.children('div');
            that.$box.on('click', function (e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    $('#J_textcomContent').show().siblings('.W_editItem').hide();
                    $('#J_textcomStyle').show().siblings('.W_editItem').hide();
                    F.trigger('renderTextcomContent', that.getData());
                    that.stylecom.initStylecomData('textcom','textcomStyleChange',that.getData());
                    F.trigger('setAniMateDate',that.getData());
                }

                if ($$curTarget === that.$boxDel[0]) {
                    that.delSelf();
                }


            });


            F.on('textcomHrefChange', function (val) {
                if (that.$box.hasClass('select')) {
                    data['href'] = val;
                    that.setData(data);
                    that.update();
                }
            },that);

            F.on('getAniMateDate', function (val) {
                if (that.$box.hasClass('select')) {
                    that.$box.css({
                        "animation-name":val.animateName,
                        "-webkit-animation-name": val.animateName,
                        "animation-duration": val.animateDuration,
                        "-webkit-animation-duration": val.animateDuration,
                        "animation-delay": val.animateDelay,
                        "-webkit-animation-delay": val.animateDelay,
                        "animation-iteration-count":val.animateCount,
                        "-webkit-animation-iteration-count": val.animateCount
                    });
                    data['animationDuration'] = val.animateDuration;
                    data['animationDelay'] = val.animateDelay;
                    data['animationCount'] = val.animateCount;
                    data['animationName'] = val.animateName;
                    that.setData(data);
                    that.update();
                }
            },that);

            F.on('resizeCom', function (val) {
                if (that.$box.hasClass('ui-resizable') && val.type=='textcom') {
                    that.$box.css('width', val.size.width);
                    that.$box.css('height', val.size.height);
                    data['width'] = val.size.width +'px';
                    data['height'] = val.size.height+'px';
                    that.setData(data);
                    that.stylecom.initStylecomData('textcom','textcomStyleChange',that.getData());
                    that.update();
                }
            },that);

            F.on('dragCom', function (val) {
                if (that.$box.hasClass('ui-resizable') && val.type=='textcom') {
                    that.$box.css('top', val.position.top);
                    that.$box.css('left', val.position.left);
                    data['top'] = val.position.top +'px';
                    data['left'] = val.position.left+'px';
                    that.setData(data);
                    that.stylecom.initStylecomData('textcom','textcomStyleChange',that.getData());
                    that.update();
                }
            },that);

            F.on('rotateCom', function (val) {
                if (that.$box.hasClass('ui-resizable') && val.type=='textcom') {
                    data['transform'] = 'rotate(' + val.deg + 'deg)';
                    that.setData(data);
                    that.stylecom.initStylecomData('textcom','textcomStyleChange',that.getData());
                    that.update();
                }
            },that);

            F.on('textcomContextChange', function (val) {
                if (that.$box.hasClass('select')) {
                    that.setContext(val);
                }
            },that);


            F.on('textcomStyleChange', function (obj) {
                if (that.$box.hasClass('select')) {
                    var key = obj.type;
                    if( key =='backgroundColor' || key =='borderColor'|| key =='borderStyle'||
                        key =='borderWidth'|| key =='borderRadius' || key =='color' || key =='opacity'
                    ){
                        that.$boxContent.css(key, obj.value);
                    }else if(key=='boxShadow'){
                        that.$boxContent.css('box-shadow',obj.value);
                    }else if(key=='textShadow'){
                        that.$boxContent.css('text-shadow',obj.value);
                    }else if(key=='verticalAlign') {
                        that.$boxContent.css(key, obj.value);
                        that.$box.css(key,obj.value);
                        that.$box.css("display","table");
                    }else{
                        that.$box.css(key,obj.value);
                    }
                    data[key] = obj.value;
                    that.setData(data);
                    that.update();
                }
            },that);


        },


        delSelf: function () {
            var that = this;
            var textcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: WXMS_config.domain+"/deleteTextcom",
                data: {
                    textcomId: textcomEntity._id
                }
            }).done(function (msg) {
                that.destroy();
                F.trigger('comChange', {type: 'textcom', comData: msg.model, isRemove: true});
            }).fail(function (msg) {
                alert(msg);
            });

        },

        _renderTextcom: function (data, next) {
            var that = this;
            var $box = that.getBoundingBox();
            $box.data('itemId',data._id);
            var tpl = '<div class="W_text">' + data.context + '</div>';
            tpl += '<i class="W_delItem">X</i>';
            $box.append(tpl);
            that.$box = $box;
            that.$boxContent = $box.find('.W_text');
            that.$boxDel = $box.find('.W_delItem');

            //TODO  如何更合理 数据库直接对应 jquery?
            Object.keys(data).forEach(function (key) {
                switch (key) {
                    //TODO  待处理
                    case 'href':
                        break;
                    case 'hrefType':
                        break;
                    case 'dataurl':
                        break;
                    case 'datamapping':
                        break;
                    default :
                        if( key =='backgroundColor' || key =='borderColor'|| key =='borderStyle'||
                            key =='borderWidth'|| key =='borderRadius' || key =='color'|| key =='opacity'
                        ){
                            that.$boxContent.css(key, data[key]);
                        }else if(key=='boxShadow') {
                            that.$boxContent.css('box-shadow', data[key]);
                        }else if(key=='textShadow') {
                            that.$boxContent.css('text-shadow', data[key]);
                        }else if(key=='verticalAlign') {
                            that.$boxContent.css(key, data[key]);
                            that.$box.css(key, data[key]);
                            that.$box.css("display","table");
                        }else{
                            that.$box.css(key, data[key]);
                        }
                        break
                }
            });

            next.call(that);
        },

        _addTextcom: function (next) {
            var that = this;
            if (that.getData()) {
                that._renderTextcom(that.getData(), next);
            } else {
                var pageId = that.getPageId();
                var zIndex =that.stylecom.getItemIndex()[0]+1;
                var textcomEntity = {
                    context: that.getContext(),
                    zIndex:zIndex
                };

                jq.ajax({
                    method: "POST",
                    url: WXMS_config.domain+"/addTextcom",
                    data: {
                        pageId: pageId,
                        textcom: textcomEntity
                    }
                }).done(function (msg) {
                    if (msg.success) {
                        that.setData(msg.model);
                        that._renderTextcom(msg.model, next);
                        F.trigger('comChange', {type: 'textcom', comData: msg.model, isAdd: true});
                    }
                }).fail(function (msg) {
                });
            }

        }
    });
    return {
        Textcom: Textcom
    };
});