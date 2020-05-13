const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    contact: {type: String, required: true},
    adminUser: {type: Boolean, required: false, default: false}},
    { timestamps: true });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema); 