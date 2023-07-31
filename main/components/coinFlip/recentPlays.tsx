import { useEffect, useState } from "react";
import moment from "moment";
import ICoinFlip from "../../utils/coinFlip/interfaces/game.interface";
import Image from "next/image";

export default function RecentPlays() {
    const [games, setGames] = useState([] as ICoinFlip[]);

    useEffect(() => {
        setInterval(() => {
            try {
                fetch("/api/games/coinFlip/game?method=list&limit=10")
                    .then((res) => res.json())
                    .then((data) => {
                        setGames(data.games);
                    }).catch((err) => { console.log(err) });
            }
            catch (e) { console.error(e); }
        }, 1000);
    }, []);

    var dateFromObjectId = function (objectId: String) {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center  w-full bg-transparent font-medium ">
                <div className="border-2 border-[#202332] rounded-lg w-full md:w-2/3 lg:w-2/4 h-full mb-10 bg-transparent">
                    {games && games?.map((game: ICoinFlip, i: number) => {
                        return (
                            <div
                                key={game._id}
                                className={`flex items-center justify-between h-[50px] md:p-2 z-40 ${i === games.length - 1 ? '' : 'border-b-2'} border-[#202332] w-full  ${i % 2 === 0 ? "bg-[#0D0F1D]" : "bg-[#202332]"} `}
                            >
                                <div className="flex justify-between w-full ">
                                    <div className="flex gap-2 items-center text-sm md:text-base">
                                        <div className="flex flex-col relative items-center justify-center w-[30px] h-[30px] rounded-full">
                                            <Image src={game.img}
                                                width={100}
                                                height={100}
                                                style={{
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                }}
                                                className="rounded-full w-[25px] h-[25px]"
                                                alt='user profile photo' />
                                        </div>
                                        <span title={game.username} className="text-[#FFAE29] ">
                                            {game.username}
                                        </span>
                                        <span> picked</span>
                                        <span className="text-[#FFAE29] font-bold">
                                            {" "}
                                            {game.pickedSide}
                                        </span>{" "}
                                        <span> and</span>
                                        <span className={game.betResult == "won" ? "text-[#14f195]" : game.betResult == "lost" ? "text-[#ff3841]" : "text-[#14f1ee]"}>{game.betResult}</span>
                                    </div>
                                    <div className=" text-[#454B64] hidden md:flex">
                                        {moment(dateFromObjectId(game._id)).fromNow()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
