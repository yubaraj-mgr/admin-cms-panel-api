import Joi from "joi";

export const FNAME = Joi.string().max(20).required();
export const LNAME = Joi.string().max(20).required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const PASSWORD = Joi.string().max(100);
export const PHONE = Joi.string().max(100);
export const ADDRESS = Joi.string().max(100).allow("", null);
export const DATE = Joi.date();
export const SHORTSTR = Joi.string().max(100);
export const LONGSTR = Joi.string().max(5000);

export const validator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    error.status = 200;
    return next(error);
  }
  // so that if there is no error we will send this data to the next middle ware which is async await
  next();
};
