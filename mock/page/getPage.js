if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getPage",
    "desc": "获取单个项目",
    // 线上地址
    "url": "http://xxx/getPage",
    // 日常地址
    "urlDaily": "http://xxxx/getPage",
    // 预发地址
    "urlPrepub": "http://example.com/getPage",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    pageId:"12"
}; //db的project表;
exports.response = {
    "success": true, // 标记成功
    "model": PageSchema
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};