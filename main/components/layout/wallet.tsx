import { IUser } from "@/utils/interfaces/user-interface";
import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

/*
import {
  configureChains,
  //createClient,
  WagmiConfig
} from "wagmi";
*/

import {
  mainnet,
  goerli,
  arbitrum,
  arbitrumGoerli,
  aurora,
  auroraTestnet,
  avalanche,
  avalancheFuji,
  baseGoerli,
  boba,
  bronos,
  bronosTestnet,
  bsc,
  bscTestnet,
  canto,
  celo,
  celoAlfajores,
  crossbell,
  dfk,
  dogechain,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  filecoin,
  filecoinCalibration,
  filecoinHyperspace,
  flare,
  flareTestnet,
  gnosis,
  gnosisChiado,
  harmonyOne,
  iotex,
  iotexTestnet,
  klaytn,
  metis,
  metisGoerli,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  nexi,
  okc,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scrollTestnet,
  sepolia,
  shardeumSphinx,
  skaleCalypso,
  skaleCalypsoTestnet,
  skaleChaosTestnet,
  skaleCryptoBlades,
  skaleCryptoColosseum,
  skaleEuropa,
  skaleEuropaTestnet,
  skaleExorde,
  skaleHumanProtocol,
  skaleNebula,
  skaleNebulaTestnet,
  skaleRazor,
  skaleTitan,
  skaleTitanTestnet,
  songbird,
  songbirdTestnet,
  taraxa,
  taraxaTestnet,
  telos,
  telosTestnet,
  wanchain,
  wanchainTestnet,
  xdc,
  xdcTestnet,
  zkSync,
  zkSyncTestnet,
  foundry,
  hardhat,
} from "wagmi/chains";

/*
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
*/

import dynamic from "next/dynamic";
import { set } from "mongoose";

export default function Wallet({ children }: { children: React.ReactNode }) {
  
  const [networks, setNetworks] = useState<any>([]);
  const [nl, setNl] = useState<any>([mainnet]);

  const getSettings = async () => {
    const settings = await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "get",
        API_KEY: process.env.NEXT_PUBLIC_API_AUTH,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNetworks(data.settings[0].networks);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return settings;
  };

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    chainList();
  }, [networks]);

  const chainList = () => {
    let chain: any = [];
    networks.map((network: any) => {
      if (network === "mainnet") {
        chain.push(mainnet);
      }

      if (network === "goerli") {
        chain.push(goerli);
      }

      if (network === "arbitrum") {
        chain.push(arbitrum);
      }

      if (network === "arbitrumGoerli") {
        chain.push(arbitrumGoerli);
      }

      if (network === "aurora") {
        chain.push(aurora);
      }

      if (network === "auroraTestnet") {
        chain.push(auroraTestnet);
      }

      if (network === "avalanche") {
        chain.push(avalanche);
      }

      if (network === "avalancheFuji") {
        chain.push(avalancheFuji);
      }

      if (network === "baseGoerli") {
        chain.push(baseGoerli);
      }

      if (network === "boba") {
        chain.push(boba);
      }

      if (network === "bronos") {
        chain.push(bronos);
      }

      if (network === "bronosTestnet") {
        chain.push(bronosTestnet);
      }

      if (network === "bsc") {
        chain.push(bsc);
      }

      if (network === "bscTestnet") {
        chain.push(bscTestnet);
      }

      if (network === "canto") {
        chain.push(canto);
      }

      if (network === "celo") {
        chain.push(celo);
      }

      if (network === "celoAlfajores") {
        chain.push(celoAlfajores);
      }

      if (network === "crossbell") {
        chain.push(crossbell);
      }

      if (network === "dfk") {
        chain.push(dfk);
      }

      if (network === "dogechain") {
        chain.push(dogechain);
      }

      if (network === "evmos") {
        chain.push(evmos);
      }

      if (network === "evmosTestnet") {
        chain.push(evmosTestnet);
      }

      if (network === "fantom") {
        chain.push(fantom);
      }

      if (network === "fantomTestnet") {
        chain.push(fantomTestnet);
      }

      if (network === "filecoin") {
        chain.push(filecoin);
      }

      if (network === "filecoinCalibration") {
        chain.push(filecoinCalibration);
      }

      if (network === "filecoinHyperspace") {
        chain.push(filecoinHyperspace);
      }

      if (network === "flare") {
        chain.push(flare);
      }

      if (network === "flareTestnet") {
        chain.push(flareTestnet);
      }

      if (network === "gnosis") {
        chain.push(gnosis);
      }

      if (network === "gnosisChiado") {
        chain.push(gnosisChiado);
      }

      if (network === "harmonyOne") {
        chain.push(harmonyOne);
      }

      if (network === "iotex") {
        chain.push(iotex);
      }

      if (network === "iotexTestnet") {
        chain.push(iotexTestnet);
      }

      if (network === "klaytn") {
        chain.push(klaytn);
      }

      if (network === "metis") {
        chain.push(metis);
      }

      if (network === "metisGoerli") {
        chain.push(metisGoerli);
      }

      if (network === "moonbaseAlpha") {
        chain.push(moonbaseAlpha);
      }

      if (network === "moonbeam") {
        chain.push(moonbeam);
      }

      if (network === "moonriver") {
        chain.push(moonriver);
      }

      if (network === "nexi") {
        chain.push(nexi);
      }

      if (network === "okc") {
        chain.push(okc);
      }

      if (network === "optimism") {
        chain.push(optimism);
      }

      if (network === "optimismGoerli") {
        chain.push(optimismGoerli);
      }

      if (network === "polygon") {
        chain.push(polygon);
      }

      if (network === "polygonMumbai") {
        chain.push(polygonMumbai);
      }

      if (network === "polygonZkEvm") {
        chain.push(polygonZkEvm);
      }

      if (network === "polygonZkEvmTestnet") {
        chain.push(polygonZkEvmTestnet);
      }

      if (network === "scrollTestnet") {
        chain.push(scrollTestnet);
      }

      if (network === "sepolia") {
        chain.push(sepolia);
      }

      if (network === "shardeumSphinx") {
        chain.push(shardeumSphinx);
      }

      if (network === "skaleCalypso") {
        chain.push(skaleCalypso);
      }

      if (network === "skaleCalypsoTestnet") {
        chain.push(skaleCalypsoTestnet);
      }

      if (network === "skaleChaosTestnet") {
        chain.push(skaleChaosTestnet);
      }

      if (network === "skaleCryptoBlades") {
        chain.push(skaleCryptoBlades);
      }

      if (network === "skaleCryptoColosseum") {
        chain.push(skaleCryptoColosseum);
      }

      if (network === "skaleEuropa") {
        chain.push(skaleEuropa);
      }

      if (network === "skaleEuropaTestnet") {
        chain.push(skaleEuropaTestnet);
      }

      if (network === "skaleExorde") {
        chain.push(skaleExorde);
      }

      if (network === "skaleHumanProtocol") {
        chain.push(skaleHumanProtocol);
      }

      if (network === "skaleNebula") {
        chain.push(skaleNebula);
      }

      if (network === "skaleNebulaTestnet") {
        chain.push(skaleNebulaTestnet);
      }

      if (network === "skaleRazor") {
        chain.push(skaleRazor);
      }

      if (network === "skaleTitan") {
        chain.push(skaleTitan);
      }

      if (network === "skaleTitanTestnet") {
        chain.push(skaleTitanTestnet);
      }

      if (network === "songbird") {
        chain.push(songbird);
      }

      if (network === "songbirdTestnet") {
        chain.push(songbirdTestnet);
      }

      if (network === "taraxa") {
        chain.push(taraxa);
      }

      if (network === "taraxaTestnet") {
        chain.push(taraxaTestnet);
      }

      if (network === "telos") {
        chain.push(telos);
      }

      if (network === "telosTestnet") {
        chain.push(telosTestnet);
      }

      if (network === "wanchain") {
        chain.push(wanchain);
      }

      if (network === "wanchainTestnet") {
        chain.push(wanchainTestnet);
      }

      if (network === "xdc") {
        chain.push(xdc);
      }

      if (network === "xdcTestnet") {
        chain.push(xdcTestnet);
      }

      if (network === "zkSync") {
        chain.push(zkSync);
      }

      if (network === "zkSyncTestnet") {
        chain.push(zkSyncTestnet);
      }

      if (network === "foundry") {
        chain.push(foundry);
      }

      if (network === "hardhat") {
        chain.push(hardhat);
      }
    });
    if (chain.length === 0) {
    } else {

      setNl(chain);
    }
  };

  /*
  const { chains, provider } = configureChains(nl, [
    alchemyProvider({ apiKey: `${process.env.ALCHEMY_ID}` }),
    publicProvider(),
  ]);
  */

  /*
  const { connectors } = getDefaultWallets({
    appName: "Crypto Game Place - Plinko",
    projectId: "plinko",
    chains,
  });
  */

  /*
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  */


  return (
    <>

    {/*
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    */}

    </>
  );
}
