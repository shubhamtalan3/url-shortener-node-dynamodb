export const shortenSchema = Joi.object({
    url: Joi.string().uri().required(),
    expiry: Joi.date().timestamp().optional(), // unix timestamp
});
