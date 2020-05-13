const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../model/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                fullName: req.body.fullName,
                contact: req.body.contact, 
                adminUser: req.body.adminUser
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "Added user",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Invalid authentication credentials!"
                    });
                });
        });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    messsage: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    messsage: "Auth failed"
                });
            }

            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id, adminUser: fetchedUser.adminUser },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                adminUser: fetchedUser.adminUser
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                messsage: "Invalid authentication credentials!"
            });
        })
}