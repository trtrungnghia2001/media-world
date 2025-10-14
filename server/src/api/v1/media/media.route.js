import express from 'express'
import { favoriteModel, historyModel, likeModel } from './media.model.js'
import {
  handleResponse,
  handleResponseList,
} from '#server/shared/utils/response.util'
import mongoose from 'mongoose'
import { QUERY_DEFAULT } from '#server/shared/constants/query.constant'
const mediaRouter = express.Router()

mediaRouter.get(`/info`, async (req, res, next) => {
  try {
    const { mediaId, mediaType } = req.query

    const userId = req.user._id

    const result = await historyModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          mediaId,
          mediaType,
        },
      },

      {
        $lookup: {
          from: 'likes',
          let: {
            mediaId: '$mediaId',
            mediaType: '$mediaType',
            userId: '$user',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$mediaId', '$$mediaId'] },
                    { $eq: ['$mediaType', '$$mediaType'] },
                    { $eq: ['$user', '$$userId'] },
                  ],
                },
              },
            },
          ],
          as: 'likeDocs',
        },
      },

      {
        $lookup: {
          from: 'favorites',
          let: {
            mediaId: '$mediaId',
            mediaType: '$mediaType',
            userId: '$user',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$mediaId', '$$mediaId'] },
                    { $eq: ['$mediaType', '$$mediaType'] },
                    { $eq: ['$user', '$$userId'] },
                  ],
                },
              },
            },
          ],
          as: 'favoriteDocs',
        },
      },

      {
        $addFields: {
          isLike: { $gt: [{ $size: '$likeDocs' }, 0] },
          isFavorite: { $gt: [{ $size: '$favoriteDocs' }, 0] },
        },
      },

      {
        $project: {
          likeDocs: 0,
          favoriteDocs: 0,
          __v: 0,
          user: 0,
        },
      },
    ])

    return handleResponse(res, { data: result?.[0] })
  } catch (error) {
    next(error)
  }
})

mediaRouter.post(`/history`, async (req, res, next) => {
  try {
    const userId = req.user._id
    const { mediaId, mediaType } = req.body

    const history = await historyModel.findOneAndUpdate(
      { mediaId, mediaType, user: userId },
      req.body,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    )

    return handleResponse(res, { data: history })
  } catch (error) {
    next(error)
  }
})
mediaRouter.post(`/like/toggle`, async (req, res, next) => {
  try {
    const userId = req.user._id
    const { mediaId, mediaType, mediaName, mediaThumbnail } = req.body

    // check
    const check = await likeModel
      .findOne({ mediaId, mediaType, user: userId })
      .lean()

    let like
    if (check) {
      like = await likeModel.findByIdAndDelete(check._id, { new: true })
    } else {
      like = await likeModel.create({
        mediaId,
        mediaType,
        mediaName,
        mediaThumbnail,
        user: userId,
      })
    }

    return handleResponse(res, { data: like })
  } catch (error) {
    next(error)
  }
})
mediaRouter.post(`/favorite/toggle`, async (req, res, next) => {
  try {
    const userId = req.user._id
    const { mediaId, mediaType, mediaName, mediaThumbnail } = req.body

    // check
    const check = await favoriteModel
      .findOne({ mediaId, mediaType, user: userId })
      .lean()

    let favorite
    if (check) {
      favorite = await favoriteModel.findByIdAndDelete(check._id, { new: true })
    } else {
      favorite = await favoriteModel.create({
        mediaId,
        mediaType,
        mediaName,
        mediaThumbnail,
        user: userId,
      })
    }

    return handleResponse(res, { data: favorite })
  } catch (error) {
    next(error)
  }
})

mediaRouter.get(`/like/all`, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY_DEFAULT._PAGE
    const _limit = parseInt(req.query._limit) || QUERY_DEFAULT._LIMIT

    const skip = (_page - 1) * _limit

    const userId = req.user._id

    const medias = await likeModel
      .find({ user: userId })
      .limit(_limit)
      .skip(skip)
    const total = await likeModel.countDocuments({ user: userId }).lean()
    const totalPages = Math.ceil(total / _limit)

    return handleResponseList(res, {
      data: medias,
      pagination: {
        page: _page,
        total: total,
        pageSize: _limit,
        totalPages: totalPages,
      },
    })
  } catch (error) {
    next(error)
  }
})
mediaRouter.get(`/favorite/all`, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY_DEFAULT._PAGE
    const _limit = parseInt(req.query._limit) || QUERY_DEFAULT._LIMIT

    const skip = (_page - 1) * _limit

    const userId = req.user._id

    const medias = await favoriteModel
      .find({ user: userId })
      .limit(_limit)
      .skip(skip)
    const total = await favoriteModel.countDocuments({ user: userId }).lean()
    const totalPages = Math.ceil(total / _limit)

    return handleResponseList(res, {
      data: medias,
      pagination: {
        page: _page,
        total: total,
        pageSize: _limit,
        totalPages: totalPages,
      },
    })
  } catch (error) {
    next(error)
  }
})
mediaRouter.get(`/history/all`, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY_DEFAULT._PAGE
    const _limit = parseInt(req.query._limit) || QUERY_DEFAULT._LIMIT

    const skip = (_page - 1) * _limit

    const userId = req.user._id

    const medias = await historyModel
      .find({ user: userId })
      .limit(_limit)
      .skip(skip)
      .sort({
        updatedAt: -1,
      })
    const total = await historyModel.countDocuments({ user: userId }).lean()
    const totalPages = Math.ceil(total / _limit)

    return handleResponseList(res, {
      data: medias,
      pagination: {
        page: _page,
        total: total,
        pageSize: _limit,
        totalPages: totalPages,
      },
    })
  } catch (error) {
    next(error)
  }
})

export default mediaRouter
