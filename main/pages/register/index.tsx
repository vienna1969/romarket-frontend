import Layout from '@/components/layout/Layout'
import { Alert, Snackbar, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

//import { useAccount, useConnect, useDisconnect } from 'wagmi';

///import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useRouter } from 'next/navigation';
import { GetServerSidePropsContext } from 'next';
import { ISettings } from '@/utils/interfaces/settings-interface';
import { myGetServerSideProps } from '@/helpers';

import Link from 'next/link'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { user, settings }: any = await myGetServerSideProps(context)
    return {
        props: {
            user: user ?? null,
            settings: settings ?? null
        }
    }
}

export default function Register({ settings }: { settings: ISettings | null }) {

    //const { address, isConnected } = useAccount()
    //const connect = useConnect()
    //const disconnect = useDisconnect()


    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState<String>("");
    
    ////const [hasConnection, setHasConnection] = useState(false);
    const [hasConnection, setHasConnection] = useState(true);

    const router = useRouter()

    /*
    useEffect(() => {
        if (isConnected) {
            setHasConnection(true)
        }
    }, [isConnected])
    */


    const formSubmit = async () => {
        if (hasConnection) {
            const username = (document.getElementById("username") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;
            const pass2 = (document.getElementById("pass2") as HTMLInputElement).value;
            
            ///const wallet = address;

            if (username === "" || email === "" || password === "" || pass2 === "") {
                setMessage("Please fill all the fields!");
                handleClickErr();
                return;
            }
            if (password !== pass2) {
                setMessage("Passwords do not match!");
                handleClickErr();
                return;
            }

            const formInputs = {
                username: username,
                email: email,
                pass1: password,
                pass2: pass2,

                //walletAddress: wallet,
                walletAddress: "0x000",

                bonus: settings?.welcomeBonus ?? 0
            };
            const res = await fetch("/api/user?method=create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formInputs),
            });
            const data = await res.json();
            if (data.status) {
                setMessage(data.message);
                handleClickSucc();
                router.push("/login");
            }
            else {
                setMessage(data.message);
                handleClickErr();
            }
        } else {
            setMessage("Please connect your wallet!");
            handleClickErr();
        }
    }


    const handleClickSucc = () => {
        setSucc(true);
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

    const handleClickErr = () => {
        setErr(true);
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
            <Layout user={null} settings={settings}>
                <div onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        formSubmit();
                    }
                }} className={`flex flex-col items-center justify-center pt-10 h-full bg-[#0D0F1A] w-full text-gray-500 bg-[url(/backgrounds/back.svg)] bg-center bg-no-repeat bg-contain min-h-[65vh] `}>
                    <div className="flex flex-col items-center w-full justify-center gap-14  h-full ">
                        <div className=" flex md:w-1/3 w-full flex-col items-center justify-center h-full gap-5 p-10 rounded-lg">
                            <h1 className="text-4xl font-semibold text-gray-200">Register</h1>
                            {
                                hasConnection ? (
                                    <>
                                        <div className="w-full relative h-[1px] border flex items-center justify-center">
                                            <div className="absolute bg-green-500 left-0 w-2/3 h-[1px] z-40"></div>
                                            <div className="absolute left-2/3  w-2 h-2 rounded-full bg-green-500 z-50"></div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            
                                            {/*
                                            <ConnectButton />
                                            */}


                                            <label className="label" htmlFor='email'>
                                                <span className="label-text text-lg">E-Mail (Login ID)</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="p-1 w-full text-lg bg-gray-200 rounded-md text-gray-700"
                                            />

                                            <label className="label" htmlFor='password'>
                                                <span className="label-text text-lg">Password</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="p-1 w-full text-lg bg-gray-200 rounded-md text-gray-700"
                                            />
                                            <label className="label" htmlFor='pass2'>
                                                <span className="label-text text-lg">Password</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="pass2"
                                                className="p-1 w-full text-lg bg-gray-200 rounded-md text-gray-700"
                                            />

                                            <label className="label" htmlFor='username'>
                                                <span className="label-text text-lg">Username</span>
                                                {' '}<span className="label-text text-sm text-gray-400">
                                                    (This will be your display name)
                                                </span>
                                            </label>
                                            <input
                                                type="username"
                                                id="username"
                                                className="p-1 w-full text-lg bg-gray-200 rounded-md text-gray-700"
                                            />

                                        </div>
                                        <button
                                            onClick={() => {
                                                formSubmit();
                                            }}
                                            className='green-btn p-2 px-4 duration-300 transition-all'
                                        >
                                            Register
                                        </button>
                                        <Link
                                            className="p-2 px-4 rounded-md gold-btn text-gray-900 text-xs duration-300 transition-all "
                                            href={"/login"}
                                        >
                                            Go to login
                                        </Link>
    
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full relative h-[1px] border flex items-center justify-center">
                                            <div className="absolute bg-red-500 left-0 w-1/3 h-[1px] z-40"></div>
                                            <div className="absolute left-1/3  w-2 h-2 rounded-full bg-red-500 z-50"></div>
                                        </div>

                                        {/*
                                        <ConnectButton />
                                        */}

                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Layout>
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
        </>
    )
}
