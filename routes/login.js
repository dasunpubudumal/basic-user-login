var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res) {
    User.getUserByName(req.body.username, function(err, user) {
        User.comparePasswords(req.body.password, user.password, function(err, result) {
            if(result == true){
                res.json({success: true, msg: "User Login Successfull!"});
            } else {
                res.json({success: false, msg: "User Login Failed!"});
            }
        });
    }); 
});

module.exports = router;
