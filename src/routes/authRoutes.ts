import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.post('/register', (req, res) => authController.register(req, res));
router.get('/confirm-email/:id', (req, res) =>
  authController.confirmEmail(req, res)
);
router.post('/login', (req, res) => authController.login(req, res));

export default router;
