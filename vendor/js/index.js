/**
 * Created by wudi on 15/5/27.
 */
require.config({
    paths: {
        jquery: '/lib/jqueryui/external/jquery/jquery',
        jqui: '/lib/jqueryui/jquery-ui',
        btncom:'/js/module/btncom/btncom',
        btncom_content:'/js/module/btncom/btncom_content',
        btncom_style:'/js/module/btncom/btncom_style'
    },
    shim: {
        'jqui': {
            deps: ['jquery']
        }
    }
});

require([ 'jquery','btncom', 'btncom_content','btncom_style','jqui'], function (jq) {
        

})