var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    row: String,
    col: String,
    text: String,
    font: String,//字体
    fontsize: String,
    signal: String, //B I U S L C R T M D
    textwrap: String,
    color: String,
    bgcolor: String,
    title: String,
    subtitle: String,
    exceldata: String,
    exceldate: String, //excel 修改时间
    excelstarttime: String//excel 开始时间
});
module.exports = schema;