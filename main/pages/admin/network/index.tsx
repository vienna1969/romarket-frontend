import Sidebar from "@/components/layout/admin/Sidebar";
import { ISettings } from "@/utils/interfaces/settings-interface";
import { IUser } from "@/utils/interfaces/user-interface";
import { authFromServer } from "@/utils/services/useAuth";
import { Breadcrumbs, Link, Switch, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { GetServerSidePropsContext } from "next/types";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { myGetServerSideProps } from "@/helpers";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  width: "100%",
  color: theme.palette.text.secondary,
}));

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { user, settings }: any = await myGetServerSideProps(context)
  
  if (!user.admin) {
    return { redirect: { destination: '/', permanent: false } }
  }
  return {
    props: {
      user: user,
      settings: settings ?? null,
    }
  }
}
export default function Admin({
  user,
  settings,
  users,
}: {
  user: IUser;
  settings: ISettings | null;
  users: IUser[];
}) {
  const [networkList, setNetworklist] = useState(settings?.networks || []);

  const networks = [
    "mainnet",
    "goerli",
    "arbitrum",
    "arbitrumGoerli",
    "aurora",
    "auroraTestnet",
    "avalanche",
    "avalancheFuji",
    "baseGoerli",
    "boba",
    "bronos",
    "bronosTestnet",
    "bsc",
    "bscTestnet",
    "canto",
    "celo",
    "celoAlfajores",
    "chronos",
    "crossbell",
    "dfk",
    "dogechain",
    "evmos",
    "evmosTestnet",
    "fantom",
    "fantomTestnet",
    "filecoin",
    "filecoinCalibration",
    "filecoinHyperspace",
    "flare",
    "flareTestnet",
    "gnosis",
    "gnosisChiado",
    "harmonyOne",
    "iotex",
    "iotexTestnet",
    "klaytn",
    "metis",
    "metisGoerli",
    "moonbaseAlpha",
    "moonbeam",
    "moonriver",
    "nexi",
    "okc",
    "optimism",
    "optimismGoerli",
    "polygon",
    "polygonMumbai",
    "polygonZkEvm",
    "polygonZkEvmTestnet",
    "scrollTestnet",
    "sepolia",
    "shardeumSphinx",
    "skaleCalypso",
    "skaleCalypsoTestnet",
    "skaleChaosTestnet",
    "skaleCryptoBlades",
    "skaleCryptoColosseum",
    "skaleEuropa",
    "skaleEuropaTestnet",
    "skaleExorde",
    "skaleHumanProtocol",
    "skaleNebula",
    "skaleNebulaTestnet",
    "skaleRazor",
    "skaleTitan",
    "skaleTitanTestnet",
    "songbird",
    "songbirdTestnet",
    "taraxa",
    "taraxaTestnet",
    "telos",
    "telosTestnet",
    "titan",
    "titanTestnet",
    "wanchain",
    "wanchainTestnet",
    "xdc",
    "xdcTestnet",
    "zkSync",
    "zkSyncTestnet",
    "foundry",
    "hardhat",
  ];
  const [demo, setDemo] = useState(process.env.NEXT_PUBLIC_DEMO == "true" ? true : false);

  return (
    <div className="flex">
      <div className="w-[80px] lg:w-[453px] p-2"></div>
      <Sidebar />
      <div className="w-full p-10 gap-2 flex flex-col ml-10 md:ml-0">
        {/* Breadcrumb Start Here */}
        <div className="bg-gray-900 p-3 rounded-md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              className="flex justify-center"
              underline="hover"
              color="inherit"
              href="/admin"
            >
              <DashboardIcon className="mr-2" />
              Dashboard
            </Link>
            <Typography color="text.primary">Networks</Typography>
          </Breadcrumbs>
        </div>
        {/* Breadcrumb End Here */}

        <div className="bg-gray-900 p-3 flex flex-row gap-2 ">
          <div className="flex flex-col w-full">
            <Typography color="text.primary">Networks</Typography>
            {networkList.length}
            <Stack spacing={2} className="w-full mt-5">
              {networks.map((network, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between bg-gray-800 p-2 rounded-md items-center"
                >
                  <Typography color="text.primary">{network}</Typography>
                  <Switch
                    disabled={demo}
                    checked={networkList.includes(network)}
                    onChange={() => {
                      var list = networkList;
                      if (networkList.includes(network)) {
                        setNetworklist(
                          networkList.filter((item: any) => item !== network)
                        );
                        list = networkList.filter(
                          (item: any) => item !== network
                        );
                      } else {
                        setNetworklist([...networkList, network]);
                        list = [...networkList, network];
                      }

                      fetch("/api/settings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          method: "update",
                          _id: settings?._id,
                          requestType: settings?.requestType,
                          chat: settings?.chat,
                          networks: list,
                        }),
                      }).then(async (res) => {
                        const cevap = await res.json();
                      });
                    }}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
              ))}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
