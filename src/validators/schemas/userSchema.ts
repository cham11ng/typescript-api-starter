import Joi from 'joi';

export const userSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .min(4)
      .max(100)
      .label('Name')
      .required(),
    email: Joi.string()
      .min(10)
      .max(100)
      .label('Email')
      .required()
  });
