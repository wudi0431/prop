if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "addProject",
    "desc": "新增单个项目",
    // 线上地址
    "url": "http://xxx/addProject",
    // 日常地址
    "urlDaily": "http://xxxx/addProject",
    // 预发地址
    "urlPrepub": "http://example.com/addProject",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request =  {
    page:ProjectSchema
}; //db的project表;
exports.response = {
    "success": true, // 标记成功
    "model": {

    }
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};