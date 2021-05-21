var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sid: String,
    surl: String,
    sdate: String, //project 修改时间
    sstarttime: String//project 开始时间
});
module.exports = schema;