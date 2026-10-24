import { Router } from 'express';

import {
  getPreferences,
  createPreferences, 
  updatePreferences,
  deletePreferences   
} from '../controllers/taskPreferences.controller';

import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createPreferencesValidator, updatePreferencesValidator } from '../validators/taskPreferences.validators';
const router = Router();

router.get(
  '/',
  authenticateToken,
  getPreferences
);

router.post(
  '/',
  authenticateToken,
  createPreferencesValidator,
  validate,
  createPreferences
);

router.patch(
    '/',
    authenticateToken,
    updatePreferencesValidator,
    validate,
    updatePreferences
);

router.delete(
    '/',
    authenticateToken,
    deletePreferences
);
export default router;