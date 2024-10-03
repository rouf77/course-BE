const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModels");

const signup = async (req, res) => {
    console.log("hitted");
    try {
        console.log(req.body);
        const { firstName, lastName, password, email } = req.body;

        const userExists = await User.findOne({ email }); // Use findOne instead of find

        if (userExists) {
            return res.send("User already exists");
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email,
            firstName,
            lastName,
            password: hashPassword, // Make sure the field name matches your schema
        });

        const newUserCreated = await newUser.Save(); 

        console.log(newUserCreated);
        if (!newUser) {
            return res.send("User not created");
        }

        const token = generateToken(email);
        res.send(token);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

const signin = async (req, res) => { // Fix typo (req.res => req, res)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        console.log(user);
        if (!user) {
            return res.send("User not found");
        }

        const matchPassword = await bcrypt.compare(password, user.password); // Compare with user.password

        if (!matchPassword) {
            return res.send("Invalid password");
        }

        const token = generateToken(email);
        return res.send(token); // Send the token response
    } catch (error) {
        console.log(error);
        return res.status(500).send("An error occurred during signin");
    }
};

module.exports = {
    signup,
    signin,
};
