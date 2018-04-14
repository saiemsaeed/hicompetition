const experss = require('express'),
    app = experss(),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    hbs = require('hbs'),
    userRoutes = require('./routes/user');

hbs.registerPartials(__dirname + '/views/user/partials/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(experss.static(__dirname + '/views/'));
app.use(experss.static(__dirname + '/public/'));

app.set('view engine', 'hbs');

app.use('/', userRoutes);

app.listen(PORT, () => console.log(`SERVER is listening to port ${PORT}`));