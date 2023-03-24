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

const staticpath=path.join(__dirname,"../public");
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.urlencoded({extended : false}));
app.use('/public', express.static(path.join('../templates')))

app.use(bodyParser.json());

app.use(cors());

// app.use(expressLayouts);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,"../templates/views"));
// app.set('layout',path.join(__dirname,'../templates/views'));
// const partialpath=path.join(__dirname,"../templates/partials");
app.use(express.static(path.join(__dirname, '../templates')))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/',(req,res)=>{
    res.render('index.ejs');
})


app.post('/after_contact',async(req,res)=>{
    //func("sr_contact-only");
    //console.log('yo');
    try{
        const UserData = new User(req.body);
        var t=await UserData.save();
        // console.log(t.json());
        res.render('after_contact.ejs',{body:req.body});
    }
    catch(error){
        res.status(500).send(error);
    }
    
})



app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})