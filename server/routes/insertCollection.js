var express = require('express');
var router = express.Router();
var CollectionModel = require('../db/schema/collection');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', function(req, res, next) {
    let {name,token,userName} = req.body;
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded.userName);
    if(decoded.userName === userName){
        CollectionModel.findOne({name,author:userName},function(err,Collection){
            if(!Collection){
                CollectionModel({name,author:userName}).save();
                res.send({status:1,msg:'新建成功！'})
            }else{
                res.send({status:0,msg:'该文集已经存在！'})
            }
        })
    }else{
        res.send({status:0,msg:'登录信息有误！'})
    }

});

module.exports = router;
