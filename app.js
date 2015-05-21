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


var getImgsByUser = require('./routes/imgs/getImgsByUser');
var upLoadImgs = require('./routes/imgs/upLoadImgs');


var addProject = require('./routes/project/addProject');
var getProjectList = require('./routes/project/getProjectList');
var deleteProject = require('./routes/project/deleteProject');
var getProject = require('./routes/project/getProject');

var createHtml = require('./routes/view/createHtml');

var addTextcom = require('./routes/textcom/addTextcom');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(flash());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/wxms.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/getImgsByUser', getImgsByUser);
app.use('/upLoadImgs', upLoadImgs);

app.use('/addProject', addProject);
app.use('/getProjectList', getProjectList);
app.use('/deleteProject', deleteProject);
app.use('/getProject', getProject);

app.use('/createHtml',createHtml);

app.use('/addTextcom',addTextcom);



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