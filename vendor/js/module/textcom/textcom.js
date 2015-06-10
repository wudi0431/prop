define(['FFF', 'zepto', 'jquery'], function (FFF, $, jq) {
    var F = FFF.FFF,
        Widget = F.Widget;

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
            that._addTextcom(that._bindUI);
        },

        update: function () {
            var that = this;
            var textcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: "/updateTextcom",
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
            that.$box.on('click', function (e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    $('#J_textcomContent').show().siblings('.W_editItem').hide();
                    $('#J_textcomStyle').show().siblings('.W_editItem').hide();
                    F.trigger('renderTextcomContent', that.getData());
                    F.trigger('renderTextcomStyle', that.getData());
                }

                if ($$curTarget === that.$boxDel[0]) {
                    that.delSelf();
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

            F.on('textcomContextChange', function (val) {
                if (that.$box.hasClass('select')) {
                    that.setContext(val);
                }
            });


            F.on('textcomStyleChange', function (obj) {
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
            var textcomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: "/deleteTextcom",
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
            var tpl = '<div class="W_text">' + data.context + '</div>';
            tpl += '<i class="W_delItem">X</i>';
            $box.append(tpl);
            that.$box = $box;
            that.$boxContent = $box.find('.W_text');
            that.$boxDel = $box.find('.W_delItem');

            //TODO  如何更合理 数据库直接对应 jquery?
            Object.keys(data).forEach(function (key) {
                switch (key) {
                    case 'width':
                        that.$box.width(data[key]);
                        break;
                    case 'height':
                        that.$box.height(data[key]);
                        break;
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

        _addTextcom: function (next) {
            var that = this;
            if (that.getData()) {
                that._renderTextcom(that.getData(), next);
            } else {
                var pageId = that.getPageId();
                var textcomEntity = {
                    context: that.getContext()
                };

                jq.ajax({
                    method: "POST",
                    url: "/addTextcom",
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