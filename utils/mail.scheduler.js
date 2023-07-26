const { mailer } = require("./mailer");
const cron = require('node-cron');

// let users = [];

function schedule(users) {
    // minute hour day-of-month month day-of-the-week
    cron.schedule('2 * * * *', ()=> {
        users.forEach(user => {
            mailer(1,user).then(()=> {
                console.log(`email sent successfully to ${user.email}`);
            }).catch((e)=> {
                console.log(e.message);
            })
        });
    });
}


module.exports = { schedule };