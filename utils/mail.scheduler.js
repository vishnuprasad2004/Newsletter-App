const { mailer } = require("./mailer");
const cron = require('node-cron');


function schedule(users) {
    // minute hour day-of-month month day-of-the-week
    cron.schedule('1 * * * *', ()=> {
        users.forEach(user => {
            mailer(2,user).then(()=> {
                console.log(`SCHEDULER: email sent successfully to ${user.email}`);
            }).catch((e)=> {
                console.log('SCHEDULER: ' + e.message);
            })
        });
    });
}


module.exports = { schedule };