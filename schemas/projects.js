var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    projectName: String,
    projectHtml: String,
    projectStyle: String,
    pThumb: String,
    type: String, //关注内容
    isTemplate: Boolean,
    images: String,
    videos: String,
    projectdate: String, //project 修改时间
    projectstarttime: String//project 开始时间
});
module.exports = schema;