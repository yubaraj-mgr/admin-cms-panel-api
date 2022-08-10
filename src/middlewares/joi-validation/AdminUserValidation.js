import Joi from "joi";

export const newAdminUserValidation = (req, res, next) => {
  try {
    // define rules
    const schema = Joi.object({
      fName: Joi.string().max(20).required(),
      lName: Joi.string().max(20).required(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      password: Joi.string().max(100).required(),
      phone: Joi.string().max(100).required(),
      address: Joi.string().max(100).allow("", null),
      dob: Joi.date().allow("", null),
    });
    // give data to the rules

    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 200;
      return next(error);
    }
    // so that if there is no error we will send this data to the next middle ware which is async await
    next();
  } catch (error) {
    next(error);
  }
};
