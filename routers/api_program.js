/**
 * 获取微信信息
 */
var express = require('express');
var request = require("request");
var ProgramApiService = express.Router();

// 构造返回 json 格式
var responseData;
ProgramApiService.use(function (req, res, next) {
    responseData = {
        code: 0,
        id: '',
        data: '',
        message: ''
    }
    next();
});

ProgramApiService.post('/getUserInfo', function (req, res) {

    if(req.body.code) {
        let options = {
            method: 'POST',
            url: 'https://api.weixin.qq.com/sns/jscode2session?',
            formData: {
                appid: "wx84e374c46e14bb70",		//appid
                secret: "a54f39f014abe276c9345854a348c8e7",		//密钥，在小程序后台获取
                js_code: req.body.code,		//用户code
                grant_type: 'authorization_code'
            }
        };
        request(options, (error, response, body) => {
          if(error) { //请求异常时，返回错误信息
              res.json({
                  "status": "error",
              })
          } else {
            let _data = JSON.parse(body);
            res.json(_data);
            console.log('返回的用户id：',_data);
          }
        })
      }
});

module.exports = ProgramApiService;