if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "deleteBtncom",
    "desc": "删除单个按钮组件",
    // 线上地址
    "url": "http://xxx/deleteBtncom",
    // 日常地址
    "urlDaily": "http://xxxx/deleteBtncom",
    // 预发地址
    "urlPrepub": "http://example.com/deleteBtncom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    id:"12"
};
exports.response = {
    "success": true, // 标记成功
    "model": {}
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "删除失败！"
    }
};