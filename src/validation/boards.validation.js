import Joi from "joi";

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  columns: Joi.array().items(Joi.string()).optional(),
  

});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  columns: Joi.array().items(Joi.string()).optional()
});
