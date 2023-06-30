import { Fragment } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

export default function SignUp() {
  return (
    <Fragment>
      <div className="columns-2">
        <div>
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex">
              <div>Logo</div>
              <div>vaults api</div>
            </div>
          </div>
        </div>
        <div>
          <AspectRatio ratio={696 / 1121}>
            <Image src="/image.png" alt="Hero Pattern" />
          </AspectRatio>
        </div>
      </div>
    </Fragment>
  )
}
