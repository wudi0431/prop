if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "deleteProject",
    "desc": "删除单个项目",
    // 线上地址
    "url": "http://xxx/deleteProject",
    // 日常地址
    "urlDaily": "http://xxxx/deleteProject",
    // 预发地址
    "urlPrepub": "http://example.com/deleteProject",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    projectId:"2332323df"
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