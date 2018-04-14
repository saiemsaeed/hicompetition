const experss = require('express'),
    app = experss(),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    hbs = require('hbs'),
    userRoutes = require('./routes/user'),
    photographerRoutes = require('./routes/photographer'),
    cookieParser = require('cookie-parser')
    db = require('./models/'),
    methodOverride = require('method-override');
    fs = require('fs'),
    multer = require('multer'),
    crypto = require('crypto'),
    Grid = require('gridfs-stream'),
    GridFsStorage = require('multer-gridfs-storage');

hbs.registerPartials(__dirname + '/views/user/partials/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(experss.static(__dirname + '/views/'));
app.use(experss.static(__dirname + '/public/'));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.set('view engine', 'hbs');


app.use('/', userRoutes);
app.use('/photographer', photographerRoutes);

app.listen(PORT, () => console.log(`SERVER is listening to port ${PORT}`));