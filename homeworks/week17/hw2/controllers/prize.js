/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */

const { Op } = require('sequelize');
const db = require('../models');

const { Prize } = db;

function checkLogin(username, res) {
  if (!username) {
    return res.redirect('/login');
  }
}

const prizeController = {
  getPrizePage: (req, res) => {
    Prize.findAll({
      order: [['weight']],
    })
      .then(prizes => res.render('prize_game', { prizes }))
      .catch((err) => {
        console.log(err);
        return res.send('網頁維修中');
      });
  },

  getManagePrizePage: (req, res) => {
    checkLogin(req.session.username, res);
    Prize.findAll({
      order: [['weight']],
    })
      .then(prizes => res.render('manage_prize', { prizes }))
      .catch(() => res.redirect('/'));
  },

  getPrize: (req, res) => {
    Prize.findAll({
      order: [['weight']],
    }).then((prizes) => {
      const weightArr = [];
      for (const prize of prizes) {
        weightArr.push(prize.weight);
      }
      const weightSum = weightArr.reduce((prev, curr) => prev + curr);
      const random = Math.random() * weightSum;
      let result = {};
      console.log(weightSum);
      console.log(random);
      console.log(weightArr);
      if (random > weightArr[weightArr.length - 1]) {
        result = {
          title: '唔，沒有中獎呢',
          content: '再加油哦',
          url: '../images/games-bn.jpg',
          random,
          weightSum,
          weightArr,
        };
        return res.status(200).json(result);
      }
      Prize.findOne({
        where: {
          weight: {
            [Op.gt]: random,
          },
        },
      })
        .then((prizeYouGet) => {
          console.log(prizeYouGet.title, prizeYouGet.weight);
          result = {
            title: prizeYouGet.title,
            content: prizeYouGet.content,
            url: prizeYouGet.url,
            random,
            weightSum,
            weightArr,
          };
          return res.status(200).json(result);
        })
        .catch(err => console.log(err));
    });
  },

  add: (req, res) => {
    checkLogin(req.session.username, res);
    return res.render('manage_prize_add');
  },

  handleAdd: (req, res) => {
    checkLogin(req.session.username, res);
    const {
      title, content, url, weight,
    } = req.body;
    if (weight <= 0) {
      req.flash('errorMessage', '權重數要是正整數啦');
      return res.redirect('/manage_prize/add');
    }
    if (title !== '' && content !== '' && url !== '' && weight !== '') {
      Prize.create({
        title, content, url, weight,
      })
        .then(() => {
          console.log('add successfully');
          return res.redirect('/manage_prize');
        })
        .catch((err) => {
          if (err.original.errno === 1062) {
            req.flash('errorMessage', '權重數不可以重複啦');
            return res.redirect('/manage_prize/add');
          }
          console.log(err);
          return res.redirect('/manage_prize/add');
        });
    } else {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect('/manage_prize/add');
    }
  },

  edit: (req, res, next) => {
    checkLogin(req.session.username, res);
    Prize.findByPk(req.params.id)
      .then(prize => res.render('manage_prize_edit', { prize }))
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  handleEdit: (req, res) => {
    checkLogin(req.session.username, res);
    const {
      title, content, url, weight,
    } = req.body;
    if (weight <= 0) {
      req.flash('errorMessage', '權重數要是正整數啦');
      return res.redirect(`/manage_prize/edit/${req.params.id}`);
    }
    if (title !== '' && content !== '' && url !== '' && weight !== '') {
      Prize.findByPk(req.params.id)
        .then((prize) => {
          prize
            .update({
              title, content, url, weight,
            })
            .then(() => {
              console.log('update successfully');
              return res.redirect('/manage_prize');
            })
            .catch((err) => {
              if (err.original.errno === 1062) {
                console.log(err.original.errno);
                req.flash('errorMessage', '權重數不可以重複啦');
                return res.redirect(`/manage_prize/edit/${req.params.id}`);
              }
            });
        })
        .catch((err) => {
          console.log(err);
          return res.redirect(`/manage_prize/edit/${req.params.id}`);
        });
    } else {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect(`/manage_prize/edit/${req.params.id}`);
    }
  },

  delete: (req, res, next) => {
    checkLogin(req.session.username, res);
    Prize.findOne({
      where: {
        id: req.body.id,
      },
    })
      .then((prize) => {
        console.log('delete successfully');
        prize.destroy();
        return next();
      })
      .catch((err) => {
        console.log(err);
        return next();
      });
  },
};

module.exports = prizeController;
