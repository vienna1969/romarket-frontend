import React, { useEffect, useState } from 'react'


export default function Last20GamePage() {
    const [last20Game, setLast20Game] = useState<any>()

    const getLast20 = async () => {
        const response = await fetch('/api/games/horseRace/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({
                method: "getAll"
            })
        })
        const data = await response.json()
        setLast20Game(data.all)
    }

    useEffect(() => {
        getLast20()
    }, [])


    return (
        <div className='absolute left-5 top-10  bg-black/20 rounded-lg backdrop-blur-md p-3 hidden  lg:flex flex-col gap-3 items-center justify-center'>
            <h6 className=' border-b mb-1 text-gray-200'>Last 10 Race Winners</h6>
            <div className='flex flex-col gap-2  relative text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-red-500'>
                {
                    last20Game && last20Game.map((item: any) => {
                        return (
                            <div key={item._id} className=''>
                                <span className=''>{item.winnerHorse}</span> - <span className=' text-xs'>
                                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                </span>
                            </div>
                        )
                    })}

            </div>
        </div>
    )
}
