const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        requires: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
  
    return _.pick(userObject, ['_id', 'email']);
  };

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'HarambeWasAnInsideJob').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => token);
};

UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'HarambeWasAnInsideJob')
    } catch (e) {
        return Promise.reject('error');
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;
    return User.findOne({email}).then((user)=>{
        if (!user) return Promise.reject();
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (error,res) =>{
                if (res) resolve(user);
                else reject();
            });
        });
    });
};

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err,hash) => {
            user.password = hash;
            next();
        });
    });    
    if (user.isModified('password')) {
        const bcrypt = require('bcryptjs');
    } else next();
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};