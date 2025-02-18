let express = require("express");
let userRouter = express.Router();
let Errorhandler = require('../utils/errorhandler');
let asyncError = require('../middleware/asyncErrorCatch');
let UserModel = require('../models/userModel');
let bcrypt = require('bcrypt');
let sendmail = require('../utils/mailer');
let jwt = require('jsonwebtoken');

userRouter.post("/signup", asyncError(async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return next(new Errorhandler("Please Provide Email And Password", 400));
    }
    let User = await UserModel.findOne({ email });
    if (User) {
        return next(new Errorhandler("Please login", 400));
    }

    bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
            return next(new Errorhandler("Please Provide Password", 400));
        }
        const newuser = await UserModel.create({
            name,
            email,
            password: hash
        });
        let token = jwt.sign({ id: newuser._id }, 'secret', { expiresIn: 60 * 60 * 60 * 30 });
        let activation_url = `http://localhost:4534/user/activation/${token}`;
        try {
            await sendmail({
                email: newuser.email,
                subject: "Account Activation",
                message: `Hello ${newuser.name}, click on the link to activate your account ${activation_url}`
            });
            await newuser.save();
        } catch (error) {
            return next(new Errorhandler("Internal server error", 500));
        }
    });
}));

userRouter.get(
    "/activation/:token",
    asyncError(async (req, res, next) => {
        let token = req.params.token;
        if (!token) {
            return next(new Errorhandler("Token not found", 404));
        }
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                return next(new Errorhandler("Token is not valid", 400));
            }

            let id = decoded.id;
            await UserModel.findByIdAndUpdate(id, { isActivated: true });

            res.status(200).json({ message: "User Created Successfully" });
        });
    })
);

module.exports = userRouter;