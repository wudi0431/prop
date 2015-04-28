require.config({
    paths: {
        base: '../lib/core/base',
        attribute: '../lib/core/attribute',
        FFF: '../lib/core/FFF',
        zepto: '../lib/lib/zepto',
        language: '../lib/core/language',
        eventEmitter: '../lib/core/eventEmitter',
        widget: '../lib/core/widget',
        fastclick: '../lib/lib/fastclick',
        template: '../lib/lib/template',
        iscroll: '../lib/lib/iscroll'
    },
    shim: {
    "iscroll": {
      "exports": "IScroll"
    }
  }
});
