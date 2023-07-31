import React, { useEffect, useState } from "react";
import WinLost from "../../utils/coinFlip/enums/winLost.enum";
import moment from "moment";

export default function TopStreaksComponent() {
    const [streak, setStreak] = useState([]);

    const [streakPanel, setStreakPanel] = useState(false);

    var dateFromObjectId = function (objectId: String) {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };

    useEffect(() => {
        setInterval(() => {
            try {
                fetch("/api/games/coinFlip/game?method=streak")
                    .then((res) => res.json())
                    .then((data) => {
                        setStreak(data.streak);
                    }).catch((err) => { console.log(err) });
            } catch (err) {
                console.log(err);
            }
        }, 1000);
    }, []);

    return (
        <>
            <button
                // from-[#F37511] to-[#FEE236]
                onClick={() => { setStreakPanel(!streakPanel) }}
                className="text-white px-4 py-1 rounded-sm bg-gradient-to-b from-[#00edb8] via-[#00c2b9] to-[#00c2b9] h-full hover:scale-105 transition-all duration-400"> Top Streaks </button>
            <div className={`absolute bg-[#0c0e1a] border-2 border-[#202332] overflow-y-hidden p-2 rounded-md z-30 right-2 top-11  lg:w-[35%] text-sm max-h-[480px] ${!streakPanel ? "hidden" : "block"} `} style={{
                fontFamily: "Arial Rounded MT",
                fontSize: "14px",
            }}>
                {streak && streak?.map((streaks: any) => {
                    return (
                        streaks.count > 3 &&
                        streaks.game.betResult == WinLost.WIN && (
                            <div
                                key={streaks.game._id}
                                className="border-b-2 border-[#202332] hover:bg-[#0D0F1D] px-1"
                            >
                                <div className="flex justify-between">
                                    <p>
                                        <span className="text-[#FFAE29]">
                                            {streaks.game.username} </span>
                                        flipped <span className="text-[#FFAE29]">{streaks.game.betAmount}</span> and
                                        <span className="text-[#14f195] pl-2">
                                            doubled {streaks.count} times
                                        </span>
                                        .
                                    </p>
                                    <p className="pl-2 text-[#454B64]">
                                        {moment(dateFromObjectId(streaks.game._id)).fromNow()}
                                    </p>
                                </div>
                            </div>
                        )
                    );
                })}
            </div>
        </>
    );
}
