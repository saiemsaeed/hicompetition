const mongoose = require('mongoose'),
    validator = require('validator'),
    jwt = require('jsonwebtoken'),
    bCrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name of user is required",
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        require: "Email of user is required",
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: "Password of user is required"
    },
    phone: {
        type: String,
        minlength: 1,
        maxlength: 11,
        required: "Phone Number is required to register user"
    },
    avatar: {
        type: Buffer,
        data: Buffer,
        contentType: String,
        default: ('./public/images/avatar-default.jpeg').toString('base64')
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
});

userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
    }
}

userSchema.methods.removeToken = function(token){
    var user = this;

    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    })
}

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'aabbcc').toString();
    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    });
}

userSchema.statics.findByCredentials = function(email, password){
    var User = this;
    
    return User.findOne({email})
    .then((user) => {
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bCrypt.compare(password, user.password, (err, res) => {
                if(res){
                    resolve(user);
                }else{
                    reject(err);
                }
            })
        })
    })
}

userSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'aabbcc');
    } catch (e) {
        return Promise.reject('Authentication Token is compromised!');
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bCrypt.genSalt(10, (err, salt) => {
            bCrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

module.exports = mongoose.model('User', userSchema);