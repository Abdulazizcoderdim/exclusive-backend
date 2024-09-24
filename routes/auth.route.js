const express = require('express');
const authController = require('../controller/auth.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post(
  '/register',
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters'),
  authController.register
);
router.get('/activation/:id', authController.activation);
router.post(
  '/login',
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters'),
  authController.login
);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/get-users', authMiddleware, authController.getUser);
router.put('/edit-user/:id', authController.editUser);

module.exports = router;
