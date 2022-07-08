const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require("uuid");

const router = require("./router");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use((req, res, next) => {
    if (!req.user) {
      res.header("cache-control", "private,no-cache,no-store,must revalidate");
      res.header("Express", "-3");
    }
    next();
  });

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
}))

app.use('/router',router);

//home rout
app.get('/', (req, res)=>{
    if (req.session.user) {
        res.render('base', {title:"Login System"})
    }else{
        res.render('base',{title:"Login System"});
    }
})

app.listen(port, ()=>{
    console.log("Listen to the server http://localhost:3000");
})