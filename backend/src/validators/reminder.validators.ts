import { body } from 'express-validator';

export const createReminderValidator = [
  body('reminder_time')
    .notEmpty()
    .withMessage('reminder_time is required')
    .isISO8601()
    .withMessage('reminder_time must be a valid date'),
];