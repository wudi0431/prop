if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "addTplByUser",
    "desc": "新增单个模板",
    // 线上地址
    "url": "http://xxx/addTplByUser",
    // 日常地址
    "urlDaily": "http://xxxx/addTplByUser",
    // 预发地址
    "urlPrepub": "http://example.com/addTplByUser",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request =  TemplateSchema; //db的template表;
exports.response = {
    "success": true, // 标记成功
    "model": TemplateSchema
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};