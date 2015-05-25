if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getBtncomListByPageId",
    "desc": "查询同一pageid的按钮组件",
    // 线上地址
    "url": "http://xxx/getBtncomListByPageId",
    // 日常地址
    "urlDaily": "http://xxxx/getBtncomListByPageId",
    // 预发地址
    "urlPrepub": "http://example.com/getBtncomListByPageId",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    "pageid" : "123"
};
exports.response = {
    "success": true, // 标记成功
    "model": {
        BtncomList: [BtncomSchema] //db的btncom表
    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};