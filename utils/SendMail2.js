import { createTransport } from 'nodemailer';

export const mailSender = async(email , subject , html) => {
    try {
        let transporter = createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: "webmaster.kushel@gmail.com",
                pass: "paurymswxlpytekp",
            },
            tls: {
                rejectUnauthorized: false // Temporarily bypass certificate validation
            }
        });

        let info = await transporter.sendMail({
            from: 'Kushel Digi Solutions" <info@kusheldigi.com>',
            to: `${email}`,
            subject: subject,
            html: `${html}`
        });

        console.log("Email sent info: ", info);
        return info;
    } catch (error) {
        console.log(error);
    }
}
