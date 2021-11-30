const express = require('express');
const {engine} = require("express-handlebars");
const app = express();
const {User} = require('./models')
app.engine("handlebars", engine({
    defaultLayout:'main'
}));

app.set('view engine', 'handlebars');

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

app.use('/sources',express.static('sources'));
app.get('/', (req, res)=>{
    res.render("login");
})

app.get('/admin', (req, res)=>{
    res.render('administration');
})

app.post('/admin', async (req, res)=>{
    const {firstname, lastname, email, password, department, position}= req.body;
    console.log(firstname);
    try{

   await User.create({
        firstname,
        lastname,
        email, 
        department, 
        position, 
        password
        
    })
}catch(err){
    if(err){
        return res.render('administration', {
            errortext:err.message
        })
    }
 
}


    
})
app.listen(5001, ()=>{
    console.log("server dinleyir");
})