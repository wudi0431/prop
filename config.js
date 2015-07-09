//var config = {
//    port:9898,
//    passport: 'http://120.132.50.71/passport',
//    domain:'http://120.132.50.71/wxms'
//};
var config = {
    port:9898,
    passport: 'http://120.132.50.71/passport'
};

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = config;
} else {
    if ( typeof define === "function") {
        define( "wxms_config", [], function () { return config; } );
    }
}
