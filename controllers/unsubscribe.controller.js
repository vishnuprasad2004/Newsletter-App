

const getUnsubscribe = (req, res) => {
    res.render('unsubscribe.ejs');
}

const postUnsubscribe = async(req, res) => {
    
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

}

module.exports = { getUnsubscribe, postUnsubscribe };