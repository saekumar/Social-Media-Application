import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import Post from '../models/postModel.js'
import { v2 as cloudinary } from 'cloudinary'
import mongoose from 'mongoose'

export const signupUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body
    const user = await User.findOne({ $or: [{ username }, { email }] })
    if (user) {
      throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()
    if (savedUser) {
      generateTokenAndSetCookie(savedUser._id, res)
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        username: savedUser.username,
        email: savedUser.email,
        bio: savedUser.bio,
        profilePic: savedUser.profilePic,
      })
    } else {
      throw new Error('Invalid user data')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in signupUser: ', error.message)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('Invalid username or password')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid username or password')
    }
    generateTokenAndSetCookie(user._id, res)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in loginUser: ', error.message)
  }
}

export const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(req.user._id)
    const userToFollow = await User.findById(id)
    if (id === req.user._id.toString()) {
      throw new Error('You cannot follow yourself')
    }
    if (!userToFollow) {
      throw new Error('User not found')
    }
    const isFollowing = user.following.includes(id)
    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      })
      await User.findByIdAndUpdate(id, {
        $pull: { followers: req.user._id },
      })
      res.status(200).json({ message: 'User unfollowed successfully' })
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      })
      await User.findByIdAndUpdate(id, {
        $push: { followers: req.user._id },
      })
      res.status(200).json({ message: 'User followed successfully' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in followUnFollowUser: ', error.message)
  }
}

export const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body
  let { profilePic } = req.body

  const userId = req.user._id
  try {
    let user = await User.findById(userId)
    if (!user) return res.status(400).json({ error: 'User not found' })

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" })

    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split('/').pop().split('.')[0]
        )
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic)
      profilePic = uploadedResponse.secure_url
    }

    user.name = name || user.name
    user.email = email || user.email
    user.username = username || user.username
    user.profilePic = profilePic || user.profilePic
    user.bio = bio || user.bio

    user = await user.save()

    user.password = null

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in updateUser: ', err.message)
  }
}

export const getUserProfile = async (req, res) => {
  const { username } = req.params

  try {
    let user

    // Check if username is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(username)) {
      user = await User.findOne({ _id: username })
        .select('-password')
        .select('-updatedAt')
    } else {
      user = await User.findOne({ username })
        .select('-password')
        .select('-updatedAt')
    }

    if (!user) return res.status(404).json({ error: 'User not found' })

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in getUserProfile: ', err.message)
  }
}

export const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body
    let { img } = req.body
    if (!postedBy || !text) {
      throw new Error('Please provide all the required fields')
    }
    const user = await User.findById(postedBy)
    if (!user) {
      throw new Error('User not found')
    }
    if (user._id.toString() !== req.user._id.toString()) {
      throw new Error('You are not authorized to create this post')
    }
    const maxLength = 500
    if (text.length > maxLength) {
      throw new Error(`Text must be less than ${maxLength} characters`)
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img)
      img = uploadedResponse.secure_url
    }
    const newPost = new Post({
      postedBy,
      text,
      img,
    })
    await newPost.save()
    res.status(201).json({ message: 'Post created successfully', newPost })
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in createPost: ', error.message)
  }
}
// Path: threadsBackend/controllers/userController.js

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      throw new Error('Post not found')
    }
    res.status(200).json({ post })
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in getPost: ', error.message)
  }
}
// Path: threadsBackend/controllers/userController.js

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      throw new Error('Post not found')
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      throw new Error('You are not authorized to delete this post')
    }
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in deletePost: ', error.message)
  }
}
// Path: threadsBackend/controllers/userController.js

export const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params
    const userId = req.user._id
    const post = await Post.findById(postId)
    if (!post) {
      throw new Error('Post not found')
    }
    const isLiked = post.likes.includes(userId)
    if (isLiked) {
      // Unlike post
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: userId },
      })
      res.status(200).json({ message: 'Post unliked successfully' })
    } else {
      // Like post
      await Post.findByIdAndUpdate(postId, {
        $push: { likes: userId },
      })
      res.status(200).json({ message: 'Post liked successfully' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in likeUnlikePost: ', error.message)
  }
}

export const replyToPost = async (req, res) => {
  try {
    const { text } = req.body
    const postId = req.params.id
    const userId = req.user._id
    const userProfilePic = req.user.profilePic
    const username = req.user.username
    if (!text) {
      throw new Error('Please provide text for the reply')
    }

    const post = await Post.findById(req.params.id)
    if (!post) {
      throw new Error('Post not found')
    }
    const newReply = {
      userId,
      text,
      userProfilePic,
      username,
    }
    post.replies.push(newReply)
    await post.save()
    res.status(201).json({ message: 'Reply added successfully', post })
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in replyToPost: ', error.message)
  }
}

export const getFeedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      throw new Error('User not found')
    }

    const following = user.following
    const posts = await Post.find({ postedBy: { $in: following } })
      .sort({ createdAt: -1 })
      .populate('postedBy', '_id username profilePic')
      .populate('replies.userId', '_id username profilePic')
    res.status(200).json(posts)
    console.log(posts)
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log('Error in getFeedPosts: ', error.message)
  }
}

export const getUserPosts = async (req, res) => {
  const { username } = req.params
  console.log(username)
  try {
    const user = await User.findOne({ username })
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    })
    console.log(posts)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
