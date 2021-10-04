import Joi from 'joi';

export const loginSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string().min(10).max(100).label('Email').required(),
    password: Joi.string().min(6).max(100).label('Password').required()
  });
