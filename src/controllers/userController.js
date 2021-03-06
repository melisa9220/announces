
const bcrypt = require('bcrypt');
const validateUser = require('../models/mongodb/validationUser');
const validateLogin = require('../models/mongodb/validationLogin');
const userRepository = require('../repository/userRepository');
const service = require('../service');


exports.createUser = async function (req, res) {
    try {
        const validatedData = validateUser.validate({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        if (!validatedData.error) {
            username = req.body.username.toLowerCase();
            const gotUser = await userRepository.getUser(username);

            if (gotUser) {
                return res.status(409).send({ msg: "Username really exist" });
            } else {
                passwordCrypt = bcrypt.hashSync(req.body.password, 10);
                const user = {
                    name: req.body.name,
                    username: username,
                    password: passwordCrypt
                };
                const newUser = await userRepository.saveUser(user);

                return res.status(201).send({ createdUser: newUser, msg: "Created User" });
            }
        } else {

            return res.status(400).send({ msg: "error invalids data" });
        }
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
};

exports.authenticateUser = async function (req, res) {
    try {
        const validatedData = validateLogin.validate({
            username: req.body.username,
            password: req.body.password
        });

        if (!validatedData.error) {
            const user = await userRepository.getUser(req.body.username.toLowerCase());
            if (user) {
                const match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    return res.status(200).send({ token: service.createToken(user) });
                } else {
                    return res.status(404).send({ msg: "Password is incorrect" });
                }
            } else {
                return res.status(404).send({ msg: "User doesn't find, verify your data" });
            }

        } else {
            return res.status(400).send({ msg: "error invalids data" });
        }

    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
};