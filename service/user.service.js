const userModel = require('../models/user.model');

class UserService {
  async favorite(userId, productId) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.favoriteProducts.includes(productId)) {
      user.favoriteProducts.push(productId);
      await user.save();
      return user;
    } else {
      throw new Error('Product already in favorites');
    }
  }

  async unfavorite(userId, productId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.favoriteProducts = user.favoriteProducts.filter(
      favoriteId => favoriteId.toString() !== productId
    );
    await user.save();

    return user;
  }

  async getUser(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = new UserService();
