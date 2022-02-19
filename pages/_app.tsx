import '../styles/globals.scss'
import '../styles/memecreator.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning className="NFMeme-main-container">
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}
