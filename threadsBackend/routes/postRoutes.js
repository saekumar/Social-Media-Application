import express from 'express'
import { createPost } from '../controllers/userController.js'
import { protectRoute } from '../middlewares/protectRoute.js'
import { getPost } from '../controllers/userController.js'
import { deletePost } from '../controllers/userController.js'
import { likeUnlikePost } from '../controllers/userController.js'
import { replyToPost } from '../controllers/userController.js'
import { getFeedPosts } from '../controllers/userController.js'
import { getUserPosts } from '../controllers/userController.js'
const router = express.Router()
router.get('/feed', protectRoute, getFeedPosts)
router.get('/:id', getPost)
router.get('/user/:username', getUserPosts)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.post('/like/:id', protectRoute, likeUnlikePost)
router.post('/reply/:id', protectRoute, replyToPost)
export default router
