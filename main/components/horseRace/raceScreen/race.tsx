import Image from "next/image";
import { useEffect, useState } from "react";
//@ts-ignore
import { io } from "socket.io-client";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";

let socket;
export default function Race({ horseNames,flag,setFlag }: any) {
    const [status, setStatus] = useState<any>();
    const [progress1, setProgress1] = useState<any>(0);
    const [progress2, setProgress2] = useState<any>(0);
    const [progress3, setProgress3] = useState<any>(0);
    const [progress4, setProgress4] = useState<any>(0);
    const [progress5, setProgress5] = useState<any>(0);
    const [fence, setFence] = useState(0);
    const [horses, setHorses] = useState<any>([]);
    const [winner, setWinner] = useState<any>();
    const [soundStatus, setSoundStatus] = useState(true);
    const [finishLine, setFinishLine] = useState(false);
    const [selectedHorse, setSelectedHorse] = useState<any>(null);


    setTimeout(() => {
        setHorses([
            { id: 1, progress: progress1, name: `${horseNames.horse1}` },
            { id: 2, progress: progress2, name: `${horseNames.horse2}` },
            { id: 3, progress: progress3, name: `${horseNames.horse3}` },
            { id: 4, progress: progress4, name: `${horseNames.horse4}` },
            { id: 5, progress: progress5, name: `${horseNames.horse5}` },
        ]);
    }, 40);

    useEffect(() => {
        socketInitializer();
    }, []);

    const socketInitializer = () => {
        if (hasCookie('horse')) {
            setSelectedHorse(getCookie('horse'))
        }

        const socket = io(`${process.env.NEXT_PUBLIC_HORSE_RACE_SOCKET_URL}`, {
            transports: ["websocket"],
        });
        socket.on("connect", () => {
        });

        socket.on('status', (data: any) => { setStatus(data) })

        socket.on("winner", (data: any) => { setWinner(data), deleteCookie('horse')  })

        socket.on("horse1", (data: any) => {
            setProgress1(data);
        });

        socket.on("horse2", (data: any) => {
            setProgress2(data);
        });

        socket.on("horse3", (data: any) => {
            setProgress3(data);
        });

        socket.on("horse4", (data: any) => {
            setProgress4(data);
        });

        socket.on("horse5", (data: any) => {
            setProgress5(data);
        });
    };

    useEffect(() => {
        if (flag === true) {
                setFinishLine(true)
                setTimeout(() => {
                    setFinishLine(false)
                    setFlag(false)
                }
                , 8000);
            }
    }, [flag])

    setTimeout(() => {
        setFence(fence - 1);
    }, 60);


    return (
        <div className="min-w-full min-h-screen items-center overflow-x-hidden ">
            <audio src="/horseRace/racing.mp3" typeof="audio/mpeg" autoPlay={soundStatus} muted={!soundStatus} />
            <div className="flex flex-row">
                <div
                    className="flex flex-col w-full justify-center items-start gap-2 relative "
                    style={{
                        backgroundImage: `url('/horseRace/dirt2.jpg')`,
                        backgroundSize: "150px",
                    }}
                >
                    {/* //? Finish line */}
                    <div className={`absolute h-2/3 w-4 z-[999px] bg-[url(/horseRace/finish.png)] top-[27%] duration-1000 transition-all ease-linear ${finishLine ? " right-0 " : "-right-[16px]"}`}>
                    </div>

                    <div className="flex md:h-44 w-full items-center justify-center relative text-gray-800">
                        <div onClick={() => {
                            setSoundStatus(!soundStatus)
                        }} className="absolute right-0 md:right-10 flex flex-col text-center items-center justify-center fill-gray-200 text-gray-200">{soundStatus ? <> <BsFillVolumeUpFill className="w-8 h-8" /> Sound On </> : <> <BsFillVolumeMuteFill className="w-8 h-8" /> Sound Off</>}
                        </div>
                        <div className="md:h-44 md:w-full xl:w-2/3 md:mt-5 rounded-xl gap-1 flex-col flex lg:px-5 bg-gradient-to-t from-black to-transparent">
                            <div className="flex-row mt-5 flex gap-3">
                                {horses
                                    .sort((a: any, b: any) => a.progress - b.progress)
                                    .map((horse: any, index: number) => {
                                        return (
                                            <div key={index} className={`md:h-32 w-full xl:w-1/5 md:border-[2px] p-2 rounded-md flex-col flex ${selectedHorse === horse.name ? "bg-green-500" : null}`}>
                                                <div className="flex-row w-7 h-7 bg-white rounded-full items-center justify-center text-center">
                                                    {horse.id}
                                                </div>
                                                <div className="flex-col w-full items-center justify-center hidden md:flex">
                                                    <Image
                                                        src={`/horseRace/at${horse.id}.png`}
                                                        width="100"
                                                        height="100"
                                                        alt={"at"}
                                                    />
                                                    <div className="bg-white mt-4 px-5 rounded-md text-xl shadow-lg">
                                                        {horse.name}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="flex items-center justify-center text-center">
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url('/horseRace/grass.jpeg')`,
                            backgroundSize: "150px",
                        }}
                        className="w-full h-full">
                        <div
                            style={{
                                backgroundImage: `url('/horseRace/fence.png')`,
                                backgroundSize: "120px",
                                backgroundRepeat: "repeat-x",
                                backgroundPosition: `${finishLine ? "0px" : `${fence}%`} 0px`,
                            }}
                            className="w-full h-14"
                        ></div>

                        <div
                            className="flex min-w-[150px] items-end justify-end relative pt-3 "
                            style={{
                                width: `${progress1}%`,
                            }}
                        >
                            <Image src={"/horseRace/at1.gif"} width="150" height="150" alt={"at"} />
                            {selectedHorse === horseNames.horse1 && <Image src={'/horseRace/star.png'} width="25" height="25" className="absolute top-0 right-[35px]" alt="star" />}
                        </div>

                        <div
                            className="flex  min-w-[150px] items-end justify-end relative pt-3 "
                            style={{
                                width: `${progress2}%`,
                            }}
                        >
                            <Image src={"/horseRace/at2.gif"} width="150" height="150" alt={"at"} />
                            {selectedHorse === horseNames.horse2 && <Image src={'/horseRace/star.png'} width="25" height="25" className="absolute top-0 right-[35px]" alt="star" />}
                        </div>

                        <div
                            className="flex  min-w-[150px] items-end justify-end relative pt-3 "
                            style={{
                                width: `${progress3}%`,
                            }}
                        >
                            <Image src={"/horseRace/at3.gif"} width="150" height="150" alt={"at"} />
                            {selectedHorse === horseNames.horse3 && <Image src={'/horseRace/star.png'} width="25" height="25" className="absolute top-0 right-[35px]" alt="star" />}
                        </div>

                        <div
                            className="flex  min-w-[150px] items-end justify-end relative pt-3 "
                            style={{
                                width: `${progress4}%`,
                            }}
                        >
                            <Image src={"/horseRace/at4.gif"} width="150" height="150" alt={"at"} />
                            {selectedHorse === horseNames.horse4 && <Image src={'/horseRace/star.png'} width="25" height="25" className="absolute top-0 right-[35px]" alt="star" />}
                        </div>

                        <div
                            className="flex  min-w-[150px] items-end justify-end relative pt-3 pb-5"
                            style={{
                                width: `${progress5}%`,
                            }}
                        >
                            <Image src={"/horseRace/at5.gif"} width="150" height="150" alt={"at"} />
                            {selectedHorse === horseNames.horse5 && <Image src={'/horseRace/star.png'} width="25" height="25" className="absolute top-0 right-[35px]" alt="star" />}
                        </div>

                        <div
                            style={{
                                backgroundImage: `url('/horseRace/fence.png')`,
                                backgroundSize: "120px",
                                backgroundRepeat: "repeat-x",
                                backgroundPosition: `${finishLine ? "0px" : `${fence}%`} 0px`,
                            }}
                            className="w-full h-14 -mt-8"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
