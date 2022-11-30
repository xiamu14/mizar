import type { AppProps } from 'next/app';
import '../styles/article.scss';
import '../styles/globals.css';
import '../styles/prism.css';
import '../styles/utils.css';
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
