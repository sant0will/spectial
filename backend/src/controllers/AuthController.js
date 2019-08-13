const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')
const router = express.Router();

router.post("/register", async(req, res) => {
    try{

        const { email } = req.body;

        if(await User.findOne({ email }))
            return  res.status(400).send({ error: "User already exists" });

        // console.log(req.body)
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send(user);
    }catch(e){
        res.status(400).send({ error: 'Registration failed '});
        console.log(e)
    }
})

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(400).send({ error: "User not find" })
    }

    if(! await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: "Invalid password" })
    }

    user.password = undefined;

    const token = jwt.sign({ id: user._id}, authConfig.secret, {
        expiresIn: 86400,
    })

    res.send({ user, token });
})

module.exports = app => app.use('/auth', router);