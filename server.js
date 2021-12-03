const express = require('express');
const { engine } = require("express-handlebars");
const app = express();
const { User, Company,user_company} = require('./models');
const company = require('./models/company');
app.engine("handlebars", engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.urlencoded({    
    extended: true
}));
app.use(express.json());

app.use('/sources', express.static('sources'));
app.get('/', (req, res) => {
    res.render("login");
})

app.get('/admin', (req, res) => {
    res.render('administration');
})

app.post('/admin', async (req, res) => {
    const { firstname, lastname, email, password, department, position , company} = req.body;
    // console.log(firstname);

    try {

        var us = await User.create({
            firstname,
            lastname,
            email,  
            department,
            position,
            password


        })
        // console.log(us.dataValues.id);
        // const comp = await Company.create({
        //     name: company
        // })
        // await us.addProfile(comp, { through: { selfGranted: false } });
       
    } catch (err) {
        if (err) {
            return res.render('administration', {
                errortext: err.message
            })
        }

    }
    var b = await Company.findOne({
        raw:true,
        where:{
            name:company
        }
    });
    // console.log(b);

    await user_company.create({
        UserId:us.dataValues.id,
        CompanyId:b.id
    })
})

app.get('/company', (req, res) => {
    res.render('company')
})


app.post('/company', async (req, res) => {
    const { company } = req.body


    try {
        await Company.create({
            name: company
        })
    } catch (err) {
        console.log(err)
    }

})

app.get('/users', (req, res)=>{
     res.render('users');
})

app.post('/users', async (req, res)=>{
    const {company} = req.body;
    const result = await Company.findOne({
        where: { name: company},
        include: User   
      });
    //   console.log(result.dataValues.id);
    console.log(result.Users)
})
app.listen(5001, () => {
    console.log("server dinleyir");
})