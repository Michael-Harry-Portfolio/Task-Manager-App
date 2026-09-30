import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask,deleteTask,} from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';

console.log("createTask:", typeof createTask);
console.log("getTasks:", typeof getTasks);
console.log("getTaskById:", typeof getTaskById);
console.log("updateTask:", typeof updateTask);
console.log("deleteTask:", typeof deleteTask);
console.log("authenticateToken:", typeof authenticateToken);

const router = Router();

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getTasks);
router.get('/:id', authenticateToken, getTaskById);
router.patch('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);
export default router;