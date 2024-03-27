import { createTransport } from "nodemailer";

export const SendEmail = async (to, subject, text, html) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "webmaster.kushel@gmail.com",
      pass: "paurymswxlpytekp",
    },
    from: "info@kusheldigi.com",
    tls: {
      rejectUnauthorized: false,
    },
  });
  await transporter.sendMail({
    from: '"Kushel Digi Solutions" <info@kusheldigi.com>',
    to,
    subject,
    text,
    html,
  });
};

//  let transporter = createTransport({
// host: "smtp.gmail.com",
// port: 465,
// secure: true, // true for 465, false for other ports
// auth: {
//   user: "webmaster.kushel@gmail.com",
//   pass: "paurymswxlpytekp",
// },
// from: "info@kusheldigi.com",
// tls: {
//   rejectUnauthorized: false,
// },
// });

// let info1 = await transporter.sendMail({
//   from: '"Kushel Digi Solutions" <info@kusheldigi.com>',
//   to: email,
//   subject: "Login Details",
//   text: `
//       <div>
//           <div>Employee ID: KDS${employeeCode}</div>
//           <div>Password: ${password}</div>
//       </div>
//   `,
//   html: `
//   <div>
//     <div>Employee ID: KDS${employeeCode}</div>
//     <div>Password: ${password}</div>
//   </div>`,
// });
