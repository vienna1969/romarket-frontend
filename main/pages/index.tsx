//import MyLottiePlayer from '@/components/MyLottie'
import Layout from '@/components/layout/Layout'
import { myGetServerSideProps } from '../helpers';
import { IUser } from '@/utils/interfaces/user-interface'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'
import { ISettings } from '@/utils/interfaces/settings-interface';

import { deleteCookie, getCookie, hasCookie } from 'cookies-next';


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





export default function Home(
  {
    //user,
    settings,
  }:
  {
    //user: IUser | null,
    settings: ISettings | any,
  }
) {

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
          
        } else {


        }
      
      }
    }

    checkUser();

  }, [address]);


  /*
  useEffect(() => {

      async function checkUser() {

        if (address && emailQuery.data) {

          console.log("address: ", address);
          console.log("emailQuery: ", emailQuery);
    
          const email = emailQuery.data;
          const username = email.split("@")[0];
    
          const password = "12345678";

          const formInputs = {
            username: username,
            email: email,
            pass1: password,
            pass2: password,

            walletAddress: address,
            
            //bonus: settings?.welcomeBonus ?? 0
            bonus: 0,
          };

          const res = await fetch("/api/user?method=create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formInputs),
          });
          const data = await res.json();

          console.log("data: ", data);

          if (data.status) {
            console.log("data: ", data);
          } else {

          }
        }
      }

      checkUser();

  }, [address, emailQuery]);
  */


  return (

    
    <>
      <Layout user={user} settings={settings}>

        <div className='flex flex-col items-center justify-center p-10 main-page-bg gap-5'>
          <div className='text-3xl font-bold flex flex-col lg:flex-row gap-5 items-center p-5 xl:w-2/3 '>
            <p>{settings?.texts?.index.text ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque excepturi recusandae doloribus ratione vero molestias non fugit nisi enim! Ducimus aliquam, consectetur itaque reprehenderit laudantium distinctio minus ipsa sed molestiae!"}</p>
          </div>

          {/*settings?.bannerUrl?.length > 1 &&
            <div className='w-full flex items-center justify-center'>
              <Image src={settings.bannerUrl} width={728} height={90} alt='crypto game place' className='w-[728px] h-[90x]' />
            </div>
          */}

          
          <div className='flex flex-col lg:flex-row place-items-center justify-items-center gap-5'>
            {/*
            {settings.games[1].active &&
              <div className='flex w-full gap-5 items-center bg-black/30 shadow-md px-5 min-h-[300px] rounded-lg backdrop-blur-md'>
                <MyLottiePlayer src={'/horseRace/at.json'} width={200} height={200} />
                <div className=''>
                  <h2 className='font-bold'>{settings?.texts?.index.game1Title ?? "Horse Race"}</h2>
                  <p className='text-sm italic my-5'>{settings?.texts?.index.game1Description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque."}</p>
                  <Link href={'/games/horseRace'} className='emerald-btn p-2 px-4 duration-300 transition-all'>
                    Play
                  </Link>
                </div>
              </div>
            }
            */}
            {settings.games[0].active &&
              <div className='flex w-full gap-5 items-center bg-black/30 shadow-md px-2 min-h-[300px] rounded-lg backdrop-blur-md text-end '>
                <div className='m-10'>
                  <h2 className='font-bold'>{settings?.settings?.general.siteName ?? "Welcome"}</h2>
                  <p className='text-sm italic my-5'>{settings?.settings?.general.siteDescription ?? "for the future"}</p>

                  
                  {address ?
                    <div className='flex flex-col gap-2'>

                      {user?.admin &&                      
                        <Link href={'/admin'} className='emerald-btn p-2 px-4 duration-300 transition-all text-center'>
                          Go to Dashboard
                        </Link>
                      }

                      <div className='flex flex-row w-full gap-5 items-center justify-center'>

                        <div className='flex flex-col w-full text-xl font-bold items-center justify-center'>

                          <div>
                            {user?.email}
                          </div>
                          <div>

                          {user?.admin == false && 
                            <>
                                <p className='text-sm italic my-5'>
                                  You are not an admin, you have to contract administrator.
                                </p>
                            </>
                          }
                          </div>
                        </div>

                        <button className=' emerald-btn p-2 px-4 duration-300 transition-all items-center justify-center'
                          onClick={disconnect}>
                          Disconnect
                        </button>

                      </div>
                    </div>
                    :
                    <ConnectWallet
                      className="p-2 px-4 rounded-md gold-btn text-gray-900 text-xs duration-300 transition-all "
                      //theme='light'
                    />
                  }

                  

                </div>
                {/*
                <MyLottiePlayer src={'/coinFlip/coinFlip.json'} width={200} height={200} />
                */}
              </div>
            }
          </div>
          

          {/*
          {settings.games[2].active &&
            <div className='flex items-center justify-center text-center bg-black/30 shadow-md px-5 min-h-[300px] rounded-lg backdrop-blur-md xl:col-span-2'>
              <MyLottiePlayer src={'/roulette/roulette.json'} width={200} height={200} />
              <div className=''>
                <h2 className='font-bold'>{settings?.texts?.index.game3Title ?? "Roulette"}</h2>
                <p className='text-sm italic my-5'>{settings?.texts?.index.game3Description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque."}</p>
                <Link href={'/games/roulette'} className='emerald-btn p-2 px-4 duration-300 transition-all'>
                  Play
                </Link>
              </div>
            </div>
          }
          */}

        </div>

      </Layout >
    </>

  )


}


export async function getServerSideProps(context: GetServerSidePropsContext) {

  const {
    //user,
    settings,
  }: any = await myGetServerSideProps(context)

  return {
    props: {
      //user: user ?? null,
      settings: settings ?? null
    }
  }
}
