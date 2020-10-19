const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5556;
const userController = require('./controllers/user');
const prizeController = require('./controllers/prize');

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
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.username = req.session.username;
  next();
});

app.route('/register')
  .get(userController.register)
  .post(userController.handleRegister, back);

app.route('/login')
  .get(userController.login)
  .post(userController.handleLogin, back);
app.get('/logout', userController.logout);

app.get('/manage_prize', prizeController.getManagePrizePage);

app.route('/manage_prize/add')
  .get(prizeController.add)
  .post(prizeController.handleAdd);

app.route('/manage_prize/edit/:id')
  .get(prizeController.edit, back)
  .post(prizeController.handleEdit);

app.post('/manage_prize/delete', prizeController.delete, back);

app.get('/', prizeController.getPrizePage);
app.get('/getPrize', prizeController.getPrize);

app.listen(port, () => {
  console.log(`express prize app listening on port ${port}`);
});
