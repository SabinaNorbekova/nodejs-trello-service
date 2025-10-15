import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(255).optional(),
  user_id: Joi.string().guid({ version: "uuidv4" }).required(),
  board_id: Joi.string().guid({ version: "uuidv4" }).required(),
  column_id: Joi.number().integer().optional()
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(255).optional(),
  column_id: Joi.number().integer().optional()
});
