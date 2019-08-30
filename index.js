const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req,res){
    res.render('index');
})

app.get('/about', function(req,res){
    res.render('about');
})

app.get('/login', function(req,res){
    res.render('login');
})

app.get('/contact', function(req,res){
    res.render('contact');
})

app.post('/contact/send', function(req,res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'praveenkarmakar2020@gmail.com',
            pass: 'googleaccopk24'
        }
    });
    var mailOptions = {
        from: 'Praveen Karmakar <praveenkarmakar2020@gmail.com>',
        to: 'praveen.karmakar@gmail.com',
        subject: 'wwebsite submission',
        text: 'you have a submission ... Name:' +req.body.name+ 'email:'+req.body.email+ 'message' +req.body.message,
        html: '<p>you have a submission</p><ul><li>Name:'+req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message:'+req.body.message+'</ul>',
         
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('message sent:'+info.response);
            res.redirect('/');
        }
    })
});

app.listen(3000);
console.log('server is running on port 3000');