/**
 * Created by wudi on 15/7/8.
 */
({
    dir: './optput',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）
    baseUrl: './vendor/wxms',
    modules: [					  //要优化的模块
        { name:'js/index'} ,
        { name:'js/editor'} ,
        { name:'js/list'} ,
        { name:'js/preview'}	//说白了就是各页面的入口文件，相对baseUrl的路径，也是省略后缀“.js”
    ],
    fileExclusionRegExp: /^(r|build)\.js|.*\.scss|stop|start|README\.md|package\.json|LICENSE|\.gitignore|mock|doc|npm-debug\.log|node_modules|\.DS_Store|\.idea$/,	//过滤，匹配到的文件将不会被输出到输出目录去
    optimizeCss: 'standard',
    removeCombined: true,   //如果为true，将从输出目录中删除已合并的文件
    paths: {
        wxms_config:'config',
        jquery: 'js/lib/jqueryui/external/jquery/jquery',
        spectrum: 'js/lib/jquerycolorpicker/spectrum',
        html2canvas: 'js/lib/html2canvas',
        jqui: 'js/lib/jqueryui/jquery-ui',
        btncom: 'js/module/btncom/btncom',
        btncom_content: 'js/module/btncom/btncom_content',
        btncom_style: 'js/module/btncom/btncom_style',
        imgcom: 'js/module/imgcom/imgcom',
        imgcom_content: 'js/module/imgcom/imgcom_content',
        imgcom_style: 'js/module/imgcom/imgcom_style',
        textcom: 'js/module/textcom/textcom',
        textcom_content: 'js/module/textcom/textcom_content',
        textcom_style: 'js/module/textcom/textcom_style',
        imgs: 'js/module/imgs/imgs',
        pagecom: 'js/module/page/pagecom',
        pagecom_content: 'js/module/page/pagecom_content',
        imgcut: 'js/module/page/imgcut',
        animatecom: 'js/module/animate/animatecom',
        datasourcecom: 'js/module/datasource/datasourcecom',
        stylecom: 'js/module/style/stylecom',
        template: 'js/module/template/template',
        rotatable: 'js/lib/rotatable',
        transit: 'js/lib/jquerytransit',
        imgcom_cut: 'js/module/imgcom/imgcut'
    },
    shim: {
        query: {
            exports: "jQuery"
        },
        html2canvas: {
            exports: 'html2canvas'
        },
        jqui: {
            deps: ['jquery']
        },
        spectrum: {
            deps: ['jquery']
        },
        transit: {
            deps: ['jquery']
        },
        rotatable: {
            deps: ['jqui']
        }
    }
})