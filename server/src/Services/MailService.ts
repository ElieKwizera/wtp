import nodemailer from 'nodemailer';

const sendEmail = async ( receiverEmail, receiverName)=> {

    const sender = await nodemailer.createTestAccount();

    const transporter  = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: sender.user, // generated ethereal user
            pass: sender.pass, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Wave 👋" <wave@dev.rw>',
        to: `${receiverEmail}`,
        subject: "Email verification",
        html: "<b>Hello there</b>",
    });
}