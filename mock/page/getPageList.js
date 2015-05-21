if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "getPageList",
    "desc": "获取页面列表",
    // 线上地址
    "url": "http://xxx/getPageList",
    // 日常地址
    "urlDaily": "http://xxxx/getPageList",
    // 预发地址
    "urlPrepub": "http://example.com/getPageList",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {
    projectId:'121311'
};
exports.response = {
    "success": true, // 标记成功
    "model": {
         pageList:[
            PageSchema //db的page表
        ]
    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};