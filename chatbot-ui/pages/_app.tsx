import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Varela_Round } from 'next/font/google';

import { Provider } from '@/contex/AuthContext';
import '@/styles/globals.css';

const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: ['400'],
});

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();
  return (
    <div className={varelaRound.className}>
      <Toaster />
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default appWithTranslation(App);
