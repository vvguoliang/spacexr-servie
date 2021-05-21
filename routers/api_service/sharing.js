express = require('express');

sharingRouter = express.Router()
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var os = require('os');

const SharingData = require('../../models/Sharing');

var pathname = './api_service/sharing/';
// 构造返回 json 格式
var responseData;
sharingRouter.use(function (req, res, next) {
    responseData = {
        code: 0,
        id: '',
        data: '',
        message: ''
    }
    next();
});
/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
    let isExists = await getStat(dir);
    //如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
        return true;
    } else if (isExists) {     //如果该路径存在但是文件，返回false
        return false;
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir;      //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if (status) {
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
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
 * 上传文件
 */
sharingRouter.post('/upload', function (req, res, next) {
    var form = formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = pathname;
    //保留后缀
    form.keepExtensions = true;

    form.parse(req, async function (err, fields, files) {
        var file = files.all;
        var id = fields.id;

        await dirExists(pathname + id + '/');

        fs.rename(file.path, pathname + id + '/' + file.name, function (err) {
            if (err) {
                responseData.code = '100';
                responseData.message = '上传失败';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            } else {
                let d = new Date();
                var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                var bool = false;
                var url = "http://dcsapi.com/?k=56365249177898188915663&url=http://piecloud.piesat.cn/api_service/sharing/" + id + "/" + file.name;
                SharingData.find().sort({ _id: -1 }).then(function (sharings) {
                    if (sharings.length > 0) {
                        for (var i = 0; sharings.length > i; i++) {
                            var json = sharings[i];
                            if (json.sid.toString() === id) {
                                bool = true;
                                var url = json.surl;
                                var urls = url.split(id);
                                fs.unlinkSync(pathname + id + urls[1])
                                Sharing.update({
                                    _id: json._id
                                }, {
                                    sid: json.sid,
                                    surl: url,
                                    sdate: day,
                                    sstarttime: json.sstarttime
                                }).then(function () {
                                    responseData.code = '200';
                                    responseData.message = '成功';
                                    responseData.id = id;
                                    responseData.data = '';
                                    res.json(responseData);
                                    return;
                                });
                            }
                        }
                    } else {
                        var Sharing = new SharingData({
                            sid: id,
                            surl: url,
                            sdate: day,
                            sstarttime: day
                        });
                        Sharing.save().then(function (sharings) {
                            responseData.code = '200';
                            responseData.message = '成功';
                            responseData.id = '';
                            responseData.data = url;
                            res.json(responseData);
                            return;
                        });
                    }
                });
                if (!bool) {
                    var Sharing = new SharingData({
                        sid: id,
                        surl: url,
                        sdate: day,
                        sstarttime: day
                    });
                    Sharing.save().then(function (sharings) {
                        responseData.code = '200';
                        responseData.message = '成功';
                        responseData.id = '';
                        responseData.data = url;
                        res.json(responseData);
                        return;
                    });
                }
            }
        });
    });
});

/**
 * 拉取数据
 */
sharingRouter.post('/list', function (req, res, next) {
    var id = req.body.id || ''
    let d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    SharingData.find().sort({ _id: -1 }).then(function (sharings) {
        if (sharings.length > 0) {
            for (var i = 0; sharings.length > i; i++) {
                var json = sharings[i];
                if (id === 'u8522_img') {
                    responseData.code = '101';
                    responseData.message = '没有上传文件';
                    responseData.id = '';
                    responseData.data = 'http://piecloud.piesat.cn/api_service/unity/progress/';
                    res.json(responseData);
                    return;
                } else if (json.sid.toString() === id) {
                    responseData.code = '200';
                    responseData.message = '获取列表成功';
                    responseData.id = '';
                    responseData.data = json;
                    res.json(responseData);
                    return;
                }
            }
        } else {
            if (id === 'u8522_img') {
                responseData.code = '101';
                responseData.message = '没有上传文件';
                responseData.id = '';
                responseData.data = 'http://piecloud.piesat.cn/api_service/unity/progress/';
                res.json(responseData);
                return;
            } else {
                new SharingData({
                    sid: id,
                    surl: '',
                    sdate: day,
                    sstarttime: day
                });
                responseData.code = '100';
                responseData.message = '没有上传文件';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        }
    });
});

module.exports = sharingRouter;