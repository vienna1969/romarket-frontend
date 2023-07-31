import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Divider } from "@mui/material";
import BetUser from "./BetUser";

export default function BetList(props: any) {

    const totalBet = props?.data?.reduce((a: any, b: any) => a + b.bet, 0)
    const betCount = props?.data?.length

    return (
        <div className="w-full flex flex-col  items-center h-auto max-h-[20vw] overflow-hidden rounded-md bg-[#16171c] border-[#1a1c24] border-[1px]">
            <div className="flex flex-row justify-between items-center w-full py-2 px-2">
                <div>
                    <div className="text-[#ababac] text-sm">{betCount} Bets Total</div>
                </div>
                <div className={`flex justify-center items-center gap-2 ${props.activeData ? "text-green-400" : ""}`}>
                    <PriceChangeIcon />
                    <div className="text-sm">
                        {props.activeData ? (totalBet.toFixed(2) * (props.site == "dice" ? 12 : 2)).toFixed(2) : totalBet?.toFixed(2)}
                    </div>
                </div>
            </div>
            <Divider
                sx={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#1a1c24',
                }}
            />
            <div className="w-full mt-2 duration-200">
                {
                    props?.data?.sort((a: any, b: any) => b.bet - a.bet).map((item: any, index: number) => {
                        return (
                            <BetUser key={index} data={item} activeData={props.activeData} site={props.site} />
                        )
                    })
                }
            </div>

        </div>
    )
}