import Joi from '@hapi/joi';

export const schema = Joi.object()
  .keys({
    APP_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_BASE: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PSWD: Joi.string().required(),
  })
  .options({ abortEarly: false, stripUnknown: true })
  .unknown(false);
