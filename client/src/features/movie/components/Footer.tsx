import { memo } from 'react'
import Wrapper from './Wrapper'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-color-bg-container p-4">
      <Wrapper className="space-y-2">
        <div className="text-center text-color-text-secondary-1 text-xs">
          &copy; 13-10-2025 by Phelan White. All rights reserved.
        </div>
        <div className="text-center">
          <Link
            to={`/`}
            className="hover:text-blue-500 hover:underline font-medium text-color-text-secondary-1 text-xs"
          >
            MediaWorld
          </Link>
        </div>
      </Wrapper>
    </footer>
  )
}

export default memo(Footer)
