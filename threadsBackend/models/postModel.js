import mongoose, { mongo } from 'mongoose'

const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      maxLen: 500,
      required: true,
    },
    img: {
      type: String,
      default: '',
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
