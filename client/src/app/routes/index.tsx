import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home-page'
import NotFoundPage from '../pages/notfound-page'
//
import AuthRouter from '@/features/auth'
import AuthProtectedRoute from './AuthProtectedRoute'
import MovieRouter from '@/features/movie'
import ComicRouter from '@/features/comic'
import MediaAuthRouter from '@/features/media-auth'

const MainRouter = () => {
  return (
    <Routes>
      {/* public */}
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* auth */}
      <Route path="auth/*" element={<AuthRouter />} />

      <Route path="/movie/*" element={<MovieRouter />} />
      <Route path="/comic/*" element={<ComicRouter />} />

      {/* protected */}
      <Route element={<AuthProtectedRoute />}>
        <Route path="/me/*" element={<MediaAuthRouter />} />
      </Route>
    </Routes>
  )
}

export default memo(MainRouter)
