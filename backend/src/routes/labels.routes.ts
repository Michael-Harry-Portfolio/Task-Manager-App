import { Router } from 'express';
import { createLabel, getLabels, getLabelById, updateLabel, deleteLabel } from '../controllers/labels.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createLabelValidator } from '../validators/label.validators';
const router = Router();

router.post(
  '/',
  authenticateToken,
  createLabelValidator,
  validate,
  createLabel
);

router.get(
  '/',
  authenticateToken,
  getLabels
);
router.get(
  '/:id',
  authenticateToken,
  getLabelById
);

router.patch(
  '/:id',
  authenticateToken,
  updateLabel
);

router.delete(
    '/:id',
    authenticateToken,
    deleteLabel
);

export default router;

