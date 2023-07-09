import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@utils'

const buttonVariants = cva(
  'inline-flex rounded-md text-sm rounded-lg justify-center items-center gap-2 text-primary-foreground',
  {
    variants: {
      variant: {
        default:
          'bg-primary hover:bg-primary-2 disabled:bg-primary-5 px-6 py-4 ',
        // destructive:
        //   'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // outline:
        //   'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        // secondary:
        //   'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-secondary',
      },
      size: {
        default: '',
        md: 'w-96 shrink',
        lg: 'w-132 shrink',
        sm: '',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
