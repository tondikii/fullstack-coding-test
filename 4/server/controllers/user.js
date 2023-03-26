const {User} = require("../models");
const {comparePassword} = require("../helpers/bcrypt");
const {sign} = require("../helpers/jwt");

const register = async (req, res, next) => {
  try {
    const {name, username, password} = req.body;
    const user = await User.create({
      name,
      username,
      password,
    });
    res.status(201).json({user});
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    if (!username || !password) throw {name: "Bad Request Login"};
    const user = await User.findOne({where: {username}});
    if (!user) throw {name: "Invalid Username"};
    if (!comparePassword(password, user.password))
      throw {name: "Invalid Password"};
    const payload = {
      id: user.id,
    };
    const token = sign(payload);
    res.status(200).json({
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {register, login};
