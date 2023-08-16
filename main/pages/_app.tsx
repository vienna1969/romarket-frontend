import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import Wallet from "@/components/layout/wallet";
import { GoogleAnalytics } from "nextjs-google-analytics";

///import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';



import {
  ThirdwebProvider,
  paperWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';

///import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

import { Polygon } from '@thirdweb-dev/chains';

import { useState } from 'react';

///const activeChain = "polygon";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});



const queryClient = new QueryClient()




export default function App({ Component, pageProps }: any) {


  /////const [queryClient] = useState(() => new QueryClient());

  return (
    <>

      {/*
      <Wallet>
  */}

          <QueryClientProvider
            client={queryClient}
            ////contextSharing={true}
          >




        
      <ThemeProvider theme={darkTheme}>
        

            <GoogleAnalytics trackPageViews />
            <CssBaseline />





            <ThirdwebProvider
          ///queryClient={queryClient}


          clientId="53b7aa6108d68f6195a768c4dcc7fad5"
          activeChain={Polygon}
          supportedWallets={[
            paperWallet({
              //paperClientId: '0f8cb1f0-845f-4f71-b49d-d4a01abd5bf3',
              //clientId: '0f8cb1f0-845f-4f71-b49d-d4a01abd5bf3'

              //clientId: '0f8cb1f0-845f-4f71-b49d-d4a01abd5bf3',

              paperClientId: '0f8cb1f0-845f-4f71-b49d-d4a01abd5bf3',

            }),

            metamaskWallet(),
            walletConnect(),
          ]}

          sdkOptions={{
            gasless: {
              openzeppelin: {
                ///relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
                relayerUrl: 'https://api.defender.openzeppelin.com/autotasks/131a67c9-4166-42d2-831d-f53866705fd4/runs/webhook/32a6dbb5-b039-403b-bd1c-ff44e65cf6ab/FhhoRD67DaaotNgYqwDifw',
                
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
            <Component {...pageProps} />

            </ThirdwebProvider>


          <ToastContainer />
      
          {/*
          </Wallet>
          */}






          
      </ThemeProvider>
          


      </QueryClientProvider>

    </>
  );
}
