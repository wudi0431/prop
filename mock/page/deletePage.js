if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "deletePage",
    "desc": "删除单个项目",
    // 线上地址
    "url": "http://xxx/deletePage",
    // 日常地址
    "urlDaily": "http://xxxx/deletePage",
    // 预发地址
    "urlPrepub": "http://example.com/deletePage",
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
        "error": "Error message"
    }
};