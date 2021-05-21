var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    token: String,           // token 钥匙
    id: String,             // 用户id
    username: String,       // 用户昵称
    nickname: String,       //用户昵称
    passward: String,        // 密码
    mobile: String,         //手机号
    img: String,            //用户头像上传时文件
    mail: Boolean,          //邮箱
    cityInfo: String,        //城市信息
    contactInfo: String,     //联系方式
    realName: String,        //真实姓名
    address: String,         //详细地址
    wxNickname: String,      //微信名字
    sex: String,             //性别(0为男，1为女)
    avatarPath: String,      //图片绝对路径
    note: String,            //备注
    organizations: String,    //部门id(多个值用逗号隔开)
    birthday: String          //生日
});
module.exports = schema;