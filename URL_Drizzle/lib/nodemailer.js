import nodemailer from 'nodemailer'

//* Returns a promise
const testAccount = await nodemailer.createTestAccount()

//* Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure:false,
    auth: {
        user: 'ashlee.goodwin@ethereal.email',
        pass: 'mmBBKU1swK7j5DpWvz'
    }
});

  
export const sendEmail = async({to,subject,html})=>{
    const info = await transporter.sendMail({
        from:`URL Shortener <${testAccount.user}>`,
        to,
        subject,
        html,
    });
    
    const testEmailURL = nodemailer.getTestMessageUrl(info);
    console.log("Verify Email:", testEmailURL);
};
