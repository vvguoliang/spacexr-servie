define({ "api": [
  {
    "type": "delete",
    "url": "http://engine.piesat.cn/dev/account/doc.html",
    "title": "",
    "description": "<p>源地址</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>100 所有错误</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "200",
            "description": "<p>成功</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "101",
            "description": "<p>手机验证失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "102",
            "description": "<p>邮箱验证失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "103",
            "description": "<p>手机+验证码验证失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "104",
            "description": "<p>邮箱+验证码验证失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "105",
            "description": "<p>手机号已存在</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "106",
            "description": "<p>邮箱已存在</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "107",
            "description": "<p>token验证失败,</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "108",
            "description": "<p>忘记密码(邮箱+验证码)失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "109",
            "description": "<p>重置密码失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "110",
            "description": "<p>查询我的信息失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "111",
            "description": "<p>修改密码失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "112",
            "description": "<p>更新个人信息失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "113",
            "description": "<p>用户名验证失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "114",
            "description": "<p>忘记密码(手机+验证码)失败</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "115",
            "description": "<p>退出登录失败</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "group": "User",
    "filename": "routers/users.js",
    "groupTitle": "User",
    "name": "DeleteHttpEnginePiesatCnDevAccountDocHtml",
    "sampleRequest": [
      {
        "url": "http://engine.piesat.cn/dev/account/doc.html"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/user/bindOpenid",
    "title": "(微信扫码登录)账户设置绑定微信 在商议",
    "description": "<p>(微信扫码登录)账户设置绑定微信 再商议</p>",
    "name": "bindOpenid",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>微信code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>login或officialAccounts,login表示微信扫码登录，officialAccounts表示公众号网页授权</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/bindOpenid"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/bindOpenid1",
    "title": "微信扫码登录)绑定微信 在商议",
    "description": "<p>微信扫码登录)绑定微信 再商议</p>",
    "name": "bindOpenid1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/bindOpenid1"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/checkOpenidExists",
    "title": "(微信扫码登录)检测openid是否存在 在商议",
    "description": "<p>(微信扫码登录)检测openid是否存在 再商议</p>",
    "name": "checkOpenidExists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/checkOpenidExists"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/generateInviteUrl",
    "title": "生成邀请链接 在商议",
    "description": "<p>生成邀请链接 再商议</p>",
    "name": "generateInviteUrl",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/generateInviteUrl"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/getCodeByTel",
    "title": "获取手机验证码",
    "description": "<p>获取手机验证码</p>",
    "name": "getCodeByTel",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/getCodeByTel"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/getMailCaptcha",
    "title": "获取邮箱验证码",
    "description": "<p>获取邮箱验证码</p>",
    "name": "getMailCaptcha",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/getMailCaptcha"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/getTokenByUserId",
    "title": "根据用户Id获取token",
    "description": "<p>根据用户Id获取token</p>",
    "name": "getTokenByUserId",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/getTokenByUserId"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/getUserInfoByUserName",
    "title": "根据用户名查询用户",
    "description": "<p>根据用户名查询用户</p>",
    "name": "getUserInfoByUserName",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/getUserInfoByUserName"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/login",
    "title": "账号密码登录",
    "description": "<p>账号密码登录</p>",
    "name": "login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/login"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/loginByMail",
    "title": "邮箱验证码登录",
    "description": "<p>邮箱验证码登录</p>",
    "name": "loginByMail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/loginByMail"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/loginByTel",
    "title": "手机验证码登录",
    "description": "<p>手机验证码登录</p>",
    "name": "loginByTel",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/loginByTel"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/logout",
    "title": "退出登录",
    "description": "<p>退出登录</p>",
    "name": "logout",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/logout"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/mail/register",
    "title": "通过邮箱和验证码注册用户(注册即登录) 暂时有问题需要商议",
    "description": "<p>通过邮箱和验证码注册用户(注册即登录) 暂时有问题需要商议</p>",
    "name": "mail/register",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "conPwd",
            "description": "<p>确认密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>邮箱验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/mail/register"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/queryUserByToken",
    "title": "查询我的信息",
    "description": "<p>查询我的信息</p>",
    "name": "queryUserByToken",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/queryUserByToken"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/regist",
    "title": "通过手机号和验证码注册用户(注册即登录) 暂时有问题需要商议",
    "description": "<p>通过手机号和验证码注册用户(注册即登录) 暂时有问题需要商议</p>",
    "name": "regist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "conPwd",
            "description": "<p>确认密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>手机验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/regist"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/resetPwd",
    "title": "重置密码",
    "description": "<p>重置密码</p>",
    "name": "resetPwd",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userid",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户传入 web unity 等等</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/resetPwd"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/resetPwd",
    "title": "删除用户",
    "description": "<p>删除用户</p>",
    "name": "resetPwd",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户传入 web unity 等等</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/resetPwd"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/updatePwd",
    "title": "修改我的密码",
    "description": "<p>修改我的密码</p>",
    "name": "updatePwd",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPwd",
            "description": "<p>旧密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPwd",
            "description": "<p>新密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "conPwd",
            "description": "<p>确认密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户传入 web unity 等等</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/updatePwd"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/updatePwdByMail",
    "title": "忘记密码(通过邮箱和验证码找回)",
    "description": "<p>忘记密码(通过邮箱和验证码找回)</p>",
    "name": "updatePwdByMail",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "conPwd",
            "description": "<p>确认密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>邮箱验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户传入 web unity 等等</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/updatePwdByMail"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/updatePwdByTel",
    "title": "忘记密码(通过手机号和验证码找回)",
    "description": "<p>忘记密码(通过手机号和验证码找回)</p>",
    "name": "updatePwdByTel",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "conPwd",
            "description": "<p>确认密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tel",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>手机验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户传入 web unity 等等</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/updatePwdByTel"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/updateUser",
    "title": "更新个人信息",
    "description": "<p>更新个人信息</p>",
    "name": "updateUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userid",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>识别用户传入 web unity 等等</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/user/updateUser"
      }
    ],
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/users.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api_file:type",
    "title": "文件上传 根据类型type excel word ppt ptf",
    "description": "<p>文件上传 根据类型type excel word ppt ptf</p>",
    "name": "api_file:type",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "excel",
            "description": "<p>上传参数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "row",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "col",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "font",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fontsize",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "signal",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "textwrap",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bgcolor",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "exceldata",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subtitle",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "word",
            "description": "<p>上传参数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "worddata",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pdf",
            "description": "<p>上传参数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ppt",
            "description": "<p>上传参数</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/api_file:type"
      }
    ],
    "group": "Web",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/api_service.js",
    "groupTitle": "Web"
  },
  {
    "type": "POST",
    "url": "/api_service/api_project_filepath",
    "title": "上传文件",
    "description": "<p>上传文件</p>",
    "name": "api_project_filepath",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pId",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hId",
            "description": "<p>子id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/api_service/api_project_filepath"
      }
    ],
    "group": "api_service_接口",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/api_service.js",
    "groupTitle": "api_service_接口"
  },
  {
    "type": "POST",
    "url": "/api_service/api_project_modle",
    "title": "上传web-modle 模型",
    "description": "<p>上传web-modle 模型</p>",
    "name": "api_project_modle",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pId",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hId",
            "description": "<p>子id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/api_service/api_project_modle"
      }
    ],
    "group": "api_service_接口",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/api_service.js",
    "groupTitle": "api_service_接口"
  },
  {
    "type": "POST",
    "url": "/api_service/api_project_pathUrl",
    "title": "删除单张图片",
    "description": "<p>删除单张图片</p>",
    "name": "api_project_pathUrl",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pId",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hId",
            "description": "<p>子id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/api_service/api_project_pathUrl"
      }
    ],
    "group": "api_service_接口",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/api_service.js",
    "groupTitle": "api_service_接口"
  },
  {
    "type": "POST",
    "url": "/api_service/api_project_pathlist",
    "title": "图片文件列表",
    "description": "<p>图片文件列表</p>",
    "name": "api_project_pathlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pId",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hId",
            "description": "<p>子id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/api_service/api_project_pathlist"
      }
    ],
    "group": "api_service_接口",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/api_service.js",
    "groupTitle": "api_service_接口"
  },
  {
    "type": "POST",
    "url": "/api_service/getOldHtmlOne",
    "title": "getOldHtmlOne",
    "description": "<p>获取数据</p>",
    "name": "getOldHtmlOne",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pId",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hId",
            "description": "<p>子id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/api_service/getOldHtmlOne"
      }
    ],
    "group": "api_service_接口",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/api_service.js",
    "groupTitle": "api_service_接口"
  },
  {
    "type": "POST",
    "url": "/api_service/saveOldHtmlOne",
    "title": "saveOldHtmlOne",
    "description": "<p>创建数据库和数据</p>",
    "name": "saveOldHtmlOne",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pId",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hId",
            "description": "<p>子id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "html",
            "description": "<p>内容</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://10.1.40.20:8082/api_service/saveOldHtmlOne"
      }
    ],
    "group": "api_service_接口",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "routers/api_service.js",
    "groupTitle": "api_service_接口"
  }
] });
