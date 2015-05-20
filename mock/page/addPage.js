if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "addPage",
    "desc": "新增页面",
    // 线上地址
    "url": "http://xxx/addPage",
    // 日常地址
    "urlDaily": "http://xxxx/addPage",
    // 预发地址
    "urlPrepub": "http://example.com/addPage",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = PageSchema; //db的page表;
exports.response = {
    "success": true, // 标记成功
    "model": {}
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};