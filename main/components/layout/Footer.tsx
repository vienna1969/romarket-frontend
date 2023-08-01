import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { ISettings } from '@/utils/interfaces/settings-interface'

export default function Footer({settings}: {settings: ISettings | null}) {
    return (
        <>
            <footer className='flex flex-col w-full p-4 px-10 text-gray-500 gap-5 bg-[#0D0F1A] '>
                <Link href="/" className='w-full'>
                    <Image src="/logo/logo.png" width="50" height="50" alt="logo" />
                </Link>
                <div className='w-full flex flex-col text-sm '>
                    <p>{settings?.settings.general.copyRightText}</p>
                </div>
            </footer>
        </>
    )
}
