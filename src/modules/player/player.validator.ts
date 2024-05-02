import Joi from 'joi';

export const createPlayerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    position: Joi.string().valid('Goalkeeper', 'Defender', 'Midfielder', 'Forward').required(),
    shirtNumber: Joi.number().min(1).max(99).required()
});

export const createPlayerValidator = (playerData: any) => {
    return createPlayerSchema.validate(playerData, { abortEarly: false });
};

export const updatePlayerSchema = Joi.object({
    name: Joi.string().optional(),
    position: Joi.string().valid('Goalkeeper', 'Defender', 'Midfielder', 'Forward').optional(),
    shirtNumber: Joi.number().min(1).max(99).optional()
});

export const updatePlayerValidator = (playerData: any) => {
    return updatePlayerSchema.validate(playerData, { abortEarly: false });
};
