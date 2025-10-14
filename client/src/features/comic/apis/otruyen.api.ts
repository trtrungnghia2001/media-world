import axios from 'axios'
import type { ComicListType } from '../types/otruyen.type'

const OTRUYEN_URL = `https://otruyenapi.com/v1/api/`

// api
export async function otruyenGetHomeApi() {
  const url = OTRUYEN_URL + `home`
  const response = await axios.get(url)
  return response.data
}
export async function otruyenGetListApi(type: ComicListType, query?: string) {
  const url = OTRUYEN_URL + `danh-sach/${type}` + '?' + (query || '')
  const response = await axios.get(url)
  return response.data
}
export async function otruyenGetCategoryApi(slug?: string, query?: string) {
  const url = OTRUYEN_URL + 'the-loai/' + (slug || '') + '?' + (query || '')
  const response = await axios.get(url)
  return response.data
}
export async function otruyenGetSearchApi(query?: string) {
  const url = OTRUYEN_URL + `tim-kiem?` + (query || '')
  const response = await axios.get(url)
  return response.data
}
export async function otruyenGetComicApi(slug: string) {
  const url = OTRUYEN_URL + `truyen-tranh/${slug}`
  const response = await axios.get(url)
  return response.data
}
export async function otruyenGetChapterApi(id: string) {
  const url = `https://sv1.otruyencdn.com/v1/api/chapter/` + id
  const response = await axios.get(url)
  return response.data
}

//
export function otruyenGetImage(thumb_url: string) {
  return `https://img.otruyenapi.com/uploads/comics/` + thumb_url
}
export function otruyenGetChapterId(path: string) {
  return path?.split('/')?.pop()
}
