import { Router } from 'express';
import { createReminder, getReminders, getReminderById, updateReminder,deleteReminder } from '../controllers/reminders.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createReminderValidator } from '../validators/reminder.validators';
const router = Router();

router.post(
  '/:taskId/reminders',
  authenticateToken,
  createReminderValidator,
  validate,
  createReminder
);

router.get(
  '/:taskId/reminders',
  authenticateToken,
  getReminders
);
    
router.get(
  '/:taskId/reminders/:reminderId',
  authenticateToken,
  getReminderById
);

router.put(
  '/:taskId/reminders/:reminderId',
  authenticateToken,
  updateReminder
);
 
router.patch(
    '/:taskId/reminders/:reminderId',
    authenticateToken,
     updateReminder
);

router.delete(
    '/:taskId/reminders/:reminderId',
    authenticateToken,
     deleteReminder
);
export default router;