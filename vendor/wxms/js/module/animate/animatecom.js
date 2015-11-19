/**
 * Created by wudi on 15/6/10.
 */
define(['FFF', 'zepto', 'jquery'], function (FFF, $, jq) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Animatecom() {
        Widget.apply(this, arguments);
    }

    Animatecom.ATTRS = {
        boundingBox: {
            value: $('<div class="animate_inner"></div>')
        },
        animateDuration: {
            value: "1.5",
            changeFn: function (args) {
                args.value = args.value ? args.value : args.preValue;
                var that = this;
                that.isgetAniMateDate && F.trigger('getAniMateDate', that.getAniMateDate());
                that.$rangeInputs.eq(0).val(args.value);
                that.$numberInputs.eq(0).val(args.value);
            }
        },
        animateDelay: {
            value: "0.7",
            changeFn: function (args) {
                var that = this;
                args.value = args.value ? args.value : args.preValue;
                that.isgetAniMateDate && F.trigger('getAniMateDate', that.getAniMateDate());
                that.$rangeInputs.eq(1).val(args.value);
                that.$numberInputs.eq(1).val(args.value);
            }
        },
        animateCount: {
            value: "1",
            changeFn: function (args) {
                var that = this;
                args.value = args.value ? args.value : args.preValue;
                that.isgetAniMateDate && F.trigger('getAniMateDate', that.getAniMateDate());
                that.$rangeInputs.eq(2).val(args.value);
                that.$numberInputs.eq(2).val(args.value);
            }
        },
        animateName: {
            value: 'noeffect',
            changeFn: function (args) {
                var that = this;
                args.value = args.value ? args.value : args.preValue;
                that.isgetAniMateDate && F.trigger('getAniMateDate', that.getAniMateDate());
            }
        },
        outAniMateName: {
            value: [{"name": "zoomIn", "des": "放大进入"}, {"name": "bounceIn", "des": "弹入"},
                {"name": "bounceInDown", "des": "从上弹入"}, {"name": "bounceInUp", "des": "从下弹入"},
                {"name": "bounceInLeft", "des": "从左弹入"}, {"name": "bounceInRight", "des": "从右弹入"},
                {"name": "fadeIn", "des": "淡入"}, {"name": "fadeInUp", "des": "从下淡入"},
                {"name": "fadeInDown", "des": "从上淡入"}, {"name": "fadeInLeft", "des": "从左淡入"},
                {"name": "fadeInRight", "des": "从右淡入"}, {"name": "flipInX", "des": "X轴转入"},
                {"name": "flipInY", "des": "Y轴转入"}, {"name": "lightSpeedIn", "des": "光速进入"},
                {"name": "rotateIn", "des": "旋转进入"}, {"name": "rotateInDownLeft", "des": "左向下转"},
                {"name": "rotateInDownLeft", "des": "左向下转"}, {"name": "rotateInDownRight", "des": "右向下转"},
                {"name": "rotateInUpLeft", "des": "左向上转"}, {"name": "rotateInUpRight", "des": "右向上转"},
                {"name": "slideInUp", "des": "从下滑入"}, {"name": "slideInDown", "des": "从上滑入"},
                {"name": "slideInLeft", "des": "从左滑入"}, {"name": "slideInRight", "des": "从右滑入"},
                {"name": "rollIn", "des": "滚入"}
            ]
        },
        overAniMateName: {
            value: [{"name": "zoomOut", "des": "放大退出"}, {"name": "bounceOutDown", "des": "向下弹出"},
                {"name": "bounceOutUp", "des": "向上弹出"}, {"name": "bounceOutRight", "des": "向右弹出"},
                {"name": "bounceOutLeft", "des": "向左弹出"}, {"name": "fadeOut", "des": "淡出"},
                {"name": "fadeOutUp", "des": "从上淡出"}, {"name": "fadeOutDown", "des": "从下淡出"},
                {"name": "fadeInDown", "des": "从上淡入"}, {"name": "fadeInLeft", "des": "从左淡入"},
                {"name": "fadeOutLeft", "des": "从左淡出"}, {"name": "fadeOutRight", "des": "从右淡出"},
                {"name": "flipOutX", "des": "X轴转出"}, {"name": "flipOutY", "des": "Y轴转出"},
                {"name": "lightSpeedOut", "des": "光速退出"}, {"name": "rotateOut", "des": "旋转退出"},
                {"name": "slideOutUp", "des": "向上滑出"}, {"name": "slideOutDown", "des": "向下滑出"},
                {"name": "slideOutLeft", "des": "从左滑出"}, {"name": "slideOutRight", "des": "从右滑出"}
            ]
        },
        specialAniMateName: {
            value: [{"name": "circleRotate", "des": "转圈"}, {"name": "swap", "des": "由远及近"},
                {"name": "bounce", "des": "弹跳"}, {"name": "flash", "des": "闪烁"},
                {"name": "pulse", "des": "心跳"}, {"name": "rubberBand", "des": "橡皮筋"},
                {"name": "shake", "des": "震动"}, {"name": "swing", "des": "摇摆"},
                {"name": "wobble", "des": "摇晃"}, {"name": "flip", "des": "翻转"},
                {"name": "hinge", "des": "摇摇欲坠"}
            ]
        }
    };
    F.extend(Animatecom, Widget, {
        renderUI: function (obj, next) {
            var that = this;
            that.isgetAniMateDate=false;
            var $box = that.getBoundingBox();
            var titlename = '<h3 class="cell_title">动画设置</h3>';
            var rangbox = '<div class="animate_item">'
                + '<label>'
                + '<span class="title">持续时间</span>'
                + '<input type="range" min="0" max="20"  value="' + that.getAnimateDuration() + '" step="0.1" data-type="animateDuration" class="animate_range" />'
                + ' <input type="number" min="0" max="20" value="' + that.getAnimateDuration() + '" step="0.1" data-type="animateDuration" class="range_num" />s'
                + '</label>'
                + ' <label>'
                + '<span class="title">延迟时间</span>'
                + '<input type="range" min="0" max="20" value="' + that.getAnimateDelay() + '"  step="0.1" data-type="animateDelay" class="animate_range" />'
                + '<input type="number" min="0" max="20" value="' + that.getAnimateDelay() + '" step="0.1" data-type="animateDelay" class="range_num" />s'
                + ' </label>'
                + '<label tooltips="当重复次数为0，为无限循环">'
                + ' <span class="title">重复次数</span>'
                + ' <input type="range" min="0" max="20" value="' + that.getAnimateCount() + '"  data-type="animateCount" class="animate_range" />'
                + '<input type="number" min="0" max="20" value="' + that.getAnimateCount() + '"  data-type="animateCount" class="range_num" />次'
                + ' </label></div>'
                + '<h3 class="cell_title">动画类型选择(只能选择一个动画)</h3>'
                + '<div class="animate_item animate_eq">'
                + '<div class="animate_eq_con">'
                + '<div class="animate_list" data-name="noeffect">'
                + '<span class="animate_list_icon animated"></span>'
                + '<span class="animate_list_text">无效果</span></div></div></div>';

            var outanimatehtml = that._getAniMateHtml('出现动画',that.getOutAniMateName());

            var overanimatehtml = that._getAniMateHtml('消失动画',that.getOverAniMateName());

            var specialanimatehtml = that._getAniMateHtml('特效动画',that.getSpecialAniMateName());

            var allanimatehml ='<div class="animate_item animate_eq claraBtn">'+outanimatehtml+overanimatehtml+specialanimatehtml+'</div>'

            $box.append(titlename + rangbox+allanimatehml);

            that.$rangeInputs = $box.find('input[type=range]');

            that.$numberInputs = $box.find('input[type=number]');

            that.$animatelists = $box.find('.animate_list');

            that.$moreIcons = $box.find('.more_icon');

            next();

        },
        bindUI: function (obj,next) {
            var that = this;
            $.each(that.$rangeInputs, function (index, rangeipt) {
                $(rangeipt).on('change', function () {
                    var self = $(this);
                    var va = self.val();
                    self.next('input').val(va);
                    var typename = self.data('type');
                    if(typename == "animateCount" && va==0){
                        va="infinite";
                    }
                    that._setProValue(typename, va)
                })
            });

            $.each(that.$numberInputs, function (index, numbeript) {
                $(numbeript).on('change', function () {
                    var self = $(this);
                    var va = self.val();
                    self.prev('input').val(va);
                    var typename = self.data('type');
                    if(typename == "animateCount" && va==0){
                        va="infinite";
                    }
                    that._setProValue(typename, va)
                })
            });
            $.each(that.$animatelists, function (index, animatelist) {
                var $animatelist =jq(animatelist)
                $animatelist.on('click', function () {
                    $.each(that.$animatelists, function (index, animatelist) {
                        var $curanimatelist =jq(animatelist)
                         $curanimatelist.hasClass('current') && $curanimatelist.removeClass('current');
                    });
                    var aname = jq(this).data('name');
                    jq(this).addClass('current');
                    that.isgetAniMateDate=true;
                    that.setAnimateName(aname);
                });
                $animatelist.hover(function () {
                    var aname = jq(this).data('name');
                    jq(this).children().eq(0).addClass(aname);
                }, function () {
                    var aname = jq(this).data('name');
                    jq(this).children().eq(0).removeClass(aname);
                });

            });
            $.each(that.$moreIcons, function (index, moreIcon) {
                $(moreIcon).on('click', function () {
                     $(this).parent().next().eq(0).toggleClass('W_editItem');
                })
            });

            F.on('setAniMateDate', function (data) {
                that.setAniMateDate(data);
            });

            next();
        },
        _setProValue: function (typename, value) {
            var that = this;
            that.isgetAniMateDate=true;
            switch (typename) {
                case "animateDuration":
                    that.setAnimateDuration(value);
                    break;
                case "animateDelay":
                    that.setAnimateDelay(value);
                    break;
                case "animateCount":
                    that.setAnimateCount(value);
                    break;
            }
        },
        _getAniMateHtml: function (typename,typedata) {
            var typehtml ="";
            typedata.forEach(function (item) {
                typehtml+='<div class="animate_list" data-name="'+item.name+'">'
                    +'<span class="animate_list_icon animated"></span>'
                    +'<span class="animate_list_text">'+item.des+'</span></div>'
            })
            var headhtml ='<div class="animate_eq_title">'+typename+'<i class="more_icon"></i></div><div class="animate_eq_con W_editItem">' +
                typehtml+'</div>';
            return headhtml;
        },
        getAniMateDate:function(){
            var that=this;
            var cont =that.getAnimateCount();
            return {
                animateDuration:that.getAnimateDuration()+"s",
                animateDelay:that.getAnimateDelay()+"s",
                animateCount:cont=="0" ? "infinite" :cont ,
                animateName:that.getAnimateName()
            }
        },
        setAniMateDate:function(data){
            var that=this;
            that.isgetAniMateDate=false;
            data.animationDuration && that.setAnimateDuration(data.animationDuration.replace('s',''));
            data.animationDelay&&  that.setAnimateDelay(data.animationDelay.replace('s',''));
            data.animationCount && that.setAnimateCount(data.animationCount);
            that.setAnimateName(data.animationName|| "noeffect");
            that._expanded(data.animationName|| "noeffect");
        },
        _expanded: function (animationName) {
            $.each(this.$animatelists,function (index,item) {
                var $item =$(item);
                var aname = $item.data('name');
                if(aname==animationName){
                    $item.addClass('current');
                    $item.parent().removeClass('W_editItem');
                }
            })
        }
    });
    return {
        Animatecom: Animatecom
    };
});