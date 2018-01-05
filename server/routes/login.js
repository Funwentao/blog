var express = require('express');
var mongoose = require('mongoose');
var UserModel = require('../db/schema/user');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/', function(req, res) {
    const {userName,password,remember} = req.body;
    UserModel.findOne({ userName},function (err,user) {
        if(user) {
            if(user.password == password){
                const token = jwt.sign({userName: user.userName}, 'secret', {
                    expiresIn: 60*60  // token到期时间设置
                })
                res.send({status:1,msg:'登录成功',token,userName});
            }else{
                res.send({status:0,msg:'密码错误'});
            }
        } else {
            res.send( { status: 0, msg: '不存在此用户'})
        }

    });
});

module.exports = router;