import { useEffect, useState } from "react";
import ICoinFlip from "../../utils/coinFlip/interfaces/game.interface";
import WinLost from "../../utils/coinFlip/enums/winLost.enum";
import CoinSides from "../../utils/coinFlip/enums/coinSides";

export default function WinRateBar() {
    const [games, setGames] = useState([]);
    const [headsWidth, setHeadsWidth] = useState(50);
    const [tailsWidth, setTailsWidth] = useState(50);

    useEffect(() => {
        try {
            fetch("/api/games/coinFlip/game?method=list&limit=100")
                .then((res) => res.json())
                .then((data) => {
                    setGames(data.games);
                });
            let totalGameLength = games.length;
            let tailsWin = 0;
            games.forEach((g: ICoinFlip) => {
                if (g.betResult == WinLost.WIN && g.pickedSide == CoinSides.HEADS) {
                    tailsWin++;
                }
            });
            let headsWin = 0;
            games.forEach((y: ICoinFlip) => {
                if (y.betResult == WinLost.WIN && y.pickedSide == CoinSides.TAILS) {
                    headsWin++;
                }
            });
            let totalGame = headsWin + tailsWin;
            let tailsRate = (100 * tailsWin) / totalGame;
            let headsRate = (100 * headsWin) / totalGame;
            setTailsWidth(tailsRate);
            setHeadsWidth(headsRate);
        } catch (err) { console.log(err) }
    },);

    return (
        <div className="md:w-2/3 w-auto space-y-2 ">
            <p className="w-full ">Player win rate <span className="text-xs italic"> (last 100 win flips only)</span> :</p>
            <div className="w-full h-5 mb-6 flex ">
                <div
                    id="tails"
                    className={`bg-blue-500 h-8 mb-6 flex items-center overflow-hidden ${tailsWidth >= 100 ? "rounded-r-lg" : ""} rounded-l-lg `}
                    style={{ width: tailsWidth + "%" }}
                >
                    <span className="px-2 hidden md:block">
                        {CoinSides.HEADS} {Math.floor(tailsWidth)}%
                    </span>
                </div>
                <div
                    id="heads"
                    className={`bg-green-500 h-8 justify-end overflow-hidden  flex items-center  ${headsWidth >= 100 ? "rounded-l-lg" : ""} rounded-r-lg `}
                    style={{ width: headsWidth + "%" }}
                >
                    <span className="px-2 hidden md:block">
                        {CoinSides.TAILS} {Math.ceil(headsWidth)}%
                    </span>
                </div>
            </div>
        </div>
    );
}
