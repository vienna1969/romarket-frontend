import BetInputs from '../../../components/horseRace/betScreen/betInputs'
import BetTables from '../../../components/horseRace/betScreen/betTables'
import HorseWalking from '../../../components/horseRace/betScreen/horseWalkingAnim'
import Race from '../../../components/horseRace/raceScreen/race'
import React, { useEffect, useState } from 'react'
import LastWinnersPage from '../../../components/horseRace/betScreen/lastWinners';
import Last20GamePage from '../../../components/horseRace/betScreen/last20';

import RouletteMain from '../../../components/roulette/Main'


//@ts-ignore
import { Socket, io } from "socket.io-client";
import Layout from '@/components/layout/Layout'
import { ISettings } from '@/utils/interfaces/settings-interface'
import { IUser } from '@/utils/interfaces/user-interface'
import { GetServerSidePropsContext } from 'next'
import { myGetServerSideProps } from '@/helpers'
import { deleteCookie } from 'cookies-next'

// Bebas Neue
let socket;
export default function Hipodrom({ user, settings, horseNames, inputs }: { user: IUser | null, settings: ISettings | null, horseNames: any, inputs: any }) {
    
    const [socket, setSocket] = useState<Socket | null>(null);

    const [status, setStatus] = useState<any>();
    const [time, setTime] = useState<any>(0);
    const [horse1Oran, setHorse1Oran] = useState<any>([]);
    const [horse2Oran, setHorse2Oran] = useState<any>([]);
    const [horse3Oran, setHorse3Oran] = useState<any>([]);
    const [horse4Oran, setHorse4Oran] = useState<any>([]);
    const [horse5Oran, setHorse5Oran] = useState<any>([]);
    const [flag, setFlag] = useState<any>(false);
    const [balance, setBalance] = useState<any>(0);

    useEffect(() => {
        socketInitializer();
    }, [])

    const socketInitializer = () => {

        console.log("socketInitializer socket", socket);

        if (socket) return;

        const socketa = io(process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL as string);

        setSocket(socketa);

        socketa.on('status', (data: any) => {

            console.log("socket status======", data);

            setStatus(data)
        })
        socketa.on('time', (data: any) => {
            setTime(data);
        })

        socketa.on('horse1Rate', (data: any) => {
            setHorse1Oran(data);
        })

        socketa.on('horse2Rate', (data: any) => { setHorse2Oran(data) })


        socketa.on('horse3Rate', (data: any) => { setHorse3Oran(data) })
        socketa.on('horse4Rate', (data: any) => { setHorse4Oran(data) })
        socketa.on('horse5Rate', (data: any) => { setHorse5Oran(data) })
        socketa.on('flag', (data: any) => { setFlag(data) })

        return () => {
            socketa.disconnect();
        };
    }


    useEffect(() => {
        if (status == false) {
            deleteCookie('horse')
        }
    }, [status])


    function getBalance(balance: any) {
        setBalance(balance)
    }



    return (
        <>
            <Layout user={user}
                settings={settings}
                title={`${settings?.texts.index.game1Title} | ${settings?.settings.general.siteName}`}
                description={settings?.texts.index.game1Description}
                getBalance={getBalance}>


{/*
                {!status ?
                    (
                        <div className='flex flex-col px-10 pb-10 w-full h-full items-center justify-center gap-5 bg-[#0C0E1A] relative'>
                            <LastWinnersPage horses={horseNames} />
                            <Last20GamePage />
                            <div className="bg-center bg-no-repeat bg-contain bg-[url(/horseRace/back.svg)] h-full ">
                                <div className="flex flex-col items-center justify-center md:gap-14 md:py-10 bg-gradient-radial from-transparent via-[#0C0E1A] to-transparent bg-blend-difference h-full md:px-32">
                                    <HorseWalking time={time} horseSrc={'/horseRace/at.json'} />
                                </div>
                            </div>
                            <BetInputs
                                horse1={horse1Oran}
                                horse2={horse2Oran}
                                horse3={horse3Oran}
                                horse4={horse4Oran}
                                horse5={horse5Oran}
                                horses={horseNames}
                                user={user}
                                inputs={inputs}
                                balance={balance}
                            />
                            <BetTables horses={horseNames} />
                        </div>
                    )
                    :
                    < Race horseNames={horseNames} flag={flag} setFlag={setFlag} />

                }

                */}

                <RouletteMain />

            </Layout>
        </>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { user, settings }: any = await myGetServerSideProps(context)
    const horseNamesResponse = await fetch(process.env.API_URL + `/api/games/horseRace/settings/horseNames?method=all`,)
    const horseNames = await horseNamesResponse.json()

    if (settings.games[1].active === false) {
        return {
            redirect: {
                destination: '/',
            }
        }
    }
    return {
        props: {
            user: user ?? null,
            settings: settings ?? null,
            horseNames: horseNames.horseNames[0],
            inputs: horseNames.horseNames[0].inputs
        }
    }
}

