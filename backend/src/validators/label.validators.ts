import { body } from 'express-validator';

export const createLabelValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Label name is required')
    .isLength({ max: 50 })
    .withMessage('Label name must be 50 characters or less'),
];