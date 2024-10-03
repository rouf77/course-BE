const jsonwebToken = require("jsonwebtoken");
require("dotenv").config();

const secretkey = process.env.SE;

const generateToken = (email) => {
    return jsonwebToken.sign({ data: email}, secretkey, {expiresIn: "id"});
};

module.exports = generateToken;