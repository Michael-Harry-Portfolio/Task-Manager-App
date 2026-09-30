import { Router } from 'express';

import {
  createSubtask,
  getSubtasks,
  getSubtaskById,
  updateSubtask
} from '../controllers/subtasks.controller';

import { authenticateToken } from '../middleware/auth.middleware';

console.log('createSubtask:', typeof createSubtask);
console.log('getSubtasks:', typeof getSubtasks);
console.log('authenticateToken:', typeof authenticateToken);
console.log('getSubtaskById:', typeof getSubtaskById);
console.log('updateSubtask:', typeof updateSubtask);

const router = Router();

router.post(
  '/:taskId/subtasks',
  authenticateToken,
  createSubtask
);

router.get(
  '/:taskId/subtasks',
  authenticateToken,
  getSubtasks
);

router.patch(
  '/:taskId/subtasks/:subtaskId',
  authenticateToken,
  updateSubtask
);

router.get('/:taskId/subtasks/:subtaskId', authenticateToken, getSubtaskById);

export default router;