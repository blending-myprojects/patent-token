const express = require('express');
const router = express.Router();
const patentController = require('../controllers/patentController');

/* 컨트랙트 버전 1 (컨트랙트 당 다수 특허 토큰 발행 가능)

// 특허 발행 라우트
router.post('/mint', patentController.mintPatent);

// 토큰 전송 라우트
router.post('/transfer', patentController.transferTokens);

// 사용자 특허 목록 조회 라우트
router.get('/user/:userAddress', patentController.getUserPatents);
*/


/* 컨트랙트 버전 2 (컨트랙트 당 단일 특허 토큰 발행) */

// 특허 정보 조회 라우트
router.get('/info', patentController.getPatentInfo);

// 특허 총 발행량 조회 라우트
router.get('/totalSupply', patentController.getTotalSupply);

// 사용자 특허 소유량 조회 라우트
router.get('/balance/:address', patentController.getBalanceOf);


module.exports = {
    router
};