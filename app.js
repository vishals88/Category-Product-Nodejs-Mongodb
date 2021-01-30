const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const logger= require('morgan');

const app = express();

const IndexRouter = require('./routes/index');
const CatRouter = require('./routes/category');
const ProdRouter = require('./routes/product');

const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const url = ('mongodb://localhost:27017/CatProd')
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log("Database Connected");
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use('/', IndexRouter);
app.use('/category', CatRouter);
app.use('/product', ProdRouter);

app.listen(7777, () => {
    console.log("Server Started");
});