define(['FFF', 'zepto', 'jquery'], function (FFF, $, jq) {
    var F = FFF.FFF,
        Widget = F.Widget;

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
            that._addImgcom(that._bindUI);
        },

        update: function () {
            var that = this;
            var imgcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: "/updateImgcom",
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
            that.$box.on('click', function (e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    $('#J_imgcomContent').show().siblings('.W_editItem').hide();
                    $('#J_imgcomStyle').show().siblings('.W_editItem').hide();
                    F.trigger('setAniMateDate', that.getData());
                }

                if ($$curTarget === that.$boxDel[0]) {
                    that.delSelf();
                }


            });


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
            });


            F.on('dragCom', function (val) {
                if (that.$box.hasClass('select')) {
                    that.$box.css('top', val.top);
                    that.$box.css('left', val.left);
                    data['top'] = val.top +'px';
                    data['left'] = val.left+'px';
                    that.setData(data);
                    that.update();
                }
            });

            F.on('resizeCom', function (val) {
                if (that.$box.hasClass('select')) {
                    that.$box.css('width', val.width);
                    that.$box.css('height', val.height);
                    data['width'] = val.width +'px';
                    data['height'] = val.height+'px';
                    that.setData(data);
                    that.update();
                }
            });


            F.on('imgcomStyleChange', function (obj) {
                if (that.$box.hasClass('select')) {
                    that.$box.css(obj.type, obj.value);
                    data[obj.type] = obj.value;
                    that.setData(data);
                    that.update();
                }
            });


        },


        delSelf: function () {
            var that = this;
            var imgcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: "/deleteImgcom",
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
            var tpl = '<img class="W_imgcom" src="' + data.imgurl + '"/>';
            tpl += '<i class="W_delItem">X</i>';
            $box.append(tpl);
            that.$box = $box;
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
                        that.$box.css(key, data[key]);
                        break
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
                var imgcomEntity = {
                    imgurl: that.getImgSrc()
                };

                jq.ajax({
                    method: "POST",
                    url: "/addImgcom",
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