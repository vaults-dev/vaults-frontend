'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormState } from 'react-hook-form'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@components/ui'
import { toast } from '@components/ui/Toast/use-toast'
import { signup } from '../../api/auth'

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
      }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `Your password didn't match.`,
    path: ['confirmPassword'],
  })

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
              <FormDescription>
                Use 8 or more characters with a mix of letters, numbers &
                symbols.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex pt-6">
          <Button size={'lg'} disabled={!isDirty} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: handle loading
    await signup(values.email, values.password)
      .then((resp) => {
        toast({
          title: 'Sign Up Success:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                You have successfully signed up
              </code>
            </pre>
          ),
        })
      })
      .catch((err) => {
        toast({
          title: 'Sign Up Failed:',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-red-400 p-4">
              <code className="text-white">{err.message}</code>
            </pre>
          ),
        })
      })
  }
}
