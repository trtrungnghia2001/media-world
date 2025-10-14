export interface IComic {
  _id: string
  name: string
  slug: string
  origin_name: string[]
  status: string
  thumb_url: string
  sub_docquyen: boolean
  category: {
    id: string
    name: string
    slug: string
  }[]
  updatedAt: string
  chaptersLatest: {
    filename: string
    chapter_name: string
    chapter_title: string
    chapter_api_data: string
  }[]
}

export interface IComicDetail {
  _id: string
  name: string
  slug: string
  origin_name: string[]
  content: string
  status: string
  thumb_url: string
  sub_docquyen: boolean
  author: string[]
  category: {
    id: string
    name: string
    slug: string
  }[]
  chapters: {
    server_name: string
    server_data: {
      filename: string
      chapter_name: number
      chapter_title: string
      chapter_api_data: string
    }[]
  }[]
  updatedAt: string
}

export interface IComicCategory {
  _id: string
  slug: string
  name: string
}

export interface IComicChapter {
  domain_cdn: string
  item: {
    _id: string
    comic_name: string
    chapter_name: string
    chapter_title: string
    chapter_path: string
    chapter_image: {
      image_page: number
      image_file: string
    }[]
  }
}

export type ComicListType =
  | 'truyen-moi'
  | 'sap-ra-mat'
  | 'dang-phat-hanh'
  | 'hoan-thanh'
