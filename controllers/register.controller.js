

const getRegistration =  (req, res) => {
    res.render('register.ejs');
}

const postRegistration = async(req, res) => {
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
        await mailer(2,user);
        res.render('index.ejs',{ message:'You registered Successfully🤗!!' });

    }catch(e) {

        console.log('SERVER: ' + e);
        res.redirect('/');
    }
}



module.exports = { getRegistration, postRegistration };