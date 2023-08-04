import Layout from '@/components/layout/Layout'
import { myGetServerSideProps } from '@/helpers';
import { ISettings } from '@/utils/interfaces/settings-interface';
import { Alert, Snackbar, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import { GetServerSidePropsContext } from 'next/types';
import React, { useState } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { user, settings }: any = await myGetServerSideProps(context)
    return {
        props: {
            user: user ?? null,
            settings: settings ?? null
        }
    }
}

export default function Login({ settings }: { settings: ISettings | null }) {
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState<String>("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const formSubmit = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        if (email === "" || password === "") {
            setMessage("Please fill all the fields!");
            handleClickErr();
            return;
        }

        const formInputs = {
            email: email,
            pass: password,
        };

        const res = await fetch("/api/user?method=login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formInputs),
        });
        const data = await res.json();
        if (data.status) {
            setMessage(data.message);
            handleClickSucc();
            const nextUrl = searchParams.get("next");
            router.push(nextUrl ? nextUrl : "/");
        }
        else {
            setMessage(data.message);
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
                }} className={`flex flex-col items-center justify-center pt-16 h-full bg-[#0D0F1A] w-full text-gray-500 bg-[url(/backgrounds/back.svg)] bg-center bg-no-repeat bg-contain `}>
                    <div className="flex flex-col items-center w-full justify-center gap-14 lg:py-10 h-full ">
                        <div className=" flex md:w-1/3 w-full flex-col items-center justify-center gap-5 p-10 rounded-lg">
                            <h1 className="text-4xl font-semibold text-gray-200">Login</h1>
                            <div className="w-full relative h-[1px] border flex items-center justify-center">
                                <div className="absolute bg-green-500 left-0 w-2/3 h-[1px] z-40"></div>
                                <div className="absolute left-2/3  w-2 h-2 rounded-full bg-green-500 z-50"></div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
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
                            </div>
                            <button
                                onClick={() => {
                                    formSubmit();
                                }}
                                className='green-btn px-4 p-2 duration-300 transition-all'
                            >
                                Login
                            </button>
                            <Link
                                className="p-2 px-4 rounded-md gold-btn text-gray-900 text-xs duration-300 transition-all "
                                href={"/"}
                            >
                                Go to Home
                            </Link>
                        </div>
                    </div>


                    <div className="p-4 flex flex-col items-center justify-center text-center gap-3">
                        <div className=""> If you have not an account  </div>
                        <Link
                            className="p-2 px-4 rounded-md gold-btn text-gray-900 text-xs duration-300 transition-all "
                            href={"/register"}
                        >
                            Sign Up Now
                        </Link>
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
