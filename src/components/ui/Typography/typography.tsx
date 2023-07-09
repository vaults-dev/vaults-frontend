'use client'

import * as React from 'react'

import { cn } from '@utils'
import { cva } from 'class-variance-authority'

interface TypographyProps {
  variant: string
  children: React.ReactNode
  className?: string
}

const h1Variants = cva('text-[32px]')

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  switch (variant) {
    case 'h1':
      return (
        <h1 className={cn(h1Variants(), className)} {...props}>
          {children}
        </h1>
      )
    case 'h2':
      return <h2 className="">{children}</h2>
    case 'h3':
      return <h3 className="">{children}</h3>
    case 'h4':
      return <h4 className="">{children}</h4>
    case 'h5':
      return <h5 className="">{children}</h5>
    case 'h6':
      return <h6 className="">{children}</h6>
    case 'p':
      return <p className="text-xl font-normal">{children}</p>
    default:
      return <span className="">{children}</span>
  }
}

export { Typography }
