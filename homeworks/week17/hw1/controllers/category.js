/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const db = require('../models');

const { Category } = db;
const { Article } = db;
const categoryController = {
  getAll: (req, res) => {
    const { username } = req.session;
    Category.findAll()
      .then((categories) => {
        if (req.path === '/categories/manage' && username) {
          res.render('manage_categories', { categories });
        } else if (req.path === '/categories') {
          res.render('categories', { categories });
        } else {
          return res.redirect('/');
        }
      })
      .catch((err) => {
        console.log(err);
        return res.redirect('/');
      });
  },

  handleUpdate: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    const newCategory = req.body.category;
    if (newCategory.trim() !== '') {
      Category.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then((category) => {
          category
            .update({
              category: newCategory,
            })
            .then(() => next())
            .catch((err) => {
              if (err.original.errno === 1062) {
                req.flash('errorMessage', '重複了啦');
                return next();
              }
              console.log(err);
              return next();
            });
        })
        .catch((err) => {
          console.log(err);
          return next();
        });
    } else {
      req.flash('errorMessage', '不可以空白哦');
      return next();
    }
  },

  handleAdd: (req, res, next) => {
    const { username } = req.session;
    const { category } = req.body;
    if (!username) {
      return res.redirect('/');
    }
    if (category.trim() !== '') {
      Category.create({
        category,
      })
        .then((result) => {
          if (result) {
            return next();
          }
        })
        .catch((err) => {
          if (err.original.errno === 1062) {
            req.flash('errorMessage', '重複了啦');
            return next();
          }
          console.log(err);
          return next();
        });
    } else {
      req.flash('errorMessage', '不可以空白哦');
      return next();
    }
  },

  delete: (req, res) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    Category.findOne({
      include: Article,
      where: {
        id: req.params.id,
      },
    })
      .then((category) => {
        if (category.Articles.length === 0) {
          category.destroy();
          return res.redirect('/categories/manage');
        }
        req.flash('errorMessage', '這個分類還有文章耶');
        return res.redirect('/categories/manage');
      })
      .catch((err) => {
        console.log(err);
        return res.redirect('/categories/manage');
      });
  },
};

module.exports = categoryController;
