import { cn } from '@renderer/utils'
import { ComponentProps, forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'bg-zinc-900/50 border rounded-md py-1 px-2 outline-none cursor-text ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring  focus:ring-zinc-700 focus:ring-offset-2',
        className
      )}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export default Input
