import React from 'react';
import Image from 'next/image';

export default function BetHistory(props: any) {
    return (
        <div className="w-full flex flex-row items-center justify-center">
            <div className='flex flex-row justify-center items-center gap-5'>
                <div className='text-gray-500 font-bold text-xs'>
                    Past Bets
                </div>
                <div className='flex-row flex gap-1'>
                    {
                        props?.history?.map((item: any, index: number) => {
                            return (
                                <div key={index} className='flex-row flex gap-1'>
                                    <Image src={`/roulette/${item.winner}.png`} alt="" width={24} height={24} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='text-gray-500 font-bold text-xs'>
                Last 100
                </div>
                <div className='flex-row flex gap-3'>
                <div className='flex-row flex gap-2 justify-center items-center'>
                <Image src={"/roulette/ct.png"} alt="" width={24} height={24} />
                <div className='text-gray-200 font-bold text-xs'>
                {props?.chance?.ct}
                </div>
                </div>
                <div className='flex-row flex gap-2 justify-center items-center'>
                <Image src={"/roulette/dice.png"} alt="" width={24} height={24} />
                <div className='text-gray-200 font-bold text-xs'>
                {props?.chance?.dice}
                </div>
                </div>
                <div className='flex-row flex gap-2 justify-center items-center'>
                <Image src={"/roulette/t.png"} alt="" width={24} height={24} />
                <div className='text-gray-200 font-bold text-xs'>
                {props?.chance?.t}
                </div>
                </div>
                </div>

            </div>
            
        </div>
    )
}