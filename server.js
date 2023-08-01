if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { mailer } = require('./utils/mailer');
const { schedule } = require('./utils/mail.scheduler');
const app = express();
const PORT = process.env.PORT || 3000;
// mongoose.connect(process.env.MONGODB_URL).then(() => console.log('connected'));
const users = [];

app.set('view-engine','ejs');
// to access the inputs given in the form inside the req.body.[name attribute]
app.use(express.urlencoded({ extended: false }));

app.get('/',(req, res) => {
    res.render('index.ejs', { message:'' });
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', async(req, res) => {
    try {

        let hashedPwd = await bcrypt.hash(req.body.password, 10);
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd,
            interests: req.body.interests
        }

        for(let i=0; i<users.length; i++) {
            if(users[i].email == user.email) {
                console.log('SERVER: user already exists');
                await mailer(1,user);
                res.render('index.ejs', { message:'You have already registered before...' });
                return;
            }
        }

        users.push(user);
        console.log(users);
        console.log('SERVER: user created');
        await mailer(0,user);
        // await mailer(2,user);
        res.render('index.ejs',{ message:'You registered Successfully🤗!!' });

    }catch(e) {

        console.log('SERVER: ' + e);
        res.redirect('/');
    }
});

app.get('/unsubscribe',(req, res) => {
    res.render('unsubscribe.ejs');
})
app.post('/unsubscribe',async(req, res) => {
    
    let userIdx = -1;
    users.forEach((user,i) => {
        if(user.email == req.body.email) {
            userIdx = i;
        }
    });
    if(userIdx == -1) {
        console.log('SERVER: User not found...'); 
    }else {
        let result = await bcrypt.compare(req.body.password, users[userIdx].password);
        if(result) {
            mailer(3,users[userIdx]);
            users.splice(userIdx,1);
            console.log("SERVER: User REMOVED");
            console.log(users);
            res.render('index.ejs', { message:'You have unsubscribed Successfully 😒' });
        }else {
            console.log('SERVER: Password Wrong'); 
        }
    }

})

app.listen(PORT, () => {
    console.log(`SERVER: listening on http://localhost:${PORT}`);
    schedule(users);
});
