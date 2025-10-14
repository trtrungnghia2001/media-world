import clsx from 'clsx'
import { memo, type ComponentProps, type FC } from 'react'

const Wrapper: FC<ComponentProps<'div'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx([`max-w-[1200px] w-full mx-auto`, className])}
      {...props}
    >
      {children}
    </div>
  )
}

export default memo(Wrapper)
