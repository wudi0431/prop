define(['FFF', 'zepto', 'jquery'], function (FFF, $, jq) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Btncom() {
        Widget.apply(this, arguments);
    }

    Btncom.ATTRS = {
        boundingBox: {
            value: $('<div class="W_item" data-type="btncom"></div>')
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
            }).done(function (msg) {
                if (msg.success) {
                    F.trigger('comChange', {type: 'btncom', comData: msg.model, isUpdate: true});
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
                    $('#J_btncomContent').show().siblings('.W_editItem').hide();
                    $('#J_btncomStyle').show().siblings('.W_editItem').hide();
                    F.trigger('renderBtncomContent', that.getData());
                    F.trigger('renderBtncomStyle', that.getData());
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



            F.on('btncomContextChange', function (val) {
                if (that.$box.hasClass('select')) {
                    that.setContext(val);
                }
            });


            F.on('btncomStyleChange', function (obj) {
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
            var btncomEntity = that.getData();
            jq.ajax({
                method: "POST",
                url: "/deleteBtncom",
                data: {
                    btncomId: btncomEntity._id
                }
            }).done(function (msg) {
                that.destroy();
                F.trigger('comChange', {type: 'btncom', comData: msg.model, isRemove: true});
            }).fail(function (msg) {
                alert(msg);
            });

        },

        _renderBtncom: function (data, next) {
            var that = this;
            var $box = that.getBoundingBox();
            var tpl = '<button type="button" class="W_btn">' + data.context + '</button>';
            tpl += '<i class="W_delItem">X</i>';
            $box.append(tpl);
            that.$box = $box;
            that.$boxContent = $box.find('.W_btn');
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
                        F.trigger('comChange', {type: 'btncom', comData: msg.model, isAdd: true});
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