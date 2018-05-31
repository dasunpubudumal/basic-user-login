var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByName = function(username, callback) {
    User.findOne({username: username}, callback);
} 

module.exports.saveUser = function(user, callback) {
    bcrypt.genSalt(5, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) throw err;
            user.password = hash;
            user.save(callback);
        });
    });
}

module.exports.comparePasswords = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}

