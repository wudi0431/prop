if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getProject",
    "desc": "获取单个项目详情",
    // 线上地址
    "url": "http://xxx/getProject",
    // 日常地址
    "urlDaily": "http://xxxx/getProject",
    // 预发地址
    "urlPrepub": "http://example.com/getProject",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    projectId:"2332323df"
};
exports.response = {
    "success": true, // 标记成功
    "model": ProjectSchema //db的project表
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};