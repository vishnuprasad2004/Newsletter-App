const { transporter } = require('./mailer.config');
const { getNews } = require("./getNews");

let message = {
    subject:"",
    content:""
}

/**
 * 
 * @param {Number} status 
 * @param {Object} userData 
 * 0 => user signed in, 
 * 1 => user already exists, 
 * 2 => news mail, 
 * 3 => unsubscribe,
 */
const mailer = async(status, userData) => {

    if(status == 0) {
        // message when user signed in
        message.subject = `Welcome to Newsletter App`;
        message.content = 
        `   
        <div style="width:90%;background-color:#ffffff;color:black;padding:5px;border-radius:1rem;">
            <h2>DailyDigest.</h2>
            <p>Welcome <b>${userData.name}</b></p>
            <p>
            "Welcome to our Email Newsletter Service! 🎉 Thank you for signing up and becoming a part of our exciting updates. 
            Stay informed, inspired, and connected with our latest news, exclusive offers, and valuable insights delivered right to your inbox. 
            We're thrilled to have you on board! Feel free to explore, engage, and let us know how we can make your newsletter experience even better. 
            Happy reading!"
            </p>
            <p>Every Day an Email will be sent in the morning for you to read and debate about hot topics in your Interests </p>
        </div>
        `;

    }else if(status == 1) {
        message.subject = 'Already Subscribed'
        message.content = `
        <div class="container">
            <p>
            Dear ${userData.name},
            We hope this email finds you well. We are delighted to inform you that you have already successfully subscribed to our newsletter!
            Thank you for expressing your interest in staying updated with the latest news, offers, and exciting updates from our email Newsletter app. 
            Your subscription means a lot to us, and we're thrilled to have you as part of our community.
            Moving forward, you can expect to receive our regular newsletters straight to your inbox, packed with valuable content, exclusive promotions, and insightful articles curated just for you.
            </p>
        </div>`;
    }else if(status == 2) {
        // message for new headlines
        message.subject = `Today's Headlines`;
        message.content = '';

        let newsContentArray = await getNews(userData.interests);
        console.log(newsContentArray);

        // looping over the newContent for each news article and creating a container
        for(let i=0; i<newsContentArray.length; i++) {
            let element = newsContentArray[i];
            message.content += `
            <div class="news-container">
                <a href="${element.url}">
                    <h3>${element.title}</h3>
                    <br>
                    <img src="${element.urlToImage}" height="80%" alt="image" style="border-radius:0.5rem;">
                </a>
                <br>
                <p>${element.description}</p>
             </div>`;
        } 
        
        //the footer
        message.content += `
        <div class="news-container">
            <h5>DailyDigest.</h5>
            <div>
                <a href="http://localhost:8080/unsubscribe"> Want to Unsubscribe </a>
            </div>
        </div>
        `;

    }else if(status == 3) {

        // message when user unsubscribed
        message.subject = 'You Unsubscribed to DAILY DIGEST';
        message.content = 
        `<div class="container">
            <h2>Sorry to see you leave... </h2>
            <p>I would have asked you to stay but since you have already made up you mind and unsubscribed..I have to say Bye 🖐🏽</p>
            <a href="http://localhost:8080">Subscribe Again if you want</a>
        </div>
        `;
    }
    
    // the email message with default html and css code
    let emailMessage = {
        from: `"News 👻" <${process.env.EMAIL}>`, 
        to: userData.email, 
        subject: `${message.subject}`, 
        html:
            `
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css?family=Poppins');
                    @import url('https://fonts.googleapis.com/css?family=Shrikhand');
                    body {
                        font-family:'Poppins',sans-serif;
                    }
                    h1,h2,h5 {
                        font-family:'Shrikhand',sans-serif;
                    }
                    .container {
                        box-shadow:0 0 5px;
                        padding:2rem;
                        border-radius:16px;
                        background-color:#ffffff;
                        box-shadow:0 0 5px #000;
                        margin:10px;
                        text-align:center;
                    }
                    .news-container {
                        color:white;
                        background-color:#141414;
                        padding:0.5rem;
                        box-shadow:0 0 5px #000;
                        border-radius:1rem;
                    }
                    .container-wrapper {
                        background-image:  linear-gradient(#6a6a6a 1px, transparent 1px), linear-gradient(to right, #6a6a6a 1px, rgb(4, 4, 6) 1px);
                        background-size: 30px 30px;
                        padding:1rem;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }
                </style>
            </head>
            <body>
                <div class="container-wrapper">
                    ${message.content}
                </div>
            </body>
            `, 
    };

    // sending the mail
    let info = await transporter.sendMail(emailMessage)
        .then((info) => {
            console.log("MAILER: You sent an email successfully...!!!\nMessage sent 👍");    
        }).catch(error => {
            console.log(error.message);
            return;
        });
    
}

module.exports = { mailer };