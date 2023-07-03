import * as React from 'react'

interface TypographyProps {
  variant: string
  children: React.ReactNode
}

const Typography: React.FC<TypographyProps> = ({ variant, children }) => {
  switch (variant) {
    case 'h1':
      return <h1 className="">{children}</h1>
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
      return <p className="">{children}</p>
    default:
      return <span className="">{children}</span>
  }
}

export { Typography }
