import Image from 'next/image'
import {
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
  Typography,
} from '@components/ui'
import { SignInForm } from '@modules/SignInForm'

export default function SignUp() {
  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-y-12 px-24 pt-24">
          <div className="flex justify-between">
            <div className="flex">
              <div>Logo</div>
              <div>vaults api</div>
            </div>
            <div className="flex items-center space-x-1">
              <div>ID</div>
              <Separator orientation="vertical" />
              <div>EN</div>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Typography variant="h1">Hey, Welcome!</Typography>
            </div>
            <div>You may sign in or signup to create a new account</div>
          </div>
          <div>
            <Tabs defaultValue="sign-in">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent className="pt-12" value="sign-in">
                <SignInForm />
              </TabsContent>
              <TabsContent value="sign-up"></TabsContent>
            </Tabs>
          </div>
          <div>
            <div className="text-center">Or Sign in With</div>
          </div>
          <div className="flex justify-center gap-6">
            <div className="relative h-18 w-18 rounded-full">
              {/* <Image src={Icons.GoogleIcon} alt="Hero Pattern" fill /> */}
            </div>
            <div className="rounded-full"></div>
            <div className="rounded-full"></div>
          </div>
        </div>
        <div className="flex py-6 pr-6">
          <Image src="/image.png" alt="Hero Pattern" width={696} height={300} />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
