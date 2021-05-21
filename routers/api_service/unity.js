var fs = require('fs'),

    express = require('express'),
    formidable = require("formidable"),

    Q = require('../../api_service/unity/unity/lib/Q.js'),
    unityRouter = express();

var expressWs = require('express-ws'); // 引入 WebSocket 包   
expressWs(unityRouter) // 将 WebSocket 服务混入 app，相当于为 app 添加 .ws 方法

var User = require('../../models/User');
var compressing = require('compressing');
var path = require('path');
var FileMangement = require('../../models/FileManagement'); // 文件上传
var pathname = './api_service/unity/';

function process_upload_file(req, res, callback) {
    var form = new formidable.IncomingForm();

    form.uploadDir = pathname;
    form.maxFieldsSize = 2 * 1024 * 1024 * 1024; //2G

    form.parse(req, function(err, fields, files) {
        var upfile;

        Object.forEach(files, function(key, file) {
            upfile = file;
        });

        callback && callback(form, files, fields);
    });
}

function finish_upload(req, res, fields) {
    var result = {
        time: Date.now(),
        type: req.query["type"],
        user: fields["user"],
        name: fields["name"]
    };
    res.send(JSON.stringify(result));
}


unityRouter.all('/upload', function(req, res) {
    var action = req.query["action"],
        hash = req.query["hash"];

    if (!hash) {
        process_upload_file(req, res, function(form, file, fields) {
            var fileName = fields["fileName"];
            form.uploadDir = pathname;
            fs.rename(file.upfile.path, form.uploadDir + (fileName || file.name), async function(err) {
                await compressing.zip.uncompress(form.uploadDir + (fileName || file.name), form.uploadDir);
                fs.unlinkSync(form.uploadDir + (fileName || file.name))
                finish_upload(req, res, fields);
            });
        });
    } else {
        var path = "upload/" + hash,
            path_ok = path + ".ok";

        if (action == "query") {
            if (fs.existsSync(path_ok)) res.send('ok'); //秒传成功可以返回json对象 eg:{ ret:1,test:"aaa" }
            else if (fs.existsSync(path)) res.send(fs.statSync(path).size + "");
            else res.send("0");
        } else {
            process_upload_file(req, res, function(form, file, fields) {
                fs.appendFileSync(path, fs.readFileSync(file.path));
                fs.unlink(file.path, function() {});

                var isOk = req.query["ok"] == "1";
                if (!isOk) {
                    res.send("1");
                } else {
                    fs.rename(path, path_ok, function(err) {
                        finish_upload(req, res, fields);
                    });
                }
            });
        }
    }
});


unityRouter.all('/delete_file', function(req, res, next) {
    var data = req.body.modifyfile
    var namepath = './api_service/unity/'
    const files = fs.readdirSync(namepath)
    files.forEach(function(item, index) {
        let stat = fs.lstatSync(namepath + item)
        if (stat.isDirectory() === true) {
            if (data === item) {
                delFile(namepath + data, namepath)
            }
        }
    })
    var result = {
        data: Date.now()
    };
    res.send(JSON.stringify(result));
    return;
});

unityRouter.all('/filename', function(req, res, next) {
    var namepath = './api_service/unity/';
    var name = '__MACOSX';
    var model = 'model';
    var components = [];
    const files = fs.readdirSync(namepath)
    files.forEach(function(item, index) {
        let stat = fs.lstatSync(namepath + item)
        if (stat.isDirectory() === true) {
            if (item !== model) {
                if (item === name) {
                    delFile(namepath + name, namepath)
                } else {
                    components.push(item)
                }
            }
        }
    });
    var result = {
        data: components
    };
    res.send(JSON.stringify(result));
});


var pathname = './api_service/unity/model/';
unityRouter.all('/fileupload', function(req, res) {
    var action = req.query["action"],
        hash = req.query["hash"];

    if (!hash) {
        process_upload_file(req, res, function(form, file, fields) {
            var fileName = fields["fileName"];
            form.uploadDir = pathname;
            fs.rename(file.upfile.path, form.uploadDir + (fileName || file.name), async function(err) {
                if ((fileName || file.name).indexOf(('.jpg' || '.png')) != -1) {
                    // console.log('11111111111111111111111111111');  //复制内容到文件夹 更换数据库地址
                } else if ((fileName || file.name).indexOf('.zip') != -1) {
                    // console.log('22222222222222222222222222222');  //复制内容到文件夹 解压
                } else {
                    // console.log('33333333333333333333333333333');   //报错
                }
                //复制完 删除当前图片和zip
                // await compressing.zip.uncompress(form.uploadDir + (fileName || file.name), form.uploadDir);
                // fs.unlinkSync(form.uploadDir + (fileName || file.name))
                await finish_upload(req, res, fields);
            });
        });
    } else {
        var path = "fileupload/" + hash,
            path_ok = path + ".ok";

        if (action == "query") {
            if (fs.existsSync(path_ok)) res.send('ok'); //秒传成功可以返回json对象 eg:{ ret:1,test:"aaa" }
            else if (fs.existsSync(path)) res.send(fs.statSync(path).size + "");
            else res.send("0");
        } else {
            process_upload_file(req, res, function(form, file, fields) {
                fs.appendFileSync(path, fs.readFileSync(file.path));
                fs.unlink(file.path, function() {});

                var isOk = req.query["ok"] == "1";
                if (!isOk) {
                    res.send("1");
                } else {
                    fs.rename(path, path_ok, function(err) {
                        finish_upload(req, res, fields);
                    });
                }
            });
        }
    }
});

/**
 * Unity 3D 模型上传
 */
unityRouter.post('/filepath', async function(req, res, next) {

    var type1 = req.body.type1 // 第一级 类型
    var type = req.body.value1 // 第三级 类型和一级名字
    var type2 = req.body.type2 // 第二级 类型
    var assetName1 = req.body.assetName // 二级名字
    var platform = req.body.platform //平台名字

    var typepath = '';
    if (type1 === 'PIE' && type2 === '') {
        typepath = type1 + '/' + assetName1 + '/' + platform + '/'
    } else {
        typepath = type1 + '/' + type2 + '/' + platform + '/'
    }
    var filepaths = pathname + typepath

    var jpgzip = 0;
    var jpgpng = '.jpg';
    var zipname = '';
    const files = fs.readdirSync(pathname)
    files.forEach(function(item, index) {
        if (item.indexOf('.jpg') !== -1) {
            jpgzip += 1;
            jpgpng = item;
        } else if (item.indexOf('.png') !== -1) {
            jpgzip += 1;
            jpgpng = item;
        } else if (item.indexOf('.zip') !== -1) {
            jpgzip += 1;
            zipname = item;
        }
    });

    var url = 'http://10.1.40.20:8082/api_service/unity/model/'

    if (jpgzip === 2) {
        await fileFs(filepaths);
        fs.rename(pathname + zipname, filepaths + '/' + zipname, async function(err) {
            await compressing.zip.uncompress(filepaths + '/' + zipname, filepaths);
            fs.rename(pathname + jpgpng, filepaths + '/' + jpgpng, function(err) {
                var newFileMangement = new FileMangement({
                    username: '',
                    filename: '',
                    titleName: type,
                    assetName: assetName1,
                    type: type,
                    type1: type1,
                    type2: type2,
                    imagePath: url + typepath + jpgpng,
                    bundlePath: url + typepath,
                    platform: platform
                });
                newFileMangement.save().then(function(filemanagements) {
                    var result = {
                        data: '上传成功'
                    };
                    res.send(JSON.stringify(result));
                    jpgzip === 0;
                    return;
                });
            });
        });
    } else {
        var result = {
            data: '图片或者文件没有上传'
        };
        res.send(JSON.stringify(result));
        jpgzip === 0;
        return;
    }
});

/**
 * 拉取unity 3D 数据
 */
unityRouter.post('/unityPull', function(req, res, next) {
    FileMangement.find().sort({ _id: -1 }).then(function(filemanagements) {
        if (filemanagements.length > 0) {
            var result = {
                data: JSON.stringify(filemanagements)
            };
            res.send(JSON.stringify(result));
            return;
        } else {
            var result = {
                data: '暂时没有数据'
            };
            res.send(JSON.stringify(result));
            return;
        }
    });
});
/**
 * 删除单项数据
 */
unityRouter.post('/deleteData', function(req, res, next) {
    var id = req.body.id;
    var idpath = req.body.idpath;
    pathname = pathname + idpath;
    FileMangement.remove({
        _id: id
    }).then(function() {
        const files = fs.readdirSync(pathname)
        files.forEach(function(item, index) {
            delFile(pathname, pathname)
        })
        var result = {
            data: '删除成功'
        };
        res.send(JSON.stringify(result));
        return;
    });
})

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats);
            }
        })
    })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}
/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
        return true;
    } else if (isExists) { //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir; //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if (status) {
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}

/**
 * 
 * @param {*} path 必传参数可以是文件夹可以是文件
 * @param {*} reservePath 保存path目录 path值与reservePath值一样就保存
 */
function delFile(path, reservePath) {
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let currentPath = path + "/" + file;
                if (fs.statSync(currentPath).isDirectory()) {
                    delFile(currentPath, reservePath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });
            if (path != reservePath) {
                fs.rmdirSync(path);
            }
        } else {
            fs.unlinkSync(path);
        }
    }
}

/**
 * 循环判断文件夹是否创建，文件是否存在 数据是否存入复制进去
 * @param {创建文件名} path1 
 * @param {文件html内容} contex1 
 * @param {文件css内容} contex2 
 */
async function fileFs(path1) {
    try {
        await fs.exists(path1, function(exists) {
            if (exists) {
                return;
            } else {
                fs.mkdir(path1, { recursive: true }, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    fileFs(path1);
                });
            }
        })
    } catch (err) {
        console.error(err)
    }
}

unityRouter.post("/api_unity_register", function(req, res) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    var type = req.body.type;
    var images = req.body.images;

    var timedate = Date.now();

    var path = './api_service/image/UnityPhotonServer/' + timedate + '.png'; //路径从app.js级开始找--
    var base64 = images.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer)); // 输出是否是buffer对象
    fs.writeFile(path, dataBuffer, function(err) { //用fs写入文件
        if (err) {
            console.log(err);
            ws.send(JSON.stringify(err));
        } else {
            var bool = false;
            User.find().sort({ _id: -1 }).then(function(users) {
                for (var i = 0; users.length > i; i++) {
                    var json = users[i];
                    if (json.username === username) {
                        bool = true;
                    }
                }
                if (!bool) {
                    var image = 'http://10.1.40.20:8082/api_service/image/UnityPhotonServer/' + timedate + '.png';
                    var user = new User({
                        username: username,
                        password: password,
                        type: type,
                        images: image,
                        roomid: '',
                        online: 'true'
                    });
                    user.save().then(function(users) {
                        var result = {
                            code: 200,
                            message: '注册成功',
                            data: {}
                        }
                        return res.send(JSON.stringify(result));
                    });
                } else {
                    var result = {
                        code: 100,
                        message: '注册失败,用户已存在!',
                        data: {}
                    }
                    return res.send(JSON.stringify(result));
                }
            });
        }
    });
});

// 建立 WebSocket 服务
// 
// 第一个参数为服务路径： /basic
// 第二个参数为与前端建立连接时会调用的回调函数
//   ws 相当于建立 WebSocket 的实例
//   req 为建立连接的请求
unityRouter.ws('/basic', function(ws, req) {
    // 使用 ws 的 send 方法向连接另一端的客户端发送数据
    // ws.send('connect to express server with WebSocket success')

    // 使用 on 方法监听事件
    //   message 事件表示从另一段（服务端）传入的数据
    // type 1 表示登录 2 表示注册 3 上传图片 4 拉人进房间
    ws.on('message', function(msg) {
        var json = JSON.parse(msg);
        var type = json.cmd;
        var username = '';
        var password = '';
        var online = '';
        var image = '';
        var roomid = '';
        var bool = false;

        switch (type) {
            case 101: //登录
                username = json.userName;
                password = json.password;
                online = 'true';
                User.find().sort({ _id: -1 }).then(function(users) {
                    for (var i = 0; users.length > i; i++) {
                        var json = users[i];
                        if (json.username === username && json.password === password) {
                            bool = true;
                            json.type = type;
                            json.username = username;
                            json.password = password;
                            json.online = online;
                            User.update({
                                _id: json._id
                            }, {
                                type: json.type,
                                username: json.username,
                                password: json.password,
                                images: json.images,
                                online: json.online
                            }).then(function() {
                                var result = {
                                    cmd: 102,
                                    returnCode: 200
                                }
                                return ws.send(JSON.stringify(result));
                            });

                        }
                    }
                    if (!bool) {
                        var result = {
                            cmd: 102,
                            returnCode: 101
                        }
                        return ws.send(JSON.stringify(result));
                    }
                });
                break;
            case 103: //下线通知
                username = json.userName;
                online = 'false';
                User.find().sort({ _id: -1 }).then(function(users) {
                    for (var i = 0; users.length > i; i++) {
                        var json = users[i];
                        if (json.username === username) {
                            bool = true;
                            json.type = type;
                            json.username = username;
                            json.online = online;
                            User.update({
                                _id: json._id
                            }, {
                                type: json.type,
                                username: json.username,
                                password: json.password,
                                images: json.images,
                                online: json.online
                            }).then(function() {
                                var result = {
                                    cmd: 104,
                                    returnCode: 200
                                }
                                ws.send(JSON.stringify(result));
                            });

                        }
                    }
                    if (!bool) {
                        var result = {
                            cmd: 104,
                            returnCode: 102
                        }
                        return ws.send(JSON.stringify(result));
                    }
                });
                break;
            case 201: //单个房间里面所有人头像
                roomid = json.roomID;
                var dataa = [];
                User.find().sort({ _id: -1 }).then(function(users) {
                    for (var i = 0; users.length > i; i++) {
                        var json = users[i];
                        if (json.roomid === roomid && json.online === 'true') {
                            var data = {};
                            bool = true;
                            data['roomID'] = json.roomid
                            data['userName'] = json.username
                            data['headerImageUrl'] = json.images
                            dataa.push(data);
                        }
                    }

                    if (!bool) {
                        var result = {
                            cmd: 202,
                            returnCode: 103
                        }
                        return ws.send(JSON.stringify(result));
                    } else {
                        var result = {
                            cmd: 202,
                            returnCode: 200,
                            users: dataa
                        }
                        return ws.send(JSON.stringify(result));
                    }
                });
                break;
            case 301: //用户切换房间
                roomid = json.roomID;
                username = json.userName;
                User.find().sort({ _id: -1 }).then(function(users) {
                    for (var i = 0; users.length > i; i++) {
                        var json = users[i];
                        if (json.username === username) {
                            bool = true;
                            json.type = type;
                            json.roomid = roomid;
                            User.update({
                                _id: json._id
                            }, {
                                type: json.type,
                                username: json.username,
                                password: json.password,
                                images: json.images,
                                roomid: son.roomid,
                                online: json.online
                            }).then(function() {
                                var result = {
                                    cmd: 302,
                                    returnCode: 200
                                }
                                return ws.send(JSON.stringify(result));
                            });

                        }
                    }
                    if (!bool) {
                        var result = {
                            cmd: 302,
                            returnCode: 104
                        }
                        return ws.send(JSON.stringify(result));
                    }
                });
                break;
            case 303: //群发消息通知进房间
                roomid = json.roomID;
                username = json.userName;
                console.log('roomid:' + roomid + "==username:" + username);
                User.find().sort({ _id: -1 }).then(function(users) {
                    for (var i = 0; users.length > i; i++) {
                        var json = users[i];
                        if (json.username !== username && json.online === 'true') {
                            bool = true;
                            var result = {
                                cmd: 304,
                                roomID: roomid,
                                returnCode: 200
                            }
                            return ws.send(JSON.stringify(result));
                        }
                    }

                    if (!bool) {
                        var result = {
                            cmd: 304,
                            returnCode: 105
                        }
                        return ws.send(JSON.stringify(result));
                    }
                });
                break;
            case 105:
                username = json.userName;
                var result = {
                    cmd: 106,
                    userName: username
                }
                return ws.send(JSON.stringify(result));
        }
    })

    // close 事件表示客户端断开连接时执行的回调函数
    ws.on('close', function(e) {
        console.log('close connection')
    })
})





module.exports = unityRouter;