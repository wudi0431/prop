/**
 * Created by wudi on 15/5/27.
 */
require.config({
    paths: {
        jquery: '/lib/jqueryui/external/jquery/jquery',
        jqui: '/lib/jqueryui/jquery-ui'
    },
    shim: {
        'jqui': {
            deps: ['jquery']
        }
    }
});

require(['FFF', 'zepto', 'jquery', 'jqui'], function (FFF, $, jq) {
    var F = FFF.FFF;
    var Widget = F.Widget;


    jq("#draggable").draggable();

    function Test() {
        Widget.apply(this, arguments);
    }

    Test.ATTRS = {
        testValue: {
            value: 'test'
        },
        boundingBox: {
            value: $('.last')
        }
    };

    F.extend(Test, Widget, {
        renderUI: function () {
            this.getBoundingBox().append($('<a>1213133131</a>'));
        }
    });

    //测试
    var test = new Test();

    test.render();

})