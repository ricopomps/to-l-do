import { useEffect, useRef } from 'react'

interface ContextMenuProps {
  x: number
  y: number
  onCloseContextMenu: () => void
  children: React.ReactNode
}

export default function ContextMenu({ x, y, children, onCloseContextMenu }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickListener = (event) => {
      if (ref.current && ref.current.contains(event?.target)) {
        return
      }
      onCloseContextMenu()
    }
    document.addEventListener('mousedown', clickListener)

    return () => {
      document.removeEventListener('mousedown', clickListener)
    }
  }, [])

  const menuStyle = {
    top: `${y}px`,
    left: `${x}px`
  }

  return (
    <div
      ref={ref}
      className={'p-2 absolute z-999 border border-gray-300 bg-zinc-500 rounded-lg'}
      style={menuStyle}
    >
      {children}
    </div>
  )
}
