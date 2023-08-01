import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import MobileNavbar from './MobilLayout';
import { IUser } from '@/utils/interfaces/user-interface';
import { ISettings } from '@/utils/interfaces/settings-interface';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  //useOwnedNFTs,
  useTokenBalance,
  useNFTBalance,
  Web3Button,
} from '@thirdweb-dev/react';

import {
  //nftDropContractAddressNpc,
  //stakingContractAddressHorseAAA,
  tokenContractAddressROM,
} from '@/config/contractAddresses';


export default function Navbar({ user, settings, getBalance }: { user: IUser | null, settings: ISettings | null, getBalance: any }) {
  
  const [userBalance, setUserBalance] = useState<number>(user?.deposit ?? 0)
  //const router = useRouter();

  const disconnect = useDisconnect();
  /*
  const getUserBalance = async () => {
    const token = getCookie('token');
    if (token && user) {
      try {
        const res = await fetch('/api/user/getBalance?token=' + token);
        const data = await res.json();
        if (data.status) {
          setUserBalance(data.balance);
          if (getBalance != undefined) {
            getBalance(data.balance)
          }

        }
      } catch (error) {
        console.error('Something wrong:', error);
      }
    }
  };
  */


  /*

  useEffect(() => {
    getUserBalance(); // İlk bakiye alımı
    const interval = setInterval(getUserBalance, 1000); // Her 1 saniyede bir bakiye güncelle
    return () => clearInterval(interval);
  }, []);
  */

  const address = useAddress();

  const { contract: tokenContractROM } = useContract(
      tokenContractAddressROM,
      'token',
  );
  const { data: tokenBalanceROM } = useTokenBalance(tokenContractROM, address);
  

  
  return (
    <>
      {/* //? LG Screen üstü görüntü */}
      <header className="hidden lg:flex items-center justify-center w-full h-20 bg-[#24252F] sticky top-0 z-50 ">
        <div className="flex flex-col gap-3 items-center justify-center w-[250px] absolute top-0 bg-[#24252F] rounded-lg h-full z-50  ">
          <Link href={"/"} className="hover:opacity-50">
            <Image src={"/logo/logo.png"} alt="crypto game place" width={30} height={20} />
          </Link>
          <div className=" font-normal text-xs text-gray-200 tracking-widest">{settings?.settings.general.logoText}</div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex w-full bg-[#16181F] text-[11px] h-[30px] relative ">
            <div className="marquee-container relative w-full">
              <div className="marquee ">
                <span>
                  {settings?.settings.general.scrollingText}
                </span>
              </div>
              <div className="marquee marquee2 ">
                <span>
                  {settings?.settings.general.scrollingText}
                </span>
              </div>
            </div>
          </div>
          <nav className="flex items-center justify-center w-full h-[50px] bg-[#24252F] px-3 ">
            <div className="flex items-center w-full gap-7 text-[#9293A6] fill-[#9293A6] uppercase ">
              
              {/*
              {user && <Link
                href={"/deposite"}
                className={`text-[13px] text-[#ffc000] hover:text-[#dca709]  duration-300 transition-all`}
              >
                Deposit / Withdraw
              </Link>}
              */}

            </div>
            <div className="flex items-center w-full justify-end gap-4">


            {address && (
                <div
                className={`flex items-center justify-center  bg-black rounded-md h-[36px] text-center px-5 text-[#BA8E09] border border-[#BA8E09] `}
                    title={`${Number(tokenBalanceROM?.displayValue).toFixed(2)} ${tokenBalanceROM?.symbol}`}
                >
                    {`${Number(tokenBalanceROM?.displayValue).toFixed(2)}`}&nbsp;<span className="text-[#9293A6]">{" "}{tokenBalanceROM?.symbol}</span>
                </div>
            )}

              {/*

              {user && <div
                className={`flex items-center justify-center  bg-black rounded-md h-[36px] text-center px-5 text-[#BA8E09] border border-[#BA8E09] `}
              >
                {userBalance.toFixed(3)} <span className="text-[#9293A6] ml-1">{" "}{settings?.token.symbol}</span>
              </div>
              }

              
              {user?.admin && <Link href={"/admin"}
                className={`flex items-center justify-center  bg-black rounded-md h-[36px] text-center px-5 text-red-500 border border-red-500 `}
              >
                Admin Panel
              </Link>
              }
              {
                !user && <Link
                  href={"/login"}
                  className={`text-[13px] text-[#9293A6] green-link p-1`}
                >
                  <div className='flex flex-col '>
                    <p className='green-btn duration-300 transition-all'></p>
                    <p className='text-white hover:text-[#0fff50]'> Sign In</p>
                  </div>
                </Link>
              }
              {
                !user && <Link
                  href={"/register"}
                  className={`text-[13px] text-[#9293A6]  gold-link p-1`}
                >
                  <div className='flex flex-col '>
                    <p className='gold-btn duration-300 transition-all'></p>
                    <p className='text-white hover:text-[#ffc000]'> Sign Up</p>
                  </div>
                </Link>
              }
              {
                user && <Link
                  href={"/profile"}
                  className={`flex items-center justify-center rounded-md p-1 gap-2  h-[36px] px-2 text-[#D4D1CB] text-[13px]`}
                >

                  <div className="flex flex-col items-center justify-center w-[25px] h-[25px]">
                    {user && <Image
                      src={user.img}
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      alt="pp"
                      className="rounded-full w-[25px] h-[25px]"
                    />}
                  </div>
                  {user?.username}
                </Link>
              }
              */}


              {address && <Link
                  href={"/profile"}
                  className={`flex items-center justify-center rounded-md p-1 gap-2  h-[36px] px-2 text-[#D4D1CB] text-[13px]`}
                >

{/*
                  <div className="flex flex-col items-center justify-center w-[25px] h-[25px]">

                    {user && <Image
                      src={user.img}
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      alt="pp"
                      className="rounded-full w-[25px] h-[25px]"
                    />}

                  </div>
                  {user?.username}
*/}
                  Profile
                </Link>
              }



              {/*
              {
                user && <button
                  className={`text-[13px] text-red-500`}
                  onClick={() => {
                    deleteCookie('token')
                    router.push("/");
                  }}
                >
                  Log Out
                </button>
              }
            */}

            {!address ? (
              <div className='flex items-center justify-center bg-[#BABE09] rounded-md text-center text-[#BA8E09] border border-[#BA8E09] '>
                <ConnectWallet theme='light' />
              </div>
            ) : (
              <>
              {/*
              <div className='flex items-center justify-center bg-[#BABE09] rounded-md text-center text-[#BA8E09] border border-[#BA8E09] '>
                <button onClick={disconnect}>Disconnect</button>;
              </div>
              */}
              </>
            )}



            </div>
            
          </nav>
        </div>
      </header>

      {/* //? Mobil Navbar */}
      <MobileNavbar user={user} userBalance={userBalance} coinSymbol={settings?.token.symbol} />
    </>
  )
}


