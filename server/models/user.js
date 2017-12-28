let mongoose = require('mongoose');

const User = mongoose.model('User',
    {
        email: {
            type: String,
            requires: true,
            minlength: 1,
            trim: true
        }
    }
);

module.exports = {User};