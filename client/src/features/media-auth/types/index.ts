export interface IMediaInfoResult {
  _id: string
  mediaId: string
  mediaType: string
  mediaName: string
  mediaThumbnail: string
  createdAt: string
  updatedAt: string

  isFavorite: boolean
  isLike: boolean

  chapter?: string
  endpoint?: string
}

export interface IHistoryDTO {
  mediaId: string
  mediaType: string
  mediaName: string
  mediaThumbnail: string
  chapter?: string
  endpoint?: string
}
export interface IHistory {
  _id: string
  mediaId: string
  mediaType: string
  mediaName: string
  mediaThumbnail: string
  chapter?: string
  endpoint?: string
  createdAt: string
  updatedAt: string
}

//
export interface ILikeDTO {
  mediaId: string
  mediaType: string
  mediaName: string
  mediaThumbnail: string
}
export interface ILike {
  _id: string
  mediaId: string
  mediaType: string
  mediaName: string
  mediaThumbnail: string
  createdAt: string
  updatedAt: string
}

//
export interface IFavoriteDTO {
  mediaId: string
  mediaType: string
  mediaName: string
  mediaThumbnail: string
}
export interface IFavorite {
  _id: string
  mediaId: string
  mediaType: string
  mediaName: string
  mediaThumbnail: string
  createdAt: string
  updatedAt: string
}
