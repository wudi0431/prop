if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "updatePage",
    "desc": "更新单个页面",
    // 线上地址
    "url": "http://xxx/updatePage",
    // 日常地址
    "urlDaily": "http://xxxx/updatePage",
    // 预发地址
    "urlPrepub": "http://example.com/updatePage",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = PageSchema; //db的page表;
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