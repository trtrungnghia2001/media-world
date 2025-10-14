import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RootSidebarRight from './components/RootSidebarRight'
import Header from './components/Header'
import SearchPage from './pages/SearchPage'
import MovideIdPage from './pages/MovideIdPage'
import { memo } from 'react'
import Footer from './components/Footer'

const MovieRouter = () => {
  return (
    <div id="movie" className="bg-color-bg text-color-text-base text-sm">
      <Header />
      <div className="max-w-[1200px] w-full mx-auto my-4 rounded shadow-xl flex flex-col md:flex-row items-stretch bg-color-bg-container">
        <section className="overflow-hidden w-full p-4 lg:p-7">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="detail/:slug" element={<MovideIdPage />} />
            <Route path="tim-kiem" element={<SearchPage />} />
            <Route path="danh-muc/:slug" element={<SearchPage />} />
            <Route path="the-loai/:slug" element={<SearchPage />} />
            <Route path="quoc-gia/:slug" element={<SearchPage />} />
          </Routes>
        </section>
        <RootSidebarRight />
      </div>
      <Footer />
    </div>
  )
}

export default memo(MovieRouter)
