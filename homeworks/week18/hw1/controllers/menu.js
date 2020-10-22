/* eslint-disable consistent-return */
const db = require('../models');

const { Menu } = db;

const menuController = {
  menu: (req, res) => {
    Menu.findAll({
      order: [['order']],
    })
      .then(menus => res.render('menu', { menus }))
      .catch((err) => {
        console.log(err);
        return res.send('網頁維修中');
      });
  },

  manageMenu: (req, res) => {
    // if (!req.session.username) return res.redirect('/login');
    Menu.findAll({
      order: [['order']],
    })
      .then(menus => res.render('manage_menu', { menus }))
      .catch((err) => {
        console.log(err);
        res.redirect('/');
      });
  },

  add: (req, res) => res.render('manage_menu_add'),

  handleAdd: (req, res) => {
    const {
      title, price, url, order,
    } = req.body;
    if (title === '' || price === '' || url === '' || order === '') {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect('/manage/menu/add');
    }
    Menu.create({
      title, price, url, order,
    })
      .then(() => {
        console.log('add successfully');
        return res.redirect('/manage/menu');
      })
      .catch((err) => {
        if (err.original.errno === 1062) {
          req.flash('errorMessage', '順序不可以重複啦');
          return res.redirect('/manage/menu/add');
        }
        req.flash('errorMessage', err);
        return res.redirect('/manage/menu/add');
      });
  },

  edit: (req, res, next) => {
    Menu.findByPk(req.params.id)
      .then(menu => res.render('manage_menu_edit', { menu }))
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  handleEdit: (req, res) => {
    const {
      title, price, url, order,
    } = req.body;
    if (title === '' || price === '' || url === '' || order === '') {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect('/manage/menu/add');
    }
    Menu.findByPk(req.params.id)
      .then((menu) => {
        menu
          .update({
            title, price, url, order,
          })
          .then(() => {
            console.log('update successfully');
            return res.redirect('/manage/menu');
          })
          .catch((err) => {
            if (err.original.errno === 1062) {
              req.flash('errorMessage', '順序不可以重複啦');
              return res.redirect(`/manage/menu/edit/${req.params.id}`);
            }
          });
      })
      .catch((err) => {
        console.log(err);
        return res.redirect(`/manage/menu/edit/${req.params.id}`);
      });
  },

  delete: (req, res) => {
    Menu.findByPk(req.body.id)
      .then((menu) => {
        console.log('delete successfully');
        menu.destroy();
        return res.redirect('/manage/menu');
      })
      .catch((err) => {
        console.log(err);
        return res.redirect('/manage/menu');
      });
  },
};

module.exports = menuController;
