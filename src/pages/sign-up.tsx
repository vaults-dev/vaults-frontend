import { Fragment } from 'react'
import { AspectRatio } from '@components/ui/AspectRatio'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import { Card } from '@components/ui/Card'

export default function SignUp() {
  return (
    <Fragment>
      <div className="columns-2">
        <div className="flex flex-col">
          <div className="flex">
            <div>Logo</div>
            <div>vaults api</div>
          </div>
          <div className="flex flex-col">
            <div>
              <p>Hey, Welcome!</p>
            </div>
            <div>You may sign in or signup to create a new account</div>
          </div>
          <div>
            <Tabs defaultValue="sign-in" className="w-[148px] ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in"></TabsContent>
              <TabsContent value="sign-up"></TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex">
          <AspectRatio ratio={696 / 1121}>
            <Image
              src="/image.png"
              alt="Hero Pattern"
              width={300}
              height={300}
            />
          </AspectRatio>
        </div>
      </div>
    </Fragment>
  )
}
