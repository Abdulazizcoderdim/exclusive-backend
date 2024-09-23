const authService = require('../service/auth.service');

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const data = await authService.register(name, email, password);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error);
    }
  }

  async activation(req, res, next) {
    try {
      const userId = req.params.id;
      await authService.activation(userId);
      return res.redirect('https://sammi.ac');
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error);
    }
  }
}

module.exports = new AuthController();
