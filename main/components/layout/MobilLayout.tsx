import { IUser } from '@/utils/interfaces/user-interface'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import Image from 'next/image'
import { CiLogin } from 'react-icons/ci'


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



export default function MobileNavbar({ user, userBalance, coinSymbol }: { user: IUser | null, userBalance: any, coinSymbol: any }) {
    
    const address = useAddress();

    const { contract: tokenContractROM } = useContract(
        tokenContractAddressROM,
        'token',
    );
    const { data: tokenBalanceROM } = useTokenBalance(tokenContractROM, address);
    
    const disconnect = useDisconnect();

    return (
        <>
            <header className="lg:hidden w-full flex flex-col items-center sticky top-0 z-50 px-5 h-24 bg-[#24252F]">
                <nav className=' w-full flex  items-center gap-2  '>
                    <Link href={"/"}>
                        <Image src={"/logo/logo.png"} width={35} height={35} alt="logo" />
                    </Link>

                    <div className='w-full p-2 flex items-center justify-end gap-3'>

                        {/*
                        {user && <Link
                            href={"/deposite"}
                            className={`text-[13px] text-[#dca709]`}
                        >
                            Deposit / Withdraw
                        </Link>}
                        {
                            !user && <Link
                                href={"/login"}
                                className={`text-[13px] text-[#9293A6]  border-t-2 border-green-500 p-1`}
                            >
                                Sign In
                            </Link>
                        }
                        {
                            !user && <Link
                                href={"/register"}
                                className={`text-[13px] text-[#9293A6]  border-t-2 border-yellow-500 p-1`}
                            >
                                Sign Up
                            </Link>
                        }
                        */}

                        {/*
                        {user && <Link
                            href={"/hipodrom/profile"}
                            className={`flex items-center shadow-sm  justify-center rounded-md p-1 gap-2  h-[36px] px-2 text-[#D4D1CB] text-[13px]`}
                        >
                            <div className="flex gap-1">
                                {user && <Image
                                    src={user.img}
                                    width={20}
                                    height={20}
                                    alt="pp"
                                    className="rounded-full"
                                />}
                                {user?.username}
                            </div>
                        </Link>
                        }
                        */}



                        {address && <Link
                            href={"/profile"}
                            className={`flex items-center shadow-sm  justify-center rounded-md p-1 gap-2  h-[36px] px-2 text-[#D4D1CB] text-[13px]`}
                        >
                            <div className="flex gap-1">
                                {/*
                                {user && <Image
                                    src={user.img}
                                    width={20}
                                    height={20}
                                    alt="pp"
                                    className="rounded-full"
                                />}
                                {user?.username}
                                */}
                                Profile
                            </div>
                        </Link>
                        }



                    {/*
                        {
                            user && <button
                                className={`text-red-500`}
                                onClick={() => {
                                    deleteCookie('token'),
                                        router.push('/')
                                }}
                            >
                                <CiLogin className='w-6 h-10' />
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

{/*
                {user && <div
                    className={`flex items-center justify-center w-full bg-black rounded-md text-center px-5 text-[#BA8E09] border border-[#BA8E09] `}
                    title={`${userBalance} ${coinSymbol}`}
                >
                    {`${userBalance.toFixed(2)}`}&nbsp;<span className="text-[#9293A6]">{" "}{coinSymbol?.toString()}</span>
                </div>
                }

            */}


                {address && (
                    <div
                        className={`flex items-center justify-center w-full bg-black rounded-md text-center px-5 text-[#BA8E09] border border-[#BA8E09] `}
                        title={`${Number(tokenBalanceROM?.displayValue).toFixed(2)} ${tokenBalanceROM?.symbol}`}
                    >
                        {`${Number(tokenBalanceROM?.displayValue).toFixed(2)}`}&nbsp;<span className="text-[#9293A6]">{" "}{tokenBalanceROM?.symbol}</span>
                    </div>
                )}

            </header>
        </>
    )
}
