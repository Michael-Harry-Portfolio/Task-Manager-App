import { body } from 'express-validator';

export const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be 255 characters or less'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('status')
    .optional()
    .isString()
    .withMessage('Status must be a string'),

  body('priority')
    .optional()
    .isString()
    .withMessage('Priority must be a string'),

  body('due_date')
    .optional()
    .isISO8601()
    .withMessage('due_date must be a valid date'),
];