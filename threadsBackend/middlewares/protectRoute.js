import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      throw new Error('You need to be logged in to visit this route')
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      throw new Error('User not found')
    }
    req.user = user

    next()
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in protectRoute: ', error.message)
  }
}
