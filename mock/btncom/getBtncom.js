if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getBtncom",
    "desc": "查询按钮组件",
    // 线上地址
    "url": "http://xxx/getBtncom",
    // 日常地址
    "urlDaily": "http://xxxx/getBtncom",
    // 预发地址
    "urlPrepub": "http://example.com/getBtncom",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    "id" : "123"    // 如果不传ID,则查询所有按钮组件
};
exports.response = {
    "success": true, // 标记成功
    "model": ImgcomSchema //db的imgcom表
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};