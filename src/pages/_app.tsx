import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { Provider } from 'react-redux'
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'
import { AnimatePresence } from "framer-motion";

// Load fonts
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/satisfy';

// Import css
import '@styles/globals.css'
import '@styles/tailwind.css';

import store from '../store';

function handleExitComplete() {
	if (typeof window !== "undefined") {
		window.scrollTo({ top: 0 });
	}
}

function Noop({ children }: any) {
  return <>{children}</>;
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const Layout = (Component as any).Layout || Noop;
  const queryClientRef = useRef();
  
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.route} />  
              <ToastContainer />      
            </Layout>
          </Provider>
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </AnimatePresence>
  );
}

export default App
