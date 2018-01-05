var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 用户模型
 * @param {String} name 昵称
 * @param {String} password 密码
 * @param {String} create_time 创建日期
 * */
const UserSchema = new Schema({
    userName: {
        type: String,
        index: true,
        required: true,
        trim: true
    },
    isAdmin: {
        type: String,
        default: 0
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    occupation: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        trim: false
    },
    create_time: Date
})

module.exports = mongoose.model('User', UserSchema)