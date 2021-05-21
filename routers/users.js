//用户路由
var express = require('express');
var request = require("request");
var userRouter = express.Router();

var querystring = require('querystring');

var userweb = require('../models/UserWeb');

// 构造返回 json 格式
var responseData;
userRouter.use(function(req, res, next) {
    responseData = {
        code: 0,
        data: '',
        message: ''
    }
    next();
});

var URL_url = 'http://engine.piesat.cn/dev/account/api/';
var url = URL_url + 'auth/';

/**
 *  判断数组里面是否包括某个值
 * @param {某个值} search 
 * @param {数组} array 
 * @returns 
 */
function inArray(search, array) {
    for (var i in array) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}

/**
 * 创建文件夹
 * @param {绝对路径} path 
 */
function Fsmkdir(path) {
    try {
        fs.exists(path, function(exists) {
            if (exists) {

            } else {
                fs.mkdir(path, { recursive: true }, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    } catch (err) {
        console.error(err)
    }
}

/**
 * 错误码
 * @api {delete} http://engine.piesat.cn/dev/account/doc.html
 * @apiDescription 源地址
 * @apiParam {String} code 100 所有错误
 * @apiParam {String} 200 成功
 * @apiParam {String} 101 手机验证失败
 * @apiParam {String} 102 邮箱验证失败
 * @apiParam {String} 103 手机+验证码验证失败
 * @apiParam {String} 104 邮箱+验证码验证失败
 * @apiParam {String} 105 手机号已存在
 * @apiParam {String} 106 邮箱已存在
 * @apiParam {String} 107 token验证失败,
 * @apiParam {String} 108 忘记密码(邮箱+验证码)失败
 * @apiParam {String} 109 重置密码失败
 * @apiParam {String} 110 查询我的信息失败
 * @apiParam {String} 111 修改密码失败
 * @apiParam {String} 112 更新个人信息失败
 * @apiParam {String} 113 用户名验证失败
 * @apiParam {String} 114 忘记密码(手机+验证码)失败
 * @apiParam {String} 115 退出登录失败
 * @apiVersion 1.0.0
 * @apiGroup User
 */

/**
 * (微信扫码登录)账户设置绑定微信
 * @api {POST} /user/bindOpenid (微信扫码登录)账户设置绑定微信 在商议
 * @apiDescription (微信扫码登录)账户设置绑定微信 再商议
 * @apiName bindOpenid
 * @apiParam {String} username      
 * @apiParam {String} code     微信code
 * @apiParam {String} type     login或officialAccounts,login表示微信扫码登录，officialAccounts表示公众号网页授权
 * @apiParam {String} accessToken      
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/bindOpenid
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/bindOpenid', function(req, res) {
    var category = req.body.category;

    var username = req.body.username; //用户名
    var code = req.body.code; //微信code
    var type = req.body.type; //

    var data = {}
    data['username'] = username;
    data['code'] = code;
    data['type'] = type;

    var content = querystring.stringify(data);

    switch (category) { //数据库
        case "web":

            break;
        case "unity":
            break;
        case "program":
            break;
    }
    //get请求
    request(url + 'bindOpenid?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (json.success) {
                responseData.code = 200
                responseData.message = '';
                responseData.data = json;
                res.json(responseData);
                return;
            } else {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = json;
                res.json(responseData);
                return;
            }
        }
    });
});

/**
 * 微信扫码登录)绑定微信
 * @api {POST} /user/bindOpenid1 微信扫码登录)绑定微信 在商议
 * @apiDescription 微信扫码登录)绑定微信 再商议
 * @apiName bindOpenid1
 * @apiParam {String} username      
 * @apiParam {String} password  
 * @apiParam {String} accessToken      
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/bindOpenid1
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/bindOpenid1', function(req, res) {
    var category = req.body.category;

    var accessToken = req.body.accessToken; //用户名
    var username = req.body.username; //用户名
    var password = req.body.password; //密码

    var data = {}
    data['accessToken'] = accessToken;

    // data['systemId'] = systemId;
    var content = querystring.stringify(data);

    switch (category) { //数据库
        case "web":

            break;
        case "unity":
            break;
        case "":
            break;
    }
    var UsernameLoginInfo = {
            username: username,
            password: password,
        }
        //post请求
    request({
        url: url + 'bindOpenid/' + accessToken,
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            UsernameLoginInfo: UsernameLoginInfo
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (json.success) {
                responseData.code = 200
                responseData.message = '';
                responseData.data = json;
                res.json(responseData);
                return;
            } else {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = json;
                res.json(responseData);
                return;
            }
        }
    });
});


/**
 * (微信扫码登录)检测openid是否存在
 * @api {POST} /user/checkOpenidExists (微信扫码登录)检测openid是否存在 在商议
 * @apiDescription (微信扫码登录)检测openid是否存在 再商议
 * @apiName checkOpenidExists
 * @apiParam {String} code      
 * @apiParam {String} type      
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/checkOpenidExists
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/checkOpenidExists', function(req, res) {
    var code = req.body.code;
    var type = req.body.type;
    // var systemId = req.body.systemId | null;
    var data = {}
    data['code'] = code;
    data['type'] = type;
    // data['systemId'] = systemId;
    var content = querystring.stringify(data);

    switch (category) { //数据库
        case "web":

            break;
        case "unity":
            break;
        case "":
            break;
    }
    //get请求
    request(url + 'checkOpenidExists?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (json.success) {
                responseData.code = 200
                responseData.message = '';
                responseData.data = json;
                res.json(responseData);
                return;
            } else {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = json;
                res.json(responseData);
                return;
            }
        }
    });
});

/**
 * 检测邮箱是否存在
 */
function checkMailExists(type, res, mail, category) {
    var data = {}
    data['mail'] = mail;
    var content = querystring.stringify(data);
    //get请求
    request(url + 'checkMailExists?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            switch (type) {
                case 1:
                    return getMailCaptcha(res, mail, category, body);
            }
        } else {
            responseData.code = 102;
            responseData.data = error;
            responseData.message = '';
            return res.json(responseData);
        }
    });
}

/**
 * 检测邮箱和验证码是否匹配
 */
function checkMailWithCode(type, req, res) {
    var mail = req.body.mail;
    var captcha = req.body.captcha;
    var data = {}
    data['mail'] = mail;
    data['captcha'] = captcha;
    var content = querystring.stringify(data);
    //get请求
    request(url + 'checkMailWithCode?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            switch (type) {
                case 1:
                    return loginByMail(req, res, body);
                case 2:
                    return updatePwdByMail(req, res, body);
            }
        } else {
            responseData.code = 104;
            responseData.data = error;
            responseData.message = '';
            return res.json(responseData);
        }
    });
}

/**
 * 检测手机号是否存在
 */
function checkTelExists(type, tel, category, res) {
    var data = {}
    data['tel'] = tel;
    var content = querystring.stringify(data);
    //get请求
    request(url + 'checkTelExists?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            switch (type) {
                case 1:
                    return getCodeByTel(body, tel, category, res);
            }
        } else {
            responseData.code = 101;
            responseData.data = error;
            responseData.message = '';
            return res.json(responseData);
        }
    });
}

/**
 * 检测手机号和验证码是否匹配
 */
function checkTelWithCode(type, req, res) {
    var captcha = req.body.captcha; //验证码
    var tel = req.body.tel; //手机号
    var data = {}
    data['tel'] = tel;
    data['captcha'] = captcha;
    var content = querystring.stringify(data);
    //get请求
    request(url + 'checkTelWithCode?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            switch (type) {
                case 1:
                    return TelLoginInfo(req, res, body);
                case 2:
                    return updatePwdByTel(req, res, body);
            }
        } else {
            responseData.code = 103;
            responseData.data = error;
            responseData.message = '';
            return res.json(responseData);
        }
    });
}

/**
 * 查询token是否有效
 */
function checkTokenValid(type, req, res) {
    var options = {
        url: url + 'checkTokenValid',
        headers: {
            'Authorization': accessToken
        }
    };
    //get请求
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            switch (type) {
                case 1:
                    return queryUserByToken(req, res, body);
                case 2:
                    return getUserInfoByUserName(req, res, body);
                case 3:
                    return updatePwd(req, res, body);
                case 4:
                    return updateUser(req, res, body);
            }
        } else {
            responseData.code = 107;
            responseData.data = error;
            responseData.message = '';
            return res.json(responseData);
        }
    });
}

/**
 * 检测用户名是否可用
 */
function checkUsername(type, req, res) {
    var username = '';
    switch (type) {
        case 1:
            username = req.body.username;
            break;
        case 2:
            username = req.body.userName;
            break;
    }
    var data = {}
    data['username'] = username;
    var content = querystring.stringify(data);
    //get请求
    request(url + 'checkUsername?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            switch (type) {
                case 1:
                    return login(req, res, body);
                case 2:
                    return getUserInfoByUserName1(req, res, body);
            }
        } else {
            responseData.code = 113;
            responseData.data = error;
            responseData.message = '';
            return res.json(responseData);
        }
    });
}

/**
 * 生成邀请链接
 * @api {POST} /user/generateInviteUrl 生成邀请链接 在商议
 * @apiDescription 生成邀请链接 再商议
 * @apiName generateInviteUrl
 * @apiParam {String} accessToken  token
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/generateInviteUrl
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/generateInviteUrl', function(req, res) {
    var accessToken = req.body.accessToken;
    var category = req.body.category;

    switch (category) { //数据库
        case "web":

            break;
        case "unity":
            break;
        case "":
            break;
    }
    var options = {
        url: url + 'generateInviteUrl',
        headers: {
            'Authorization': accessToken
        }
    };
    //get请求
    request(options, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (json.success) {
                responseData.code = 200
                responseData.message = '';
                responseData.data = json;
                return res.json(responseData);
            } else {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = json;
                return res.json(responseData);
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = json;
            return res.json(responseData);
        }
    });
});

/**
 * 获取手机验证码
 * @api {POST} /user/getCodeByTel 获取手机验证码
 * @apiDescription 获取手机验证码
 * @apiName getCodeByTel
 * @apiParam {String} tel  手机号
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/getCodeByTel
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/getCodeByTel', function(req, res) {
    var tel = req.body.tel;
    var category = req.body.category;
    checkTelExists(1, tel, category, res);
});

function getCodeByTel(dataurl, tel, category, res) {
    if (dataurl !== undefined) {
        // var datajson = JSON.parse(dataurl);
        // if (datajson.success) {
        //     responseData.code = 101
        //     responseData.message = '该手机号已经被注册,您可以直接通过获取验证码登录';
        //     responseData.data = datajson;
        //     res.json(responseData);
        //     return;
        // }

        var data = {}
        data['tel'] = tel;
        var content = querystring.stringify(data);

        switch (category) { //数据库
            case "web":

                break;
            case "unity":
                break;
            case "":
                break;
        }
        //get请求
        request(url + 'getCodeByTel?' + content, function(error, response, body) {
            if (!error && response.code == 200) {
                var json = JSON.parse(body);
                if (json.success) {
                    responseData.code = 200
                    responseData.message = '';
                    responseData.data = json;
                    return res.json(responseData);
                } else {
                    responseData.code = 100
                    responseData.message = '错误';
                    responseData.data = json;
                    return res.json(responseData);
                }
            } else {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = json;
                return res.json(responseData);
            }
        });
    }
}

/**
 * 获取邮箱验证码
 * @api {POST} /user/getMailCaptcha 获取邮箱验证码
 * @apiDescription 获取邮箱验证码
 * @apiName getMailCaptcha
 * @apiParam {String} mail    邮箱
 * @apiParam {String} category 识别用户
 * @apiSampleRequest /user/getMailCaptcha
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/getMailCaptcha', function(req, res) {
    var mail = req.body.mail;
    var category = req.body.category;

    checkMailExists(1, res, mail, category);
});

function getMailCaptcha(res, mail, category, dataurl) {
    var jsonda = JSON.parse(dataurl);
    if (jsonda.success) {
        responseData.code = 102
        responseData.message = '该邮箱已经被注册,您可以直接通过获取验证码登';
        responseData.data = dataurl;
        res.json(responseData);
        return;
    }

    var data = {}
    data['mail'] = mail;
    var content = querystring.stringify(data);

    switch (category) { //数据库
        case "web":

            break;
        case "unity":
            break;
        case "":
            break;
    }
    //get请求
    request(url + 'getMailCaptcha?' + content, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (json.success) {
                responseData.code = 200
                responseData.message = '';
                responseData.data = json;
                return res.json(responseData);
            } else {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = json;
                return res.json(responseData);
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = json;
            return res.json(responseData);
        }
    });
}

/**
 * 根据用户Id获取token
 * @api {POST} /user/getTokenByUserId 根据用户Id获取token
 * @apiDescription 根据用户Id获取token
 * @apiName getTokenByUserId
 * @apiParam {String} userId    用户id
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/getTokenByUserId
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/getTokenByUserId', function(req, res) {
    var userId = req.body.userId || 0;
    var category = req.body.category;
    var data = {}
    data['userId'] = userId;
    var content = querystring.stringify(data);

    //get请求
    request(url + 'getTokenByUserId?' + content, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '';
                responseData.data = json;
                return res.json(responseData);
            }
            var token = json.data.token;
            switch (category) { //数据库
                case "web":
                    jsondata.userId = userId
                    jsondata.token = token;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        }
    });
});

/**
 * 账号密码登录
 * @api {POST} /user/login 账号密码登录
 * @apiDescription 账号密码登录
 * @apiName login
 * @apiParam {String} username  用户名
 * @apiParam {String} password  密码
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/login
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/login', function(req, res) {
    checkUsername(1, req, res);
});

function login(req, res, body) {
    var category = req.body.category;
    var password = req.body.password; //密码
    var username = req.body.username; //用户名
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 113
        responseData.message = '';
        responseData.data = body;
        return res.json(responseData);
    }
    //post请求
    request({
        url: url + 'login',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            username: username,
            password: password,
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            var jsoda = json.data
            var jsonuser = jsoda.userData;
            var nickname = jsonuser.nickname;
            var userId = jsonuser.userId;
            var token = jsoda.token
            switch (category) { //数据库
                case "web":
                    jsondata.nickname = nickname;
                    jsondata.userId = userId
                    jsondata.token = token
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 邮箱验证码登录
 * @api {POST} /user/loginByMail 邮箱验证码登录
 * @apiDescription 邮箱验证码登录
 * @apiName loginByMail
 * @apiParam {String} captcha  验证码
 * @apiParam {String} mail      邮箱
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/loginByMail
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/loginByMail', function(req, res) {
    checkMailWithCode(1, req, res);
});

function loginByMail(req, res, body) {
    var category = req.body.category;
    var captcha = req.body.captcha; //验证码
    var mail = req.body.mail; //邮箱
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 104
        responseData.message = '校验失败';
        responseData.data = dataurl;
        return res.json(responseData);
    }
    //post请求
    request({
        url: url + 'loginByMail',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            captcha: captcha,
            mail: mail
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            var jsoda = json.data
            var jsonuser = jsoda.userData;
            var nickname = jsonuser.nickname;
            var userId = jsonuser.userId;
            var token = jsoda.token
            switch (category) {
                case 'web':
                    jsondata.nickname = nickname;
                    jsondata.userId = userId;
                    jsondata.token = token;
                    jsondata.mail = mail;
                    DataMongodb(res, jsondata);
                    break;
            }
        } else {
            responseData.code = 104
            responseData.message = '校验失败';
            responseData.data = dataurl;
            return res.json(responseData);
        }
    });
}

/**
 * 手机验证码登录
 * @api {POST} /user/loginByTel 手机验证码登录
 * @apiDescription 手机验证码登录
 * @apiName loginByTel
 * @apiParam {String} captcha  验证码
 * @apiParam {String} tel      手机号
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/loginByTel
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/loginByTel', function(req, res) {

    checkTelWithCode(1, req, res);
});

function TelLoginInfo(req, res, body) {
    var category = req.body.category;

    var captcha = req.body.captcha; //手机验证码
    var tel = req.body.tel; //手机号
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 103
        responseData.message = '校验失败';
        responseData.data = body;
        res.json(responseData);
        return;
    }

    //post请求
    request({
        url: url + 'loginByTel',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            captcha: captcha,
            tel: tel
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            if (body.code !== 0) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            var jsoda = json.data
            var jsonuser = jsoda.userData;
            var nickname = jsonuser.nickname;
            var username = jsonuser.userName;
            var userId = jsonuser.userId;
            var token = jsoda.token
            switch (category) { //数据库
                case "web":
                    jsondata.tel = tel;
                    jsondata.nickname = nickname;
                    jsondata.username = username;
                    jsondata.userId = userId;
                    jsondata.token = token;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 退出登录
 * @api {POST} /user/logout 退出登录
 * @apiDescription 退出登录
 * @apiName logout
 * @apiParam {String} accessToken  token
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/logout
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/logout', function(req, res) {
    var accessToken = req.body.accessToken;
    var category = req.body.category;

    switch (category) { //数据库
        case "web":

            break;
        case "unity":
            break;
        case "":
            break;
    }
    var options = {
        url: url + 'logout',
        headers: {
            'Authorization': accessToken
        }
    };
    //get请求
    request(options, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (json.success) {
                responseData.code = 200
                responseData.message = '';
                responseData.data = body;
                return res.json(responseData);
            } else {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = json;
                return res.json(responseData);
            }
        } else {
            responseData.code = 200
            responseData.message = '';
            responseData.data = body;
            return res.json(responseData);
        }
    });
});


/**
 * 通过邮箱和验证码注册用户(注册即登录) 暂时有问题需要商议
 * @api {POST} /user/mail/register 通过邮箱和验证码注册用户(注册即登录) 暂时有问题需要商议
 * @apiDescription 通过邮箱和验证码注册用户(注册即登录) 暂时有问题需要商议
 * @apiName mail/register
 * @apiParam {String} username  用户名
 * @apiParam {String} pwd       密码
 * @apiParam {String} mail      邮箱
 * @apiParam {String} conPwd    确认密码
 * @apiParam {String} captcha   邮箱验证码
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/mail/register
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/mail/register', function(req, res) {
    var category = req.body.category;

    var captcha = req.body.captcha; //手机验证码
    var conPwd = req.body.conPwd; //确认密码
    var mail = req.body.mail; //邮箱地址
    var pwd = req.body.pwd; //密码
    var username = req.body.username; //用户名

    //post请求
    request({
        url: url + 'mail/register',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            captcha: captcha,
            conPwd: conPwd,
            mail: mail,
            pwd: pwd,
            username: username
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            var jsoda = json.data
            var jsonuser = jsoda.userData;
            var nickname = jsonuser.nickname;
            var username = jsonuser.userName;
            var userId = jsonuser.userId;
            var token = jsoda.token
            switch (category) { //数据库
                case "web":
                    jsondata.passward = conPwd;
                    jsondata.mail = mail;
                    jsondata.username = username;
                    jsondata.nickname = nickname;
                    jsondata.userId = userId;
                    jsondata.token = token;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
});

/**
 * 通过手机号和验证码注册用户(注册即登录)  暂时有问题需要商议
 * @api {POST} /user/regist 通过手机号和验证码注册用户(注册即登录) 暂时有问题需要商议
 * @apiDescription 通过手机号和验证码注册用户(注册即登录) 暂时有问题需要商议
 * @apiName regist
 * @apiParam {String} username  用户名
 * @apiParam {String} pwd       密码
 * @apiParam {String} tel       手机号
 * @apiParam {String} conPwd    确认密码
 * @apiParam {String} captcha   手机验证码
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/regist
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/regist', function(req, res) {
    var category = req.body.category;

    var captcha = req.body.captcha; //手机验证码
    var tel = req.body.tel; //手机号
    var conPwd = req.body.conPwd; //确认密码
    var pwd = req.body.pwd; //密码
    var username = req.body.username; //用户名

    //post请求
    request({
        url: url + 'regist',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            captcha: captcha,
            tel: tel,
            conPwd: conPwd,
            pwd: pwd,
            username: username
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            var jsoda = json.data
            var jsonuser = jsoda.userData;
            var nickname = jsonuser.nickname;
            var username = jsonuser.userName;
            var userId = jsonuser.userId;
            var token = jsoda.token
            switch (category) { //数据库
                case "web":
                    jsondata.passward = conPwd;
                    jsondata.tel = tel;
                    jsondata.username = username;
                    jsondata.nickname = nickname;
                    jsondata.userId = userId;
                    jsondata.token = token;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
});

var user = URL_url + 'sys/user/';

/**
 * 查询我的信息
 * @api {POST} /user/queryUserByToken 查询我的信息
 * @apiDescription 查询我的信息
 * @apiName queryUserByToken
 * @apiParam {String} accessToken   token
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/queryUserByToken
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/queryUserByToken', function(req, res) {
    checkTokenValid(1, req, res);
});

function queryUserByToken(req, res, body) {
    var accessToken = req.body.accessToken;
    var category = req.body.category;
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 107
        responseData.message = 'token失效';
        responseData.data = body;
        return res.json(responseData);
    }
    var options = {
        url: user + 'queryUserByToken',
        headers: {
            'Authorization': accessToken
        }
    };
    //get请求
    request(options, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.token = accessToken;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 根据用户名查询用户
 * @api {POST} /user/getUserInfoByUserName 根据用户名查询用户
 * @apiDescription 根据用户名查询用户
 * @apiName getUserInfoByUserName
 * @apiParam {String} userName      用户名
 * @apiParam {String} accessToken   token
 * @apiParam {String} category  识别用户
 * @apiSampleRequest /user/getUserInfoByUserName
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 * @apiSampleRequest off
 */
userRouter.post('/getUserInfoByUserName', function(req, res) {
    checkTokenValid(2, req, res);

});

function getUserInfoByUserName(req, res, body) {
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 107
        responseData.message = 'token失效';
        responseData.data = body;
        return res.json(responseData);
    } else {
        checkUsername(2, req, res);
    }
}

function getUserInfoByUserName1(req, res, body) {
    var accessToken = req.body.accessToken;
    var category = req.body.category;
    var userName = req.body.userName;
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 113
        responseData.message = '用户名不存在';
        responseData.data = body;
        return res.json(responseData);
    }
    var data = {}
    data['userName'] = userName;
    var content = querystring.stringify(data);

    var options = {
        url: user + 'getUserInfoByUserName?' + content,
        headers: {
            'Authorization': accessToken
        }
    };
    //get请求
    request(options, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.token = accessToken;
                    jsondata.username = userName;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 修改我的密码
 * @api {POST} /user/updatePwd 修改我的密码
 * @apiDescription 修改我的密码
 * @apiName updatePwd
 * @apiParam {String} oldPwd      旧密码
 * @apiParam {String} newPwd      新密码
 * @apiParam {String} conPwd      确认密码
 * @apiParam {String} accessToken   token
 * @apiParam {String} category  识别用户传入 web unity 等等
 * @apiSampleRequest /user/updatePwd
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 */
userRouter.post('/updatePwd', function(req, res) {
    checkTokenValid(3, req, res);

});

function updatePwd(req, res, body) {
    var category = req.body.category;
    var accessToken = req.body.accessToken;

    var conPwd = req.body.conPwd; //确认密码
    var newPwd = req.body.newPwd; //新密码
    var oldPwd = req.body.oldPwd; //新密码
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 107
        responseData.message = 'token失效';
        responseData.data = body;
        return res.json(responseData);
    }
    //post请求
    request({
        url: user + 'updatePwd',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
            "Authorization": accessToken,
        },
        body: {
            newPwd: newPwd,
            oldPwd: oldPwd,
            conPwd: conPwd
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.token = accessToken;
                    jsondata.passward = conPwd;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 忘记密码(通过邮箱和验证码找回)
 * @api {POST} /user/updatePwdByMail 忘记密码(通过邮箱和验证码找回)
 * @apiDescription 忘记密码(通过邮箱和验证码找回)
 * @apiName updatePwdByMail
 * @apiParam {String} username      用户名
 * @apiParam {String} pwd        密码
 * @apiParam {String} conPwd        确认密码
 * @apiParam {String} mail       邮箱
 * @apiParam {String} captcha    邮箱验证码
 * @apiParam {String} category  识别用户传入 web unity 等等
 * @apiSampleRequest /user/updatePwdByMail
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 */
userRouter.post('/updatePwdByMail', function(req, res) {
    checkMailWithCode(2, req, re);

});

function updatePwdByMail(req, res, body) {
    var category = req.body.category;

    var captcha = req.body.captcha; //验证码
    var conPwd = req.body.conPwd; //确认密码
    var mail = req.body.mail; //邮箱地址
    var pwd = req.body.pwd; //密码
    var username = req.body.username; //用户名
    var jsonda = JSON.parse(body);
    if (jsonda.success) {
        responseData.code = 104;
        responseData.message = '验证失效';
        responseData.data = body;
        return res.json(responseData);
    }
    //post请求
    request({
        url: user + 'updatePwdByMail',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            captcha: captcha,
            conPwd: conPwd,
            mail: mail,
            pwd: pwd,
            username: username
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.token = accessToken;
                    jsondata.passward = conPwd;
                    jsondata.mail = mail;
                    jsondata.username = username;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 忘记密码(通过手机号和验证码找回)
 * @api {POST} /user/updatePwdByTel 忘记密码(通过手机号和验证码找回)
 * @apiDescription 忘记密码(通过手机号和验证码找回)
 * @apiName updatePwdByTel
 * @apiParam {String} username      用户名
 * @apiParam {String} pwd        密码
 * @apiParam {String} conPwd        确认密码
 * @apiParam {String} tel          手机号
 * @apiParam {String} captcha     手机验证码
 * @apiParam {String} category  识别用户传入 web unity 等等
 * @apiSampleRequest /user/updatePwdByTel
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 */
userRouter.post('/updatePwdByTel', function(req, res) {
    checkTelWithCode(2, req, res);
});

function updatePwdByTel(req, res, body) {
    var category = req.body.category;

    var captcha = req.body.captcha; //验证码
    var conPwd = req.body.conPwd; //确认密码
    var tel = req.body.tel; //手机号
    var pwd = req.body.pwd; //密码
    var username = req.body.username; //用户名
    var jsonda = JSON.parse(body);
    if (jsonda.success) {
        responseData.code = 103;
        responseData.message = '验证失效';
        responseData.data = body;
        return res.json(responseData);
    }

    //post请求
    request({
        url: user + 'updatePwdByTel',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
            captcha: captcha,
            conPwd: conPwd,
            tel: tel,
            pwd: pwd,
            username: username
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.passward = conPwd;
                    jsondata.tel = tel;
                    jsondata.username = username;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 更新个人信息
 * @api {POST} /user/updateUser 更新个人信息
 * @apiDescription 更新个人信息
 * @apiName updateUser
 * @apiParam {String} userid        用户id
 * @apiParam {String} accessToken     token
 * @apiParam {String} category  识别用户传入 web unity 等等
 * @apiSampleRequest /user/updateUser
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 */
userRouter.post('/updateUser', function(req, res) {
    checkTokenValid(4, req, res);
});

function updateUser(req, res, body) {
    var category = req.body.category;

    var userid = req.body.userid; //用户id
    var accessToken = req.body.accessToken; //token
    var jsonda = JSON.parse(body);
    if (!jsonda.success) {
        responseData.code = 107
        responseData.message = 'token失效';
        responseData.data = body;
        return res.json(responseData);
    }

    //post请求
    request({
        url: user + 'updateUser',
        method: "post", //如果是post就涉及到跨域的问题了
        json: true,
        headers: {
            "content-type": "application/json",
            "Authorization": accessToken,
        },
        body: {
            userid: userid
        }
    }, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.token = accessToken;
                    jsondata.userid = userid;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
}

/**
 * 重置密码
 * @api {POST} /user/resetPwd 重置密码
 * @apiDescription 重置密码
 * @apiName resetPwd
 * @apiParam {String} userid        用户id
 * @apiParam {String} category  识别用户传入 web unity 等等
 * @apiSampleRequest /user/resetPwd
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 */
userRouter.post('/resetPwd', function(req, res) {
    var userId = req.body.userId;
    var category = req.body.category;
    //put请求
    request.put(url + 'resetPwd/' + userId, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.userid = userid;
                    DataMongodb(res, jsondata);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
});

/**
 * 删除用户
 * @api {POST} /user/resetPwd 删除用户
 * @apiDescription 删除用户
 * @apiName resetPwd
 * @apiParam {String} userId        用户id
 * @apiParam {String} accessToken     token
 * @apiParam {String} category  识别用户传入 web unity 等等
 * @apiSampleRequest /user/resetPwd
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
 */
userRouter.post('/delete', function(req, res) {
    var accessToken = req.body.accessToken;
    var category = req.body.category;
    var userId = req.body.userId;

    var options = {
        url: user + 'getUserInfoByUserName/' + userId,
        headers: {
            'Authorization': accessToken
        }
    };
    //get请求
    request(options, function(error, response, body) {
        if (!error && response.code == 200) {
            var json = JSON.parse(body);
            if (!json.success) {
                responseData.code = 100
                responseData.message = '错误';
                responseData.data = body;
                return res.json(responseData);
            }
            switch (category) { //数据库
                case "web":
                    jsondata.userid = userid;
                    delData(res, userid);
                    break;
                case "unity":
                    break;
                case "":
                    break;
            }
        } else {
            responseData.code = 100
            responseData.message = '错误';
            responseData.data = body;
            return res.json(responseData);
        }
    });
});

/**
 * 初始化数据
 */
var jsondata = {
        token: '',
        userId: '',
        username: '',
        nickname: '',
        passward: '',
        mobile: '',
        img: '',
        mail: '',
        cityInfo: '',
        contactInfo: '',
        realName: '',
        address: '',
        wxNickname: '',
        sex: '',
        avatarPath: '',
        note: '',
        organizations: '',
        birthday: ''
    }
    /**
     * 保存数据库
     * @param {发送返回值} res 
     */
function DataMongodb(res, jsondata) {
    var token = jsondata.token;
    var userId = jsondata.userId;
    var username = jsondata.username;
    var nickname = jsondata.nickname;
    var password = jsondata.password;
    var mobile = jsondata.mobile;
    var img = jsondata.img;
    var cityInfo = jsondata.cityInfo;
    var contactInfo = jsondata.contactInfo;
    var realName = jsondata.realName;
    var address = jsondata.address;
    var sex = jsondata.sex;
    var avatarPath = jsondata.avatarPath;
    var note = jsondata.note;
    var organizations = jsondata.organizations;
    var birthday = jsondata.birthday;


    userweb.find().sort({ _id: -1 }).then(function(userwebs) {
        var bool = false;
        if (userwebs.length > 0) {
            for (var i = 0; projects.length > i; i++) {
                var jsouser = projects[i];
                if (jsouser.id === userId) {
                    bool = true;
                    if (token !== '') {
                        jsouser.token = token;
                    }
                    if (userId !== '') {
                        jsouser.id = userId;
                    }
                    if (username !== '') {
                        jsouser.username = username;
                    }
                    if (nickname !== '') {
                        jsouser.nickname = nickname;
                    }
                    if (username !== '') {
                        jsouser.password = password;
                    }
                    if (username !== '') {
                        jsouser.mobile = mobile;
                    }
                    if (username !== '') {
                        jsouser.img = img;
                    }
                    if (username !== '') {
                        jsouser.cityInfo = cityInfo;
                    }
                    if (username !== '') {
                        jsouser.contactInfo = contactInfo;
                    }
                    if (username !== '') {
                        jsouser.realName = realName;
                    }
                    if (username !== '') {
                        jsouser.address = address;
                    }
                    if (username !== '') {
                        jsouser.sex = sex;
                    }
                    if (username !== '') {
                        jsouser.avatarPath = avatarPath;
                    }
                    if (username !== '') {
                        jsouser.note = note;
                    }
                    if (username !== '') {
                        jsouser.organizations = organizations;
                    }
                    if (username !== '') {
                        jsouser.birthday = birthday;
                    }

                    userweb.update({
                        _id: jsouser._id
                    }, {
                        token: jsouser.token,
                        id: jsouser.userId,
                        username: jsouser.username,
                        nickname: jsouser.nickname,
                        passward: jsouser.password,
                        mobile: jsouser.mobile,
                        img: jsouser.img,
                        mail: jsouser.mail,
                        cityInfo: jsouser.cityInfo,
                        contactInfo: jsouser.contactInfo,
                        realName: jsouser.realName,
                        address: jsouser.address,
                        wxNickname: jsouser.wxNickname,
                        sex: jsouser.sex,
                        avatarPath: jsouser.avatarPath,
                        note: jsouser.note,
                        organizations: jsouser.organizations,
                        birthday: jsouser.birthday
                    }).then(function() {
                        responseData.code = '200';
                        responseData.message = '成功';
                        responseData.data = json.parse(jsouser);
                        return res.json(responseData);
                    });
                }
            }
            if (!bool) {
                responseData.code = 100;
                responseData.message = '登录失败';
                responseData.data = '';
                return res.json(responseData);
            }
        } else {
            var userweb = new UserWeb({
                token: token, // token 钥匙
                id: userId, // 用户id
                username: username, // 用户昵称
                nickname: nickname, //用户昵称
                passward: password, // 密码
                mobile: mobile, //手机号
                img: img, //用户头像上传时文件
                mail: mail, //邮箱
                cityInfo: cityInfo, //城市信息
                contactInfo: contactInfo, //联系方式
                realName: realName, //真实姓名
                address: address, //详细地址
                wxNickname: wxNickname, //微信名字
                sex: sex, //性别(0为男，1为女)
                avatarPath: avatarPath, //图片绝对路径
                note: note, //备注
                organizations: organizations, //部门id(多个值用逗号隔开)
                birthday: birthday //生日
            });
            userweb.save().then(function(userwebs) {
                responseData.code = 200
                responseData.message = '';
                responseData.data = userwebs;
                return res.json(responseData);
            });
        }
    });
}
/**
 * 删除用户信息
 * @param {返回值} res 
 * @param {用户id} userid 
 */
function delData(res, userid) {
    userweb.remove({
        id: userid
    }).then(function() {
        responseData.code = 200;
        responseData.message = '删除成功';
        responseData.data = '';
        return res.json(responseData);
    });
}
module.exports = userRouter;