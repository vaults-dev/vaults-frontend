'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormState } from 'react-hook-form'
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@components/ui'
import { toast } from '@components/ui/Toast/use-toast'

const formSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: 'Please fill in your email.' })
      .email('Please fill in a valid email format.'),
    password: z
      .string()
      .nonempty({ message: 'Please fill in your password.' })
      .min(8, {
        message: 'Password must be at least 8 characters.',
      })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-=_+{};:"|,.<>/?])/, {
        message:
          'Use 8 or more characters with a mix of letters, numbers & symbols.',
      }),
    remember: z.boolean().default(false).optional(),
  })
  .refine((data) => data.email)

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })
  const { isDirty } = useFormState(form)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between pl-2">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange as () => void}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me for 7 days</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remember"
            render={() => (
              <FormItem>
                <FormControl>
                  <Button variant="link">Forgot Password?</Button>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex pt-6">
          <Button size={'lg'} disabled={!isDirty} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }
}
