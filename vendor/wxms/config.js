//var config = {
//   port:9898,
//   passport: 'http://yhd.adanghome.com/passport',
//   domain:'http://120.132.50.71/wxms',
//   previewDomain:'http://mxc.yhd.com/wxms_client'
//};

 var config = {
   port:9898,
   passport: 'http://10.6.80.207/passport',
   domain: 'http://127.0.0.1:9898',
   previewDomain:'http://yzued.111.com.cn/wx'
 };
config.uploadimgsrc = config.domain+'/uploadimg/';

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = config;
} else {
    if ( typeof define === "function") {
        define( "wxms_config", [], function () { return config; } );
    }
}
