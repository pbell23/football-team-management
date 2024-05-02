import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
});

export const registerValidator = (userData: any) => {
    return registerSchema.validate(userData, { abortEarly: false });
};

export const loginSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(24).required(),
});

export const loginValidator = (userData: any) => {
    return loginSchema.validate(userData, { abortEarly: false });
};