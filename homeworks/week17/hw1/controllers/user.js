/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const saltRounds = 10;

const db = require('../models');

const { User } = db;

const userController = {
  get: (req, res) => {
    res.render('about');
  },

  login: (req, res) => {
    res.render('login');
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填哦！');
      return next();
    }
    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        if (!user) {
          req.flash('errorMessage', '使用者帳號或密碼錯誤');
          return next();
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            req.flash('errorMessage', '使用者帳號或密碼錯誤');
            return next();
          }
          req.session.username = user.username;
          res.redirect('/');
        });
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },

  register: (req, res) => {
    res.render('register');
  },

  handleRegister: (req, res, next) => {
    const { username, password, password2 } = req.body;
    if (!username || !password || !password2) {
      req.flash('errorMessage', '該填的沒填哦');
      return next();
    }

    if (password !== password2) {
      req.flash('errorMessage', '輸入的密碼不一致');
      return next();
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      User.findOne({
        where: {
          username,
        },
      }).then((user) => {
        if (user === null || user.username !== username) {
          User.create({
            username,
            password: hash,
          })
            .then(() => {
              req.session.username = username;
              res.redirect('/');
            })
            .catch((err2) => {
              req.flash('errorMessage', err2.toString());
              return next();
            });
        } else {
          req.flash('errorMessage', '使用者已存在');
          return next();
        }
      });
    });
  },
};

module.exports = userController;
