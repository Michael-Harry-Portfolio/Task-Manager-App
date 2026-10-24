import { body } from 'express-validator';

export const createSubtaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be 255 characters or less'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
];