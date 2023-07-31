import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { IHorseGame } from '../../../utils/horseRace/interfaces/horseGame';
import Image from 'next/image'

export default function BetTables({ horses }: any) {
    const [games, setGames] = useState<any>()
    const [status, setStatus] = useState<any>()
    const [winner, setWinner] = useState<any>()

    useEffect(() => {
        socketInitializer();
    }, []);

    const socketInitializer = () => {
        const socket = io(`${process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL}`, {
            transports: ["websocket"],
        });
        socket.on("connect", () => {
            console.log("socket connected=====================");
        });
        socket.on('status', (data: any) => {
            
            console.log("status data====", data);

            setStatus(data);
        })
        socket.on("winner", (data: any) => { setWinner(data) })
    };

    const getGames = async () => {
        const res = await fetch('/api/games/horseRace/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: "getGames",
            })
        })
        const data = await res.json();

        ////console.log("getGames data====", data);


        setGames(data.games)
    }

    useEffect(() => {
        getGames()
    },)

    return (
        <>
            <div className='flex flex-col w-full lg:w-2/3 items-center'>
                <div className='grid grid-cols-1 lg:grid-cols-5 w-full gap-3 rounded-lg  text-gray-200'>
                    <div className='w-full flex flex-col items-center border p-2 bg-[#16171c] rounded-lg border-black max-h-[350px] overflow-y-hidden'>
                        <h2 className='border-b w-full text-center text-lg  border-black mb-2 '>{horses.horse1}</h2>
                        <ul className='flex flex-col list-disc gap-2'>
                            {
                                games?.map((game: IHorseGame, i: number) => {
                                    if (game.selectedSide === horses.horse1) {
                                        return (
                                            <li key={i} className='flex items-center gap-1' >
                                                <div className="flex flex-col items-center justify-center w-[25px] h-[25px]">
                                                    <Image
                                                        src={game.img}
                                                        width={100}
                                                        height={100}
                                                        style={{
                                                            objectFit: "cover",
                                                            objectPosition: "center",
                                                        }}
                                                        alt="pp"
                                                        className="rounded-full w-[25px] h-[25px]"
                                                    />
                                                </div>
                                                <span>
                                                    {`${game.username.slice(0, 2)}...${game.username.slice(game.username.length - 2, game.username.length)}`}
                                                </span>
                                                <span className='text-yellow-500'>{game.betAmount}</span>
                                            </li>
                                        )
                                    }
                                }
                                )
                            }
                        </ul>
                    </div>
                    <div className='w-full flex flex-col items-center border p-2 bg-[#16171c] rounded-lg border-black max-h-[350px] overflow-y-hidden'>
                        <h2 className='border-b w-full text-center text-lg  border-black mb-2 '>{horses.horse2}</h2>
                        <ul className='flex flex-col list-disc gap-2'>
                            {
                                games?.map((game: IHorseGame, i: number) => {
                                    if (game.selectedSide === horses.horse2) {
                                        return (
                                            <li key={i} className='flex items-center gap-1' ><div className="flex flex-col items-center justify-center w-[25px] h-[25px]">
                                                <Image
                                                    src={game.img}
                                                    width={100}
                                                    height={100}
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                    }}
                                                    alt="pp"
                                                    className="rounded-full w-[25px] h-[25px]"
                                                />
                                            </div>
                                                <span>
                                                    {`${game.username.slice(0, 2)}...${game.username.slice(game.username.length - 2, game.username.length)}`}
                                                </span>
                                                <span className='text-yellow-500'>{game.betAmount}</span> </li>
                                        )
                                    }
                                }
                                )
                            }
                        </ul>
                    </div>
                    <div className='w-full flex flex-col items-center border p-2 bg-[#16171c] rounded-lg border-black max-h-[350px] overflow-y-hidden'>
                        <h2 className='border-b w-full text-center text-lg  border-black mb-2 '>{horses.horse3}</h2>
                        <ul className='flex flex-col list-disc gap-2'>
                            {
                                games?.map((game: IHorseGame, i: number) => {
                                    if (game.selectedSide === horses.horse3) {
                                        return (
                                            <li key={i} className='flex items-center gap-1' ><div className="flex flex-col items-center justify-center w-[25px] h-[25px]">
                                                <Image
                                                    src={game.img}
                                                    width={100}
                                                    height={100}
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                    }}
                                                    alt="pp"
                                                    className="rounded-full w-[25px] h-[25px]"
                                                />
                                            </div>
                                                <span>
                                                    {`${game.username.slice(0, 2)}...${game.username.slice(game.username.length - 2, game.username.length)}`}
                                                </span>
                                                <span className='text-yellow-500'>{game.betAmount}</span> </li>
                                        )
                                    }
                                }
                                )
                            }
                        </ul>
                    </div>
                    <div className='w-full flex flex-col items-center border p-2 bg-[#16171c] rounded-lg border-black max-h-[350px] overflow-y-hidden'>
                        <h2 className='border-b w-full text-center text-lg  border-black mb-2 '>{horses.horse4}</h2>
                        <ul className='flex flex-col list-disc gap-2'>
                            {
                                games?.map((game: IHorseGame, i: number) => {
                                    if (game.selectedSide === horses.horse4) {
                                        return (
                                            <li key={i} className='flex items-center gap-1' ><div className="flex flex-col items-center justify-center w-[25px] h-[25px]">
                                                <Image
                                                    src={game.img}
                                                    width={100}
                                                    height={100}
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                    }}
                                                    alt="pp"
                                                    className="rounded-full w-[25px] h-[25px]"
                                                />
                                            </div>
                                                <span>
                                                    {`${game.username.slice(0, 2)}...${game.username.slice(game.username.length - 2, game.username.length)}`}
                                                </span>
                                                <span className='text-yellow-500'>{game.betAmount}</span> </li>
                                        )
                                    }
                                }
                                )
                            }
                        </ul>
                    </div>
                    <div className='w-full flex flex-col items-center border p-2 bg-[#16171c] rounded-lg border-black max-h-[350px] overflow-y-hidden'>
                        <h2 className='border-b w-full text-center text-lg  border-black mb-2 '>{horses.horse5}</h2>
                        <ul className='flex flex-col list-disc gap-2'>
                            {
                                games?.map((game: IHorseGame, i: number) => {
                                    if (game.selectedSide === horses.horse5) {
                                        return (
                                            <li key={i} className='flex items-center gap-1' ><div className="flex flex-col items-center justify-center w-[25px] h-[25px]">
                                                <Image
                                                    src={game.img}
                                                    width={100}
                                                    height={100}
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition: "center",
                                                    }}
                                                    alt="pp"
                                                    className="rounded-full w-[25px] h-[25px]"
                                                />
                                            </div>
                                                <span>
                                                    {`${game.username.slice(0, 2)}...${game.username.slice(game.username.length - 2, game.username.length)}`}
                                                </span>
                                                <span className='text-yellow-500'>{game.betAmount}</span> </li>
                                        )
                                    }
                                }
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

