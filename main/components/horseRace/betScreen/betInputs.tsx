import { IUser } from "@/utils/interfaces/user-interface";
import { Stack, Snackbar, Alert } from "@mui/material";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { FaCoins } from 'react-icons/fa'

export default function BetInputs({ horse1, horse2, horse3, horse4, horse5, user, horses, inputs,balance }: { horse1: any, horse2: any, horse3: any, horse4: any, horse5: any, user: IUser | null, horses: any, inputs: any,balance:any }) {
    const [chosenHorse, setChosenHorse] = useState<any>(null)
    const [betAmount, setBetAmount] = useState<any>(0)
    const [placedBet, setPlacedBet] = useState<any>(false)
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState<String>("");

    const handleClickSucc = () => {
        setSucc(true);
    };

    const handleCloseSucc = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setSucc(false);
    };

    const handleClickErr = () => {
        setErr(true);
    };

    const handleCloseErr = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setErr(false);
    };




    const placeBet = async () => {
        if (user) {
            if (betAmount > balance) {
                setErrMsg('You don`t have enough money to bet this amount');
                handleClickErr()
                return
            }
            if (betAmount === 0) {
                setErrMsg('You need to enter a bet amount');
                handleClickErr()
                return
            }
            if (betAmount < 0) {
                setErrMsg('You cannot bet a negative amount');
                handleClickErr()
                return
            }
            if (chosenHorse === null) {
                setErrMsg('You need to select a horse to bet');
                handleClickErr()
                return
            }
            const formInputs = {
                method: 'newGame',
                userToken: getCookie('token'),
                img: user.img,
                username: user?.username,
                betAmount: betAmount,
                selectedSide: chosenHorse
            }
            const res = await fetch('/api/games/horseRace/game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formInputs)
            })
            const data = await res.json()
            if (data.message === 'Success') {
                handleClickSucc();
                setCookie('horse', chosenHorse)
                setPlacedBet(true)
            } else {
                setErrMsg('You have already placed a bet');
                handleClickErr()
            }
        } else {
            setErrMsg('You need to login to place a bet');
            handleClickErr()
        }
    }

    return (
        <>
            {
                hasCookie('horse') &&
                <div className='flex gap-1 item-center justify-center w-full text-white text-xl bg-transparent'>
                    <div className='glow-text text-white font-medium p-2 '> You choose {chosenHorse ?? " "} and bet {betAmount ?? " "} </div>
                </div>
            }
            <div className='flex flex-col items-center justify-center gap-5 w-full lg:w-2/3 disabled'>
                {/* //? Input amount manuel */}
                <div className='flex items-center w-full md:w-1/2 relative'>
                    <div className='absolute left-5 z-10'> <FaCoins className='fill-yellow-500' /> </div>
                    <input onChange={(e: any) => {
                        setBetAmount(e.target.value)
                    }}
                        value={betAmount === 0 ? '' : betAmount}
                        type="number"
                        disabled={placedBet}
                        placeholder='Enter your bet'
                        className='w-full pl-20 rounded-lg p-2 bg-transparent border text-white' />
                    <button
                        disabled={placedBet}
                        onClick={() => { setBetAmount(0) }}
                        className='absolute right-5 z-10 btn btn-xs btn-outline border-gray-700'>Clear</button>
                </div>
                {/* //? Miktar Selector Buttons */}

                <div className='grid grid-cols-4 content-center md:flex w-full gap-3 items-center justify-center text-white'>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input1)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input1}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input2)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input2}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input3)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        {
                            inputs.input3
                        }
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input4)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input4}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input5)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input5}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount + inputs.input6)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'>
                        +{inputs.input6}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount * 2)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'> x2 </button>
                    <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(betAmount / 2)
                        }}
                        className='w-20 green-btn h-10 rounded-lg text-white font-medium border disabled:opacity-70'> /2 </button>
                    {user && <button
                        disabled={placedBet}
                        onClick={() => {
                            setBetAmount(balance - 0.00001)
                        }}
                        className='w-20 green-btn h-10 rounded-lg hidden md:block font-medium-repeat text-black border disabled:opacity-70'> Max </button>}
                </div>
                {/* //? Horse Select Buttons */}
                <div className='flex flex-col md:flex-row items-center justify-center  w-full md:justify-around gap-3'>
                    <button
                        disabled={placedBet}
                        onClick={() => { setChosenHorse(horses.horse1) }}
                        className={`border text-center border-white text-white p-1 gold-btn  w-44 h-14 ${chosenHorse === horses.horse1 ? "gold-btn-active" : chosenHorse === 0 ? "bg-[#ffc000]" : "bg-transparent"} disabled:text-white disabled:bg-transparent disabled:shadow-none disabled:opacity-70`}
                    >
                        {horses.horse1} x{horse1}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => { setChosenHorse(horses.horse2) }}
                        className={`border text-center border-white text-white  p-1 gold-btn  w-44 h-14 ${chosenHorse === horses.horse2 ? "gold-btn-active " : chosenHorse === 0 ? "" : ""} disabled:text-white disabled:bg-transparent disabled:shadow-none disabled:opacity-70`}
                    >{horses.horse2} x{horse2}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => { setChosenHorse(horses.horse3) }}
                        className={`border text-center border-white text-white p-1 gold-btn  w-44 h-14 ${chosenHorse === horses.horse3 ? "gold-btn-active" : chosenHorse === 0 ? "bg-[#ffc000]" : "bg-transparent"} disabled:text-white disabled:bg-transparent disabled:shadow-none disabled:opacity-70`}
                    >{horses.horse3} x{horse3}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => { setChosenHorse(horses.horse4) }}
                        className={`border text-center border-white text-white p-1 gold-btn  w-44 h-14 ${chosenHorse === horses.horse4 ? "gold-btn-active" : chosenHorse === 0 ? "bg-[#ffc000]" : "bg-transparent"} disabled:text-white disabled:bg-transparent disabled:shadow-none disabled:opacity-70`}
                    >{horses.horse4} x{horse4}
                    </button>
                    <button
                        disabled={placedBet}
                        onClick={() => { setChosenHorse(horses.horse5) }}
                        className={` border text-center border-white text-white p-1 gold-btn  w-44 h-14 ${chosenHorse === horses.horse5 ? "gold-btn-active" : chosenHorse === 0 ? "bg-[#ffc000]" : "bg-transparent"} disabled:text-white disabled:bg-transparent disabled:shadow-none disabled:opacity-70`}
                    >{horses.horse5} x{horse5}
                    </button>
                </div>
                <button
                    disabled={placedBet} onClick={placeBet} className='emerald-btn duration-300 transition-all mt-5 w-32 p-2 disabled:text-white disabled:shadow-none disabled:bg-transparent disabled:opacity-50'>Place Bet </button>
            </div>
            <Stack spacing={2} sx={{ width: "100%" }}>

                <Snackbar
                    open={succ}
                    autoHideDuration={6000}
                    onClose={handleCloseSucc}
                >
                    <Alert
                        onClose={handleCloseSucc}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        You have successfully placed your bet!
                    </Alert>
                </Snackbar>
                <Snackbar open={err} autoHideDuration={6000} onClose={handleCloseErr}>
                    <Alert
                        onClose={handleCloseErr}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        {errMsg}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}
