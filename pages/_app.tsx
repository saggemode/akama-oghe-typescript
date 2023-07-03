import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "@/utils/fetch";

const inter = Inter({ subsets: ["latin"] });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          refreshInterval: 1000,
          fetcher,
        }}
      >
        <ThemeProvider enableSystem={true} attribute="class">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <div className={inter.className}>
                <Component {...pageProps} />
              </div>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
