import nodemailer from "nodemailer";
import "dotenv/config";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GmailUserName,
    pass: process.env.GmailPassword,
  },
});
const handlebarsOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./email"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./email"),
  extName: ".handlebars",
};
transporter.use("compile", hbs(handlebarsOptions));

export const sendEmail = async (data) => {
  try {
    return transporter
      .sendMail({
        to: data.to,
        from: "connect2shivconsultancy@gmail.com",
        subject: data.subject,
        // html: data.html,
        template: "forgotPassword",
        attachments: [
          {
            filename: "shiv-consultancy.png",
            path: path.dirname(__dirname) + "/email/images/shiv-consultancy.png",
            cid: "image",
          },
        ],
        context: {
          url: `${data.origin}/reset/${data.token}`,
          firstName: data.name,
        },
      })
      .then((re) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  } catch (err) {
    return false;
  }
};
