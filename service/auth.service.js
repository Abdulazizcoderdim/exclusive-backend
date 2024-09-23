const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const UserDto = require('../dtos/user.dto');

class AuthService {
  async register(name, emailOrPhone, password) {
    if (!emailOrPhone || !password || !name) {
      throw new Error('Email and password are required');
    }

    const existUser = await userModel.findOne({ emailOrPhone });

    if (existUser) {
      throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      emailOrPhone,
      password: hashPassword,
    });
    // email service

    // jwt generate

    const userDto = new UserDto(user);

    // token
    return { userDto };
  }

  async activation(id) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isActivated) {
      user.isActivated = true;
      await user.save();
    }

    return user;
  }
}

module.exports = new AuthService();
