var mongoose = require('mongoose');
var projectHtmlSchema = require('../schemas/projectHtmls');

/*
*   文件管理
*
**/

module.exports = mongoose.model('projectHtmls', projectHtmlSchema);