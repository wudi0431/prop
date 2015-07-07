(function (factory) {

    factory(jQuery);

}(function ($) {

    $.widget("ui.rotatable", $.ui.mouse, {
        version: "@VERSION",
        widgetEventPrefix: "rotatable",
        options: {
            zIndex: 90,
            // callbacks
            rotate: null,
            start: null,
            stop: null
        },

        _num: function (value) {
            return parseInt(value, 10) || 0;
        },

        _isNumber: function (value) {
            return !isNaN(parseInt(value, 10));
        },


        _create: function () {

            var handle, axis,
                that = this,
                o = that.options;
            that.element.addClass("ui-rotatable");

            $.extend(that, {
                originalElement: that.element
            });


            axis = $("<div>");
            axis.addClass("ui-rotatable-handle");

            axis.css({zIndex: o.zIndex});


            that.handle = ".ui-rotatable-handle";
            that.element.append(axis);


            this._renderAxis = function () {

                if (this.handle.constructor === String) {
                    this.handle = this.element.children(this.handle).first().show();
                } else if (this.handle.jquery || this.handle.nodeType) {
                    this.handle = $(this.handle);
                    this._on(this.handle, {"mousedown": that._mouseDown});
                }


                this._handle = this.handle;
            };

            // TODO: make renderAxis a prototype function
            this._renderAxis(this.element);

            this._handle = this.element.find(".ui-rotatable-handle");
            this._handle.disableSelection();

            this._handle.on("mouseover", function () {
                if (!that.rotating) {
                    that.axis = 'handle';
                }
            });


            this._mouseInit();
        },

        _getOrigin: function () {
            var that = this,
                el = that.element;
            return {
                x: el.offset().left + el.width() / 2,
                y: el.offset().top + el.height() / 2
            };
        },

        _destroy: function () {

            this._mouseDestroy();

            var _destroy = function (exp) {
                $(exp)
                    .removeData("rotatable")
                    .removeData("ui-rotatable")
                    .off(".rotatable")
                    .find(".ui-rotatable-handle")
                    .remove();
            };


            _destroy(this.originalElement);

            return this;
        },

        _mouseCapture: function (event) {
            var i, handle,
                capture = false;

            handle = $(this.handle)[0];
            if (handle === event.target || $.contains(handle, event.target)) {
                capture = true;
            }

            return !this.options.disabled && capture;
        },


        _mouseStart: function (event) {

            var cursor,
                that = this,
                el = that.element;

            that.rotating = true;

            that.origin = that._getOrigin();


            cursor = $(".ui-rotatable-" + this.axis).css("cursor");
            $("body").css("cursor", cursor == "auto" ? 'url(/wxms/img/mouserotate.ico),alias' : cursor);

            el.addClass("ui-rotatable-rotating");
            that._propagate("start", event);
            return true;
        },

        _mouseDrag: function (event) {
            var that = this;
            var el = that.element;

            var change = that._change(event, that.origin);

            that.deg = change;
            el.css({rotate: change + 'deg'});
            that._propagate("rotate", event);

            return false;
        },

        _mouseStop: function (event) {
            var that = this;
            that.rotating = false;
            var el = that.element;

            $("body").css("cursor", "auto");

            el.removeClass("ui-rotatable-rotating");

            that._propagate("stop", event);


            return false;

        },

        _change: function (event, dx) {
            var that = this;
            var c = event.pageX - dx.x,
                e = event.pageY - dx.y,
                h = Math.abs(c / e);
            var f = Math.atan(h) / (2 * Math.PI) * 360;
            c > 0 && 0 > e ? f = 360 + f : c > 0 && e > 0 ? f = 180 - f : 0 > c && e > 0 ? f = 180 + f : 0 > c && 0 > e && (f = 360 - f);
            f > 360 && (f -= 360);

            return f;
        },


        _propagate: function (n, event) {
            this._trigger(n, event, this.ui());
        },

        ui: function () {
            return {
                element: this.element,
                deg: this.deg

            };
        }

    });


    return $.ui.rotatable;

}))
;
