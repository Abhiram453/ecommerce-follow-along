const nodemailer = require("nodemailer");
require("dotenv").config();

let sendmail=async(options)=>{  

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.smtp_UserName, // generated ethereal user
    pass: process.env.smtp_password,
  },
});

const info = await transporter.sendMail({
    from: process.env.smtp_UserName,
    to: options.email,
    subject: options.subject,
    text: options.message,

  });
}
module.exports=sendmail;