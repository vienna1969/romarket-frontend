import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { BsChatRightTextFill } from 'react-icons/bs'
import Image from 'next/image'
import io, { Socket } from "socket.io-client";
import { IUser } from '@/utils/interfaces/user-interface';
import { Alert, Snackbar, Stack } from '@mui/material';
import { ISettings } from '@/utils/interfaces/settings-interface';

export default function ChatComponent({ user, settings }: { user: IUser | null, settings: ISettings | null }) {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [socket, setSocket] = useState<Socket | null>(null);
    const [chatMessages, setChatMessages] = useState<any>([]);
    const [userMessage, setUserMessage] = useState<string>('');
    const [chatRoom, setChatRoom] = useState<string>('GeneralChatRoom');

    const [err, setErr] = useState(false);
    const [message, setMessage] = useState<String>("");


    const handleCloseErr = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setErr(false);
    };

    const handleClickErr = (message: string) => {
        setMessage(message);
        setErr(true);
    };




    /*

    useEffect(() => {
        const chatSocket = io(`${process.env.NEXT_PUBLIC_CHAT_SOCKET_URL}`);
        setSocket(chatSocket);
        chatSocket.on(chatRoom, (data: any) => {
            setChatMessages((prev: any) => [...prev, data]);
        });
        return () => {
            chatSocket.close();
        };
    }, [])

    */

    

    const sendMessage = () => {
        if (!user) return handleClickErr('You must login to chat')
        if (!userMessage) return handleClickErr('You must enter a message')
        const message = userMessage;
        socket?.emit(chatRoom, {
            message,
            username: user?.username,
            avatar: user?.img,
        });
        setUserMessage("");
    }

    const handleChangeChatRoom = (e: any) => {
        setChatMessages([]);
        setChatRoom(e.target.value)
        socket?.emit(chatRoom, {
            avatar: null,
            username: null,
            message: `${user?.username} joined the chat`
        })
    }
    return (
        <>
            {
                settings?.chat && <>
                    {/* //? Chat Placeholder */}
                    <div className={`${isChatOpen ? "mr-[300px] ease-in" : 'mr-0 ease-out'} duration-700 transition-all`}></div>
                    {/* //? Chat Component */}
                    <aside className={`w-[300px] h-full bg-[#24252F] z-[999] fixed ${isChatOpen ? "right-0 ease-out" : '-right-[999px] ease-in'} duration-700  transition-all flex flex-col items-center gap-3 p-2`}>
                        <select
                            onChange={(e) => { setChatRoom(e.target.value), setChatMessages([]) }}
                            name="channel"
                            id="channel"
                            className='w-full h-[50px] outline-none bg-[#24252F] text-[#9293A6] border-b border-[#9293A6] text-[14px] font-medium'>

                            <option value="GeneralChatRoom">General Chat</option>
                            {/* {settings?.games[1].active && <option disabled={true}  value="horseRaceRoom">Horse Race Chat</option>}
                            {settings?.games[0].active && <option disabled={true}  value="coinFlipRoom">Coin Flip Chat</option>}
                            {settings?.games[2].active && <option disabled={true}  value="rouletteRoom">Roulette Chat</option>} */}
                        </select>
                        <div className='h-[calc(100vh-220px)] overflow-y-auto scrollbar-thin scroll-smooth shadow-md bg-[#16181F] w-full p-2 rounded-md'>
                            {
                                chatMessages.map((message: any, index: number) => {
                                    return (
                                        <div key={index} className='flex items-center gap-2 mb-3'>
                                            {
                                                message.avatar && <div className="flex flex-col items-center justify-center w-[35px] h-[35px]">
                                                    <Image
                                                        src={message.avatar}
                                                        width={100}
                                                        height={100}
                                                        style={{
                                                            objectFit: "cover",
                                                            objectPosition: "center",
                                                        }}
                                                        alt="pp"
                                                        className="rounded-full w-[35px] h-[35px]"
                                                    />
                                                </div>
                                            }
                                            <p>
                                                {message.username && <span className='text-[#9293A6]'>{message.username}: </span>}
                                                <span className='text-gray-100'>{message.message}</span>
                                            </p>
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className='w-full h-[50px] flex gap-3 px-2'>
                            <input
                                value={userMessage}
                                onChange={(e) => { setUserMessage(e.target.value) }}
                                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                                type="text"
                                className='w-full h-full outline-none bg-[#24252F] text-gray-100 placeholder:text-[#9293A6] border rounded-lg p-1 px-2 border-[#9293A6] text-[14px] font-medium' placeholder='Type your message here...' />
                            <button onClick={sendMessage} className='w-[25px] mr-1 h-full bg-[#24252F] text-[#9293A6] hover:text-gray-100 border-[#9293A6] text-[14px] font-medium'>
                                <AiOutlineSend className='w-full h-full' />
                            </button>
                        </div>
                    </aside>
                    <Snackbar open={err} autoHideDuration={6000} onClose={handleCloseErr}>
                        <Alert
                            onClose={handleCloseErr}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                    <button onClick={() => { setIsChatOpen(!isChatOpen) }} className={`z-[999] fixed bottom-[55px]  ${isChatOpen ? "right-[300px]" : 'right-[0px]'} duration-700  transition-all text-[#9293A6]`}>
                        <BsChatRightTextFill className='w-8 h-8' />
                    </button>
                </>
            }
        </>
    )
}
