const userService = require('../service/user.service');

class UserController {
  async favorite(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const user = await userService.favorite(userId, productId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await userService.getUser(userId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unfavorite(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const user = await userService.unfavorite(userId, productId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new UserController();