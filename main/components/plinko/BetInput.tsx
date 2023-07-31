import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BetInputs(props: any) {
  const [ballCount, setBallCount] = useState(1);
  const [betAmount, setBetAmount] = useState(1);

  const handleBet = () => {
    const test = setInterval(() => {
      props.onClick();
    }, 100);
    setTimeout(() => {
      clearInterval(test);
    }, 100 * ballCount);
    toast(`Bet Placed! (${ballCount}) Ball`, {
      position: "top-left",
      autoClose: 1000,
      theme: "dark",
      });
  };

  const handleBetAmount = (e: any) => {
    setBetAmount(e.target.value);
    if (e.target.value < 1) {
      setBetAmount(1);
    }

  };

  return (
    <div className="flex flex-col gap-2 w-3/5 mt-5">
      <div className="w-full flex-col rounded flex gap-2 ">
        <div className="flex flex-row w-full justify-center gap-2">
          <div className="flex flex-col h-1 w-6 gap-1">
            <button onClick={()=>{handleBetAmount(ballCount+1)}} className="w-1/6 text-xl flex justify-center scale-90 items-center p-3 h-1/3 bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded">
              <span className="">+</span>
            </button>
            <button onClick={()=>{handleBetAmount(ballCount-1)}} className="w-1/6 text-xl flex justify-center scale-90 items-center p-3 h-1/3 bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded">
              -
            </button>
          </div>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(parseInt(e.target.value))}
            className="w-1/6 text-xl p-3 bg-[#0D0F1A] text-white border-2 border-emerald-400 shadow-md shadow-emerald-400 duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded"
          />

          <button className="w-1/6 text-xl flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded">
            1
          </button>
          <button className="w-1/6 text-xl flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded">
            2
          </button>
          <button className="w-1/6 text-xl flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded">
            5
          </button>
          <button className="w-1/6 text-xl flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded">
            10
          </button>
        </div>
        <div className="h-1/3 flex flex-row w-full justify-center  gap-3">
          <p className="text-white">Ball Count</p>
          <button
            onClick={() => setBallCount(1)}
            className={`h-1/3 text-sm flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded ${
              ballCount == 1
                ? `border-emerald-400 shadow-emerald-400 text-emerald-400 shadow-lg`
                : null
            }`}
          >
            1
          </button>
          <button
            onClick={() => setBallCount(2)}
            className={`h-1/3 text-sm flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded ${
              ballCount == 2
                ? `border-emerald-400 shadow-emerald-400 text-emerald-400 shadow-lg`
                : null
            }`}
          >
            2
          </button>
          <button
            onClick={() => setBallCount(5)}
            className={`h-1/3 text-sm flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded ${
              ballCount == 5
                ? `border-emerald-400 shadow-emerald-400 text-emerald-400 shadow-lg`
                : null
            }`}
          >
            5
          </button>
          <button
            onClick={() => setBallCount(10)}
            className={`h-1/3 text-sm flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded ${
              ballCount == 10
                ? `border-emerald-400 shadow-emerald-400 text-emerald-400 shadow-lg`
                : null
            }`}
          >
            10
          </button>
          <button
            onClick={() => setBallCount(15)}
            className={`h-1/3 text-sm flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded ${
              ballCount == 15
                ? `border-emerald-400 shadow-emerald-400 text-emerald-400 shadow-lg`
                : null
            }`}
          >
            15
          </button>
        </div>
        <div className="flex flex-row w-full justify-star gap-2 -mt-5">
          <button
            onClick={handleBet}
            className="w-full text-xl flex justify-center scale-90 items-center p-3  bg-[#0D0F1A] text-white border-2 hover:text-emerald-400 hover:border-emerald-400 shadow-md  duration-300 hover:shadow-lg hover:shadow-emerald-400 rounded"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
