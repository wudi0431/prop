var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer')
var app = express();
var path = require('path');
var ejs = require('ejs');
var session = require('express-session');
var flash = require('connect-flash');


var mongoose = require('mongoose');
mongoose.connect('mongodb://wxms:wxms@192.168.112.94:27017/wxms');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'wxmssession',
    key: 'wxmssession',//cookie name
    store: new MongoStore({mongooseConnection: mongoose.connection }),
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}//30 days
}));


app.use(multer({
    dest:__dirname +'./public/uploadimg/',
    rename: function (fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function (file, data) {
        console.log(file.originalname);
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
}));

var index = require('./routes/index');
var login = require('./routes/user/login');
var logout = require('./routes/user/logout');

var addBtncom = require('./routes/btncom/addBtncom');
var deleteBtncom = require('./routes/btncom/deleteBtncom');

var getImgsByUser = require('./routes/imgs/getImgsByUser');
var upLoadImgs = require('./routes/imgs/upLoadImgs');


var addProject = require('./routes/project/addProject');
var getProjectList = require('./routes/project/getProjectList');
var deleteProject = require('./routes/project/deleteProject');
var getProject = require('./routes/project/getProject');

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







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(flash());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/wxms.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendor')));


app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/getImgsByUser', getImgsByUser);
app.use('/upLoadImgs', upLoadImgs);

app.use('/addBtncom',addBtncom);
app.use('/deleteBtncom',deleteBtncom);

app.use('/addProject', addProject);
app.use('/getProjectList', getProjectList);
app.use('/deleteProject', deleteProject);
app.use('/getProject', getProject);

app.use('/addPage', addPage);
app.use('/deletePage', deletePage);
app.use('/getPageList', getPageList);
app.use('/updatePage', updatePage);
app.use('/getPage', getPage);

app.use('/createHtml',createHtml);
app.use('/downLoadHtml',downLoadHtml);


app.use('/addTextcom',addTextcom);
app.use('/deleteTextcom',deleteTextcom);
app.use('/getTextcom',getTextcom);
app.use('/updateTextcom',updateTextcom);
app.use('/getTextcomListByPageId',getTextcomListByPageId);


app.use('/addImgcom',addImgcom);
app.use('/deleteImgcom',deleteImgcom);
app.use('/getImgcom',getImgcom);
app.use('/getImgcomListByPageId',getImgcomListByPageId);
app.use('/updateImgcom',updateImgcom);




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