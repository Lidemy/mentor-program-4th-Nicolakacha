/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const prizeController = require('../controllers/prize');
const questionController = require('../controllers/question');
const menuController = require('../controllers/menu');
const orderController = require('../controllers/order');

function back(req, res) {
  res.redirect('back');
}

function checkLogin(req, res, next) {
  if (!req.session.username) return res.redirect('/login');
  next();
}

router.get('/register', userController.register);
router.post('/register', userController.handleRegister, back);

router.get('/login', userController.login);
router.post('/login', userController.handleLogin, back);
router.get('/logout', userController.logout);

router.get('/', userController.home);
router.get('/menu', menuController.menu);
router.get('/question', questionController.question);
router.get('/prize', prizeController.prize);

router.get('/manage', checkLogin, userController.manage);
router.get('/manage/menu', checkLogin, menuController.manageMenu);
router.get('/manage/question', checkLogin, questionController.manageQuestion);
router.get('/manage/prize', checkLogin, prizeController.managePrize);
router.get('/manage/order', checkLogin, orderController.manageOrder);

router.get('/manage/prize/add', checkLogin, prizeController.add);
router.post('/manage/prize/add', checkLogin, prizeController.handleAdd);
router.get('/manage/prize/edit/:id', checkLogin, prizeController.edit, back);
router.post('/manage/prize/edit/:id', checkLogin, prizeController.handleEdit);
router.post('/manage/prize/delete', checkLogin, prizeController.delete);

router.get('/manage/question/add', checkLogin, questionController.add);
router.post('/manage/question/add', checkLogin, questionController.handleAdd);
router.get('/manage/question/edit/:id', checkLogin, questionController.edit, back);
router.post('/manage/question/edit/:id', checkLogin, questionController.handleEdit);
router.post('/manage/question/delete', checkLogin, questionController.delete);

router.get('/manage/menu/add', checkLogin, menuController.add);
router.post('/manage/menu/add', checkLogin, menuController.handleAdd);
router.get('/manage/menu/edit/:id', checkLogin, menuController.edit, back);
router.post('/manage/menu/edit/:id', checkLogin, menuController.handleEdit);
router.post('/manage/menu/delete', checkLogin, menuController.delete);

router.get('/getPrize', prizeController.play);
router.post('/cart', orderController.getCart);

module.exports = router;
