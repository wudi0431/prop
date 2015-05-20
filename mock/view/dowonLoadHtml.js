if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "dowonLoadHtml",
    "desc": "下载生成的html文件",
    // 线上地址
    "url": "http://xxx/dowonLoadHtml",
    // 日常地址
    "urlDaily": "http://xxxx/dowonLoadHtml",
    // 预发地址
    "urlPrepub": "http://example.com/dowonLoadHtml",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    "projectid": "132"
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