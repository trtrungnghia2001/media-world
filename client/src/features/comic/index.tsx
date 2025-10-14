import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import { memo } from 'react'
import Nav from './components/Nav'
import Header from './components/Header'
import ComicIdPage from './pages/ComicIdPage'
import ChapterIdPage from './pages/ChapterIdPage'
import Footer from './components/Footer'

const ComicRouter = () => {
  return (
    <div id="comic">
      <Header />
      <Nav />
      <div className="max-w-[1332px] w-full min-h-screen py-8 mx-auto">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="detail/:slug" element={<ComicIdPage />} />
          <Route path="detail/:slug/chapter/:id" element={<ChapterIdPage />} />
          <Route path="tim-kiem" element={<SearchPage />} />
          <Route path="xep-hang/:type" element={<SearchPage />} />
          <Route path="the-loai/:slug" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default memo(ComicRouter)
