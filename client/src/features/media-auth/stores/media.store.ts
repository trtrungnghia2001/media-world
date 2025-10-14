import { create } from 'zustand'
import type {
  IFavorite,
  IFavoriteDTO,
  IHistory,
  IHistoryDTO,
  ILike,
  ILikeDTO,
  IMediaInfoResult,
} from '../types'
import type {
  ResponseSuccessListType,
  ResponseSuccessType,
} from '@/shared/types/response'
import instance from '@/app/routes/configs/axios.config'

interface IMediaStore {
  getInfoMedia: (
    mediaId: string,
    mediaType: string,
  ) => Promise<ResponseSuccessType<IMediaInfoResult>>

  mediasHistory: IHistory[]
  addHistory: (data: IHistoryDTO) => Promise<ResponseSuccessType<IHistory>>
  getHistories: (query?: string) => Promise<ResponseSuccessListType<IHistory>>

  mediasLike: ILike[]
  toggleLike: (data: ILikeDTO) => Promise<ResponseSuccessType<ILike>>
  getLikes: (query?: string) => Promise<ResponseSuccessListType<ILike>>

  mediasFavorite: IFavorite[]
  toggleFavorite: (
    data: IFavoriteDTO,
  ) => Promise<ResponseSuccessType<IFavorite>>
  getFavorites: (query?: string) => Promise<ResponseSuccessListType<ILike>>
}

const baseUrl = `api/v1/media`

export const useMediaStore = create<IMediaStore>()((set) => ({
  getInfoMedia: async (mediaId, mediaType) => {
    const url = baseUrl + `/info`
    const resp = (
      await instance.get<ResponseSuccessType<IMediaInfoResult>>(url, {
        params: { mediaId, mediaType },
      })
    ).data
    return resp
  },

  mediasHistory: [],
  addHistory: async (data) => {
    const url = baseUrl + `/history`
    const resp = (await instance.post<ResponseSuccessType<IHistory>>(url, data))
      .data
    return resp
  },
  getHistories: async (query) => {
    const url = baseUrl + `/history/all?` + (query || '')
    const response = (
      await instance.get<ResponseSuccessListType<IHistory>>(url)
    ).data
    set({
      mediasHistory: response.data,
    })
    return response
  },

  mediasLike: [],
  toggleLike: async (data) => {
    const url = baseUrl + `/like/toggle`
    const resp = (await instance.post<ResponseSuccessType<ILike>>(url, data))
      .data
    return resp
  },
  getLikes: async (query) => {
    const url = baseUrl + `/like/all?` + (query || '')
    const response = (await instance.get<ResponseSuccessListType<ILike>>(url))
      .data
    set({
      mediasLike: response.data,
    })
    return response
  },

  mediasFavorite: [],
  toggleFavorite: async (data) => {
    const url = baseUrl + `/favorite/toggle`
    const resp = (await instance.post<ResponseSuccessType<ILike>>(url, data))
      .data
    return resp
  },
  getFavorites: async (query) => {
    const url = baseUrl + `/favorite/all?` + (query || '')
    const response = (await instance.get<ResponseSuccessListType<ILike>>(url))
      .data
    set({
      mediasFavorite: response.data,
    })
    return response
  },
}))
