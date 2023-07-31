import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoulettePro, {
  IDesignPlugin,
  IDesignPluginProps,
} from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import prizeList from "./config/prizeList";
import { Button } from "@mui/material";
import LoadingGame from "./LoadingGame";

const rouletteDesing = (props: IDesignPluginProps): IDesignPlugin => ({
  prizeItemWidth: 100,
  prizeItemHeight: 100,
});

export default function RouletteGame(props: any, socket: any) {


  return (
    <div className="px-10 py-2 flex items-center justify-center">
      <div className="w-full lg:w-3/4 flex-row flex justify-center relative">
        <div>
          <div className="z-10  w-full bg-gradient-to-r from-[#0D0F1A] via-transparent to-[#0D0F1A]  absolute h-[100px]"></div>
        </div>

        <div className="w-full z-1">
          <RoulettePro
            prizes={prizeList}
            start={props.start}
            spinningTime={8}
            prizeIndex={props.prizeIndex}
            designPlugin={rouletteDesing}
          />
        </div>
        <div></div>
        <LoadingGame start={props.start} timer={props.timer} />
      </div>
    </div>
  );
}
