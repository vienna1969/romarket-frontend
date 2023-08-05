import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import Wallet from "@/components/layout/wallet";
import { GoogleAnalytics } from "nextjs-google-analytics";

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import {
  ThirdwebProvider,
  paperWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

///import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

import { Polygon } from '@thirdweb-dev/chains';

///const activeChain = "polygon";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient()


export default function App({ Component, pageProps }: any) {

  return (
    <>

      {/*
      <Wallet>
  */}
  
      <QueryClientProvider client={queryClient}>

          <ThirdwebProvider
            activeChain={Polygon}
            supportedWallets={[
              
              walletConnect(),

              metamaskWallet(),

              //paperWallet({
              //  clientId: 'efa05253-e8b1-4adb-b978-996f8f2f409c',
              //}),
            ]}
            sdkOptions={{
              gasless: {
                openzeppelin: {
                  relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
                },
              },

              /*
              gasless: {
                biconomy: {
                  apiKey: 'BlotrRJre.fe0d620c-d56f-4663-8e63-8cf5e6400dcd',
                  apiId: 'fd500daa-7efb-4e68-b488-4b2f9f212ab6',
                },
              },
              */
            }}
          >

        

          <ThemeProvider theme={darkTheme}>
          <GoogleAnalytics trackPageViews />
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
          <ToastContainer />



      
        {/*
      </Wallet>
      */}

          </ThirdwebProvider>

      </QueryClientProvider>

    </>
  );
}
