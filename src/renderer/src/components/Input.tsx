import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'

export default function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'bg-zinc-900/50 border rounded-md py-1 px-2 outline-none cursor-text ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring  focus:ring-zinc-700 focus:ring-offset-2',
        className
      )}
      {...props}
    />
  )
}
