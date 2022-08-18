import Joi from "joi";
import {
  ADDRESS,
  EMAIL,
  FNAME,
  LNAME,
  PASSWORD,
  PHONE,
  SHORTSTR,
  STATUS,
  validator,
} from "./constant.js";

export const newAdminUserValidation = (req, res, next) => {
  // define rules
  const schema = Joi.object({
    fName: FNAME.required(),
    lName: LNAME.required(),
    email: EMAIL.required(),
    password: PASSWORD.required(),
    phone: PHONE,
    address: ADDRESS,
    dob: Joi.date().allow("", null),
  });
  // give data to the rules

  validator(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL.required(),
    emailValidationCode: SHORTSTR.required(),
  });
  validator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL.required(),
    password: PASSWORD.required(),
  });
  validator(schema, req, res, next);
};

//====== categores

export const newCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
  });
  validator(schema, req, res, next);
};
