var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 文章模型
 * @param {String} name 文集名
 * @param {String} author 文集作者
 * @param {String} create_time 创建日期
 * @param {String} articles 文集中的文章
 * */
const CollectionSchema = new Schema({
    name:{
      type:String,
      required:true
    },
    author:{
        type:String,
        required:true
    },
    create_time:{
        type:Date,
        default:Date.now()
    },
    articles:[{
        title:{type:String,default:'无标题文章'},
        content:{type:String,default:''},
        publish:{type:Number,default:0},
        create_time:{type:Date,default:Date.now()},
        collectionName:{type:String,default:''}
    }]
})

module.exports = mongoose.model('Collection', CollectionSchema)