const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'HarambeWasAnInsideJob').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => token);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};