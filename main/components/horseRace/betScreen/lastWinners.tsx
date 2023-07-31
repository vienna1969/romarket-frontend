import { useState, useEffect } from "react"
import Image from "next/image"

export default function LastWinnersPage({ horses }: any) {
    const [sonKazananlar, setSonKazananlar] = useState<any>()

    const getSonKazananlar = async () => {
        const response = await fetch('/api/games/horseRace/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({
                method: "getLast"
            })
        })
        const data = await response.json()
        setSonKazananlar(data.lastGame)
    }

    useEffect(() => {
        getSonKazananlar()
    }, [])


    return (
        <div className='absolute text-white right-5 top-20  bg-black/20 rounded-lg backdrop-blur-md p-5 hidden lg:flex flex-col gap-3 items-center justify-center'>
            <h4 className=' border-b mb-2'>Last Race Winners</h4>
            {
                sonKazananlar && sonKazananlar.placements.map((item: any,) => {
                    return (
                        <div key={item.line} className='flex items-center gap-2'>
                            <p className='  text-center text-green-500'>{item.line} - {item.horse} </p>
                            <Image src={`/horseRace/at${item.horse === horses.horse1 ? 1 : item.horse === horses.horse2 ? 2 : item.horse === horses.horse3 ? 3 : item.horse === horses.horse4 ? 4 : 5}.png`} width={100} height={100} alt='alt1' />
                        </div>
                    )
                })
            }
        </div>
    )
}


