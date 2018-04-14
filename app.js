const experss = require('express'),
    app = experss(),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    hbs = require('hbs'),
    userRoutes = require('./routes/user'),
    photographerRoutes = require('./routes/photographer'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    multer = require('multer');

hbs.registerPartials(__dirname + '/views/user/partials/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(experss.static(__dirname + '/views/'));
app.use(experss.static(__dirname + '/public/'));
app.set('view engine', 'hbs');
// app.use(multer({ dest: './uploads/',
//     rename: function (fieldname, filename) {
//       console.log(filename);
//         return filename;
//     },
//    }).any());

// mongoose.connect('mongodb://localhost:27017/photocalypse');
// var Item = new mongoose.Schema(
//     { img: 
//         { data: Buffer, contentType: String }
//     }
//   );
// var Item = mongoose.model('Clothes', Item);

// app.post('/photo',function(req,res){
//     var newItem = new Item();
//     // res.send(JSON.stringify(req.files, undefined, 2));
//     newItem.img.data = fs.readFileSync(req.files[0].path)
//     newItem.img.contentType = 'image/png';
//     newItem.save();
//     res.send(req.files[0].path);
//    });


app.use('/', userRoutes);
app.use('/photographer/', photographerRoutes);

app.listen(PORT, () => console.log(`SERVER is listening to port ${PORT}`));