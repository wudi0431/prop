define(['FFF','drag'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Part() {
        Widget.apply(this, arguments);
    }

    Part.ATTRS = {
        boundingBox: {
            value: $('<div class="W_wx_Part"></div>')
        },
        type: {
            value: 'text'
        }
    };


    F.extend(Part, Widget, {
        initialize: function() {
            var that = this;
            var type = that.getType();
            var args = arguments[0];

            if (typeof args === 'object') {
                switch (type) {
                    case 'img':
                        that.imgUrl = args.url || '';
                        that.name = args.name || '';
                        break;
                    case 'text':
                        that.text = args.text || '';
                        break;
                }
            }

        },
        renderUI: function() {
            var that = this;
            var type = that.getType();
            var $boundingBox = that.getBoundingBox();
            var tpl = '';

            switch (type) {
                case 'img':
                    tpl = '<img src="' + that.imgUrl + '" alt="' + that.name + '" />';
                    break;
                case 'text':
                    tpl = '<p>' + that.text + '</p>';
                    break;
            }

            $boundingBox.html(tpl);

        },
        bindUI: function() {
            var that = this;
            var $boundingBox = that.getBoundingBox();
            $boundingBox.drag();

        }
    });

    return {
        Part: Part
    };
});