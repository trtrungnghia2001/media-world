import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import bgHome from '@/shared/assets/images/bg-home.png'
import { media_links } from '@/features/media-auth/constants/link.constant'

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors
      bg-cover bg-center
      "
      style={{
        backgroundImage: `url(${bgHome})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="rounded-2xl overflow-hidden p-8 shadow-lg border dark:border-gray-700 bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm w-full max-w-md space-y-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Welcome to <span className="text-blue-500">MediaWorld</span> 🎬📚
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Khám phá kho giải trí đa dạng — xem phim hoặc đọc truyện tranh chỉ
            với một cú nhấp chuột!
          </p>
        </motion.div>

        {/* Links */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="flex flex-col gap-3"
        >
          {media_links.map((item) => (
            <motion.li
              key={item.path}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={item.path}
                className="flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border dark:border-gray-700 p-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
              >
                <span className="text-blue-500 dark:text-blue-400">
                  {item.icon}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {item.title}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}

export default HomePage
