const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

router.post('/signin', userController.signin.post);

router.post('/signup', userController.signup.post);

router.get('/info', userController.info.get);

router.post('/withDrawal', userController.withDrawal.post);

router.post('/infoUpdate', userController.infoUpdate.post);

router.post('/logout', userController.logout.post);

module.exports = router;
