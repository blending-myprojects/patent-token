const express = require('express');
const router = express.Router();
const patentController = require('../controllers/patentController');

// 특허 발행 라우트
router.post('/mint', patentController.mintPatent);

// 토큰 전송 라우트
router.post('/transfer', patentController.transferTokens);

// 사용자 특허 목록 조회 라우트
router.get('/user/:userAddress', patentController.getUserPatents);

module.exports = {
    router
};