/* eslint-disable consistent-return */
const db = require('../models');

const { Question } = db;

const questionController = {
  question: (req, res) => {
    Question.findAll({
      order: [['order']],
    })
      .then(questions => res.render('question', { questions }))
      .catch(() => res.redirect('/'));
  },

  manageQuestion: (req, res) => {
    Question.findAll({
      order: [['order']],
    })
      .then(questions => res.render('manage_question', { questions }))
      .catch(() => res.redirect('/'));
  },

  add: (req, res) => res.render('manage_question_add'),

  handleAdd: (req, res) => {
    const { question, answer, order } = req.body;
    if (question === '' || answer === '' || order <= 0) {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect('/manage/question/add');
    }

    Question.create({
      question,
      answer,
      order,
    })
      .then(() => {
        console.log('add successfully');
        return res.redirect('/manage/question');
      })
      .catch((err) => {
        if (err.original.errno === 1062) {
          req.flash('errorMessage', '順序不可以重複啦');
          return res.redirect('/manage/question/add');
        }
        console.log(err);
        return res.redirect('/manage/question/add');
      });
  },

  edit: (req, res, next) => {
    Question.findByPk(req.params.id)
      .then(question => res.render('manage_question_edit', { question }))
      .catch((err) => {
        console.log(err);
        return next();
      });
  },

  handleEdit: (req, res) => {
    const { question, answer, order } = req.body;
    if (question === '' || answer === '' || order <= 0) {
      req.flash('errorMessage', '該填的沒填哦');
      return res.redirect(`/manage/question/edit/${req.params.id}`);
    }
    Question.findByPk(req.params.id)
      .then((result) => {
        result
          .update({ question, answer, order })
          .then(() => {
            console.log('update successfully');
            return res.redirect('/manage/question');
          })
          .catch((err) => {
            console.log(err);
            if (err.original.errno === 1062) {
              console.log(err.original.errno);
              req.flash('errorMessage', '順序不可以重複啦');
              return res.redirect(`/manage/question/edit/${req.params.id}`);
            }
          });
      })
      .catch((err) => {
        console.log(err);
        return res.redirect(`/manage/question/edit/${req.params.id}`);
      });
  },

  delete: (req, res) => {
    Question.findByPk(req.body.id)
      .then((question) => {
        console.log('delete successfully');
        question.destroy();
        return res.redirect('/manage/question');
      })
      .catch((err) => {
        console.log(err);
        return res.redirect('/manage/question');
      });
  },
};

module.exports = questionController;
