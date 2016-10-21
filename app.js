var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var path = require('path');
var ejs = require('ejs');
var session = require('express-session');
var flash = require('connect-flash');
var config = require('./config');
process.env.uploadsrc = config.domain+'/uploadimg/';
var mongoose = require('mongoose');
if (process.env.NODE_ENV == 'dev') {
    process.env.uploadsrc=config.domain+'/wxms/uploadimg/';
    mongoose.connect('mongodb://10.6.80.209:27017/wxms');
} else {
    mongoose.connect('mongodb://127.0.0.1:27017/wxms');
}
var MongoStore = require('connect-mongo')(session);

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'wxmssession',
    key: 'wxmssession',//cookie name
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}//30 days
}));

app.use(multer({
    dest: __dirname + '/public/wxms/uploadimg/',
    rename: function (fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function (file, data) {
        console.log(file.originalname);
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        console.log(' file.size  ' + (file.size/1024/1024).toFixed(1));
    }
}));

var index = require('./routes/index');
var login = require('./routes/user/login');
var logout = require('./routes/user/logout');

var addBtncom = require('./routes/btncom/addBtncom');
var deleteBtncom = require('./routes/btncom/deleteBtncom');
var getBtncomListByPageId = require('./routes/btncom/getBtncomListByPageId');
var getBtncom = require('./routes/btncom/getBtncom');
var updateBtncom = require('./routes/btncom/updateBtncom');

var getImgsByUser = require('./routes/imgs/getImgsByUser');
var upLoadImg = require('./routes/imgs/upLoadImg');
var getPubImgs = require('./routes/imgs/getPubImgs');
var deleteImg = require('./routes/imgs/deleteImg');

var getAudiosByUser = require('./routes/audio/getAudiosByUser');
var upLoadAudio= require('./routes/audio/upLoadAudio');
var getPubAudios = require('./routes/audio/getPubIAudios');
var deleteAudio = require('./routes/audio/deleteAudio');

var addProject = require('./routes/project/addProject');
var getProjectList = require('./routes/project/getProjectList');
var deleteProject = require('./routes/project/deleteProject');
var getProject = require('./routes/project/getProject');
var updateProjectState = require('./routes/project/updateProjectState');
var getProjectStateList = require('./routes/project/getProjectStateList');
var updateProjectViewTimes = require('./routes/project/updateProjectViewTimes');

var createHtml = require('./routes/view/createHtml');
var downLoadHtml = require('./routes/view/downLoadHtml');

var addTextcom = require('./routes/textcom/addTextcom');
var deleteTextcom = require('./routes/textcom/deleteTextcom');
var getTextcom = require('./routes/textcom/getTextcom');
var updateTextcom = require('./routes/textcom/updateTextcom');
var getTextcomListByPageId = require('./routes/textcom/getTextcomListByPageId');

var addPage = require('./routes/page/addPage');
var deletePage = require('./routes/page/deletePage');
var getPageList = require('./routes/page/getPageList');
var updatePage = require('./routes/page/updatePage');
var getPage = require('./routes/page/getPage');


var addImgcom = require('./routes/imgcom/addImgcom');
var deleteImgcom = require('./routes/imgcom/deleteImgcom');
var getImgcom = require('./routes/imgcom/getImgcom');
var getImgcomListByPageId = require('./routes/imgcom/getImgcomListByPageId');
var updateImgcom = require('./routes/imgcom/updateImgcom');

var addTplByUser = require('./routes/template/addTplByUser');
var getPubTpl = require('./routes/template/getPubTpl');
var getTplByUser = require('./routes/template/getTplByUser');
var generationPage = require('./routes/template/generationPage');
var deleteTemplate = require('./routes/template/deleteTemplate');
var getOneTpl = require('./routes/template/getOneTpl');


var addAudiocom = require('./routes/audiocom/addAudiocom');
var deleteAudiocom = require('./routes/audiocom/deleteAudiocom');
var updateAudiocom = require('./routes/audiocom/updateAudiocom');
var getAudiocomByprojectId = require('./routes/audiocom/getAudiocomByprojectId');


var preview = require('./routes/preview/preview');


var repeater = require('./routes/repeater');

var addWeiXinShare = require('./routes/weixinshare/addWeiXinShare');
var getWeiXinShareByProjectId = require('./routes/weixinshare/getWeiXinShareByProjectId');
var deleteWeiXinShare = require('./routes/weixinshare/deleteWeiXinShare');


var copyItem = require('./routes/copyItem');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(flash());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/wxms.ico'));
app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));
app.use(cookieParser());
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendor')));


app.use('/', index);
app.use('/index', index);
app.use('/login', login);
app.use('/logout', logout);

app.use('/getImgsByUser', getImgsByUser);
app.use('/upLoadImg', upLoadImg);
app.use('/getPubImgs', getPubImgs);

app.use('/getAudiosByUser', getAudiosByUser);
app.use('/upLoadAudio', upLoadAudio);
app.use('/getPubAudios', getPubAudios);
app.use('/deleteAudio', deleteAudio);

app.use('/addBtncom', addBtncom);
app.use('/deleteBtncom', deleteBtncom);
app.use('/getBtncomListByPageId', getBtncomListByPageId);
app.use('/getBtncom', getBtncom);
app.use('/updateBtncom', updateBtncom);

app.use('/addProject', addProject);
app.use('/getProjectList', getProjectList);
app.use('/deleteProject', deleteProject);
app.use('/getProject', getProject);
app.use('/updateProjectState', updateProjectState);
app.use('/getProjectStateList', getProjectStateList);
app.use('/updateProjectViewTimes', updateProjectViewTimes);

app.use('/addPage', addPage);
app.use('/deletePage', deletePage);
app.use('/getPageList', getPageList);
app.use('/updatePage', updatePage);
app.use('/getPage', getPage);

app.use('/createHtml', createHtml);
app.use('/downLoadHtml', downLoadHtml);


app.use('/addTextcom', addTextcom);
app.use('/deleteTextcom', deleteTextcom);
app.use('/getTextcom', getTextcom);
app.use('/updateTextcom', updateTextcom);
app.use('/getTextcomListByPageId', getTextcomListByPageId);


app.use('/addImgcom', addImgcom);
app.use('/deleteImgcom', deleteImgcom);
app.use('/getImgcom', getImgcom);
app.use('/getImgcomListByPageId', getImgcomListByPageId);
app.use('/updateImgcom', updateImgcom);
app.use('/deleteImg', deleteImg);


app.use('/addTplByUser',addTplByUser);
app.use('/getPubTpl',getPubTpl);
app.use('/getTplByUser',getTplByUser);
app.use('/deleteTemplate',deleteTemplate);
app.use('/generationPage',generationPage);
app.use('/getOneTpl',getOneTpl);


app.use('/addAudiocom', addAudiocom);
app.use('/deleteAudiocom', deleteAudiocom);
app.use('/updateAudiocom', updateAudiocom);
app.use('/getAudiocomByprojectId', getAudiocomByprojectId);

app.use('/show', preview);



app.use('/repeater', repeater);

app.use('/addWeiXinShare', addWeiXinShare);
app.use('/getWeiXinShareByProjectId', getWeiXinShareByProjectId);
app.use('/deleteWeiXinShare', deleteWeiXinShare);

app.use('/copyItem', copyItem);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
