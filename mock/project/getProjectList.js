if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getProjectList",
    "desc": "获取项目列表",
    // 线上地址
    "url": "http://xxx/getProjectList",
    // 日常地址
    "urlDaily": "http://xxxx/getProjectList",
    // 预发地址
    "urlPrepub": "http://example.com/getProjectList",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {};
exports.response = {
    "success": true, // 标记成功
    "model": {
        projectList:[
            ProjectSchema //db的project表
        ]
    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};