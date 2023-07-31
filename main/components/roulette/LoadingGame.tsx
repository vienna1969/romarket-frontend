import { Button } from "@mui/material";

export default function LoadingGame(props: any) {
    return (
        <div className={`w-full  flex h-[100px] ${props.start ? "bg-[#0D0F1A]/0" : "bg-[#0D0F1A]/80"} flex-col absolute z-10 justify-center items-center`} >
            {
                !props.start ? (
                    <>
                        <div className="text-md text-white font-bold">
                            Starting in
                        </div>
                        <div className="text-2xl text-white font-bold">

                            {(props.timer / 1000).toFixed(2)} sec
                        </div>
                    </>
                ) : (
                    <div className="h-[100px] w-[2px] bg-red-500/50"></div>
                )
            }

            {/* <Button onClick={props.onClick} className="w-1/2 mt-5 bg-emerald-400 text-white font-bold">Test</Button> */}
        </div>
    )
}