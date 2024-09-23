const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const UserDto = require('../dtos/user.dto');
const tokenService = require('./token.service');
const mailService = require('./mail.service');

class AuthService {
  async register(name, email, password) {
    if (!email || !password || !name) {
      throw new Error('Email and password are required');
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);

    await mailService.sendMail(
      email,
      `${process.env.API_URL}/api/auth/activation/${userDto.id}`
    );

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
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
