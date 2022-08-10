import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { newAdminUserValidation } from "../middlewares/joi-validation/AdminUserValidation.js";
import { insertAdminUser } from "../model/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { verificationEmail } from "../helpers/emailHelper.js";

// server side validation -- install joi for server side validation
// encrypt user password --- install bcrypt.js from npm
// insert into the db
// create unique verification code
// send create a link pointing to our frontend with email and verification code and send to their email
// --to send email just install nodemailer

const router = express.Router();

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    // just overriding the password
    req.body.password = hashPassword(password);
    // just adding enaother object in the object req.body
    req.body.emailValidationCode = uuidv4();
    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "We have sent you an email to verify your account, please check your email box including junk folder",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      // send email
      return;
    }
    res.json({
      status: "error",
      message: "Unable to create a new user, try again later",
    });
  } catch (error) {
    //   Only if you have decalred global error handler
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already another user uses this email, either reset password or use different email.";
    }
    next(error);
  }
});

router.patch("/verify-email", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "verify email todo create new user",
    });
  } catch (error) {
    //   Only if you have decalred global error handler
    next(error);
  }
});

export default router;
