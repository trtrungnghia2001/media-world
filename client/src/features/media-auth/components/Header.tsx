import { memo, useState } from 'react'
import { HiMiniBars3 } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import SidebarLeft from './SidebarLeft'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <div className="p-4 shadow bg-white flex items-center justify-between">
        <Link to={`/`} className="inline-block font-bold text-xl text-blue-600">
          MediaWorld
        </Link>
        <button onClick={() => setOpen(true)}>
          <HiMiniBars3 size={20} />
        </button>
      </div>

      {/* Sidebar overlay + slide animation */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-white shadow-xl"
            >
              <SidebarLeft close={() => setOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default memo(Header)
