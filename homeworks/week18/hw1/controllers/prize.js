/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */

const { Op } = require('sequelize');
const db = require('../models');

const { Prize } = db;

const prizeController = {
  prize: (req, res) => {
    Prize.findAll({
      order: [['weight']],
    })
      .then(prizes => res.render('prize_game', { prizes }))
      .catch((err) => {
        console.log(err);
        return res.send('網頁維修中');
      });
  },

  managePrize: (req, res) => {
    Prize.findAll({
      order: [['weight']],
    })
      .then(prizes => res.render('manage_prize', { prizes }))
      .catch(() => res.redirect('/'));
  },

  play: (req, res) => {
    Prize.findAll({
      order: [['weight']],
    })
      .then((prizes) => {
        const weightArr = [];
        for (const prize of prizes) {
          weightArr.push(prize.weight);
        }
        const random = Math.random() * weightArr[weightArr.length - 1];
        return Prize.findOne({
          where: {
            weight: {
              [Op.gt]: random,
            },
          },
        });
      })
      .then((prizeYouGet) => {
        const result = {
          title: prizeYouGet.title,
          content: prizeYouGet.content,
          url: prizeYouGet.url,
        };
        return res.status(200).json(result);
      })
      .catch(err => console.log(err));
  },

  add: (req, res) => res.render('manage_prize_add'),

  handleAdd: (req, res) => {
    const {
      title, content, url, weight,
    } = req.body;
    if (title === '' || content === '' || url === '' || weight <= 0) {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect('/manage/prize/add');
    }
    Prize.create({
      title,
      content,
      url,
      weight,
    })
      .then(() => {
        console.log('add successfully');
        return res.redirect('/manage/prize');
      })
      .catch((err) => {
        if (err.original.errno === 1062) {
          req.flash('errorMessage', '權重數不可以重複啦');
          return res.redirect('/manage/prize/add');
        }
        req.flash('errorMessage', err);
        return res.redirect('/manage/prize/add');
      });
  },

  edit: (req, res, next) => {
    Prize.findByPk(req.params.id)
      .then(prize => res.render('manage_prize_edit', { prize }))
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  handleEdit: (req, res) => {
    const {
      title, content, url, weight,
    } = req.body;
    if (title === '' || content === '' || url === '' || weight <= 0) {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect(`/manage/prize/edit/${req.params.id}`);
    }
    Prize.findByPk(req.params.id)
      .then((prize) => {
        prize
          .update({
            title, content, url, weight,
          })
          .then(() => {
            console.log('update successfully');
            return res.redirect('/manage/prize');
          })
          .catch((err) => {
            if (err.original.errno === 1062) {
              req.flash('errorMessage', '權重數不可以重複啦');
              return res.redirect(`/manage/prize/edit/${req.params.id}`);
            }
          });
      })
      .catch((err) => {
        console.log(err);
        return res.redirect(`/manage/prize/edit/${req.params.id}`);
      });
  },

  delete: (req, res) => {
    Prize.findByPk(req.body.id)
      .then((prize) => {
        console.log('delete successfully');
        prize.destroy();
        return res.redirect('/manage/prize');
      })
      .catch((err) => {
        console.log(err);
        return res.redirect('/manage/prize');
      });
  },
};

module.exports = prizeController;
