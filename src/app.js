const http =  require ('http');
const express= require ('express');
const app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const path=require('path');
var cors=require('cors');
// var expressLayouts = require('express-ejs-layouts');
require("./db/conn")
const User=require('./models/usermessage.js');
const schema=require('./models/login.js')
const staticpath=path.join(__dirname,"../public");
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.urlencoded({extended : false}));
app.use('/public', express.static(path.join('../templates')))
const jwt=require('jsonwebtoken');
const JWT_KEY="rjeo23j334";
const bcrypt=require('bcrypt');
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
const axios=require('axios');
app.use(cors());
app.use(cookieParser());
// app.use(expressLayouts);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,"../templates/views"));
// app.set('layout',path.join(__dirname,'../templates/views'));
// const partialpath=path.join(__dirname,"../templates/partials");
app.use(express.static(path.join(__dirname, '../templates')))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/',(req,res)=>{
    res.render('signup.ejs');
})

app.get('/login',async (req,res)=>{
    try{
        if (!req.cookies || !req.cookies.isLoggedIn) throw err;
        var x= jwt.verify(req.cookies.isLoggedIn,JWT_KEY);
        if (x) {
            setTimeout(()=>{
                res.render('index.ejs');
            },1000);
        }
        else{
            throw err;
        }
    }
    catch(err){
        const form=req.query;
        // console.log(form);
        try{
            const user = await schema.exists({Username:form.Username,Password:form.Password});
            if (!user) throw err;
            let token=jwt.sign(form,JWT_KEY,{expiresIn:"2000s"});
            res.cookie('isLoggedIn',token,{maxAge:1000*60*60,httpOnly:true})
            setTimeout(()=>{
                res.render('index.ejs');
            },5000);
        }
        catch(err){
            console.log(err);
            setTimeout(()=>{
                res.render('login.ejs');
            },2000);
        }
    }
})

app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

app.get('/index',(req,res)=>{
    res.render('index.ejs')
})

app.post('/setcookie',async (req,res)=>{
    const userdata=new schema(req.body);
    try{
        let saving=await userdata.save();
        let token=jwt.sign(req.body,JWT_KEY,{expiresIn:"2000s"});
        res.cookie('isLoggedIn',token,{maxAge:1000*60*60,httpOnly:true})
        res.json({
            done:true
        })
    }catch(err){
        // console.log(err)
        res.json({
            done:false,
            error:err
        })
    }
})

app.post('/after_contact',async(req,res)=>{
    console.log(req.body);
    console.log(req.url);
    try{

        //const UserData = User.create(req.body);
        const UserData = new User(req.body);
        
        var t=await UserData.save();
        // console.log(t.json());
        var hello=await User.findOneAndUpdate({email:"sauhaardbatra@gmail.com"},{name:"S.Batra"});
        // console.log(hello);
        res.render('after_contact.ejs',{body:req.body});
    }
    catch(error){
        res.status(500).send(error);
    }
    
})



app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})