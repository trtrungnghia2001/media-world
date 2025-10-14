import mongoose, { Schema } from 'mongoose'

const mediaActionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },

    mediaId: String,
    mediaType: String,
    mediaName: String,
    mediaThumbnail: String,
  },
  { timestamps: true },
)

mediaActionSchema.index({ user: 1, mediaId: 1, mediaType: 1 })

export const likeModel =
  mongoose.models.like || mongoose.model('like', mediaActionSchema)

export const favoriteModel =
  mongoose.models.favorite || mongoose.model('favorite', mediaActionSchema)

const historySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    mediaId: String,
    mediaType: String,
    mediaName: String,
    mediaThumbnail: String,
    chapter: String,
    endpoin: String,
  },
  { timestamps: true },
)

historySchema.index({ user: 1, mediaId: 1, mediaType: 1 })

export const historyModel =
  mongoose.models.history || mongoose.model('history', historySchema)
