import { toast } from "react-toastify";
import BetButton from "./core/BetButton";
import BetList from "./core/BetList";
import { getCookie } from 'cookies-next';
import { Socket } from "socket.io";
import { useEffect, useState } from "react";


export default function BetJoin(props: any) {

  function bet(site: string) {
    props.setLoading(true)
    const bet = parseFloat(props.bet)
    if (bet <= 0 || isNaN(bet)) {
      toast.error('Please enter a valid bet')
      props.setLoading(false)
      return;
    }
    const token = getCookie('token')
    if (token) {
      props.socket.emit('bet', {
        site,
        token,
        bet
      })
    }
    else {
      toast.error('You need to login to bet')
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-5">
      <div className="w-full h-auto flex flex-col gap-3">
        <BetButton onClick={() => { bet('ct') }} site="ct" multiple="2x" loading={props.loading} isStarted={props.start} />
        <BetList data={props.ct} active={true} activeData={props.active == "ct" ? true : false} />

      </div>
      <div className="w-full h-auto flex flex-col gap-3">
        <BetButton onClick={() => { bet('dice') }} site="dice" multiple="14x" loading={props.loading} isStarted={props.start} />
        <BetList data={props.dice} active={true} activeData={props.active == "dice" ? true : false} />
      </div>
      <div className="w-full h-auto flex flex-col gap-3">
        <BetButton onClick={() => { bet('t') }} site="t" multiple="14x" loading={props.loading} isStarted={props.start} />
        <BetList data={props.t} active={true} activeData={props.active == "t" ? true : false} />
      </div>
    </div>
  );
}
