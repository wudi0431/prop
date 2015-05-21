if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getTextcomListByPageId",
    "desc": "查询同一pageid的文本组件",
    // 线上地址
    "url": "http://xxx/getTextcomListByPageId",
    // 日常地址
    "urlDaily": "http://xxxx/getTextcomListByPageId",
    // 预发地址
    "urlPrepub": "http://example.com/getTextcomListByPageId",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    "pageid" : "123"
};
exports.response = {
    "success": true, // 标记成功
    "model": {
        TextcomList: [TextcomSchema]
    } //db的textcom表
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};