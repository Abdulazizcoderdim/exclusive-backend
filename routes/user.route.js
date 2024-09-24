const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

router.post('/:userId/favorite', userController.favorite);
router.post('/:userId/unfavorite', userController.unfavorite);
router.get('/:userId', userController.getUser);
router.post('/:userId/view', userController.view)
router.post('/:userId/unview', userController.unview)

module.exports = router;
