const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5566;
const userController = require('./controllers/user');
const articleController = require('./controllers/article');
const categoryController = require('./controllers/category');

function back(req, res) {
  res.redirect('back');
}

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(flash());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

app.route('/register')
  .get(userController.register)
  .post(userController.handleRegister, back);

app.route('/login')
  .get(userController.login)
  .post(userController.handleLogin, back);
app.get('/logout', userController.logout);

app.get('/', articleController.getAll, back);
app.get('/about', userController.get);

app.get('/articles', articleController.getAll, back);
app.get('/articles/manage', articleController.getAll, back);
app.get('/article/manage', articleController.add, back);
app.get('/article/manage/:id', articleController.update, back);
app.post('/article/new', articleController.handleAdd, back);
app.post('/article/delete/:id', articleController.delete, back);
app
  .route('/article/:id')
  .post(articleController.handleUpdate, back)
  .get(articleController.get, back);

app.get('/categories', categoryController.getAll);
app.get('/categories/manage', categoryController.getAll);
app.get('/category/:id', articleController.getByCategory);
app.post('/category/new', categoryController.handleAdd, back);
app.post('/category/manage/:id', categoryController.handleUpdate, back);
app.post('/category/delete/:id', categoryController.delete, back);

app.listen(port, () => {
  console.log(`express blog app listening on port ${port}`);
});
