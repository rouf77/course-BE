const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength:3,
        maxLength:20,
    },
    lastName : {
        type: String,
        required: true,
        minLength:3,
        maxLength:20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        minLength:8,
        maxLength:20,
        validate: {
            validator: function(password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
            },
            message: "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters."
        }
    }
});
const User = mongoose.model("User",userSchema);

module.exports = User;