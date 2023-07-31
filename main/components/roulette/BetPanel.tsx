import { InputAdornment, TextField, Button, Divider } from "@mui/material";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { styled } from '@mui/material/styles';


const ColorButton = styled(Button)(({ theme }) => ({
  color: '#f5c22b',
  borderColor: '#f5c22b',
  '&:hover': {
    color: theme.palette.getContrastText('#f5c22b'),
    backgroundColor: '#f5c22b',
    borderColor: '#f5c22b',
  },
}));

const BetSettingsButton = styled(Button)(({ theme }) => ({
  color: '#9293a6',
  backgroundColor: '#373a47',
  height: '20px',
  paddingLeft: '0px',
  '&:hover': {
    color: '#b8b8b9',
    backgroundColor: '#373a47',
  },
}));


export default function BetPanel(props: any) {
  return (
    <div className="w-full items-center justify-center flex py-6 px-2 ">
      <TextField
        id="filled-size-small"
        size="small"
        value={props.bet}
        onChange={(e) => props.setBet(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PriceChangeIcon className="text-[#f5c22b]" />
            </InputAdornment>
          ),
          endAdornment: (
            <div className="gap-3 grid grid-cols-3 py-1 w-full lg:flex">
              <Divider
                orientation="vertical"
                color="#333541"
                flexItem
                className="mx-1 hidden lg:block"
              />
              <button className="bet-input-btn w-10" onClick={() => { props.setBet(0) }} >Clear</button>
              <button className="bet-input-btn w-10 hidden lg:block" onClick={() => { props.setBet(props.bet + props.inputs?.input1) }}>+ {props.inputs?.input1}</button>
              <button className="bet-input-btn w-10" onClick={() => { props.setBet(props.bet + props.inputs?.input2) }} >+ {props.inputs?.input2}</button>
              <button className="bet-input-btn w-10" onClick={() => { props.setBet(props.bet + props.inputs?.input3) }} >+ {props.inputs?.input3}</button>
              <button className="bet-input-btn w-10 hidden lg:block" onClick={() => { props.setBet(props.bet + props.inputs?.input4) }}>+ {props.inputs?.input4}</button>
              <button className="bet-input-btn w-10" onClick={() => { props.setBet(props.bet + props.inputs?.input5) }}>+ {props.inputs?.input5}</button>
              <button className="bet-input-btn w-10" onClick={() => { props.setBet(props.bet + props.inputs?.input6) }}>+ {props.inputs?.input6}</button>
              <button className="bet-input-btn w-10 hidden lg:block" onClick={() => { props.setBet(props.bet / 2) }}>1 / 2</button>
              <button className="bet-input-btn w-10 hidden lg:block" onClick={() => { props.setBet(props.bet * 2) }}> X 2</button>
              <button className="bet-input-btn w-10" onClick={() => { props.setBet(props.user.deposit) }}>Max</button>
            </div>
          ),
        }}
      />

    </div>
  );
}
