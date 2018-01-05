var express = require('express');
var router = express.Router();
var CollectionModel = require('../db/schema/collection');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', function(req, res, next) {
    let {content,title,collectionName,articleIndex,publish,token} = req.body;
    const decoded = jwt.verify(token, 'secret');
    console.log({content,title,collectionName,articleIndex})
    let strTitle = "articles."+articleIndex+".title";
    let strContent = "articles."+articleIndex+".content";
    let  strPublish = "articles."+articleIndex+".publish";
    let temp = {};
    temp[strTitle] = title;
    temp[strContent] = content;
    temp[strPublish] = publish;
    console.log(strTitle,strContent);
    CollectionModel.update({author:decoded.userName,name:collectionName},
        {$set:temp},
        function(err){
            if(err){
                res.send({status:0,msg:'失败'});
            }else{
                res.send({status:1});
            }
    })
});

module.exports = router;
