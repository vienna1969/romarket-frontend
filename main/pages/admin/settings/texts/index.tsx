import Sidebar from '@/components/layout/admin/Sidebar'
import { myGetServerSideProps } from '@/helpers'
import { ISettings } from '@/utils/interfaces/settings-interface'
import { Breadcrumbs, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next/types'
import React, { useState } from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from '@mui/material/Divider';
import { toast } from "react-toastify";



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


export default function Texts({ settings }: { settings: ISettings }) {
    const [mainTexts, setMainTexts] = useState(settings?.texts?.index ?? null)


    const handleMainPageText = async () => {
        const res = await fetch('/api/settings/texts?method=main', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mainTexts)
        })
        const data = await res.json()
        if (data.status) {
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
    }
    return (
        <>
            <div className="flex">
                <div className="w-[80px] lg:w-[453px] p-2"></div>
                <Sidebar />
                <div className="w-full p-10 gap-2 ml-10 md:ml-0 flex flex-col">
                    {/* Breadcrumb Start Here */}
                    <div className="bg-gray-900 p-3 rounded-md">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                className="flex justify-center"
                                color="inherit"
                                href="/admin"
                            >
                                <DashboardIcon className="mr-2" />
                                Dashboard
                            </Link>
                            <Link color="inherit" href="/admin/settings">
                                <Typography color="text.primary">Settings</Typography>
                            </Link>
                            <Typography color="text.primary">Page Texts</Typography>
                        </Breadcrumbs>
                    </div>
                    {/* Breadcrumb End Here */}
                    <div className='w-full flex flex-col items-center'>
                        <div className='flex flex-col w-full h-full p-4 bg-gray-900 rounded shadow items-center'>
                            <div className='w-full mb-5'>
                                <Divider>Main Page</Divider>
                            </div>
                            <div className='grid grid-cols-2 gap-5 w-full'>

                                {/*
                                <TextField
                                    className='w-full my-2 col-span-2'
                                    label="Main Text" variant="outlined"
                                    value={mainTexts?.text}
                                    onChange={(e) => { setMainTexts({ ...mainTexts, text: e.target.value }) }}
                                />
                                <TextField
                                    className='w-full my-2'
                                    label="Game 1 Title" variant="outlined"
                                    value={mainTexts?.game1Title}
                                    onChange={(e) => { setMainTexts({ ...mainTexts, game1Title: e.target.value }) }}
                                />
                                <TextField
                                    className='w-full my-2'
                                    label="Game 1 Description" variant="outlined"
                                    value={mainTexts?.game1Description}
                                    onChange={(e) => { setMainTexts({ ...mainTexts, game1Description: e.target.value }) }}
                                />
                                */}

                                
                                <TextField
                                    className='w-full my-2'
                                    label="Title" variant="outlined"
                                    value={mainTexts?.game2Title}
                                    onChange={(e) => { setMainTexts({ ...mainTexts, game2Title: e.target.value }) }}
                                />
                                <TextField
                                    className='w-full my-2'
                                    label="Description" variant="outlined"
                                    value={mainTexts?.game2Description}
                                    onChange={(e) => { setMainTexts({ ...mainTexts, game2Description: e.target.value }) }}
                                />

                                {/*
                                <TextField
                                    className='w-full my-2'
                                    label="Game 3 Title" variant="outlined"
                                    value={mainTexts?.game3Title}
                                    onChange={(e) => { setMainTexts({ ...mainTexts, game3Title: e.target.value }) }}
                                />
                                <TextField
                                    className='w-full my-2'
                                    label="Game 3 Description" variant="outlined"
                                    value={mainTexts?.game3Description}
                                    onChange={(e) => { setMainTexts({ ...mainTexts, game3Description: e.target.value }) }}
                                />
                                */}
                            </div>
                            <div className='flex items-center justify-end gap-5 w-full mt-4'>
                                <Button onClick={() => { setMainTexts(settings.texts.index) }} className='gold-btn mt-5' variant="contained">Change Default</Button>
                                <Button onClick={handleMainPageText} className='emerald-btn mt-5' variant="contained">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
