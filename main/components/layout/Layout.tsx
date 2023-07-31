import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { IUser } from '@/utils/interfaces/user-interface'
import { GetServerSidePropsContext } from 'next/types'
import Head from 'next/head'
import { ISettings } from '@/utils/interfaces/settings-interface'
import ChatComponent from '../chat'


export default function Layout({
        children,
        user,
        settings,
        getBalance,
        title,
        description
    }: {
        children: React.ReactNode,
        user: IUser | null,
        settings: ISettings | null,
        getBalance?: any,
        title?: string,
        description?: string
    }) {

    return (
        <>
            <Head>
                <title>{title ?? settings?.settings.general.siteName}</title>
                <meta name="description" content={description ?? settings?.settings.general.siteDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="UTF-8" />
                <meta name="keywords" content="Crypto Game Place,Crypto,Game,Place,crypto game," />
                <meta name="author" content={settings?.settings.general.siteName} />
                <meta name='copyright' content={settings?.settings.general.siteName} />
                <meta name='robots' content='index,follow' />
                <meta name="publisher" content={settings?.settings.general.siteName} />

                <meta name='og:title' content={settings?.settings.general.siteName} />
                <meta name='og:type' content='game' />
                <meta name='og:url' content={process.env.NEXT_PUBLIC_API_URL} />
                <meta name='og:image' content={`${process.env.NEXT_PUBLIC_API_URL}/logo/logo.png`} />
                <meta name='og:site_name' content={settings?.settings.general.siteName} />
                <meta name='og:description' content={settings?.settings.general.siteDescription} />

{/*
                <meta name="twitter:card" content={`${process.env.NEXT_PUBLIC_API_URL}/logo/logo.png`} />
                */}
                <meta name="twitter:card" content="summary_large_image" />


                <meta name="twitter:site" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta name="twitter:title" content={settings?.settings.general.siteName} />
                <meta name="twitter:description" content={settings?.settings.general.siteDescription} />
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_API_URL}/logo/logo.png`} />


            </Head>
            
            <Navbar user={user} settings={settings} getBalance={getBalance} />

            <main className='w-full h-full min-h-[calc(100vh-170px)] bg-[#0D0F1A] flex relative overflow-x-hidden overflow-y-hidden'>
                <div className='w-full'>
                    {children}
                </div>
                
                {/*
                <ChatComponent user={user} settings={settings} />
    */}

            </main>
            <Footer settings={settings} />
        </>
    )
}
