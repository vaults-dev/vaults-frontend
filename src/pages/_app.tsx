import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Sen } from 'next/font/google'

const sen = Sen({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sen',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${sen.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
