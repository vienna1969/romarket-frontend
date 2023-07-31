import React, { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import Layout from '@/components/layout/Layout'
import { IUser } from '@/utils/interfaces/user-interface'
import Image from 'next/image'
import { Alert, Snackbar, Stack, TextField } from '@mui/material'
import { ImSpinner9 } from 'react-icons/im'
import { getCookie } from 'cookies-next'
import { myGetServerSideProps } from '@/helpers'

/*
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
*/

import {
    nftDropContractAddressNpc,
    //stakingContractAddressHorseAAA,
    tokenContractAddressGCOW,
} from '@/config/contractAddresses';

import {
    useTokenBalance,
    ConnectWallet,
    detectContractFeature,
    useActiveClaimConditionForWallet,
    useAddress,
    useClaimConditions,
    useClaimedNFTSupply,
    useClaimerProofs,
    useClaimIneligibilityReasons,
    useContract,
    useContractMetadata,
    useNFT,
    useUnclaimedNFTSupply,
    Web3Button,
  } from "@thirdweb-dev/react";
  import { BigNumber, utils } from "ethers";
  import { useMemo } from "react";

  /*
  import { HeadingImage } from "./components/HeadingImage";
  import { PoweredBy } from "./components/PoweredBy";
  import { useToast } from "./components/ui/use-toast";
  import { parseIneligibility } from "./utils/parseIneligibility";
  */

  /*
  import {
    contractConst,
    primaryColorConst,
    themeConst,
  } from "./consts/parameters";
  */
  import { ContractWrapper } from "@thirdweb-dev/sdk/dist/declarations/src/evm/core/classes/contract-wrapper";
  
  ///const urlParams = new URL(window.location.toString()).searchParams;
  //const contractAddress = urlParams.get("contract") || contractConst || "";
  const contractAddress = tokenContractAddressGCOW;

  //const primaryColor =
  //  urlParams.get("primaryColor") || primaryColorConst || undefined;
  
  const colors = {
    purple: "#7C3AED",
    blue: "#3B82F6",
    orange: "#F59E0B",
    pink: "#EC4899",
    green: "#10B981",
    red: "#EF4444",
    teal: "#14B8A6",
    cyan: "#22D3EE",
    yellow: "#FBBF24",
  } as const;



export default function MyProfile({ user, settings }: { user: IUser | null, settings: any }) {
    const [isLoadingImg, setIsLoadingImg] = useState(false)
    const [isLoadingPass, setIsLoadingPass] = useState(false)
    const [userImg, setUserImg] = useState(user?.img ?? '/images/users/ava3.png')
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState<String>("");
    const [password, setPassword] = useState({
        oldPass: '',
        newPass: '',
        newPassAgain: ''
    })


    const address = useAddress();

    const { contract: tokenContractGCOW } = useContract(
        tokenContractAddressGCOW,
        'token',
    );
    const { data: tokenBalanceGCOW } = useTokenBalance(tokenContractGCOW, address);


    const handleChangePassword = async () => {
        setIsLoadingPass(true)
        if (password.newPass !== password.newPassAgain) {
            // 
            handleClickErr('Passwords are not same');
            setIsLoadingPass(false)
            return
        }
        if (password.newPass.length < 6) {
            handleClickErr('Password must be at least 6 characters');
            setIsLoadingPass(false)
            return
        }
        const response = await fetch(`/api/user?method=changePassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: getCookie('token'),
                oldPassword: password.oldPass,
                newPassword: password.newPass,
            })
        })
        const data = await response.json()
        if (data.status) {
            handleClickSucc(data.message);
        } else {
            handleClickErr(data.message);
        }
        setIsLoadingPass(false)
        setPassword({
            oldPass: '',
            newPass: '',
            newPassAgain: ''
        })
    }

    const handleUploadImage = () => {
        setIsLoadingImg(true)
        const input = (document.getElementById("profile-picture") as HTMLInputElement);
        //@ts-ignore
        const file = input.files[0]
        if (!file) {
            handleClickErr("Please select a file");
            setIsLoadingImg(false)
            return;
        }
        if (file.size > 1024 * 1024) {
            handleClickErr("File size is too big");
            setIsLoadingImg(false)
            return;
        }
        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/jpg" &&
            file.type !== "image/gif"
        ) {
            handleClickErr("File format is incorrect");
            setIsLoadingImg(false)
            return;
        }
        const formData = new FormData();
        formData.append("myImage", file);
        formData.append("token", getCookie('token')?.toString() ?? '');
        fetch("/api/user/uploadImage", {
            method: "POST",
            body: formData,
        }).then((response) => {
            if (response.status == 200) {
                handleClickSucc("Image uploaded successfully");
                setUserImg(URL.createObjectURL(file));
                setIsLoadingImg(false)
            } else {
                handleClickErr("An error occurred while uploading the image");
                setIsLoadingImg(false)
            }
        });
    };


    const handleClickSucc = (message: string) => {
        setSucc(true);
        setMessage(message)
    };

    const handleCloseSucc = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSucc(false);
    };

    const handleClickErr = (message: string) => {
        setErr(true);
        setMessage(message)
    };

    const handleCloseErr = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setErr(false);
    };

    
    return (
        <>
            <Layout
                user={user}
                settings={settings}
                title={`${user?.username} | ${settings?.settings.general.siteName}`}
            >
                <div className='flex flex-col w-full p-2 md:p-10 items-center'>


                    {address && (   
                        <div className='mt-5 flex items-center justify-center bg-[#BABE09] rounded-md text-center text-[#BA8E09] border border-[#BA8E09] '>
                            <ConnectWallet theme='light' />
                        </div>
                    )}




                    <h5 className='m-10 font-medium'>Welcome, Dear <span className='font-bold text-emerald-400'>{user?.username}</span></h5>
                    <div className='flex flex-col md:flex-row items-center w-full lg:w-2/3 gap-10'>
                        <div className='flex w-full flex-col gap-5 items-center justify-center bg-[#24252F] p-3 py-10 rounded shadow-md'>
                            <Image src={userImg} width={150} height={150} alt='profile photo' className='' />
                            <input
                                className="appearance-none rounded w-[220px] py-2 flex items-center justify-center text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
                                id="profile-picture"
                                type="file"
                            />
                            <button onClick={handleUploadImage} disabled={isLoadingImg} className='emerald-btn w-20 h-10 flex flex-col items-center justify-center duration-300 transition-all rounded px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none'>
                                {isLoadingImg ? <ImSpinner9 className='animate-spin' /> : 'Change'}
                            </button>
                        </div>
                        {/*
                        <div className='flex w-full flex-col gap-5 items-center justify-center bg-[#24252F] p-3 py-10 rounded shadow-md'>
                            <TextField
                                label='Old Password'
                                name='oldPass'
                                variant='outlined'
                                className='w-[320px]'
                                type='password'
                                value={password.oldPass}
                                onChange={(e) => setPassword({ ...password, oldPass: e.target.value })}
                            />
                            <TextField
                                label='New Password'
                                name='newPass'
                                variant='outlined'
                                className='w-[320px]'
                                type='password'
                                error={password.newPass !== password.newPassAgain || password.newPass.length < 6 && password.newPass.length > 0}
                                value={password.newPass}
                                onChange={(e) => setPassword({ ...password, newPass: e.target.value })}
                            />
                            <TextField
                                label='New Password Again'
                                name='newPassAgain'
                                variant='outlined'
                                className='w-[320px]'
                                type='password'
                                error={password.newPass !== password.newPassAgain || password.newPassAgain.length < 6 && password.newPassAgain.length > 0}
                                value={password.newPassAgain}
                                onChange={(e) => setPassword({ ...password, newPassAgain: e.target.value })}
                            />
                            <button disabled={isLoadingPass} onClick={handleChangePassword} className='emerald-btn  duration-300 w-20 h-10 flex flex-col items-center justify-center transition-all rounded px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none'>
                                {isLoadingPass ? <ImSpinner9 className='animate-spin' /> : 'Change'}
                            </button>
                        </div>
                        */}

                    </div>
                </div>
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <Snackbar
                        open={succ}
                        autoHideDuration={6000}
                        onClose={handleCloseSucc}
                    >
                        <Alert
                            onClose={handleCloseSucc}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={err} autoHideDuration={6000} onClose={handleCloseErr}>
                        <Alert
                            onClose={handleCloseErr}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Layout>

        </>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { user, settings }: any = await myGetServerSideProps(context)
    return {
        props: {
            user: user ?? null,
            settings: settings ?? null
        }
    }
}