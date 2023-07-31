import { useEffect, useState } from "react";
import BetHistory from "./BetHistory";
import BetJoin from "./BetJoin";
import BetPanel from "./BetPanel";
import RouletteGame from "./Game";

export default function RouletteMain(props: any) {
  const [bet, setBet] = useState<any>(0);

  return (
    <div className="flex flex-col items-center justify-center pt-10 w-full">
      <div className="w-full lg:w-3/4 flex flex-col">
        <div className="py-5">
          <BetHistory history={props.history} chance={props.chance} />
        </div>
        <RouletteGame
          timer={props.timer}
          start={props.start}
          prizeIndex={props.prizeIndex}
        />
      </div>
      <div className="w-full">
        <BetPanel bet={bet} setBet={setBet} user={props.user} inputs={props.inputs} />
      </div>
      <div className=" w-full p-2 lg:w-2/3">
        <BetJoin
          bet={bet}
          user={props.user}
          loading={props.loading}
          start={props.start}
          setLoading={props.setLoading}
          t={props.t}
          ct={props.ct}
          dice={props.dice}
          active={props.active}
          socket={props.socket}
        />
      </div>
    </div>
  );
}
