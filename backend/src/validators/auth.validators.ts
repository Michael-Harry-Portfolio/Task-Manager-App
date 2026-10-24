import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  body('display_name')
    .trim()
    .notEmpty()
    .withMessage('Display name is required')
    .isLength({ max: 255 })
    .withMessage('Display name must be 255 characters or less'),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];





