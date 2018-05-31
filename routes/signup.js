var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
    res.render('signup');
});

router.post('/', function(req, res) {
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.saveUser(user, function(err, response) {
        if(err) {
            res.json({success: "false", msg: err});
        } else {
            res.json({success: "true", msg: "Successfully Added!"});
        }
    });
});

module.exports = router;