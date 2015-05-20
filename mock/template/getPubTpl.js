if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getPubTpl",
    "desc": "获取公共模板",
    // 线上地址
    "url": "http://xxx/getPubTpl",
    // 日常地址
    "urlDaily": "http://xxxx/getPubTpl",
    // 预发地址
    "urlPrepub": "http://example.com/getPubTpl",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {};
exports.response = {
    "success": true, // 标记成功
    "model": {
        TemplateList:[
            TemplateSchema //db的template表
        ]
    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};