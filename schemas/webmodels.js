var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    pid: String,           // pid
    starttime:String,  //创建开始时间
    endtime:String,    //使用结束时间
    imagemodle:String  //模型URL地址
});
module.exports = schema;