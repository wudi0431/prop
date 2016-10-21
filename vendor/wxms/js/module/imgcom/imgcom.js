define(['FFF', 'zepto', 'jquery','stylecom','wxms_config'], function (FFF, $, jq,Stylecom,WXMS_config) {
    var F = FFF.FFF,
        Widget = F.Widget,
        Stylecom = Stylecom.Stylecom;
    WXMS_config.domain = WXMS_config.domain || '';

    function Imgcom() {
        Widget.apply(this, arguments);
    }

    Imgcom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_item" data-type="imgcom"></div>')
        },
        data: {
            value: null
        },
        pageId: {
            value: null
        },
        imgSrc:{
            value:''
        }
    };
    F.extend(Imgcom, Widget, {
        renderUI: function () {
            var that = this;
            that.stylecom =  new Stylecom();
            that._addImgcom(that._bindUI);
        },

        update: function () {
            var that = this;
            var imgcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: WXMS_config.domain+"/updateImgcom",
                data: imgcomEntity
            }).done(function (msg) {
                if (msg.success) {
                    F.trigger('comChange', {type: 'imgcom', comData: msg.model, isUpdate: true});
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
            that.$curimg = that.$box.children('img');
            that.$box.on('click', function (e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    $('#J_imgcomContent').show().siblings('.W_editItem').hide();
                    $('#J_imgcomStyle').show().siblings('.W_editItem').hide();
                    F.trigger('renderImgcomContent', that.getData());
                    that.stylecom.initStylecomData('imgcom','imgcomStyleChange',that.getData());
                    F.trigger('setAniMateDate', that.getData());
                    F.trigger('setDataSouceData', that.getData());
                }

                if ($$curTarget === that.$boxDel[0]) {
                    that.delSelf();
                }


            });


            F.on('imgcomHrefChange', function (val) {
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
            F.on('getDataSouceData', function (val) {
                if (that.$box.hasClass('select')) {
                    data['dataurl'] = val.dataurl;
                    data['datamapping'] = val.datamapping;
                    that.setData(data);
                    that.update();
                }
            },that);

            F.on('dragCom', function (val) {
                var curitemid = that.$box.attr('data-item-id')
                if (curitemid == val.itemids && val.type=='imgcom') {
                    that.$box.css('top', val.position.top);
                    that.$box.css('left', val.position.left);
                    data['top'] = val.position.top +'px';
                    data['left'] = val.position.left+'px';
                    that.setData(data);
                    that.stylecom.initStylecomData('imgcom','imgcomStyleChange',that.getData());
                    that.update();
                }
            });

            F.on('resizeCom', function (val) {
                var curitemid = that.$box.attr('data-item-id')
                if (curitemid == val.itemids && val.type=='imgcom') {
                    that.$box.css('width', val.size.width);
                    that.$box.css('height', val.size.height);
                    data['width'] = val.size.width +'px';
                    data['height'] = val.size.height+'px';
                    that.setData(data);
                    that.stylecom.initStylecomData('imgcom','imgcomStyleChange',that.getData());
                    that.update();
                }
            });

            F.on('rotateCom', function (val) {
                var curitemid = that.$box.attr('data-item-id')
                if (curitemid == val.itemids && val.type=='imgcom') {
                    data['transform'] = 'rotate(' + val.deg + 'deg)';
                    that.setData(data);
                    that.stylecom.initStylecomData('imgcom','imgcomStyleChange',that.getData());
                    that.update();
                }
            });


            F.on('imgcomContextChange', function (obj) {
                if (that.$box.hasClass('select')) {
                    that.$boxContent.attr('src',obj.path);
                    data.imgurl = obj.path;
                    that.setData(data);
                    that.update();
                }
            },that);

            F.on('imgcomStyleChange', function (obj) {
                if (that.$box.hasClass('select')) {
                    var key = obj.type;
                    if( key =='borderColor'|| key =='borderStyle'|| key =='borderWidth'|| key =='borderRadius' || key =='opacity'
                        || key =='paddingTop' || key =='paddingRight' || key =='paddingBottom' || key =='paddingLeft'){
                        that.$curimg.css(key, obj.value);
                    }else if(key=='boxShadow'){
                        that.$curimg.css('box-shadow',obj.value);
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
            var imgcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: WXMS_config.domain+"/deleteImgcom",
                data: {
                    imgcomId: imgcomEntity._id
                }
            }).done(function (msg) {
                that.destroy();
                F.trigger('comChange', {type: 'imgcom', comData: msg.model, isRemove: true});
            }).fail(function (msg) {
                alert(msg);
            });

        },

        _renderImgcom: function (data, next) {
            var that = this;
            var $box = that.getBoundingBox();
            $box.data('itemId',data._id);
            var tpl = '<img class="W_imgcom" data-mid="'+data.img+'" src="' + data.imgurl + '"/>';
            tpl += '<i class="W_delItem">X</i>';
            $box.append(tpl);
            that.$box = $box;
            that.curimg = that.$box.children('img');
            that.$boxContent = $box.find('.W_imgcom');
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
                        if(key =='borderColor'|| key =='borderStyle'|| key =='borderWidth'|| key =='borderRadius'|| key =='opacity'
                            || key =='paddingTop' || key =='paddingRight' || key =='paddingBottom' || key =='paddingLeft'){
                            that.curimg.css(key, data[key]);
                        }else if(key=='boxShadow') {
                            that.curimg.css('box-shadow', data[key]);
                        }else{
                            that.$box.css(key, data[key]);
                        }
                        break;
                }
            });

            next.call(that);
        },

        _addImgcom: function (next) {
            var that = this;
            if (that.getData()) {
                that._renderImgcom(that.getData(), next);
            } else {
                var pageId = that.getPageId();
                var zIndex =that.stylecom.getItemIndex()[0]+1;
                var imgcomEntity = {
                    imgurl: that.getImgSrc(),
                    zIndex:zIndex
                };

                jq.ajax({
                    method: "POST",
                    url: WXMS_config.domain+"/addImgcom",
                    data: {
                        pageId: pageId,
                        imgcom: imgcomEntity
                    }
                }).done(function (msg) {
                    if (msg.success) {
                        that.setData(msg.model);
                        that._renderImgcom(msg.model, next);
                        F.trigger('comChange', {type: 'imgcom', comData: msg.model, isAdd: true});
                    }
                }).fail(function (msg) {
                });
            }

        }
    });
    return {
        Imgcom: Imgcom
    };
});