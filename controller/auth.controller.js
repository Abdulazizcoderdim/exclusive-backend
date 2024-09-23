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
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
