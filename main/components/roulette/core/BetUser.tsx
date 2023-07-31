import Image from "next/image";

export default function BetUser(props: any) {
    return (
        <div className="w-full flex flex-row px-3 py-2 gap-3 items-center justify-between">
            <div className="flex flex-row items-center gap-3">
                <div className="flex flex-col relative items-center justify-center w-[30px] h-[30px] rounded-full">
                    <Image
                        src={props.data.userObject.img}
                        width={100}
                        height={100}
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                        className="rounded-full w-[25px] h-[25px]"
                        alt='user profile photo' />
                </div>
                <div className="text-[#ababac] text-sm">{props.data.userObject.username}</div>
            </div>
            <div className={`${props.activeData ? "text-green-400" : "text-[#ababac]"} text-sm`}>
                {props.activeData ? (props.data.bet.toFixed(2) * (props.site == "dice" ? 12 : 2)).toFixed(2) : props.data.bet.toFixed(2)}
            </div>
        </div>
    )
}