define(['FFF', 'zepto', 'jquery'], function (FFF, $, jq) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Btncom() {
        Widget.apply(this, arguments);
    }

    Btncom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_iteam" data-type="btncom"></div>')
        },
        data: {
            value: null
        },
        pageId: {
            value: null
        },
        context: {
            value: '按钮',
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
    F.extend(Btncom, Widget, {
        renderUI: function () {
            var that = this;
            that._addBtncom(that._bindUI);
        },

        update: function () {
            var that = this;
            var btncomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: "/updateBtncom",
                data: btncomEntity
            });
        },
        _bindUI: function () {
            var that = this;
            that.$box.on('click', function (e) {
                var $$curTarget = e.target;
                if ($$curTarget === that.$boxContent[0]) {
                    $('#J_btncomContent').show().siblings('.W_editIteam').hide();
                    F.trigger('renderBtncomContent', that.getData());
                    F.trigger('renderBtncomStyle', that.getData());
                }
            });

            F.on('btncomContextChange', function (val) {
                if (that.$box.hasClass('select')) {
                    that.setContext(val);
                }
            });


        },

        _renderBtncom: function (data, next) {
            var that = this;
            var $box = that.getBoundingBox();
            var tpl = '<button type="button" class="W_btn">' + data.context + '</button>';
            $box.append(tpl);
            that.$box = $box;
            that.$boxContent = $box.find('.W_btn');

            //TODO  如何更合理 数据库直接对应 jquery?
            Object.keys(data).forEach(function (key) {
                switch (key) {
                    case 'width':
                        that.$box.width(data[key]);
                        break;
                    case 'height':
                        that.$box.height(data[key]);
                        break;
                    case 'lineheight':
                        that.$box.css('lineHeight', data[key]);
                        break;
                }
            });

            next.call(that);
        },

        _addBtncom: function (next) {
            var that = this;
            if (that.getData()) {
                that._renderBtncom(that.getData(), next);
            } else {
                var pageId = that.getPageId();
                var btncomEntity = {
                    context: '按钮'
                };

                jq.ajax({
                    method: "POST",
                    url: "/addBtncom",
                    data: {
                        pageId: pageId,
                        btncom: btncomEntity
                    }
                }).done(function (msg) {
                    if (msg.success) {
                        that.setData(msg.model);
                        that._renderBtncom(msg.model, next);
                    }
                }).fail(function (msg) {
                });
            }

        }
    });
    return {
        Btncom: Btncom
    };
});