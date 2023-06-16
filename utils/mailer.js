const nodemailer = require('nodemailer');

const mailer = async(data) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", 
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL , 
            pass: process.env.PASSWORD, 
        },
    });
 
    let message = {
        from: `"News 👻😎🫡" <${env.EMAIL}>`, 
        to: data.email, 
        subject: "Today's Report", 
        html:
            `<div style="box-shadow:0 0 5px;padding:2rem;border-radius:16px;background-color:#ffffff;margin:10px;">
            <h1>${data.message}</h1>
            </div>
            <div>
            <h4>Vishnu Prasad Korada</h4>
            <a href="https://github.com/vishnuprasad2004">My GitHub</a>`, 
    };

    let info = await transporter.sendMail(message)
        .then((info) => {
            console.log("You sent an email successfully...!!!\nMessage sent 👍");    
        }).catch(error => {
            console.log(error);
            return;
        });
    
}