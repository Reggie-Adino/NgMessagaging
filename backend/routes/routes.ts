import express from 'express';
import AuthController from '../controllers/Authcontroller';
import { validateUser } from '../middleware/authentication';
import MessageContreller from '../controllers/MessageController'
import userController from "../controllers/userController"
const router = express.Router();

router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)
router.post('/auth/me', validateUser, AuthController.me)
router.get('/auth/logout', validateUser, AuthController.logout)

router.get('/users', validateUser, userController.getAllUsers)
router.get('/message/', validateUser,  MessageContreller.getAllMessages)
router.get('/message/:id/read', validateUser,  MessageContreller.readMessage)
router.get('/message', validateUser,  MessageContreller.getMessage)
router.get("/message/:id/delete", validateUser,MessageContreller.deleteMessage)
router.post('/message', validateUser,  MessageContreller.createMessage)


export default router  