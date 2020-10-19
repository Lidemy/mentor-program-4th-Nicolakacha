/* eslint-disable consistent-return */
const db = require('../models');

const { Article } = db;
const { Category } = db;

const articleController = {
  getAll: (req, res, next) => {
    const { username } = req.session;
    Article.findAll({
      include: Category,
      where: {
        is_deleted: null,
      },
      order: [['id', 'DESC']],
    })
      .then((articles) => {
        if (req.path === '/') {
          return res.render('index', { articles });
        }
        if (req.path === '/articles') {
          return res.render('articles', { articles });
        }
        if (req.path === '/articles/manage') {
          if (username) {
            return res.render('manage_articles', { articles });
          }
          return res.redirect('/');
        }
        return next();
      })
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  getByCategory: (req, res) => {
    Article.findAll({
      where: {
        CategoryId: req.params.id,
        is_deleted: null,
      },
      include: Category,
      order: [['id', 'DESC']],
    })
      .then((articles) => {
        res.render('article_in_category', { articles });
      })
      .catch((err) => {
        console.log(err);
        return res.redirect('/');
      });
  },

  get: (req, res, next) => {
    Article.findOne({
      include: Category,
      where: {
        id: req.params.id,
      },
    })
      .then((article) => {
        res.render('article', { article });
      })
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  update: (req, res, next) => {
    const { username } = req.session;
    const data = {};
    if (!username) {
      return res.redirect('/');
    }
    Article.findOne({
      include: Category,
      where: {
        id: req.params.id,
      },
    })
      .then((article) => {
        data.article = article;
      })
      .then(() => {
        Category.findAll()
          .then((categories) => {
            data.categories = categories;
            return res.render('edit_article', data);
          })
          .catch((err) => {
            console.log(err);
            return next();
          });
      })
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  handleUpdate: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    const { title, content, CategoryId } = req.body;
    if (title.trim() !== '' && content.trim() !== '') {
      console.log(req.body);
      Article.findOne({
        include: Category,
        where: {
          id: req.params.id,
        },
      })
        .then((article) => {
          article.update({
            title,
            content,
            CategoryId,
          });
          res.redirect(`/article/${req.params.id}`);
        })
        .catch((err) => {
          console.log(err);
          return next();
        });
    } else {
      req.flash('errorMessage', '該填的沒填哦');
      return next();
    }
  },

  add: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    Category.findAll()
      .then((categories) => {
        res.render('add_article', { categories });
      })
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  handleAdd: (req, res, next) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    const { title, content, categoryId } = req.body;
    if (title.trim() !== '' && content.trim() !== '') {
      Article.create({
        title,
        content,
        CategoryId: categoryId,
      })
        .then(() => {
          console.log(categoryId);
          res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
          return next();
        });
    } else {
      req.flash('errorMessage', '該填的沒填哦');
      return next();
    }
  },

  delete: (req, res) => {
    const { username } = req.session;
    if (!username) {
      return res.redirect('/');
    }
    Article.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((article) => {
        article.update({
          is_deleted: 1,
        });
        res.redirect('/articles/manage');
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          return res.redirect('/');
        }
      });
  },
};

module.exports = articleController;
