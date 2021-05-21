var mongoose = require('mongoose');

//用户表结构
//此处只定义了 User Schema 然后在用户models中引用
var schema = new mongoose.Schema({
    username: String,    //用户
    filename: String,    //文件名字
    type: String,        //文件类型
    imagePath: String,   //缩率图
    bundlePath: String,  //文件地址
    titleName: String,   //文件名字
    assetName: String,   //里面文件名字
    type1: String,       //一级
    type2: String,        //二级
    platform: String     //平台
});

// {"id": 1,"imagePath": "Textures/CarImage.jpg","bundlePath": "Models/ImportAssetLibraryFolder/3DModle/Cars/car06.prefab","titleName": "car06","assetName":"car000","type1": "Traffic","type2": "Car"}

module.exports = schema;