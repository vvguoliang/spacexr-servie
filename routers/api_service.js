/*
 *   api 模块//接口路由 对web接口
 */

var express = require('express');
var multipart = require('multiparty');
var formidable = require('formidable');
var fs = require('fs');
var Path = require('path');
var md5 = require('md5-node');
var os = require('os');

const random = require('string-random');
const Goolg = require('../models/Goolg');
const Fileppt = require('../models/Fileppt');
const Fileexcel = require('../models/Fileexcel');
const Fileword = require('../models/Fileword');
const Filepdf = require('../models/Filepdf');
const Project = require('../models/Project');

const ProjectHtml = require('../models/ProjectHtml');
const Webmodel = require('../models/WebModel');

var compressing = require('compressing');
const WebModel = require('../models/WebModel');
var routerApiService = express.Router();

var pec = require('../models/Pec');
var schedule = require('node-schedule'); //秒、分、时、日、月、周几
const PexelsAPI = require('pexels-api-wrapper');
var pexelsClient = new PexelsAPI("563492ad6f91700001000001338acd8fa54c43cdb27a4d1474e632f5");
var path = '/api_service/image/photos/'

// var url_path = 'http://piecloud.piesat.cn';
var url_path = 'http://10.1.40.24:8082';

// var responseData = require('../models/ReturnDataFormat');



// 构造返回 json 格式
var responseData;
routerApiService.use(function(req, res, next) {
    responseData = {
        code: 0,
        id: '',
        data: '',
        message: ''
    }
    next();
});

/**
 * 文件上传 根据类型type excel word ppt ptf
 * @api {POST} /api_file:type 文件上传 根据类型type excel word ppt ptf
 * @apiDescription 文件上传 根据类型type excel word ppt ptf
 * @apiName api_file:type
 * @apiParam {String} excel    上传参数 
 * @apiParam {String} row     
 * @apiParam {String} col     
 * @apiParam {String} text     
 * @apiParam {String} font     
 * @apiParam {String} fontsize     
 * @apiParam {String} signal     
 * @apiParam {String} textwrap     
 * @apiParam {String} color     
 * @apiParam {String} bgcolor     
 * @apiParam {String} exceldata     
 * @apiParam {String} title     
 * @apiParam {String} subtitle     
 * @apiParam {String} word    上传参数 
 * @apiParam {String} worddata     
 * @apiParam {String} title     
 * @apiParam {String} subtitle     
 * @apiParam {String} pdf    上传参数 
 * @apiParam {String} ppt    上传参数 
 * @apiSampleRequest /api_file:type
 * @apiGroup Web
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 */
routerApiService.post('/api_file', function(req, res, next) {
    var type = req.body.type || '';
    var url1 = req.url;
    if (url1.indexOf('type') !== -1) {
        if (url1.indexOf('pdf') !== -1) {
            type = 'pdf';
        } else {
            type = 'ppt';
        }
    }
    let d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    switch (type) {
        case 'excel':
            var row1 = req.body.row || '';
            var col1 = req.body.col || '';
            var text1 = req.body.text || '';
            var font1 = req.body.font || '';
            var fontsize1 = req.body.fontsize || '';
            var signal1 = req.body.signal || '';
            var textwrap1 = req.body.textwrap || '';
            var color1 = req.body.color || '';
            var bgcolor1 = req.body.bgcolor || '';
            var exceldata1 = req.body.exceldata || '';
            var title1 = req.body.title || '';
            var subtitle1 = req.body.subtitle || '';
            var fileexcel = new Fileexcel({
                row: row1,
                col: col1,
                text: text1,
                font: font1, //字体
                fontsize: fontsize1,
                signal: signal1, //B I U S L C R T M D
                textwrap: textwrap1,
                color: color1,
                bgcolor: bgcolor1,
                exceldata: exceldata1,
                title: title1,
                subtitle: subtitle1,
                exceldate: day,
                excelstarttime: day //excel 开始时间
            });
            fileexcel.save().then(function(fileexcels) {
                responseData.code = '200';
                responseData.message = '成功';
                responseData.id = fileexcels.id;
                responseData.data = '';
                res.json(responseData);
                return;
            });
            break;
        case 'word':
            var worddata1 = req.body.worddata || '';
            var title1 = req.body.title || '';
            var subtitle1 = req.body.subtitle || '';
            var fileword = new Fileword({
                worddata: worddata1,
                title: title1,
                subtitle: subtitle1,
                worddate: day, //修改时间
                wordstarttime: day //开始时间
            });
            fileword.save().then(function(filewords) {
                responseData.code = '200';
                responseData.message = '成功';
                responseData.id = filewords.id;
                responseData.data = '';
                res.json(responseData);
                return;
            });
            break;
        case 'pdf':
            const form1 = new formidable.IncomingForm();
            //设置编辑
            form1.encoding = 'utf-8';
            //设置文件存储路径
            var pathjing = '/api_service/pdf/';
            var pathname = './api_service/pdf/'; //地址不应该是这个

            form1.uploadDir = pathname;
            form1.parse(req, function(err, fields, files) {
                if (err) {
                    responseData.code = '100';
                    responseData.message = err.toString();
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                    return;
                }

                var filename = files.file.name;
                var names = filename.split('\.');
                fs.rename(files.file.path, pathname + filename, function(err) {
                    if (err) {
                        responseData.code = '100';
                        responseData.message = '上传文件失败！';
                        responseData.id = '';
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    }
                    var filepdf = new Filepdf({
                        title: names[0],
                        subtitle: filename,
                        url: url_path + pathjing + filename,
                        pdfdata: '',
                        pdfdate: day, //修改时间
                        pdfstarttime: day //开始时间
                    });
                    filepdf.save().then(function(filepdfs) {
                        responseData.code = '200';
                        responseData.message = '上传pdf成功';
                        responseData.id = filepdfs.id;
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    });
                });
                // }
            });
            break;
        case 'ppt':
            const form2 = new formidable.IncomingForm();
            //设置编辑
            form2.encoding = 'utf-8';
            //设置文件存储路径
            var pathjing = '/api_service/ppt/';
            var pathname = './api_service/ppt/'; //地址不应该是这个

            form2.uploadDir = pathname;
            form2.parse(req, function(err, fields, files) {
                if (err) {
                    responseData.code = '100';
                    responseData.message = err.toString();
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                    return;
                }
                var filename = files.file.name;
                var names = filename.split('\.');
                fs.rename(files.file.path, pathname + filename, function(err) {
                    if (err) {
                        responseData.code = '100';
                        responseData.message = '上传文件失败！';
                        responseData.id = '';
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    }
                    var fileppt = new Fileppt({
                        title: names[0],
                        subtitle: filename,
                        url: url_path + pathjing + filename,
                        pptdata: '',
                        pptdate: day, //修改时间
                        pptstarttime: day //开始时间
                    });
                    fileppt.save().then(function(fileppts) {
                        responseData.code = '200';
                        responseData.message = '上传ppt成功';
                        responseData.id = fileppts.id;
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    });
                });
            });
            break;
    }
});

/**
 * 数据存入 excel
 */
routerApiService.post('/api_file_excel', function(req, res, next) {

    var id = req.body.id || '';
    var row1 = req.body.row || '';
    var col1 = req.body.col || '';
    var text1 = req.body.text || '';
    var font1 = req.body.font || '';
    var fontsize1 = req.body.fontsize || '';
    var signal1 = req.body.signal || '';
    var textwrap1 = req.body.textwrap || '';
    var color1 = req.body.color || '';
    var bgcolor1 = req.body.bgcolor || '';
    var exceldata1 = req.body.exceldata || '';
    var title1 = req.body.title || '';
    var subtitle1 = req.body.subtitle || '';
    //判断数据库是否已有

    var d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    if (id === null || id === undefined || id === '') {
        responseData.code = '100';
        responseData.message = '写入失败';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        var bool = false;
        Fileexcel.find().sort({ _id: -1 }).then(function(fileexcels) {
            for (var i = 0; fileexcels.length > i; i++) {
                var json = fileexcels[i];
                if (json._id.toString() === id) {
                    bool = true;
                    //保存数据到数据库
                    if (row1 !== '' && col1 !== '') {
                        json.row = row1;
                        json.col = col1;
                    }
                    if (text1 !== '') {
                        json.text = text1;
                    }
                    if (font1 !== '') {
                        json.font = font1;
                    }
                    if (fontsize1 !== '') {
                        json.fontsize = fontsize1;
                    }
                    if (req.body.signal !== undefined) {
                        json.signal = signal1;
                    }
                    if (textwrap1 !== '') {
                        json.textwrap = textwrap1;
                    }
                    if (color1 !== '') {
                        json.color = color1;
                    }
                    if (bgcolor1 !== '') {
                        json.bgcolor = bgcolor1;
                    }
                    if (title1 !== '') {
                        json.title = title1;
                    }
                    if (subtitle1 !== '') {
                        json.subtitle = subtitle1;
                    }
                    if (exceldata1 !== '') {
                        json.exceldata = exceldata1;
                        json.exceldate = day;
                    }

                    Fileexcel.update({
                        _id: json._id
                    }, {
                        row: json.row,
                        col: json.col,
                        text: json.text,
                        font: json.font,
                        fontsize: json.fontsize,
                        signal: json.signal,
                        textwrap: json.textwrap,
                        color: json.color,
                        bgcolor: json.bgcolor,
                        title: json.title,
                        subtitle: json.subtitle,
                        exceldata: json.exceldata,
                        exceldate: json.exceldate,
                        excelstarttime: json.excelstarttime //excel 开始时间
                    }).then(function() {
                        responseData.code = '200';
                        responseData.message = '成功';
                        responseData.id = id;
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    });
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 数据存入 word
 */
routerApiService.post('/api_file_word', function(req, res, next) {

    var id = req.body.id || '';
    var worddata1 = req.body.worddata || '';
    var title1 = req.body.title || '';
    var subtitle1 = req.body.subtitle || '';
    //判断数据库是否已有

    var d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    if (id === null || id === undefined || id === '') {
        responseData.code = '100';
        responseData.message = '写入失败';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        var bool = false;
        Fileword.find().sort({ _id: -1 }).then(function(filewords) {
            for (var i = 0; filewords.length > i; i++) {
                var json = filewords[i];
                if (json._id.toString() === id) {
                    bool = true;
                    //保存数据到数据库
                    if (title1 !== '') {
                        json.title = title1;
                    }
                    if (subtitle1 !== '') {
                        json.subtitle = subtitle1;
                    }
                    if (worddata1 !== '') {
                        json.worddata = worddata1;
                        json.worddate = day;
                    }

                    Fileword.update({
                        _id: json._id
                    }, {
                        title: json.title,
                        subtitle: json.subtitle,
                        worddata: json.worddata,
                        worddate: json.worddate,
                        wordstarttime: json.wordstarttime //excel 开始时间
                    }).then(function() {
                        responseData.code = '200';
                        responseData.message = '成功';
                        responseData.id = id;
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    });
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});


/**
 * 获取excel
 */
routerApiService.post('/api_file_excel_out', function(req, res, next) {
    var id = req.body.id || '';
    if (id === null || id === undefined || id === '') {
        responseData.code = '100';
        responseData.message = '获取excel失败';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        var bool = false;
        Fileexcel.find().sort({ _id: -1 }).then(function(fileexcels) {
            for (var i = 0; fileexcels.length > i; i++) {
                var json = fileexcels[i];
                if (json._id.toString() === id) {
                    bool = true;
                    responseData.code = '200';
                    responseData.message = '成功';
                    responseData.id = id;
                    if (json.exceldata !== '') {
                        responseData.data = JSON.parse(json.exceldata);
                    } else {
                        responseData.data = '';
                    }
                    res.json(responseData);
                    return;
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 获取word
 */
routerApiService.post('/api_file_word_out', function(req, res, next) {
    var id = req.body.id || '';
    if (id === null || id === undefined || id === '') {
        responseData.code = '100';
        responseData.message = '获取word失败';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        var bool = false;
        Fileword.find().sort({ _id: -1 }).then(function(filewords) {
            for (var i = 0; filewords.length > i; i++) {
                var json = filewords[i];
                if (json._id.toString() === id) {
                    bool = true;
                    responseData.code = '200';
                    responseData.message = '成功';
                    responseData.id = id;
                    responseData.data = json.worddata;
                    res.json(responseData);
                    return;
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 获取pdf
 */
routerApiService.post('/api_file_pdf_out', function(req, res, next) {
    var id = req.body.id || '';
    if (id === null || id === undefined || id === '') {
        responseData.code = '100';
        responseData.message = '获取word失败';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        var bool = false;
        Filepdf.find().sort({ _id: -1 }).then(function(filepdfs) {
            for (var i = 0; filepdfs.length > i; i++) {
                var json = filepdfs[i];
                if (json._id.toString() === id) {
                    bool = true;
                    responseData.code = '200';
                    responseData.message = '成功';
                    responseData.id = id;
                    responseData.data = JSON.stringify(json);
                    res.json(responseData);
                    return;
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 获取pdf
 */
routerApiService.post('/api_file_ppt_out', function(req, res, next) {
    var id = req.body.id || '';
    if (id === null || id === undefined || id === '') {
        responseData.code = '100';
        responseData.message = '获取word失败';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        var bool = false;
        Fileppt.find().sort({ _id: -1 }).then(function(fileppts) {
            for (var i = 0; fileppts.length > i; i++) {
                var json = fileppts[i];
                if (json._id.toString() === id) {
                    bool = true;
                    responseData.code = '200';
                    responseData.message = '成功';
                    responseData.id = id;
                    responseData.data = JSON.stringify(json);
                    res.json(responseData);
                    return;
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 获取列表
 */
routerApiService.get('/api_file_list', function(req, res, next) {
    var data1 = {};
    var words = [];
    var excels = [];
    var pdfs = [];
    var ppts = [];
    Filepdf.find().sort({ _id: -1 }).then(function(filepdfs) {
        for (var i = 0; filepdfs.length > i; i++) {
            pdfs.push(filepdfs[i]);
        }
        Fileexcel.find().sort({ _id: -1 }).then(function(fileexcels) {
            for (var i = 0; fileexcels.length > i; i++) {
                var json = fileexcels[i];
                json['titledata'] = JSON.stringify(json.exceldata).substring(0, 20);
                excels.push(json);
            }
            Fileword.find().sort({ _id: -1 }).then(function(filewords) {
                for (var i = 0; filewords.length > i; i++) {
                    var json = filewords[i];
                    json['titledata'] = JSON.stringify(json.worddata).substring(0, 20);
                    words.push(json);
                }
                Fileppt.find().sort({ _id: -1 }).then(function(fileppts) {
                    for (var i = 0; fileppts.length > i; i++) {
                        ppts.push(fileppts[i]);
                    }
                    data1['word'] = words;
                    data1['excel'] = excels;
                    data1['pdf'] = pdfs;
                    data1['ppt'] = ppts;
                    responseData.code = '200';
                    responseData.message = '获取列表成功';
                    responseData.id = '';
                    responseData.data = JSON.stringify(data1);
                    res.json(responseData);
                    return;
                });
            });
        });
    });
});

/**
 * 获取编辑页面 所有数据列表
 */
routerApiService.get('/api_project_list', function(req, res, next) {
    var url1 = req.url;
    var type1 = '-1';
    if (url1.indexOf('type') !== -1) {
        type1 = url1.substring(url1.length - 1, url1.length);
    }
    Project.find().sort({ _id: -1 }).then(function(projects) {
        if (projects.length > 0 && type1 === '-1') { //列表不给出 其他数据
            var all_simplicity = [];

            for (var i = 0; projects.length > i; i++) {
                var json = projects[i]
                var all_simplicity1 = {};
                all_simplicity1['id'] = json._id.toString();
                all_simplicity1['projectName'] = json.projectName;
                all_simplicity1['pThumb'] = json.pThumb;
                all_simplicity1['type'] = json.type;
                all_simplicity1['isTemplate'] = json.isTemplate;
                all_simplicity1['images'] = json.images;
                all_simplicity1['videos'] = json.videos;
                all_simplicity1['projectdate'] = json.projectdate;
                all_simplicity1['projectstarttime'] = json.projectstarttime;
                all_simplicity.push(all_simplicity1)
            }
            responseData.code = '200';
            responseData.message = '获取列表成功';
            responseData.id = '';
            responseData.data = all_simplicity;
            res.json(responseData);
            return;
        } else if (projects.length > 0 && type1 !== '-1') {
            var all_simplicity = [];

            for (var i = 0; projects.length > i; i++) {
                var json = projects[i]
                var all_simplicity1 = {};
                if (json.type === type1) {
                    all_simplicity1['id'] = json._id.toString();
                    all_simplicity1['projectName'] = json.projectName;
                    all_simplicity1['pThumb'] = json.pThumb;
                    all_simplicity1['type'] = json.type;
                    all_simplicity1['isTemplate'] = json.isTemplate;
                    all_simplicity1['images'] = json.images;
                    all_simplicity1['videos'] = json.videos;
                    all_simplicity1['projectdate'] = json.projectdate;
                    all_simplicity1['projectstarttime'] = json.projectstarttime;
                    all_simplicity.push(all_simplicity1)
                }
            }
            responseData.code = '200';
            responseData.message = '获取相关数据列表';
            responseData.id = '';
            responseData.data = all_simplicity;
            res.json(responseData);
            return;
        } else {
            responseData.code = '201';
            responseData.message = '获取列表为空';
            responseData.id = '';
            responseData.data = '';
            res.json(responseData);
            return;
        }
    });
});

/**
 * 项目中的增加页面 列表
 */
routerApiService.post('/api_projects_AData', function(req, res, next) {
    var pId1 = req.body.pId || '';
    if (pId1 === null || pId1 === undefined || pId1 === '') {
        responseData.code = '100';
        responseData.message = 'id不存在';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        Project.find().sort({ _id: -1 }).then(function(projects) {
            var bool = false;
            for (var i = 0; projects.length > i; i++) {
                var json = projects[i];
                var jsonhtml = []
                if (json._id.toString() === pId1) {
                    bool = true;
                    var jsonDa = {}
                    var json1 = eval(json.projectHtml);
                    var json2 = eval(json.projectStyle);
                    for (var j = 0; json1.length > j; j++) {
                        var jsonstyle = {};
                        jsonstyle['images'] = json2[j].images
                        jsonstyle['projectdate'] = json2[j].projectdate
                        jsonstyle['hUrl'] = json2[j].hUrl
                        jsonstyle['hThumb'] = json2[j].hThumb
                        jsonstyle['hComponents'] = json2[j].hComponents;
                        jsonstyle['hStyle'] = json2[j].hStyle;
                        jsonstyle['hJS'] = json2[j].hJS;

                        jsonstyle['id'] = json1[j].id
                        jsonstyle['title'] = json1[j].title
                        jsonhtml.push(jsonstyle);
                    }
                    jsonDa['projectName'] = json.projectName
                    jsonDa['isTemplate'] = json.isTemplate
                    jsonDa['images'] = json.images
                    jsonDa['type'] = json.type
                    jsonDa['projectdate'] = json.projectdate
                    jsonDa['projectstarttime'] = json.projectstarttime
                    jsonDa['jsonData'] = jsonhtml
                    responseData.code = '200';
                    responseData.message = '获取相关数据列表';
                    responseData.id = pId1;
                    responseData.data = jsonDa;
                    res.json(responseData);
                    return;
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 单个页面接口
 */
routerApiService.post('/api_project_setOne', function(req, res, next) {
    var pId = req.body.pId || '';
    var id = req.body.id || '';

    if ((pId === null || pId === undefined || pId === '') && (id === null || id === undefined || id === '')) {
        responseData.code = '100';
        responseData.message = 'id不存在';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        Project.find().sort({ _id: -1 }).then(function(projects) {
            var bool = false;
            var jsonstyle = {};
            for (var i = 0; projects.length > i; i++) {
                var json = projects[i];
                if (json._id.toString() === pId) {
                    bool = true;

                    var json1 = eval(json.projectHtml);
                    var json2 = eval(json.projectStyle);
                    for (var j = 0; json1.length > j; j++) {
                        if (json1[j].id.toString() === id.toString()) {
                            jsonstyle['images'] = json2[j].images
                            jsonstyle['projectdate'] = json2[j].projectdate
                            jsonstyle['hUrl'] = json2[j].hUrl
                            jsonstyle['hThumb'] = json2[j].hThumb
                            jsonstyle['projectStyle'] = json2[j].projectStyle
                            jsonstyle['hComponents'] = json2[j].hComponents;
                            jsonstyle['hStyle'] = json2[j].hStyle;
                            jsonstyle['hJS'] = json2[j].hJS;


                            jsonstyle['projectHtml'] = json1[j].projectHtml
                            jsonstyle['id'] = json1[j].id
                            jsonstyle['title'] = json1[j].title
                        }
                    }
                    var jsonstyl = JSON.stringify(jsonstyle)
                    if (jsonstyl.indexOf('&quot;') !== -1) {
                        jsonstyl = jsonstyl.replace(/&quot;/g, '');
                    }
                    responseData.code = '200';
                    responseData.message = '获取相关数据列表';
                    responseData.id = pId;
                    responseData.data = jsonstyle;
                    res.json(responseData);
                    return;
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});
/**
 * 创建页面
 */
routerApiService.post('/api_projects_add', function(req, res, next) { // 上传图片和视频
    var pId1 = req.body.pId || '';
    var projectHtml1 = req.body.projectHtml || '';
    var projectStyle1 = req.body.projectStyle || '';
    var filename = req.body.filename || '';
    var type1 = req.body.type || '0';
    var projectName1 = req.body.projectName || '未命名工程';
    var pThumb1 = req.body.pThumb || '';
    var isTemplate1 = req.body.isTemplate || false

    let d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var time = d.getTime();
    var time1 = (Math.floor(Date.now()) + random(10)).toString();
    time1 = md5(time1).toString()
    if (pId1 === '') {
        var projectHtm1 = {};
        var projectHtm2 = [];

        projectHtm1['projectHtml'] = projectHtml1;
        projectHtm1['id'] = time1;
        projectHtm1['title'] = '新页面1';
        projectHtm2.push(projectHtm1);

        var projectStyl1 = {};
        var projectStyl2 = [];

        if (projectHtml1.indexOf('!doctype html') === -1) { //不包括 就添加
            projectHtml1 = '<!doctype html><html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"> </head><body>' + projectHtml1 + '</body></body><html><html>';
        }
        fileFs(time, projectHtml1, projectStyle1); //文件创建生成URL地址

        projectStyl1['projectStyle'] = projectStyle1;
        projectStyl1['id'] = time1;
        projectStyl1['images'] = '';
        projectStyl1['projectdate'] = day;
        projectStyl1['hUrl'] = url_path + '/api_service/template/' + time1;
        projectStyl1['hThumb'] = '';
        projectStyl1['hComponents'] = '';
        projectStyl1['hStyle'] = '';
        projectStyl1['hJS'] = '';

        projectStyl2.push(projectStyl1);

        // Compressionpath(pathname + filename);
        var project = new Project({
            projectName: projectName1,
            projectHtml: JSON.stringify(projectHtm2),
            projectStyle: JSON.stringify(projectStyl2),
            pThumb: pThumb1,
            isTemplate: isTemplate1,
            images: '',
            type: type1,
            projectdate: day,
            projectstarttime: day //excel 开始时间
        });
        project.save().then(function(projects) {
            responseData.code = '200';
            responseData.message = '创建成功';
            responseData.id = time1;
            responseData.data = projects;
            res.json(responseData);
            return;
        });
    } else {
        var bool = false;
        var project1 = {};
        Project.find().sort({ _id: -1 }).then(function(projects) {
            for (var i = 0; projects.length > i; i++) {
                var json = projects[i];
                if (json._id.toString() === pId1) {
                    bool = true;
                    if (projectName1 !== '') {
                        json.projectName = projectName1;
                    }
                    if (json.isTemplate.toString() !== isTemplate1.toString()) {
                        json.isTemplate = isTemplate1;
                    }
                    if (type1 !== '-1') {
                        json.type = type1;
                    }
                    json.images = ''
                    var html = eval(json.projectHtml);
                    var projectHtm1 = {};
                    var title = '新页面' + (parseInt(html.length + 1))
                    projectHtm1['projectHtml'] = projectHtml1;
                    projectHtm1['id'] = time1;
                    projectHtm1['title'] = title;
                    html.push(projectHtm1);
                    json.projectHtml = JSON.stringify(html)

                    if (projectHtml1.indexOf('!doctype html') === -1) { //不包括 就添加
                        projectHtml1 = '<!doctype html><html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"> </head><body>' + projectHtml1 + '</body></body><html><html>';
                    }
                    fileFs(time, projectHtml1, projectStyle1); //文件创建生成URL地址

                    var style = eval(json.projectStyle);
                    var projectStyl1 = {};
                    projectStyl1['projectStyle'] = projectStyle1;
                    projectStyl1['id'] = time1;
                    projectStyl1['images'] = '';
                    projectStyl1['hUrl'] = url_path + '/api_service/template/' + time1;
                    projectStyl1['hThumb'] = '';
                    projectStyl1['hComponents'] = '';
                    projectStyl1['hStyle'] = '';
                    projectStyl1['hJS'] = '';

                    projectStyl1['projectdate'] = day;
                    style.push(projectStyl1);
                    json.projectStyle = JSON.stringify(style)

                    project1['projectHtml'] = projectHtml1;
                    project1['id'] = time1;
                    project1['title'] = title;
                    project1['projectStyle'] = projectStyle1;
                    project1['id'] = time1;
                    project1['images'] = '';
                    project1['hUrl'] = url_path + '/api_service/template/' + time1;
                    project1['hThumb'] = '';
                    project1['hComponents'] = '';
                    project1['hStyle'] = '';
                    project1['hJS'] = '';
                    project1['projectdate'] = day;

                    json.projectdate = day;
                    Project.update({
                        _id: json._id
                    }, {
                        projectName: json.projectName,
                        projectHtml: json.projectHtml,
                        projectStyle: json.projectStyle,
                        pThumb: json.pThumb,
                        isTemplate: json.isTemplate,
                        images: json.images,
                        type: json.type,
                        projectdate: json.projectdate,
                        projectstarttime: json.projectstarttime
                    }).then(function() {
                        responseData.code = '200';
                        responseData.message = '成功';
                        responseData.id = time1;
                        responseData.data = project1;
                        res.json(responseData);
                        return;
                    });
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 循环判断文件夹是否创建，文件是否存在 数据是否存入复制进去
 * @param {创建文件名} path1 
 * @param {文件html内容} contex1 
 * @param {文件css内容} contex2 
 */
function fileFs(path1, contex1, contex2) {
    var path11 = './api_service/template/';
    var path44 = './api_service/template';
    var path22 = path11 + path1.toString();
    var path33 = path22 + '/css';
    try {
        fs.exists(path44, function(exists) {
            if (exists) {
                fs.exists(path22, function(exists) {
                    if (exists) {
                        //写入内容
                        fs.exists(path33, function(exists) {
                            if (exists) {
                                fs.open(path22 + '/index.html', 'w+', function(err, fd) {
                                    fs.writeFile(path22 + '/index.html', contex1, function(err, written, buffer) {
                                        fs.open(path33 + '/style.css', 'w+', function(err, fd) {
                                            fs.writeFile(path33 + '/style.css', contex2, function(err, written, buffer) {
                                                let d = new Date();
                                                var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                                                fs.close(fd, function() {
                                                    console.log('close' + day.toString())
                                                })
                                            });
                                        });
                                        let d = new Date();
                                        var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                                        fs.close(fd, function() {
                                            console.log('close' + day.toString())
                                        })
                                    });
                                });
                            } else {
                                fs.mkdir(path33, { recursive: true }, (err) => {
                                    if (err) {
                                        return console.error(err);
                                    }
                                    fileFs(path1, contex1, contex2);
                                });
                            }
                        })
                    } else {
                        fs.mkdir(path22, { recursive: true }, (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            fileFs(path1, contex1, contex2);
                        });
                    }
                })
            } else {
                fs.mkdir(path44, { recursive: true }, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    fileFs(path1, contex1, contex2);
                });
            }
        })
    } catch (err) {
        console.error(err)
    }
}

/**
 * 编辑项目
 */
routerApiService.post('/api_project_edits', function(req, res) {
    var id = req.body.pId || ''
    var projectName1 = req.body.projectName || ''
    var projectHtml1 = req.body.projectHtml || ''
    var projectStyle1 = req.body.projectStyle || ''
    var pThumb1 = req.body.pThumb || ''
    var pThumbid = req.body.hId || ''
    var isTemplate1 = req.body.isTemplate || false
    var type1 = req.body.type || '-1'
    var hComponents1 = req.body.hComponents || '';
    var hStyle1 = req.body.hStyle || '';
    var hJS1 = req.body.hJS || '';
    var image = req.body.images;
    var bool = false;

    let d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    if (pThumbid === '') { //pid空
        Project.find().sort({ _id: -1 }).then(function(projects) {
            for (var i = 0; projects.length > i; i++) {
                var json = projects[i];
                if (json._id.toString() === id) {
                    bool = true;
                    if (projectName1 !== '') {
                        json.projectName = projectName1;
                    }
                    if (json.isTemplate.toString() !== isTemplate1.toString()) {
                        json.isTemplate = isTemplate1;
                    }
                    if (type1 !== '-1') {
                        json.type = type1;
                    }
                    if (image !== undefined) {
                        json.images = image;
                    }
                    json.projectdate = day;
                    Project.update({
                        _id: json._id
                    }, {
                        projectName: json.projectName,
                        projectHtml: json.projectHtml,
                        projectStyle: json.projectStyle,
                        pThumb: json.pThumb,
                        isTemplate: json.isTemplate,
                        images: json.images,
                        type: json.type,
                        projectdate: json.projectdate,
                        projectstarttime: json.projectstarttime
                    }).then(function() {
                        responseData.code = '200';
                        responseData.message = '成功';
                        responseData.id = id;
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    });
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    } else {
        Project.find().sort({ _id: -1 }).then(function(projects) {
            for (var i = 0; projects.length > i; i++) {
                var json = projects[i];
                if (json._id.toString() === id) {
                    bool = true;
                    if (projectName1 !== '') {
                        json.projectName = projectName1;
                    }
                    if (json.isTemplate.toString() !== isTemplate1.toString()) {
                        json.isTemplate = isTemplate1;
                    }
                    if (type1 !== '-1') {
                        json.type = type1;
                    }
                    if (image !== undefined) {
                        json.images = image;
                    }
                    if (pThumbid !== '') {
                        var html = eval(json.projectHtml);
                        for (var i = 0; html.length > i; i++) {
                            if (pThumbid === html[i].id.toString()) {
                                if (projectHtml1 !== '') {
                                    html[i].projectHtml = projectHtml1
                                } else {
                                    html[i].projectHtml = projectHtml1
                                }
                            }
                        }
                        if (projectHtml1.indexOf('!doctype html') === -1) { //不包括 就添加
                            projectHtml1 = '<!doctype html><html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"> </head><body>' + projectHtml1 + '</body></body><html><html>';
                        }
                        fileFs(pThumbid, projectHtml1, projectStyle1); //文件创建生成URL地址
                        var HTML_url = url_path + '/api_service/template/' + pThumbid
                        json.projectHtml = JSON.stringify(html)
                        var style = eval(json.projectStyle);
                        for (var j = 0; style.length > j; j++) {
                            if (pThumbid === style[j].id.toString()) {
                                if (projectStyle1 !== '') {
                                    style[j].projectStyle = projectStyle1;
                                }
                                style[j].projectdate = day;
                                style[j].hUrl = HTML_url;
                                style[j].hComponents = hComponents1;
                                style[j].hStyle = hStyle1;
                                style[j].hJS = hJS1;
                            }
                        }
                        json.projectStyle = JSON.stringify(style)

                    }
                    json.projectdate = day;
                    Project.update({
                        _id: json._id
                    }, {
                        projectName: json.projectName,
                        projectHtml: json.projectHtml,
                        projectStyle: json.projectStyle,
                        pThumb: json.pThumb,
                        isTemplate: json.isTemplate,
                        images: json.images,
                        type: json.type,
                        projectdate: json.projectdate,
                        projectstarttime: json.projectstarttime
                    }).then(function() {
                        responseData.code = '200';
                        responseData.message = '成功';
                        responseData.id = id;
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    });
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }

});

/**
 * 编辑Project  //有问题
 */
routerApiService.post('/api_project_edit', function(req, res, next) {

    const form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    var pathjing = '/api_service/image/';
    var pathname = './api_service/image/';

    form.uploadDir = pathname;
    let d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    form.parse(req, function(err, fields, files) {
        if (err) {
            responseData.code = '100';
            responseData.message = err.toString();
            responseData.id = '';
            responseData.data = '';
            res.json(responseData);
            return;
        }
        var id = fields.pId || ''
        var projectName1 = fields.projectName || ''
        var projectHtml1 = fields.projectHtml || ''
        var projectStyle1 = fields.projectStyle || ''
        var pThumb1 = fields.pThumb || ''
        var pThumbid = fields.hId || ''
        var isTemplate1 = fields.isTemplate || false
        var type1 = fields.type || '-1'
        var hComponents1 = fields.hComponents || '';
        var hStyle1 = fields.hStyle || '';
        var hJS1 = fields.hJS || '';
        if (JSON.stringify(files) !== '{}') {
            var filename = files.pThumb.name;
            fs.rename(files.pThumb.path, pathname + filename, function(err) {
                if (err) {
                    responseData.code = '100';
                    responseData.message = '上传文件失败！';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                    return;
                }
                if (id === null || id === undefined || id === '') {
                    responseData.code = '100';
                    responseData.message = 'id不存在';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                    return;
                } else {
                    var bool = false;
                    if (pThumbid === '') { //pid空
                        Project.find().sort({ _id: -1 }).then(function(projects) {
                            for (var i = 0; projects.length > i; i++) {
                                var json = projects[i];
                                if (json._id.toString() === id) {
                                    bool = true;
                                    if (projectName1 !== '') {
                                        json.projectName = projectName1;
                                    }
                                    if (json.isTemplate.toString() !== isTemplate1.toString()) {
                                        json.isTemplate = isTemplate1;
                                    }
                                    if (type1 !== '-1') {
                                        json.type = type1;
                                    }
                                    json.images = url_path + pathjing + filename
                                    json.projectdate = day;
                                    Project.update({
                                        _id: json._id
                                    }, {
                                        projectName: json.projectName,
                                        projectHtml: json.projectHtml,
                                        projectStyle: json.projectStyle,
                                        pThumb: json.pThumb,
                                        isTemplate: json.isTemplate,
                                        images: json.images,
                                        type: json.type,
                                        projectdate: json.projectdate,
                                        projectstarttime: json.projectstarttime
                                    }).then(function() {
                                        responseData.code = '200';
                                        responseData.message = '成功';
                                        responseData.id = id;
                                        responseData.data = '';
                                        res.json(responseData);
                                        return;
                                    });
                                }
                            }
                            if (!bool) {
                                responseData.code = '101';
                                responseData.message = 'id不存在';
                                responseData.id = '';
                                responseData.data = '';
                                res.json(responseData);
                                return;
                            }
                        });
                    } else {
                        Project.find().sort({ _id: -1 }).then(function(projects) {
                            for (var i = 0; projects.length > i; i++) {
                                var json = projects[i];
                                if (json._id.toString() === id) {
                                    bool = true;
                                    if (projectName1 !== '') {
                                        json.projectName = projectName1;
                                    }
                                    if (json.isTemplate.toString() !== isTemplate1.toString()) {
                                        json.isTemplate = isTemplate1;
                                    }
                                    if (type1 !== '-1') {
                                        json.type = type1;
                                    }
                                    if (pThumbid != '') {
                                        var html = eval(json.projectHtml);
                                        for (var i = 0; html.length > i; i++) {
                                            if (pThumbid === html[i].id.toString()) {
                                                if (projectHtml1 !== '') {
                                                    // if (html[i].projectHtml.indexOf('<script') !== -1) { //包括
                                                    //     var projectHs = html[i].projectHtml.split('<script');
                                                    //     for (var j = 0; projectHs.length > j; j++) {
                                                    //         if (projectHs[j].indexOf('document.querySelectorAll') !== -1) {
                                                    //             var projes = projectHs[j].split('querySelectorAll(');
                                                    //             var projes1s = projes[1].split(")")
                                                    //             if (projectHtml1.indexOf('querySelectorAll(') !== -1) {
                                                    //                 var projectHtms = projectHtml1.split('querySelectorAll(');
                                                    //                 var projes11s = projectHtms[1].split(")")
                                                    //                 if (projes1s[0] !== projes11s[0]) {
                                                    //                     projectHtml1 = projectHtml1 + '<script' + projectHs[j]
                                                    //                 }
                                                    //             } else {
                                                    //                 projectHtml1 = projectHtml1 + '<script' + projectHs[j]
                                                    //             }
                                                    //         }
                                                    //     }
                                                    //     html[i].projectHtml = projectHtml1
                                                    //     projectHtml1 = projectHtml1
                                                    // } else { //不包括
                                                    html[i].projectHtml = projectHtml1
                                                        // }
                                                } else {
                                                    html[i].projectHtml = projectHtml1
                                                }
                                            }
                                        }
                                        if (projectHtml1.indexOf('!doctype html') === -1) { //不包括就添加
                                            projectHtml1 = '<!doctype html><html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"> </head><body>' + projectHtml1 + '</body></body><html><html>';
                                        }
                                        fileFs(pThumbid, projectHtml1, projectStyle1); //文件创建生成URL地址
                                        var HTML_url = url_path + '/api_service/template/' + pThumbid

                                        json.projectHtml = JSON.stringify(html);
                                        var style = eval(json.projectStyle);
                                        for (var j = 0; style.length > j; j++) {
                                            if (pThumbid === style[j].id.toString()) {
                                                if (projectStyle1 !== '') {
                                                    style[j].projectStyle = projectStyle1;
                                                }
                                                style[j].projectdate = day;
                                                style[j].images = url_path + pathjing + filename;
                                                style[j].hUrl = HTML_url;
                                                style[j].hComponents = hComponents1;
                                                style[j].hStyle = hStyle1;
                                                style[j].hJS = hJS1;
                                            }
                                        }
                                        json.projectStyle = JSON.stringify(style)

                                    }
                                    json.projectdate = day;
                                    Project.update({
                                        _id: json._id
                                    }, {
                                        projectName: json.projectName,
                                        projectHtml: json.projectHtml,
                                        projectStyle: json.projectStyle,
                                        pThumb: json.pThumb,
                                        isTemplate: json.isTemplate,
                                        images: json.images,
                                        type: json.type,
                                        projectdate: json.projectdate,
                                        projectstarttime: json.projectstarttime
                                    }).then(function() {
                                        responseData.code = '200';
                                        responseData.message = '成功';
                                        responseData.id = id;
                                        responseData.data = '';
                                        res.json(responseData);
                                        return;
                                    });
                                }
                            }
                            if (!bool) {
                                responseData.code = '101';
                                responseData.message = 'id不存在';
                                responseData.id = '';
                                responseData.data = '';
                                res.json(responseData);
                                return;
                            }
                        });
                    }
                }
            });
        } else {
            var bool = false;
            if (pThumbid === '') { //pid空
                Project.find().sort({ _id: -1 }).then(function(projects) {
                    for (var i = 0; projects.length > i; i++) {
                        var json = projects[i];
                        if (json._id.toString() === id) {
                            bool = true;
                            if (projectName1 !== '') {
                                json.projectName = projectName1;
                            }
                            if (json.isTemplate.toString() !== isTemplate1.toString()) {
                                json.isTemplate = isTemplate1;
                            }
                            if (type1 !== '-1') {
                                json.type = type1;
                            }
                            json.projectdate = day;
                            Project.update({
                                _id: json._id
                            }, {
                                projectName: json.projectName,
                                projectHtml: json.projectHtml,
                                projectStyle: json.projectStyle,
                                pThumb: json.pThumb,
                                isTemplate: json.isTemplate,
                                images: json.images,
                                type: json.type,
                                projectdate: json.projectdate,
                                projectstarttime: json.projectstarttime
                            }).then(function() {
                                responseData.code = '200';
                                responseData.message = '成功';
                                responseData.id = id;
                                responseData.data = '';
                                res.json(responseData);
                                return;
                            });
                        }
                    }
                    if (!bool) {
                        responseData.code = '101';
                        responseData.message = 'id不存在';
                        responseData.id = '';
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    }
                });
            } else {
                Project.find().sort({ _id: -1 }).then(function(projects) {
                    for (var i = 0; projects.length > i; i++) {
                        var json = projects[i];
                        if (json._id.toString() === id) {
                            bool = true;
                            if (projectName1 !== '') {
                                json.projectName = projectName1;
                            }
                            if (json.isTemplate.toString() !== isTemplate1.toString()) {
                                json.isTemplate = isTemplate1;
                            }
                            if (type1 !== '-1') {
                                json.type = type1;
                            }
                            if (pThumbid !== '') {
                                var html = eval(json.projectHtml);
                                for (var i = 0; html.length > i; i++) {
                                    if (pThumbid === html[i].id.toString()) {
                                        if (projectHtml1 !== '') {
                                            //     if (html[i].projectHtml.indexOf('<script') !== -1) { //包括
                                            //         var projectHs = html[i].projectHtml.split('<script');
                                            //         for (var j = 0; projectHs.length > j; j++) {
                                            //             if (projectHs[j].indexOf('document.querySelectorAll') !== -1) {
                                            //                 var projes = projectHs[j].split('querySelectorAll(');
                                            //                 var projes1s = projes[1].split(")")
                                            //                 if (projectHtml1.indexOf('querySelectorAll(') !== -1) {
                                            //                     var projectHtms = projectHtml1.split('querySelectorAll(');
                                            //                     var projes11s = projectHtms[1].split(")")
                                            //                     if (projes1s[0] !== projes11s[0]) {
                                            //                         projectHtml1 = projectHtml1 + '<script' + projectHs[j]
                                            //                     }
                                            //                 } else {
                                            //                     projectHtml1 = projectHtml1 + '<script' + projectHs[j]
                                            //                 }
                                            //             }
                                            //         }
                                            html[i].projectHtml = projectHtml1
                                                //         projectHtml1 = projectHtml1
                                                //     } else { //不包括
                                                //         html[i].projectHtml = projectHtml1
                                                //     }
                                        } else {
                                            html[i].projectHtml = projectHtml1
                                        }
                                    }
                                }
                                if (projectHtml1.indexOf('!doctype html') === -1) { //不包括 就添加
                                    projectHtml1 = '<!doctype html><html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"> </head><body>' + projectHtml1 + '</body></body><html><html>';
                                }
                                fileFs(pThumbid, projectHtml1, projectStyle1); //文件创建生成URL地址
                                var HTML_url = url_path + '/api_service/template/' + pThumbid
                                json.projectHtml = JSON.stringify(html)
                                var style = eval(json.projectStyle);
                                for (var j = 0; style.length > j; j++) {
                                    if (pThumbid === style[j].id.toString()) {
                                        if (projectStyle1 !== '') {
                                            style[j].projectStyle = projectStyle1;
                                        }
                                        style[j].projectdate = day;
                                        style[j].hUrl = HTML_url;
                                        style[j].hComponents = hComponents1;
                                        style[j].hStyle = hStyle1;
                                        style[j].hJS = hJS1;
                                    }
                                }
                                json.projectStyle = JSON.stringify(style)

                            }
                            json.projectdate = day;
                            Project.update({
                                _id: json._id
                            }, {
                                projectName: json.projectName,
                                projectHtml: json.projectHtml,
                                projectStyle: json.projectStyle,
                                pThumb: json.pThumb,
                                isTemplate: json.isTemplate,
                                images: json.images,
                                type: json.type,
                                projectdate: json.projectdate,
                                projectstarttime: json.projectstarttime
                            }).then(function() {
                                responseData.code = '200';
                                responseData.message = '成功';
                                responseData.id = id;
                                responseData.data = '';
                                res.json(responseData);
                                return;
                            });
                        }
                    }
                    if (!bool) {
                        responseData.code = '101';
                        responseData.message = 'id不存在';
                        responseData.id = '';
                        responseData.data = '';
                        res.json(responseData);
                        return;
                    }
                });
            }
        }
    });
});

/**
 * 获取单个 项目
 */
routerApiService.post('/api_project_one', function(req, res, next) {
    var id = req.body.pId || ''
    if (id === null || id === undefined || id === '') {
        responseData.code = '100';
        responseData.message = 'id不存在';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        var bool = false;
        Project.find().sort({ _id: -1 }).then(function(projects) {
            for (var i = 0; projects.length > i; i++) {
                var json = projects[i];
                if (json._id.toString() === id) {
                    bool = true;
                    responseData.code = '200';
                    responseData.message = '成功';
                    responseData.id = id;
                    responseData.data = json;
                    res.json(responseData);
                    return;
                }
            }
            if (!bool) {
                responseData.code = '101';
                responseData.message = 'id不存在';
                responseData.id = '';
                responseData.data = '';
                res.json(responseData);
                return;
            }
        });
    }
});

/**
 * 复制单个页面和项目组
 */
routerApiService.post('/api_project_copy', function(req, res, next) {
    var pId = req.body.pId || '';
    var id = req.body.hId || '';
    if (pId === null || pId === undefined || pId === '') {
        responseData.code = '100';
        responseData.message = 'id不存在';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
        return;
    } else {
        let d = new Date();
        var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var bool = false;
        if (id.toString() === 'null' || id.toString() === 'undefined' || id.toString() === '') {
            Project.find().sort({ _id: -1 }).then(function(projects) {
                for (var i = 0; projects.length > i; i++) {
                    var json = projects[i];
                    if (json._id.toString() === pId) {
                        bool = true;
                        var html = eval(json.projectHtml);
                        var style = eval(json.projectStyle);
                        var projectH = [];
                        var projectS = [];

                        for (var j = 0; html.length > j; j++) {

                            var projectHtml = '';
                            var projectHtm1 = {};
                            var projectStyl1 = {};
                            var time = (Math.floor(Date.now()) + random(10)).toString();
                            time = md5(time).toString()

                            projectHtml = html[j].projectHtml;
                            projectHtm1['projectHtml'] = html[j].projectHtml;
                            projectHtm1['id'] = time;
                            projectHtm1['title'] = html[j].title;
                            projectH.push(projectHtm1);

                            if (projectHtml.indexOf('!doctype html') === -1) { //不包括 就添加
                                projectHtml = '<!doctype html><html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"> </head><body>' + projectHtml + '</body></body><html><html>';
                            }
                            fileFs(time, projectHtml, style[j].projectStyle); //文件创建生成URL地址
                            projectStyl1['projectStyle'] = style[j].projectStyle;
                            projectStyl1['id'] = time;
                            projectStyl1['images'] = style[j].images;
                            projectStyl1['hUrl'] = url_path + '/api_service/template/' + time;
                            projectStyl1['hThumb'] = style[j].hThumb;
                            projectStyl1['hComponents'] = style[j].hComponents;
                            projectStyl1['hStyle'] = style[j].hStyle;
                            projectStyl1['hJS'] = style[j].hJS;

                            projectStyl1['projectdate'] = day;
                            projectS.push(projectStyl1);

                        }
                        json.projectHtml = JSON.stringify(projectH)
                        json.projectStyle = JSON.stringify(projectS)

                        var project = new Project({
                            projectName: json.projectName,
                            projectHtml: json.projectHtml,
                            projectStyle: json.projectStyle,
                            pThumb: json.pThumb,
                            isTemplate: json.isTemplate,
                            images: json.images,
                            type: json.type,
                            projectdate: day,
                            projectstarttime: day //excel 开始时间
                        });
                        project.save().then(function(projects) {
                            responseData.code = '200';
                            responseData.message = '创建成功';
                            responseData.id = time;
                            responseData.data = projects;
                            res.json(responseData);
                            return;
                        });
                    }
                }
                if (!bool) {
                    responseData.code = '101';
                    responseData.message = 'id不存在';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                    return;
                }
            });
        } else {
            Project.find().sort({ _id: -1 }).then(function(projects) {
                for (var i = 0; projects.length > i; i++) {
                    var json = projects[i];
                    if (json._id.toString() === pId) {
                        bool = true;
                        var html = eval(json.projectHtml);
                        var style = eval(json.projectStyle);
                        var projectHtm1 = {};
                        var projectStyl1 = {};
                        var project = {};
                        for (var j = 0; html.length > j; j++) {

                            var time = (Math.floor(Date.now()) + random(10)).toString();
                            time = md5(time).toString()

                            var projectHtml = '';
                            if (html[j].id.toString() === id.toString()) {
                                projectHtml = html[j].projectHtml;
                                projectHtm1['projectHtml'] = html[j].projectHtml;
                                projectHtm1['id'] = time;
                                projectHtm1['title'] = '新页面' + (parseInt(html.length + 1));
                                html.push(projectHtm1);

                                project['projectHtml'] = html[j].projectHtml;
                                project['id'] = time;
                                project['title'] = '新页面' + (parseInt(html.length + 1));
                            }
                            if (style[j].id.toString() === id.toString()) {
                                if (projectHtml.indexOf('!doctype html') === -1) { //不包括 就添加
                                    projectHtml = '<!doctype html><html lang="en"> <head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"> </head><body>' + projectHtml + '</body></body><html><html>';
                                }
                                fileFs(time, projectHtml, style[j].projectStyle); //文件创建生成URL地址
                                projectStyl1['projectStyle'] = style[j].projectStyle;
                                projectStyl1['id'] = time;
                                projectStyl1['images'] = style[j].images;
                                projectStyl1['hUrl'] = url_path + '/api_service/template/' + time;
                                projectStyl1['hThumb'] = style[j].hThumb;
                                projectStyl1['hComponents'] = style[j].hComponents;
                                projectStyl1['hStyle'] = style[j].hStyle;
                                projectStyl1['hJS'] = style[j].hJS;

                                projectStyl1['projectdate'] = day;
                                style.push(projectStyl1);

                                project['projectStyle'] = style[j].projectStyle;
                                project['id'] = time;
                                project['images'] = style[j].images;
                                project['hUrl'] = url_path + '/api_service/template/' + time;
                                project['hThumb'] = style[j].hThumb;
                                project['hComponents'] = style[j].hComponents;
                                project['hStyle'] = style[j].hStyle;
                                project['hJS'] = style[j].hJS;
                                project['projectdate'] = day;
                            }

                        }
                        json.projectHtml = JSON.stringify(html)
                        json.projectStyle = JSON.stringify(style)

                        json.projectdate = day;
                        Project.update({
                            _id: json._id
                        }, {
                            projectName: json.projectName,
                            projectHtml: json.projectHtml,
                            projectStyle: json.projectStyle,
                            pThumb: json.pThumb,
                            isTemplate: json.isTemplate,
                            images: json.images,
                            type: json.type,
                            projectdate: json.projectdate,
                            projectstarttime: json.projectstarttime
                        }).then(function() {
                            responseData.code = '200';
                            responseData.message = '成功';
                            responseData.id = '';
                            responseData.data = project;
                            res.json(responseData);
                            return;
                        });
                    }
                }
                if (!bool) {
                    responseData.code = '101';
                    responseData.message = 'id不存在';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                    return;
                }
            });
        }
    }
});

/**
 * 删除项目
 */
routerApiService.post('/delete_all', function(req, res, next) {
    var type1 = req.body.type || '';
    var id = req.body.id || '';
    var pId1 = req.body.pId || '';
    if (type1 === '') {
        responseData.code = '101';
        responseData.message = 'id不存在';
        responseData.id = '';
        responseData.data = '';
        res.json(responseData);
    } else {
        switch (type1) {
            case 'word':
                Fileword.remove({
                    _id: id
                }).then(function() {
                    responseData.code = '200';
                    responseData.message = '删除Word成功';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                });
                break;
            case 'excel':
                Fileexcel.remove({
                    _id: id
                }).then(function() {
                    responseData.code = '200';
                    responseData.message = '删除Excel成功';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                });
                break;
            case 'pdf':
                Filepdf.remove({
                    _id: id
                }).then(function() {
                    responseData.code = '200';
                    responseData.message = '删除Pdf成功';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                });
                break;
            case 'ppt':
                Fileppt.remove({
                    _id: id
                }).then(function() {
                    responseData.code = '200';
                    responseData.message = '删除PPt成功';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                });
                break;
            case 'id':
                if (pId1 !== '' && id.toString() !== '') {
                    Project.find().sort({ _id: -1 }).then(function(projects) {
                        for (var i = 0; projects.length > i; i++) {
                            var json = projects[i];
                            if (json._id.toString() === pId1) {
                                var jsonhtml = eval(json.projectHtml);
                                var jsonstyle = eval(json.projectStyle);
                                var jsonhtml2 = [];
                                for (var j = 0; jsonhtml.length > j; j++) {
                                    var jsonht = jsonhtml[j];
                                    if (jsonht.id !== id) {
                                        jsonhtml2.push(jsonht);
                                    }
                                }
                                json.projectHtml = JSON.stringify(jsonhtml2)
                                var jsonstyle2 = [];
                                for (var j = 0; jsonstyle.length > j; j++) {
                                    var jsonsty = jsonstyle[j];
                                    if (jsonsty.id !== id) {
                                        jsonstyle2.push(jsonsty)
                                    }
                                }
                                var namepath = './api_service/template/'
                                const files = fs.readdirSync(namepath)
                                files.forEach(function(item, index) {
                                    let stat = fs.lstatSync(namepath + item)
                                    if (stat.isDirectory() === true) {
                                        if (id === item) {
                                            delFile(namepath + id, namepath)
                                        }
                                    }
                                })
                                json.projectStyle = JSON.stringify(jsonstyle2)
                                Project.update({
                                    _id: json._id
                                }, {
                                    projectName: json.projectName,
                                    projectHtml: json.projectHtml,
                                    projectStyle: json.projectStyle,
                                    pThumb: json.pThumb,
                                    isTemplate: json.isTemplate,
                                    images: json.images,
                                    type: json.type,
                                    projectdate: json.projectdate,
                                    projectstarttime: json.projectstarttime
                                }).then(function() {
                                    responseData.code = '200';
                                    responseData.message = '成功';
                                    responseData.id = id;
                                    responseData.data = '';
                                    res.json(responseData);
                                    return;
                                });
                            }
                        }
                    });
                } else if (pId1 !== '' && id.toString() === '') {
                    Project.find().sort({ _id: -1 }).then(function(projects) {
                        for (var i = 0; projects.length > i; i++) {
                            var json = projects[i];
                            if (json._id.toString() === pId1) {
                                var style = eval(json.projectStyle);
                                for (var j = 0; style.length > j; j++) {

                                    var namepath = './api_service/template/'
                                    const files = fs.readdirSync(namepath)
                                    files.forEach(function(item, index) {
                                        let stat = fs.lstatSync(namepath + item)
                                        if (stat.isDirectory() === true) {
                                            if (style[j].id.toString() === item) {
                                                delFile(namepath + style[j].id, namepath)
                                            }
                                        }
                                    })
                                }
                            }
                        }
                        Project.remove({
                            _id: pId1
                        }).then(function() {
                            responseData.code = '200';
                            responseData.message = '删除项目成功';
                            responseData.id = '';
                            responseData.data = '';
                            res.json(responseData);
                        });
                    });
                } else {
                    responseData.code = '101';
                    responseData.message = 'id不存在';
                    responseData.id = '';
                    responseData.data = '';
                    res.json(responseData);
                    return;
                }
                break;
        }
    }
});

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
                fs.unlinkSync(path);
            }
        } else {
            fs.unlinkSync(path);
        }
    }
}

/**
 * saveOldHtmlOne
 * @api {POST} /api_service/saveOldHtmlOne saveOldHtmlOne
 * @apiDescription 创建数据库和数据
 * @apiName saveOldHtmlOne
 * @apiParam {String} pId    id
 * @apiParam {String} hId    子id
 * @apiParam {String} html    内容
 * @apiSampleRequest /api_service/saveOldHtmlOne
 * @apiGroup api_service  接口
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
routerApiService.post('/saveOldHtmlOne', function(req, res) {
    var pId = req.body.pId;
    var hId = req.body.hId;
    var html = req.body.html;
    console.log('pId==:' + pId + '==hId==:' + hId + '==html==:' + html);
    if (pId !== '') {
        let d = new Date();
        var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        if (hId !== '') {
            var ProjectHtmls = new ProjectHtml({
                pId: pId,
                html: html,
                hId: hId,
                datetime: day,
                starttime: day
            });
            ProjectHtmls.save().then(function(projecthtmls) {
                responseData.code = '200';
                responseData.message = '创建成功';
                responseData.id = pId;
                responseData.data = html;
                return res.json(responseData);
            });
        } else {
            ProjectHtml.find().sort({ _id: -1 }).then(function(projecthtmls) {
                if (projecthtmls.length > 0) {
                    for (var i = 0; projecthtmls.length > i; i++) {
                        var json = projecthtmls[i];
                        if (pId === json.pId) {
                            json.html = html;
                            json.hId = hId;
                            json.datetime = day;
                            ProjectHtml.update({
                                _id: json._id
                            }, {
                                pId: json.pId,
                                html: json.html,
                                hId: json.hId,
                                datetime: json.datetime,
                                starttime: json.starttime
                            }).then(function() {
                                responseData.code = '200';
                                responseData.message = '成功';
                                responseData.id = json.pId;
                                responseData.data = json.html;
                                return res.json(responseData);
                            });
                        }
                    }
                } else {
                    responseData.code = '100';
                    responseData.message = '没有数据';
                    responseData.data = '';
                    return res.json(responseData);
                }
            });
        }
    } else {
        responseData.code = '100';
        responseData.message = 'pid不存在';
        responseData.data = '';
        return res.json(responseData);
    }
})

/**
 * getOldHtmlOne
 * @api {POST} /api_service/getOldHtmlOne getOldHtmlOne
 * @apiDescription 获取数据
 * @apiName getOldHtmlOne
 * @apiParam {String} pId    id
 * @apiParam {String} hId    子id
 * @apiSampleRequest /api_service/getOldHtmlOne
 * @apiGroup api_service  接口
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
routerApiService.post('/getOldHtmlOne', function(req, res) {
    var pId = req.body.pId;
    var hId = req.body.hId;
    console.log('pId==:' + pId + '==hId==:' + hId);
    if (pId !== '') {
        let d = new Date();
        var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        if (hId !== '') {
            ProjectHtml.find().sort({ _id: -1 }).then(function(projecthtmls) {
                if (projecthtmls.length > 0) {
                    for (var i = 0; projecthtmls.length > i; i++) {
                        var json = projecthtmls[i];
                        if (pId === json.pId && hId === json.hId) {
                            json.hId = pId;
                            json.datetime = day;
                            ProjectHtml.update({
                                _id: json._id
                            }, {
                                pId: json.pId,
                                html: json.html,
                                hId: json.hId,
                                datetime: json.datetime,
                                starttime: json.starttime
                            }).then(function() {
                                responseData.code = '200';
                                responseData.message = '成功';
                                responseData.id = json.pId;
                                responseData.data = json.html;
                                return res.json(responseData);
                            });

                        }
                    }
                } else {
                    responseData.code = '100';
                    responseData.message = 'pid不存在';
                    responseData.data = '';
                    return res.json(responseData);
                }
            });
        } else {
            ProjectHtml.find().sort({ _id: -1 }).then(function(projecthtmls) {
                for (var i = 0; projecthtmls.length > i; i++) {
                    var json = projecthtmls[i];
                    if (pId === json.pId) {
                        json.html = html;
                        json.hId = pId;
                        json.datetime = day;
                        ProjectHtml.update({
                            _id: json._id
                        }, {
                            pId: json.pId,
                            html: json.html,
                            hId: json.hId,
                            datetime: json.datetime,
                            starttime: json.starttime
                        }).then(function() {
                            responseData.code = '200';
                            responseData.message = '成功';
                            responseData.id = json.pId;
                            responseData.data = json.html;
                            return res.json(responseData);
                        });
                    }
                }
            });
        }
    }
})

/**
 * 上传文件
 * @api {POST} /api_service/api_project_filepath 上传文件
 * @apiDescription 上传文件
 * @apiName api_project_filepath
 * @apiParam {String} pId    id
 * @apiParam {String} hId    子id
 * @apiSampleRequest /api_service/api_project_filepath
 * @apiGroup api_service  接口
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
routerApiService.post('/api_project_filepath', function(req, res) {

    //url_path
    const form1 = new formidable.IncomingForm();
    //设置编辑
    form1.encoding = 'utf-8';
    //设置文件存储路径
    var pathjing = '/api_service/image/web/';

    let d = new Date();
    var day = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();
    var pathname = './api_service/image/web/'; //地址不应该是这个
    form1.uploadDir = pathname;

    form1.parse(req, async function(err, fields, files) {
        if (err) {
            responseData.code = '100';
            responseData.message = err.toString();
            responseData.id = '';
            responseData.data = '';
            return res.json(responseData);
        }
        // var fieldspId = fields.pId;
        var zong = pathname + '/';
        // await fileFlie(pathname + fieldspId + '/');
        var filename = files['files[]'].name;
        var spte = filename.split('.');

        fs.rename(files['files[]'].path, zong + day + '.' + spte[1], function(err) {
            if (err) {
                responseData.code = '100';
                responseData.message = '上传文件失败！';
                responseData.id = '';
                responseData.data = '';
                return res.json(responseData);
            }
            var arr = new Array();
            arr[0] = url_path + pathjing + day + '.' + spte[1];
            try {
                fs.unlink(files['files[]'].path, function() {})
            } catch (err) {
                console.log(err)
            }
            responseData.code = '200';
            responseData.message = '';
            responseData.id = '';
            responseData.data = arr;
            return res.json(responseData);
        });

    });
});
/**
 * 循环判断文件夹是否创建，文件是否存在 数据是否存入复制进去
 * @param {创建文件名} path1 
 * @param {文件html内容} contex1 
 * @param {文件css内容} contex2 
 */
async function fileFlie(path1) {
    try {
        await fs.exists(path1, function(exists) {
            if (exists) {
                return true;
            } else {
                fs.mkdir(path1, { recursive: true }, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    fileFlie(path1);
                });
            }
        })
    } catch (err) {
        console.error(err)
    }
}
/**
 * 图片文件列表
 * @api {POST} /api_service/api_project_pathlist 图片文件列表
 * @apiDescription 图片文件列表
 * @apiName api_project_pathlist
 * @apiParam {String} pId    id
 * @apiParam {String} hId    子id
 * @apiSampleRequest /api_service/api_project_pathlist
 * @apiGroup api_service  接口
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
routerApiService.post('/api_project_pathlist', function(req, res) {

    //获取文件夹下的所有图片
    let tmp = []
    let HtmlPages = [] // 获取css文件夹下的所有html文件
    const files = fs.readdirSync('./api_service/image/web/')
    files.forEach(function(item, index) {
        // 压缩或者bese文件是没有相对应的页面的,这里做排除
        if (item.indexOf('.css') == -1) {
            tmp.push(item)
        }
    })
    var dataa = new Array(tmp.length);
    HtmlPages = tmp.map(function(item, index, input) {
        dataa[index] = url_path + '/api_service/image/web/' + item
    })
    responseData.code = '200';
    responseData.message = '';
    responseData.id = '';
    responseData.data = dataa;
    return res.json(responseData);
})

/**
 * 删除单张图片
 * @api {POST} /api_service/api_project_pathUrl 删除单张图片
 * @apiDescription 删除单张图片
 * @apiName api_project_pathUrl
 * @apiParam {String} pId    id
 * @apiParam {String} hId    子id
 * @apiSampleRequest /api_service/api_project_pathUrl
 * @apiGroup api_service  接口
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
routerApiService.post('/api_project_pathUrl', function(req, res) {
    var imagenpId = req.body.url
    if (imagenpId !== '' || imagenpId !== undefined || imagenpId !== null) {
        var urls = imagenpId.split('/');
        var namepath = './api_service/image/web/';
        const files = fs.readdirSync(namepath)
        files.forEach(function(item, index) {
            if (item === urls[urls.length - 1]) {
                try {
                    fs.unlink(namepath + item, function() {
                        responseData.code = '200';
                        responseData.message = '删除成功';
                        responseData.id = '';
                        responseData.data = '';
                        return res.json(responseData);
                    })
                } catch (err) {
                    console.log(err.toString())
                }
            }
        })
    } else {
        responseData.code = '100';
        responseData.message = '删除失败';
        responseData.id = '';
        responseData.data = '';
        return res.json(responseData);
    }
})

/**
 * 上传web-modle 模型
 * @api {POST} /api_service/api_project_modle 上传web-modle 模型
 * @apiDescription 上传web-modle 模型
 * @apiName api_project_modle
 * @apiParam {String} pId    id
 * @apiParam {String} hId    子id
 * @apiSampleRequest /api_service/api_project_modle
 * @apiGroup api_service  接口
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */

var url = url_path + '/api_service/Web-UnityModel/'
routerApiService.post("/api_project_modle", async function(req, res) {
    //url_path
    const form1 = new formidable.IncomingForm();
    //设置编辑
    form1.encoding = 'utf-8';
    //设置文件存储路径
    let d = new Date();
    var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var pathname = './api_service/Web-UnityModel/'; //地址不应该是这个
    form1.uploadDir = pathname;

    form1.parse(req, function(err, fields, files) {
        if (err) {
            responseData.code = '100';
            responseData.message = err.toString();
            responseData.data = '';
            return res.json(responseData);
        }
        if (fields !== {}) {
            var type = fields.type;
            var pId = fields.pId;
            if (type === '1') { //拉去文件
                var name = files.file.name;
                var names = name.split('.zip');
                fs.rename(files.file.path, pathname + name, async function(err) {
                    await compressing.zip.uncompress(pathname + name, pathname + names[0] + '/').then(() => {
                        var webmodel = new WebModel({
                            pid: pId,
                            starttime: day,
                            endtime: day,
                            imagemodle: url + names[0]
                        });
                        webmodel.save().then(function(Webmodels) {
                            responseData.code = '200';
                            responseData.message = '上传成功';
                            responseData.data = Webmodels;
                            return res.json(responseData);
                        });
                    }).catch(err => {
                        console.log(err);
                        responseData.code = '100';
                        responseData.message = '上传失败';
                        responseData.data = '';
                        return res.json(responseData);
                    });
                });
            } else {
                var filebool = false;
                Webmodel.find().sort({ _id: -1 }).then(function(Webmodels) {
                    for (var i = 0; Webmodels.length > i; i++) {
                        var json = JSON.parse(JSON.stringify(Webmodels[i]));
                        if (pId === json.pid) {
                            filebool = true;
                            ProjectHtml.update({
                                _id: json._id
                            }, {
                                pid: json.pid,
                                starttime: json.starttime,
                                endtime: day,
                                imagemodle: json.imagemodle
                            }).then(function() {
                                responseData.code = '200';
                                responseData.message = '拉去成功';
                                responseData.data = json;
                                return res.json(responseData);
                            });
                        }
                    }
                    if (!filebool) {
                        responseData.code = '100';
                        responseData.message = '拉去失败';
                        responseData.data = '';
                        return res.json(responseData);
                    }
                });
            }
        } else {
            responseData.code = '100';
            responseData.message = '上传失败';
            responseData.data = '';
            return res.json(responseData);
        }
    });
});

function scheduleRecurrenceRule() {

    var rule = new schedule.RecurrenceRule();
    rule.second = 0;

    schedule.scheduleJob('30 31 24 * * *', function() {
        console.log('scheduleRecurrenceRule:' + new Date());
        TimedCrawler1(1);
    });
}

scheduleRecurrenceRule();

routerApiService.post('/pexels', function(req, res) {

    //Get Curated Photos
    pexelsClient.getCuratedPhotos(80, 1)
        .then(function(result) {
            responseData.code = 200
            responseData.data = result;
            return res.json(responseData);

        }).catch(function(e) {
            console.log(e);
            responseData.code = 100
            responseData.message = JSON.stringify(e);
            return res.json(responseData);
        });

});

function TimedCrawler1(type) {
    pexelsClient.getCuratedPhotos(80, type)
        .then(function(result) {
            var json = result.photos;
            pec.find().sort({ _id: -1 }).then(function(pecs) {
                if (pecs.length > 0) {
                    var data1 = [];
                    for (var i = 0; json.length > i; i++) {
                        var jsonbj = json[i];
                        if (pecs.indexOf(jsonbj.id) === -1) {
                            data1.push(jsonbj);
                        }
                    }

                    if (data1.length > 0) {
                        var next_page = '';
                        if (result.hasOwnProperty("next_page")) {
                            next_page = result.next_page;
                        }
                        datajson(data1, next_page);
                    }
                } else {
                    var next_page = '';
                    if (result.hasOwnProperty("next_page")) {
                        next_page = result.next_page;
                    }
                    datajson(json, next_page);
                }
            });
        }).catch(function(e) {
            console.log(e);
            TimedCrawler1(type);
        });
}

/**
 * 
 * @param {json数组} json 
 * @param {总图片个数} total_results 
 * @param {下一个连接} next_page 
 */
function datajson(json, next_page) {

    var fileboo = false;
    for (var i = 0; json.length > i; i++) {
        var jsonbj = json[i];
        fileboo = true;
        var Pec1 = new pec({
            id: jsonbj.id,
            width: jsonbj.width,
            height: jsonbj.height,
            url: jsonbj.url,
            photographer: jsonbj.photographer,
            photographer_url: jsonbj.photographer_url,
            photographer_id: jsonbj.photographer_id,
            avg_color: jsonbj.avg_color,
            src: {
                original: jsonbj.src.original,
                large2x: jsonbj.src.large2x,
                large: jsonbj.src.large,
                medium: jsonbj.src.medium,
                small: jsonbj.src.small,
                portrait: jsonbj.src.portrait,
                landscape: jsonbj.src.landscape,
                tiny: jsonbj.src.tiny,
                original1: URL_PATH + path + jsonbj.id + '/' + 'original.jpeg',
                large2x1: URL_PATH + path + jsonbj.id + '/' + 'large2x.jpeg',
                large1: URL_PATH + path + jsonbj.id + '/' + 'large.jpeg',
                medium1: URL_PATH + path + jsonbj.id + '/' + 'medium.jpeg',
                small1: URL_PATH + path + jsonbj.id + '/' + 'small.jpeg',
                portrait1: URL_PATH + path + jsonbj.id + '/' + 'portrait.jpeg',
                landscape1: URL_PATH + path + jsonbj.id + '/' + 'landscape.jpeg',
                tiny1: URL_PATH + path + jsonbj.id + '/' + 'tiny.jpeg'
            },
            liked: jsonbj.liked
        });

        Pec1.save().then(function(pecs) {
            if (next_page === '') { //到最后一页
                console.log('爬虫结束了');
            } else {
                console.log(JSON.stringify(jsonbj.id) + '结束');
            }
        });
    }
    if (fileboo) {
        if (next_page !== '') {
            var pages = next_page.toString().split('?');
            var pagea = pages[1].split('&');
            var pageas = pagea[0].split('=');
            console.log('下一页:' + Number(pageas[1]));
            TimedCrawler1(Number(pageas[1]));
        }
    }
}

/**
 * 获取图片相关信息
 */
routerApiService.post('/api_service_pexels', function(req, res) {
    var page = req.body.page || "1";
    var pre_page = req.body.pre_page || "20";

    pec.find().sort({ _id: 1 }).then(function(pecs) {
        var data = []
        var dataA = {}
        for (var i = 0; pecs.length > i; i++) {
            var json = pecs[i];
            var num = Number(page) * Number(pre_page);
            if (num > i) {
                data.push(json);
            }
        }
        var dataB = []
        for (var j = data.length - 1; j >= 0; j--) {
            var jsonob = data[j];
            if (j < Number(pre_page)) {
                dataB.push(jsonob);
            }
        }
        dataA['page'] = Number(page)
        dataA['per_page'] = Number(pre_page)
        dataA['photos'] = flashback(dataB);
        responseData.code = 200
        responseData.data = dataA;
        return res.json(responseData);
    });
});

/**
 * 倒叙排序
 * @param {数据} data 
 * @returns 
 */
function flashback(data) {
    var dataB = []
    for (var j = data.length - 1; j >= 0; j--) {
        dataB.push(data[j]);
    }
    return dataB;
}

module.exports = routerApiService;