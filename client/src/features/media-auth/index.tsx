import Header from './components/Header'
import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import FavoritePage from './pages/FavoritePage'
import LikePage from './pages/LikePage'
import HistoryPage from './pages/HistoryPage'
import AccountPage from './pages/AccountPage'
import UpdatePasswordPage from './pages/UpdatePasswordPage'
import SidebarLeft from './components/SidebarLeft'
import Footer from './components/Footer'

const MediaAuthRouter = () => {
  return (
    <div className="bg-gray-50 gap-8 flex flex-col min-h-screen">
      <Header />
      <div className="bg-white flex-1 flex max-w-[1332px] w-full mx-auto shadow border rounded-lg overflow-hidden">
        <SidebarLeft className="hidden lg:block" />
        <div className="flex-1 p-4 lg:border-l">
          <Routes>
            <Route path="account" element={<AccountPage />} />
            <Route path="update-password" element={<UpdatePasswordPage />} />
            <Route path="favorite" element={<FavoritePage />} />
            <Route path="like" element={<LikePage />} />
            <Route path="history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default memo(MediaAuthRouter)
