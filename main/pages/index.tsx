//import MyLottiePlayer from '@/components/MyLottie'
import Layout from '@/components/layout/Layout'
import { myGetServerSideProps } from '../helpers';
import { IUser } from '@/utils/interfaces/user-interface'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ISettings } from '@/utils/interfaces/settings-interface';

import { deleteCookie, getCookie, hasCookie } from 'cookies-next';


export default function Home({ user, settings }: { user: IUser | null, settings: ISettings | any }) {



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

                  {user ?
                    <div className='flex flex-col gap-2'>

                      {user?.admin &&                      
                        <Link href={'/admin'} className='emerald-btn p-2 px-4 duration-300 transition-all text-center'>
                          Go to Dashboard
                        </Link>
                      }
                      <div className='flex flex-row w-full gap-5 items-center justify-center'>

                        <div className='flex w-full text-xl font-bold items-center justify-center'>
                          {/*user?.admin ? 'Admin: ' : 'User: '*/}
                          {user?.username}

                          {user?.admin == false && 
                            <>
                                <p className='text-sm italic my-5'>
                                  You are not an admin, you have to contract administrator.
                                </p>
                            </>
                          }
                        </div>

                        <Link className='flex w-full emerald-btn p-2 px-4 duration-300 transition-all items-center justify-center'
                          href={'/logout'}
                          /*
                          onClick={() => {

                              //deleteCookie('user');
                              //router.push('/logout');
                       

                            window.location.reload();
                          }}
                          */
                        >
                          Logout
                        </Link>

                      </div>
                    </div>
                    :
                    <Link
                        className="p-2 px-4 rounded-md gold-btn text-gray-900 text-xs duration-300 transition-all "
                        href={"/login"}
                    >
                        Go to login
                    </Link>
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
  const { user, settings }: any = await myGetServerSideProps(context)
  return {
    props: {
      user: user ?? null,
      settings: settings ?? null
    }
  }
}