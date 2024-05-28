import express from 'express'
import { signupUser } from '../controllers/userController.js'
import { loginUser } from '../controllers/userController.js'
import { followUnFollowUser } from '../controllers/userController.js'
import { protectRoute } from '../middlewares/protectRoute.js'
import { updateUser } from '../controllers/userController.js'
import { getUserProfile } from '../controllers/userController.js'
const router = express.Router()

router.get('/profile/:username', getUserProfile)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', (req, res) => {
  res.clearCookie('token').send('User logged out successfully')
})

router.post('/follow/:id', protectRoute, followUnFollowUser)

router.put('/update/:id', protectRoute, updateUser)
export default router
// Path: threadsBackend/routes/userRoutes.js
