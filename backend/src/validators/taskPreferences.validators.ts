import { body } from 'express-validator';

export const createPreferencesValidator = [
  body('default_priority')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('default_priority must be 30 characters or less'),

  body('default_task_view')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('default_task_view must be 30 characters or less'),
];

export const updatePreferencesValidator = [
  body('default_priority')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('default_priority must be 30 characters or less'),

  body('default_task_view')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('default_task_view must be 30 characters or less'),
]; 