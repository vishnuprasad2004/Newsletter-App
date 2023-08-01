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
 * 1 => news mail
 * 2 => unsubscribe
 */
const mailer = async(status, userData) => {

    if(status == 0) {
        message.subject = `Welcome to Newsletter App`;
        message.content = 
        `   
        <div style="width:90%;background-color:#ffffff;color:black;padding:5px;border-radius:1rem;">
            <h3>DAILY DIGEST</h3>
            <p>Welcome ${userData.name}</p>
            <p> Every Day an Email will be sent in the morning for you to read and debate about hot topics in your Interests </p>
        </div>
        `;

    }else if(status == 1) {

        message.subject = `Today's Headlines`;
        message.content = '';
        let newsContentArray = await getNews(userData.interests);
        console.log(newsContentArray);
        for(let i=0; i<newsContentArray.length; i++) {
            let element = newsContentArray[i];
            message.content += `
            <div class="container">
                <h2>${element.title}</h2>
                <br>
                <a href="${element.url}">
                    <img src="${element.urlToImage}" height="80%" alt="image" style="border-radius:0.5rem;">
                </a>
                <br>
                <p>${element.description}</p>
             </div>`;
        } 
        // newsContentArray.forEach(element => {
        //     message.content += `
        //     <div class="container">
        //         <h2>${element.title}</h2>
        //         <br>
        //         <a href="${element.url}">
        //             <img src="${element.urlToImage}" height="80%" alt="image" style="border-radius:0.5rem;">
        //         </a>
        //         <br>
        //         <p>${element.description}</p>
        //     </div>`;
        // });
        message.content += `
        <div>
            <h5>DailyDigest.</h5>
            <a href="https://github.com/vishnuprasad2004">My GitHub</a>
            <div>
                <a href="http://localhost:8080/dashboard"> Want to Unsubscribe </a>
            </div>
        </div>
        `;

    }else if(status == 2) {
        
        message.subject = 'You Unsubscribed to DAILY DIGEST';
        message.content = 
        `<div>
            <h3>Sorry to see you leave... </h3>
            <p>I would have asked you to stay but since you have already made up you mind and unsubscribed..I have to say Bye 🖐🏽</p>
            <a href="http://localhost:8080">Subscribe Again if you want</a>
        </div>
        `;
    }
 
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
                    h1,h2,h3,h4,h5,h6 {
                        font-family:'Shrikhand',sans-serif;
                    }
                    .container {
                        /*background-image:  linear-gradient(#6a6a6a 1px, transparent 1px), linear-gradient(to right, #6a6a6a 1px, rgb(4, 4, 6) 1px);
                        background-size: 30px 30px;*/
                        box-shadow:0 0 5px;
                        padding:2rem;
                        border-radius:16px;
                        background-color:#ffffff11;
                        margin:10px;
                    }
                    .container-wrapper {
                        background-image:  linear-gradient(#6a6a6a 1px, transparent 1px), linear-gradient(to right, #6a6a6a 1px, rgb(4, 4, 6) 1px);
                        background-size: 30px 30px;
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

    let info = await transporter.sendMail(emailMessage)
        .then((info) => {
            console.log("MAILER: You sent an email successfully...!!!\nMessage sent 👍");    
        }).catch(error => {
            console.log(error.message);
            return;
        });
    
}

module.exports = { mailer };