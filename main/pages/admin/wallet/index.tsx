import Layout from '@/components/layout/Layout';
import Sidebar from "@/components/layout/admin/Sidebar";
import { ISettings } from "@/utils/interfaces/settings-interface";
import { IUser } from "@/utils/interfaces/user-interface";
import { authFromServer } from "@/utils/services/useAuth";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { GetServerSidePropsContext } from "next/types";
import { useState } from "react";
import { myGetServerSideProps } from "@/helpers";

import React, { use } from 'react'

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
  usePaperWalletUserEmail,
} from '@thirdweb-dev/react';

import { useEffect } from "react";
import { Router } from 'lucide-react';


import { Network, Alchemy } from 'alchemy-sdk';



export async function getServerSideProps(context: GetServerSidePropsContext) {

  
  const { user, settings }: any = await myGetServerSideProps(context)

  /*
  if (!user.admin) {
    return { redirect: { destination: '/', permanent: false } }
  }
  */

  const usersResponse = await fetch(process.env.API_URL + '/api/user?method=getUserCount')
  const users = await usersResponse.json()

  console.log(users)


  return {
    props: {
      //user: user,
      settings: settings ?? null,
      usersCount: users.count

    }
  }
}


export default function Wallet({
  //user,
  settings,
  usersCount
}: {
  //user: IUser;
  settings: ISettings | null;
  usersCount: number
}) {



  const settingsAlchemy = {
    //apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.

    apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settingsAlchemy);





  const [balanceROM, setBalanceROM] = useState<any>(0);
  const [balanceUSDC, setBalanceUSDC] = useState<any>(0);
  const [balanceUSDT, setBalanceUSDT] = useState<any>(0);



  const [withdrawType, setWithdrawType] = useState(settings?.requestType);
  
  const [chat, setChat] = useState(settings?.chat);

  const [demo, setDemo] = useState(process.env.NEXT_PUBLIC_DEMO == "true" ? true : false);
  const [games, setGames] = useState<any>(settings?.games);



  const address = useAddress();
  const disconnect = useDisconnect();
  
  //const emailQuery = usePaperWalletUserEmail();

  const [user, setUser] = React.useState<IUser | null>(null);


  useEffect(() => {

    async function checkUser() {
        
      if (address) {

        console.log("address: ", address);

        const formInputs = {
          walletAddress: address,
        };

        const res = await fetch("/api/user?method=getOneByWalletAddress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formInputs),
        });
        const data = await res.json();

        console.log("data: ", data);

        if (data.status) {

          setUser(data.user);
          
        } 





      
      }
    }

    async function checkUserBalance() {

      if (address) {

        //ROM token contract address
        const tokenContractAddresses = [
          "0x886b480c34BF4a0DeF1B2d0B8a0B3a88DDBF3A73", // ROM
          "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC
          "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", // USDT
        ];

        const data = await alchemy.core.getTokenBalances(
          address,
          tokenContractAddresses
        );

        console.log("Token balance for Address");
        console.log(data.tokenBalances[0].tokenBalance);

        const balanceROM = data.tokenBalances[0].tokenBalance;
        const balanceUSDC = data.tokenBalances[1].tokenBalance;
        const balanceUSDT = data.tokenBalances[2].tokenBalance;

        const numDecimals = 18;

        setBalanceROM( (parseInt(balanceROM) / 10 ** numDecimals).toFixed(2) );
        setBalanceUSDC( (parseInt(balanceUSDC) / 10 ** numDecimals).toFixed(2) );
        setBalanceUSDT( (parseInt(balanceUSDT) / 10 ** numDecimals).toFixed(2) );



      }


    }



    checkUser();

    checkUserBalance();

  }, [address]);



  const changeWithdrawType = async () => {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: "update",
        _id: settings?._id,
        requestType: withdrawType === "Coin" ? "Main" : "Coin",
        chat: chat,
        networks: settings?.networks
      }),
    });
    const cevap = await res.json();
    if (cevap.status) {
      setWithdrawType(withdrawType === "Coin" ? "Main" : "Coin")
    } else {
      alert("Something went wrong!")
    }
  }

  const changeChat = async () => {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: "update",
        _id: settings?._id,
        requestType: withdrawType === "Coin" ? "Coin" : "Main",
        chat: chat ? false : true,
        networks: settings?.networks
      }),
    });
    const cevap = await res.json();
    if (cevap.status) {
      setChat(!chat)
    } else {
      alert("Something went wrong!")
    }
  }


  const changeGameStatus = async (gameId: number) => {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: "changeGameStatus",
        gameId: gameId,
        status: games[gameId]?.active ? false : true
      })
    });
    const cevap = await res.json();
    if (cevap.status) {
      setGames({ ...games, [gameId]: { ...games[gameId], active: games[gameId].active ? false : true } })
    } else {
      alert(cevap.message)
    }
  }


  // if not admin redirect to home page
/*
  if (!user?.admin) {
    return { redirect: { destination: '/', permanent: false } }
  }
  */
 


  return (

    // if not admin redirect to home page
    (!user?.admin ? <div>Not Authorized</div>
    
    :

    <>
    

    
    
    



    
    <div className="flex" >

      <div className="w-[80px] lg:w-[453px] p-2">

      </div>


      <Sidebar />

      
      <div className="w-full p-10 gap-2 flex flex-col">

        {/* Breadcrumb Start Here */}
        <div className="bg-gray-900 p-3 rounded-md">

          <Breadcrumbs aria-label="breadcrumb">

            <Link className="flex justify-center" underline="hover" color="inherit" href="/admin">
              <DashboardIcon className="mr-2" />
              Dashboard
            </Link>
            <Typography color="text.primary">Wallet</Typography>
          </Breadcrumbs>

        </div>
        {/* Breadcrumb End Here */}


        <div className="bg-gray-900 p-3 flex flex-col md:flex-row gap-2">
          <div className="bg-white/10 p-2 w-full rounded-sm">
            <Typography className="text-white" variant="h6">Address</Typography>
            <Typography className="text-white text-right" variant="h6">{address}</Typography>
          </div>
        </div>

        <div className="bg-gray-900 p-3 flex flex-col md:flex-row gap-2">


          <div className="bg-white/10 p-2 w-full rounded-sm">
            <Typography className="text-white" variant="h6">Balance (ROM)</Typography>
            <Typography className="text-white text-right" variant="h4">{balanceROM}</Typography>
          </div>

          <div className="bg-white/10 p-2 w-full rounded-sm">
            <Typography className="text-white" variant="h6">Balance (USDC)</Typography>
            <Typography className="text-white text-right" variant="h4">{balanceUSDC}</Typography>
          </div>

          <div className="bg-white/10 p-2 w-full rounded-sm">
            <Typography className="text-white" variant="h6">Balance (USDT)</Typography>
            <Typography className="text-white text-right" variant="h4">{balanceUSDT}</Typography>
          </div>


          {/*
          <div className="bg-white/10 p-2 w-full rounded-sm">
            <Typography className="text-white" variant="h6">Withdraw Type</Typography>
            <div className="w-full flex justify-between">
              <Typography className={`${withdrawType == "Main" ? "text-purple-500" : "text-green-500"}`} variant="h4">{withdrawType}</Typography>
              <button disabled={demo} className="bg-white/20 p-2 rounded" onClick={changeWithdrawType}>Change</button>
            </div>
          </div>
          <div className="bg-white/10 p-2 w-full rounded-sm">
            <Typography className="text-white" variant="h6">Chat</Typography>
            <div className="w-full flex justify-between">
              <Typography className={`${chat ? "text-green-500" : "text-red-500"}`} variant="h4">{chat ? "ON" : "OFF"}</Typography>
              <button disabled={demo} className="bg-white/20 p-2 rounded" onClick={changeChat}>Change</button>
            </div>
          </div>
          */}

        </div>

        {/*
        <div className="p-4 bg-gray-900 rounded-sm flex flex-col w-full gap-3">
          <Typography className="text-white" variant="h6">Games Status</Typography>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="bg-white/20 rounded-sm p-2 w-full flex flex-col md:flex-row items-center gap-2 justify-center">
              <Typography className="text-white" variant="h6">Coin Flip</Typography>
              
              
      
              <Typography className={games[0]?.active ? "text-green-500" : "text-red-500"} variant="h4">{games[0].active ? "ON" : "OFF"}</Typography>
  
              
              
              <button disabled={demo} onClick={() => { changeGameStatus(0) }} className="bg-white/20 p-2 rounded">Change</button>
            </div>
            <div className="bg-white/20 rounded-sm p-2 w-full flex flex-col md:flex-row items-center gap-2 justify-center">
              <Typography className="text-white" variant="h6">Horse Race</Typography>
              
              
              <Typography className={games[1].active ? "text-green-500" : "text-red-500"} variant="h4">{games[1].active ? "ON" : "OFF"}</Typography>

              
              <button disabled={demo} onClick={() => { changeGameStatus(1) }} className="bg-white/20 p-2 rounded">Change</button>
            </div>
            <div className="bg-white/20 rounded-sm p-2 w-full flex flex-col md:flex-row items-center gap-2 justify-center">
              <Typography className="text-white" variant="h6">Roulette</Typography>
              
             
              <Typography className={games[2].active ? "text-green-500" : "text-red-500"} variant="h4">{games[2].active ? "ON" : "OFF"}</Typography>
              
              
              <button disabled={demo} onClick={() => { changeGameStatus(2) }} className="bg-white/20 p-2 rounded">Change</button>
            </div>
          </div>
        </div>
        */}

      </div>
    </div >

    </>
    )

  );


}
