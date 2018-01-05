var express = require('express');
var UserModel = require('../db/schema/user');

var router = express.Router();

router.post('/', function(req, res, next) {
    const {userName,password,remember,address,occupation} = req.body;
    UserModel.findOne({ userName },function (err,user) {
        console.log(user);
        if(user) {
            res.send( { status: 0, msg: '用户已存在' })
        } else {
            UserModel({ userName, password, address,occupation }).save()
            res.send( { status: 1, msg: '注册成功'})
        }
    });

});

module.exports = router;