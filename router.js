var express = require('express');
var router = express.Router();

const credential = {
    email:"robin@robin.com",
    password: "robin123"
}

//login user
router.post('/login',(req, res)=>{
    if(req.body.email == credential.email && req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/router/dashboard');
        // res.end("Login Sucessfull");
    }else{
        // res.end("Invalid Username  ")
        // res.redirect('/');
        res.render('base',{title:"Express",invalid:"Wrong Password"})
    }
});

//Router for dashboard
router.get('/dashboard',(req, res)=>{
    if (req.session.user) {
        res.render('dashboard', {user:req.session.user});
    }else{
        // res.send("Unauthorized user");
        res.render('base',{title:"Express",sessionOver:"Login Again"})
    }
})

//router for
router.get('/logout',(req, res)=>{
    req.session.destroy(function(err){
        if (err) {
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title: "Express", logout:"Logout Successfully...!"})
        }
    })
})

module.exports=router;