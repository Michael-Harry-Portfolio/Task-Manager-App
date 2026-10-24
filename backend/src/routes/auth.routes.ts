import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { registerValidator, loginValidator } from '../validators/auth.validators';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/test', (req, res) => {
  res.json({
    message: 'Auth routes are working'
  });
});
router.get('/me' , authenticateToken,  getCurrentUser);
export default router;  
