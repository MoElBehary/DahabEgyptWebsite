var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var restful = require('node-restful');
var methodOverride = require('method-override');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var categories = require('./routes/categories');
var blogTags = require('./routes/blog/blog-tags');
var blogTopics = require('./routes/blog/blog-topics');
var blogComments = require('./routes/blog/blog-comments');
var homePage = require('./routes/home-page');
var aboutPage = require('./routes/about-page');
var contactPage = require('./routes/contact-page');
var productPage = require('./routes/product-page');
var categoryPage = require('./routes/category-page');
var pagesImg = require('./routes/pages-img');

var app = express();

// login
require('./config/config');
require('./models/db');
require('./config/passportConfig');
const passport = require('passport')
const rtsIndex = require('./routes/index.router');


mongoose.Promise = global.Promise;
// ! (product) => (dahab)
mongoose.connect('mongodb://localhost/dahab', {useNewUrlParser: true, useFindAndModify: false })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize()); //login
app.use('/api', rtsIndex); //login
app.use('/', index);
app.use('/users', users);
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/blog-tags', blogTags);
app.use('/api/blog-topics', blogTopics);
app.use('/api/blog-comments', blogComments);
app.use('/api/home-page', homePage);
app.use('/api/about-page', aboutPage);
app.use('/api/contact-page', contactPage);
app.use('/api/product-page', productPage);
app.use('/api/category-page', categoryPage);
app.use('/api/pages', pagesImg);
app.use('/api/categories/img', express.static(__dirname + '/assets/img/categories'));
app.use('/api/pages/img', express.static(__dirname + '/assets/img/pages'));
app.use('/api/products/img', express.static(__dirname + '/assets/img/products'));
app.use('/api/blog-topics/img', express.static(__dirname + '/assets/img/blog'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
var Category = app.resource = restful.model('category', mongoose.Schema({
  cat_name: String,
  }))
.methods(['get', 'post', 'put', 'delete']);

Category.register(app, '/category');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});
// login
// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    var valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(422).send(valErrors)
  }
  else {
    console.log(err);
  }
});

module.exports = app;
