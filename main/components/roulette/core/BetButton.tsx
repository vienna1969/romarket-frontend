import Image from "next/image";


export default function BetButton(props: any) {
  return (
    <button disabled={props.loading || props.isStarted} onClick={props.onClick} className={`w-full flex justify-between ${props.loading ? "cursor-progress" : ""}  items-center h-14 rounded-md bg-[#333541] hover:bg-[#373a47] duration-300 px-5 shadow-[2px_2px_0px_0px_rgba(55,58,71,255)] hover:shadow-[2px_2px_0px_0px_rgba(51,53,65,255)] disabled:opacity-50 `}>
      {props.loading ? (
        <>
          <div className="flex flex-row gap-4 items-center">
            <Image src={`/roulette/${props.site}.png`} alt="" width={44} height={44} />
            <div className="font-bold text-[#dbdbdb]">LOADING...</div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row gap-4 items-center">
            <Image src={`/roulette/${props.site}.png`} alt="" width={44} height={44} />
            <div className="font-bold text-[#dbdbdb]">PLACE BET</div>
          </div>
          <div className="font-bold ">{props.multiple}</div>
        </>
      )}
    </button>
  );
}
