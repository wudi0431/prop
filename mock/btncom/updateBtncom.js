if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "updateBtncom",
    "desc": "更新按钮组件",
    // 线上地址
    "url": "http://xxx/updateBtncom",
    // 日常地址
    "urlDaily": "http://xxxx/updateBtncom",
    // 预发地址
    "urlPrepub": "http://example.com/updateBtncom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = BtncomSchema;
exports.response = {
    "success": true, // 标记成功
    "model": BtncomSchema  //db的btncom表
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};