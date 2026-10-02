import { Router } from 'express';

import {
  createSubtask,
  getSubtasks,
  getSubtaskById,
  updateSubtask,
  deleteSubtask,
} from '../controllers/subtasks.controller';

import { authenticateToken } from '../middleware/auth.middleware';

console.log('createSubtask:', typeof createSubtask);
console.log('getSubtasks:', typeof getSubtasks);
console.log('authenticateToken:', typeof authenticateToken);
console.log('getSubtaskById:', typeof getSubtaskById);
console.log('updateSubtask:', typeof updateSubtask);
console.log('deleteSubtask:', typeof deleteSubtask);

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

router.delete(
  '/:taskId/subtasks/:subtaskId',
  authenticateToken,
  deleteSubtask
);

export default router;