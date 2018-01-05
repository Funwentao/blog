var express = require('express');
var router = express.Router();
var UserModel = require('../db/schema/user');
var CollectionModel = require('../db/schema/collection');

/* GET home page. */
router.post('/', function(req, res, next) {
    let {userName} = req.body;
    let data = {};
    UserModel.findOne({userName},function (err,user) {
       data.address = user.address;
       data.occupation = user.occupation;
        CollectionModel.find({author:userName},function (err,collections) {
            data.collections = collections;
            res.send(data);
        })
    })
});

module.exports = router;
