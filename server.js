const express = require('express');
const { engine } = require("express-handlebars");
const app = express();
const { User, Company } = require('./models')
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

        const A = await User.create({
            firstname,
            lastname,
            email,
            department,
            position,
            password


        })
        console.log(A.data)
    } catch (err) {
        if (err) {
            return res.render('administration', {
                errortext: err.message
            })
        }

    }
    const b = await Company.findOne({
        raw:true,
        where:{
            name:company
        }
    });
    console.log(b.id);
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
app.listen(5001, () => {
    console.log("server dinleyir");
})