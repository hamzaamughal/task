import express from 'express'
const router = express.Router()

import { getUsers, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(getUsers)

export default router