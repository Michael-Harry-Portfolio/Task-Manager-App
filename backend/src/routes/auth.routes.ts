import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/test', (req, res) => {
  res.json({
    message: 'Auth routes are working'
  });
});
router.get('/me' , authenticateToken,  getCurrentUser);
export default router;  
