const nodemailer = require('nodemailer');

const mailSender = async (email,title,body) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS 
            }
        });
        const info = await transporter.sendMail({
            from:"verification",
            to: `${email}`,
            subject:`${title}`,
            html: `${body}`
        })
        return info;
        // console.log(info);
   
    }
    catch(err){
        console.log(err);
    }
    // return info;
};

module.exports = mailSender;