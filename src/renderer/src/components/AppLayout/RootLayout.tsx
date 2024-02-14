import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

export default function RootLayout({ children, className, ...props }: ComponentProps<'main'>) {
  return (
    <main className={cn('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}
