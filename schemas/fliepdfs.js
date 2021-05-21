var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    title: String,
    subtitle: String,
    url: String,
    pdfdata: String,
    pdfdate: String, //修改时间
    pdfstarttime: String //开始时间
});
module.exports = schema;