/**
 * Created by zhangyi on 2017/5/25.
 */
var express = require('express');
var cors = require('cors');
//加载模板处理模块
var swig = require('swig');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //中间件/可从request中获取body数据
var Cookies = require('cookies');
var os = require('os')
var fs = require("fs"); // 引入fs模块
const expressWs = require('express-ws') // 引入 WebSocket 包
var schedule = require('node-schedule'); //秒、分、时、日、月、周几



//创建app应用 ==> NodeJS Http.createServer();
var app = express();

expressWs(app) // 将 WebSocket 服务混入 app，相当于为 app 添加 .ws 方法

app.use(bodyParser.urlencoded({ extended: false }));
//设置文件大小 默认为100K
app.use(bodyParser.json({ limit: '300000000kb' }));
app.use(bodyParser.urlencoded({ limit: 300000000, extended: true, parameterLimit: 300000000 }));


app.all('*', function(req, res, next) { // 解决跨域问题
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("X-powered-By", "3.2.1");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//设置静态文件托管

//当用户访问Url 以/public开始，那么直接返回对应 _dirname + '/public'下的文件
app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.use('/api_service', express.static(path.join(__dirname, '/api_service')));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/apidoc', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/apidoc') + "/index.html")
})

//配置应用模板
//定义当前应用所使用的模板引擎
/*
 * 注册所使用的模板引擎
 * 第一个参数必须是 view engine
 * 第二个参数必须和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
 */
app.set('view engine', 'html');

/*
 第一个参数：模板引擎名称//同时也是模板引擎后缀
 第二个参数：表示用于处理解析模板内容的方法
 */
// app.engine('html', swig.renderFile);
//在开发中取消模板缓存便于调试
// swig.setDefaults({ cache: false });
//设置模板引擎存放的目录，第一个参数必须是Views//第二个参数即目录
app.set('views', './views');

//设置cookie
app.use(function(req, res, next) {
    req.cookies = new Cookies(req, res);
    // console.log('这里打印服务端返回客户端的cookies  ' + req.cookies.get('userInfo'));
    //解析用户登录的cookies信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前登录用户的类型//是否是管理员
            //只有超级管理员可以进行//用户管理//普通用户//只能进行模块//内容//留言等管理
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                req.userInfo.isSuperAdmin = Boolean(userInfo.isSuperAdmin);
                next();
            });
        } catch (e) {
            // console.log('Cookies have some Error');
            // next();
        }
    } else {
        // console.log('不存在用户cookie 数据！');
        next();
    }
});

app.use(cors());

//路由控制
//根据不同功能划分模块
app.use('/', require('./routers/main'));
app.use('/admin', require('./routers/admin'));
app.use('/user', require('./routers/users'));
app.use('/api', require('./routers/api'));
app.use('/api_service', require('./routers/api_service'));
app.use('/api_service/unity', require('./routers/api_service/unity'));
app.use('/api_service/sharing', require('./routers/api_service/sharing'));
app.use('/api_program', require('./routers/api_program'));

mongoose.Promise = global.Promise; //localhost
mongoose.connect('mongodb://localhost:27017/GooiGie?authSource=GooiGie', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

var db = mongoose.connection
db.once('open', function() {
    console.log('连接成功10.1.40.24'); // + getIPv4()
    app.listen(8082, '10.1.40.24');
    console.log("Server is running at http://10.1.40.24:8082");
})
db.on('error', console.error.bind(console, '连接错误:'));

function getIPv4() {
    var interfaces = os.networkInterfaces(); //获取网络接口列表

    for (var dev in interfaces) {
        let interface = interfaces[dev]

        for (let i = 0; i < interface.length; i++) {
            let { family, address, internal } = interface[i]

            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                return address;
            }
        }
    }
}

var FileMangement = require('./models/FileManagement'); // 文件上传
var net = require('net');
const stringDe = require('string_decoder').StringDecoder;
const { StringDecoder } = require('string_decoder');
const { Buffer } = require('buffer');
const decoder = new StringDecoder('utf-8');

var HOST = "10.1.40.24";
var PORT = 8081;

net.createServer(function(scok) {

    scok.on('data', function(data) {
        const str = decoder.write(data);

        var data11 = {};
        var data1 = [];
        var data22 = {};

        if (!isJsonString(data)) {
            data22['data'] = '传上来的是不是想要的';
            data11['data'] = '传上来的是不是想要的';
            scok.write(Buffer.byteLength(JSON.stringify(data22), 'utf-8') + '%' + JSON.stringify(data11));
            scok.end('');
            return;
        }

        var json1 = JSON.parse(str);
        var json1data = JSON.parse(JSON.stringify(json1.data));
        // console.log(json1data);
        var limit = json1data.limit | 20
        var page = json1data.page | 1;
        var type1 = json1data.type1;
        var type2 = json1data.type2;
        var platform = json1data.platform;
        var skip = (page - 1) * limit;


        if (type1 !== '') {
            FileMangement.find({
                "type1": type1
            }).sort({ _id: -1 }).limit(limit).skip(skip).then(function(fileManagements) {
                if (type2 !== '') {
                    for (var i = 0; fileManagements.length > i; i++) {
                        var json = fileManagements[i];
                        if (json.type2 === type2 && json.platform === platform) {
                            data1.push(json)
                        }
                    }
                    data22['data'] = data1;
                    data11['data'] = data1;
                    scok.write(Buffer.byteLength(JSON.stringify(data22), 'utf-8') + '%' + JSON.stringify(data11));
                    scok.end('');
                    return;
                } else {
                    for (var i = 0; fileManagements.length > i; i++) {
                        var json = fileManagements[i];
                        if (json.platform === platform) {
                            data1.push(json)
                        }
                    }
                    data22['data'] = data1;
                    data11['data'] = data1;
                    scok.write(Buffer.byteLength(JSON.stringify(data22), 'utf-8') + '%' + JSON.stringify(data11));
                    scok.end('');
                    return;
                }
            });
        } else {
            FileMangement.find().sort({ _id: -1 }).limit(limit).skip(skip).then(function(fileManagements) {
                if (platform !== '') {
                    for (var i = 0; fileManagements.length > i; i++) {
                        var json = fileManagements[i];
                        if (json.platform === platform) {
                            data1.push(json)
                        }
                    }
                    data22['data'] = data1;
                    data11['data'] = data1;
                    console.log(Buffer.byteLength(JSON.stringify(data22), 'utf-8') + '%' + JSON.stringify(data11));
                    scok.write(Buffer.byteLength(JSON.stringify(data22), 'utf-8') + '%' + JSON.stringify(data11));
                    scok.end('');
                    return;
                } else {
                    data22['data'] = '平台为空';
                    data11['data'] = '平台为空';
                    scok.write(Buffer.byteLength(JSON.stringify(data22), 'utf-8') + '%' + JSON.stringify(data11));
                    scok.end('');
                    return;
                }
            });
        }
        // scok.end('关闭socket');
    });
    scok.on('error', function(exception) {
        console.log('服务端错误socket error:' + exception);
        scok.destroy();
    });
    scok.on('close', function(data) {
        // scok.end('关闭socket');
        console.log('服务端CLOSED');
    });
}).listen(PORT, function() {
    console.log('server is listening');
});

/**
 * 
 * @param {传入值:原始值} f 
 * @param {传入值:需要改变值} e 
 */
String.prototype.myReplace = function(f, e) {
    var reg = new RegExp(f, 'g');
    return this.replace(reg, e);
};

/**
 * 
 * @param {string 是否是JSON}} str 
 */
function isJsonString(str) {

    try {
        if (typeof JSON.parse(str) === 'object') {
            return true;
        }
    } catch (e) {}
    return false;
}

/**
 * 
 * @param {数组}} encoding 
 */
String.prototype.toBytes = function(encoding) {

    var bytes = [];
    var buff = new Buffer(this, encoding);
    for (var i = 0; i < buff.length; i++) {
        var byteint = buff[i];
        bytes.push(byteint);
    }
    return bytes;
}