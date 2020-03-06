const express = require('express');
const router = express.Router();

const { messageController } = require('../controller');

router.get('/getMessage', messageController.getMessage.get);

router.post('/sendMessage', messageController.sendMessage.post);

router.get('/getMessageList', messageController.getMessageList.get);

module.exports = router;
