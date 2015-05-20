if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getTextcom",
    "desc": "查询文本组件",
    // 线上地址
    "url": "http://xxx/getTextcom",
    // 日常地址
    "urlDaily": "http://xxxx/getTextcom",
    // 预发地址
    "urlPrepub": "http://example.com/getTextcom",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    "id" : "123"    // 如果不传ID,则查询所有文本组件
};
exports.response = {
    "success": true, // 标记成功
    "model": TextcomSchema //db的textcom表
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};