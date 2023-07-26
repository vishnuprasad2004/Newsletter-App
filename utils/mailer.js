const { transporter } = require('./mailer.config');
const { getNews } = require("./getNews");

let messages = [
    // signed In
    {
        subject:"Welcome to Newsletter App",
        content:`
        <div>
            WELCOME TO <span>DAILY DIGEST
        `
    },
    {
        subject:"Today's Headlines",
        content:""
    }
] 

/**
 * 
 * @param {Number} status 
 * @param {Object} userData 
 * 0 => user signed in,
 * 1 => news mail
 * 2 => unsubscribe
 */
const mailer = async(status, userData) => {

    let message;
    if(status == 0) {
        message = messages[0];
    }else if(status == 1) {
        message = messages[1];
        let newsContentArray = await getNews();
        newsContentArray.forEach(element => {
            message.content += `
            <div>
                <h2>${element.title}</h2>
                <br>
                <img src="${element.urlToImage}" height="80%">
                <br>
                <p>${element.description}</p>
            </div>`;
        });
    }
 
    let emailMessage = {
        from: `"News 👻😎🫡" <${process.env.EMAIL}>`, 
        to: userData.email, 
        subject: `${message.subject}`, 
        html:
            `<div style="box-shadow:0 0 5px;padding:2rem;border-radius:16px;background-color:#ffffff;margin:10px;">
                ${message.content}
            </div>
            <div>
                <h5>Vishnu Prasad Korada</h5>
                <a href="https://github.com/vishnuprasad2004">My GitHub</a>
                <div>
                    <a href="http://localhost:8080/dashboard"> Want to Unsubscribe </a>
                </div>
            </div>
            `, 
    };

    let info = await transporter.sendMail(emailMessage)
        .then((info) => {
            console.log("You sent an email successfully...!!!\nMessage sent 👍");    
        }).catch(error => {
            console.log(error.message);
            return;
        });
    
}

module.exports = { mailer };