define(['zepto'], function($) {

    var noop = function() {};

    var doc = document,
        $doc = $(doc),
        $body = $(doc.body),
        defaults = {
            // 鼠标操作区域选择器，默认为this
            // 参数为选择器字符串
            handle: null,

            // 鼠标拖拽时，移动的目标，即从handle开始查找最近匹配的祖先元素
            // 默认为this
            // 参数为选择器字符串
            drag: null,

            // 鼠标形状，为空时将不会自动设置
            cursor: 'move',

            // 拖拽时的层级值
            zIndex: 9999,

            // 拖拽开始前回调
            // this: drag element
            // arg0: event
            // arg1: instance
            ondragbefore: noop,


            // 拖拽开始后回调
            // this: drag element
            // arg0: event
            // arg1: instance
            ondragstart: noop,

            // 拖拽中回调
            // this: drag element
            // arg0: event
            // arg1: instance
            ondrag: noop,

            // 拖拽结束后回调
            // this: drag element
            // arg0: event
            // arg1: instance
            ondragend: noop
        };

    $.fn.drag = function(settings) {
        // 复制默认配置
        var options = $.extend({}, defaults, settings);

        return this.each(function() {
            var element = this;
            new Constructor(element, options)._init();
        });
    };
    $.fn.drag.defaults = defaults;


    function Constructor(element, options) {
        this.element = element;
        this.options = options;
    }

    Constructor.prototype = {
        /**
         * 初始化
         * @return this
         * @version 1.0
         * 2014年7月3日18:29:40
         */
        _init: function() {
            var that = this,
                options = that.options,
                $element = $(that.element);

            that.$element = $element;

            // 采用事件代理
            if (options.handle) {
                $element.on('mousedown taphold', options.handle, $.proxy(that._start, that));
            } else {
                $element.on('mousedown taphold', $.proxy(that._start, that));
            }

            $doc.mousemove($.proxy(that._move, that))
                .mouseup($.proxy(that._end, that))
                .bind('touchmove', $.proxy(that._move, that))
                .bind('touchend', $.proxy(that._end, that))
                .bind('touchcancel', $.proxy(that._end, that));

            return that;
        },



        /**
         * 拖拽开始回调
         * @param {Object} e event
         * @return undefined
         * @version 1.0
         * 2014年7月3日18:29:40
         */
        _start: function(e) {
            if (!this.is) {
                e.preventDefault();

                var that = this,
                    options = that.options,
                    $element = that.$element,
                    $handle = options.handle ? $(e.target).closest(options.handle) : $(e.target),
                    $drag = options.drag ? $handle.closest(options.drag) : $element,
                    cssPos,
                    offset,
                    te = e.touches ? e.touches[0] : e;

                if (!$element.has($drag).length) $drag = $element;

                that.$drag = $drag;
                options.ondragbefore.call($drag[0], e, that);

                that.zIndex = $drag.css('z-index');
                that.cursor = $body.css('cursor');
                that.$drag = $drag.css('z-index', options.zIndex);
                cssPos = $drag.css('position');
                offset = $drag.position();

                if (cssPos === 'static') {
                    $drag.css('position', 'relative');
                }
                // 不是相对于 static 的
                else if (cssPos === 'fixed' || cssPos === 'absolute') {
                    $drag.css($drag.position());
                }


                that.pos = {
                    x: te.pageX,
                    y: te.pageY,
                    l: offset.left,
                    t: offset.top
                };
                that.is = !0;
                if (that.options.cursor) $body.css('cursor', options.cursor);

                options.ondragstart.call($drag[0], e, that);
            }
        },




        /**
         * 拖拽移动回调
         * @param {Object} e event
         * @return undefined
         * @version 1.0
         * 2014年7月3日18:29:40
         */
        _move: function(e) {
            if (this.is) {
                e.preventDefault();

                var that = this,
                    options = that.options,
                    pos = that.pos,
                    $drag = that.$drag,
                    offset = $drag.parent(!0).offset(),
                    to = {},
                    te = e.touches ? e.touches[0] : e;


                console.log(te.pageX , pos.x , pos.l);
                to.left = te.pageX - pos.x + pos.l;
                to.top = te.pageY - pos.y + pos.t;

               

                $drag.offset(to);
                options.ondrag.call($drag[0], e, that);
            }
        },



        /**
         * 拖拽结束回调
         * @param {Object} e event
         * @return undefined
         * @version 1.0
         * 2014年7月3日18:29:40
         */
        _end: function(e) {
            if (this.is) {
                var that = this,
                    $drag = that.$drag;

                e.preventDefault();
                that.is = !1;
                if (that.options.cursor) $body.css('cursor', that.cursor);
                $drag.css('z-index', that.zIndex);
                that.options.ondragend.call($drag[0], e, that);
            }
        }

       
    };


});