const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const UserDto = require('../dtos/user.dto');
const tokenService = require('./token.service');
const mailService = require('./mail.service');
const BaseError = require('../errors/base.error');

class AuthService {
  async register(name, email, password) {
    if (!email || !password || !name) {
      throw BaseError.BadRequest('Email and password are required');
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      throw BaseError.BadRequest('User already exists');
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
      throw BaseError.BadRequest('User not found');
    }
    if (!user.isActivated) {
      user.isActivated = true;
      await user.save();
    }

    return user;
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw BaseError.BadRequest('User is not defined');
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw BaseError.BadRequest('Password is incorrect');
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.UnauthorizedError('Bad authorization!!!');
    }

    const userPayload = tokenService.validateRefreshTooken(refreshToken);
    console.log(userPayload);
    const tokenDb = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDb) {
      throw BaseError.UnauthorizedError('Bad authorization');
    }

    const user = await userModel.findById(userPayload.id);

    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

module.exports = new AuthService();
