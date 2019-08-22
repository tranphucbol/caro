let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let redisClient = require('../redis')

let userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    avatar: String,
    winningCount: Number,
    gameCount: Number,
    point: Number
});

userSchema.pre("save", function(next) {
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.hash(user.password, bcrypt.genSaltSync(10)).then(
        hashedPassword => {
            user.password = hashedPassword;
            next();
        },
        err => {
            next(err);
        }
    );
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
};

module.exports = mongoose.model("User", userSchema);
