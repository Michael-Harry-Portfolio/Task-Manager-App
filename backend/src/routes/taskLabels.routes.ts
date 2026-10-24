import { Router } from 'express';
import { addLabelToTask, getTaskLabels, removeLabelFromTask } from '../controllers/taskLabels.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post(
  '/:taskId/labels',
  authenticateToken,
  addLabelToTask
);

router.get(
    '/:taskId/labels',
    authenticateToken,
    getTaskLabels
);

router.delete(
    '/:taskId/labels/:labelId',
    authenticateToken,
    removeLabelFromTask
);

export default router;