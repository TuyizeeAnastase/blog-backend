import joi from "joi";

export const postValidation = async (req, res, next) => {
  const userSchema = joi.object({
    title: joi.string().required().messages({
      "any.required": "Blog title required",
    }),
    content: joi.string().required().messages({
      "any.required": "Blog content required",
    }),
  });
  const value = await userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};
