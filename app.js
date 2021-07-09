let port = 3000;

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const indexRouter = require('./routes');
const barsRouter = require('./routes/bars');
const cocktailsRouter = require('./routes/cocktails');


let app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express : app,
    watch : true,
});
sequelize.sync({ force: false})
    .then(() => {
        console.log('connection success');
    })
    .catch((err) => {
        console.error(err);
    })


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.use('/', indexRouter);
app.use('/bar', barsRouter);
app.use('/cocktail', cocktailsRouter);



app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없음.`);
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(port, function() {
    console.log('server on! : ' + port);
});

//connection.end();