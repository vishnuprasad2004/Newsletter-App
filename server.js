if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
// mongoose.connect(process.env.MONGODB_URL).then(() => console.log('connected'));
const users = [];

app.set('view-engine','ejs');
// to access the inputs given in the form inside the req.body.[name attribute]
app.use(express.urlencoded({ extended: false }));

app.get('/',(req, res) => {
    res.render('index.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', async(req, res) => {
    try {
        let hashedPwd = await bcrypt.hash(req.body.password, 10);
        users.push({
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd,
            dob: req.body.dob,
            interests: req.body.interests
        })
        console.log(users);
        res.redirect('/dashboard');
    }catch(e) {
        res.redirect('/');
    }
});

app.get('/dashboard',(req, res) => {
    res.render('dashboard.ejs');
})

app.get('/login',(req, res) => {
    res.render('login.ejs');
});
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
