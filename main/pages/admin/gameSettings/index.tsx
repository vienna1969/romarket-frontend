import Sidebar from '@/components/layout/admin/Sidebar';
import { myGetServerSideProps } from '@/helpers';
import ICoinFlipSettings from '@/utils/coinFlip/interfaces/settings.interface';
import { authFromServer } from '@/utils/services/useAuth';
import {
    Alert,
    AlertTitle,
    Breadcrumbs,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Input,
    Link,
    TextField,
    Typography,
    Slider,
  } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { GetServerSidePropsContext } from 'next/types';
import React, { useState } from 'react'
import Divider from '@mui/material/Divider';
import { toast } from "react-toastify";



export default function GameSettings({ coinFlipSettings, horseNames, rouletteInputs }: { coinFlipSettings: ICoinFlipSettings, horseNames: any, rouletteInputs: any }) {
    const [isSelected, setIsSelected] = useState('coinFlip');
    const [coinFlipSettingsData, setCoinFlipSettings] = useState<ICoinFlipSettings>(coinFlipSettings);
    const [horseNamesData, setHorseNames] = useState<any>(horseNames);
    const [rouletteInputsData, setRouletteInputs] = useState<any>(rouletteInputs)
    const [demo, setDemo] = useState(process.env.NEXT_PUBLIC_DEMO == "true" ? true : false);

    const updateCoinFlipSettings = async () => {
        const res = await fetch(`/api/games/coinFlip/settings?method=set`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coinFlipSettingsData)
        })
        const data = await res.json()
        if (data.status) {
            toast.success("Coin Flip Settings Updated");
        } else {
            toast.error("Error Updating Settings");
        }
    }

    const updateHorseNames = async () => {
        const res = await fetch('/api/games/horseRace/settings/horseNames?method=set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horseNamesData)
        })
        const data = await res.json()

        const inputRes = await fetch('/api/games/horseRace/settings/inputs?method=set', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horseNamesData.inputs)
        })
        const inputData = await inputRes.json()

        if (data.status && inputData.status) {
            toast.success("Settings Successfully Updated");
        } else {
            toast.error("Error Updating Horse Names");
        }
    }

    const updateRouletteSettings = async () => {
        const res = await fetch(`/api/games/roulette/inputs?method=set`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rouletteInputsData)
        })
        const data = await res.json()
        console.log(data)
        if (data.status) {
            toast.success("Roulette Settings Updated");
        } else {
            toast.error("Error Updating Settings");
        }
    }

    return (
        <div className="flex">
            <div className="w-[80px] lg:w-[453px] p-2"></div>
            <Sidebar />
            <div className='flex flex-col w-full h-full  md:p-10'>
                
                {/* Breadcrumb Start Here */}
                <div className="bg-gray-900 p-3 rounded-md">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                    className="flex justify-center"
                    underline="hover"
                    color="inherit"
                    href="/admin"
                    >
                    <DashboardIcon className="mr-2" />
                    Dashboard
                    </Link>
                    <Typography color="text.primary">Game Settings</Typography>
                </Breadcrumbs>
                </div>
                {/* Breadcrumb End Here */}




                <div className='flex flex-col items-center p-5 md:p-10 '>
                    <div className='flex w-full justify-between items-end text-xs md:text-base'>
                        <button onClick={() => { setIsSelected('coinFlip') }} className={`w-full h-14 rounded-tl-lg ${isSelected === 'coinFlip' ? 'bg-gray-900 rounded-t-lg h-16' : 'bg-white/10'}`}>Coin Flip</button>
                        <button onClick={() => { setIsSelected('horseRace') }} className={`w-full h-14 ${isSelected === 'horseRace' ? 'bg-gray-900 rounded-t-lg h-16' : 'bg-white/10'}`}>Horse Race</button>
                        <button onClick={() => { setIsSelected('Roulette') }} className={`w-full h-14 rounded-tr-lg ${isSelected === 'Roulette' ? 'bg-gray-900 rounded-t-lg h-16' : 'bg-white/10'}`}>Roulette</button>
                    </div>
                    <div className='flex flex-col w-full bg-gray-900 p-2'>
                        {isSelected === 'coinFlip' && <>
                            <div className='flex flex-col gap-3 p-5'>
                                <p> Win Rate %{coinFlipSettingsData.winRate}</p>
                                <Slider
                                    aria-label="win rate"
                                    defaultValue={30}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    value={coinFlipSettingsData.winRate}
                                    onChange={(e, value) => { setCoinFlipSettings({ ...coinFlipSettingsData, winRate: Number(value) }) }}
                                    min={10}
                                    max={100}
                                    className='mb-5 '
                                />
                                <div className='grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                                    <TextField
                                        required
                                        name="betAmount1"
                                        label="1. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={coinFlipSettingsData.amount1}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setCoinFlipSettings({ ...coinFlipSettingsData, amount1: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="betAmount2"
                                        label="2. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={coinFlipSettingsData.amount2}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setCoinFlipSettings({ ...coinFlipSettingsData, amount2: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="betAmount3"
                                        label="3. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={coinFlipSettingsData.amount3}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setCoinFlipSettings({ ...coinFlipSettingsData, amount3: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="betAmount4"
                                        label="4. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={coinFlipSettingsData.amount4}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setCoinFlipSettings({ ...coinFlipSettingsData, amount4: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="betAmount5"
                                        label="5. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={coinFlipSettingsData.amount5}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setCoinFlipSettings({ ...coinFlipSettingsData, amount5: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="betAmount6"
                                        label="6. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={coinFlipSettingsData.amount6}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setCoinFlipSettings({ ...coinFlipSettingsData, amount6: Number(e.target.value) });
                                        }}
                                    />
                                </div>
                                <div className='flex gap-3 w-full justify-end'>
                                    <button onClick={
                                        () => {
                                            setCoinFlipSettings({
                                                ...coinFlipSettingsData,
                                                winRate: coinFlipSettings.winRate,
                                                wallet: coinFlipSettings.wallet,
                                                amount1: coinFlipSettings.amount1,
                                                amount2: coinFlipSettings.amount2,
                                                amount3: coinFlipSettings.amount3,
                                                amount4: coinFlipSettings.amount4,
                                                amount5: coinFlipSettings.amount5,
                                                amount6: coinFlipSettings.amount6
                                            })
                                        }
                                    } className='gold-btn p-2' disabled={demo}>Reset to Default</button>
                                    <button disabled={demo} onClick={updateCoinFlipSettings} className='green-btn p-2'>Save Changes</button>
                                </div>
                            </div>
                        </>}
                        {isSelected === 'horseRace' && <>
                            <div className='flex flex-col gap-5 p-5'>
                                <TextField
                                    required
                                    name="horse1"
                                    label="1. Horse Name"
                                    className="w-full"
                                    type='text'
                                    variant="outlined"
                                    value={horseNamesData.horse1}
                                    onChange={(e) => {
                                        setHorseNames({ ...horseNamesData, horse1: e.target.value });
                                    }}
                                />
                                <TextField
                                    required
                                    name="horse2"
                                    label="2. Horse Name"
                                    className="w-full"
                                    type='text'
                                    variant="outlined"
                                    value={horseNamesData.horse2}
                                    onChange={(e) => {
                                        setHorseNames({ ...horseNamesData, horse2: e.target.value });
                                    }}
                                />
                                <TextField
                                    required
                                    name="horse3"
                                    label="3. Horse Name"
                                    className="w-full"
                                    type='text'
                                    variant="outlined"
                                    value={horseNamesData.horse3}
                                    onChange={(e) => {
                                        setHorseNames({ ...horseNamesData, horse3: e.target.value });
                                    }}
                                />
                                <TextField
                                    required
                                    name="horse4"
                                    label="4. Horse Name"
                                    className="w-full"
                                    type='text'
                                    variant="outlined"
                                    value={horseNamesData.horse4}
                                    onChange={(e) => {
                                        setHorseNames({ ...horseNamesData, horse4: e.target.value });
                                    }}
                                />
                                <TextField
                                    required
                                    name="horse5"
                                    label="5. Horse Name"
                                    className="w-full"
                                    type='text'
                                    variant="outlined"
                                    value={horseNamesData.horse5}
                                    onChange={(e) => {
                                        setHorseNames({ ...horseNamesData, horse5: e.target.value });
                                    }}
                                />
                                <Divider>Bet Inputs</Divider>
                                <div className='grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                                    <TextField
                                        required
                                        name="horseInput1"
                                        label="1. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={horseNamesData.inputs.input1}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setHorseNames({ ...horseNamesData, inputs: { ...horseNamesData.inputs, input1: Number(e.target.value) } })
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="horseInput2"
                                        label="2. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={horseNamesData.inputs.input2}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setHorseNames({ ...horseNamesData, inputs: { ...horseNamesData.inputs, input2: Number(e.target.value) } })
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="horseInput3"
                                        label="3. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={horseNamesData.inputs.input3}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setHorseNames({ ...horseNamesData, inputs: { ...horseNamesData.inputs, input3: Number(e.target.value) } })
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="horseInput4"
                                        label="4. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={horseNamesData.inputs.input4}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setHorseNames({ ...horseNamesData, inputs: { ...horseNamesData.inputs, input4: Number(e.target.value) } })
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="horseInput5"
                                        label="5. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={horseNamesData.inputs.input5}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setHorseNames({ ...horseNamesData, inputs: { ...horseNamesData.inputs, input5: Number(e.target.value) } })
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="horseInput6"
                                        label="6. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={horseNamesData.inputs.input6}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setHorseNames({ ...horseNamesData, inputs: { ...horseNamesData.inputs, input6: Number(e.target.value) } })
                                        }}
                                    />
                                </div>

                                <div className='flex gap-3 w-full justify-end'>
                                    <button onClick={
                                        () => {
                                            setHorseNames({
                                                ...horseNamesData, horse1: horseNames.horse1,
                                                horse2: horseNames.horse2,
                                                horse3: horseNames.horse3,
                                                horse4: horseNames.horse4,
                                                horse5: horseNames.horse5,
                                                inputs: {
                                                    input1: horseNames.inputs.input1,
                                                    input2: horseNames.inputs.input2,
                                                    input3: horseNames.inputs.input3,
                                                    input4: horseNames.inputs.input4,
                                                    input5: horseNames.inputs.input5,
                                                    input6: horseNames.inputs.input6,
                                                }
                                            })
                                        }
                                    } className='gold-btn p-2'>Reset to Default</button>
                                    <button onClick={updateHorseNames} className='green-btn p-2'>Save Changes</button>
                                </div>
                            </div>
                        </>
                        }
                        {isSelected === 'Roulette' && <>
                            <div className='flex flex-col w-full p-4'>
                                <div className='grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                                    <TextField
                                        required
                                        name="roulette1"
                                        label="1. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={rouletteInputsData.input1}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setRouletteInputs({ ...rouletteInputsData, input1: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="roulette2"
                                        label="2. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={rouletteInputsData.input2}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setRouletteInputs({ ...rouletteInputsData, input2: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="roulette3"
                                        label="3. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={rouletteInputsData.input3}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setRouletteInputs({ ...rouletteInputsData, input3: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="roulette4"
                                        label="4. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={rouletteInputsData.input4}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setRouletteInputs({ ...rouletteInputsData, input4: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="roulette5"
                                        label="5. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={rouletteInputsData.input5}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setRouletteInputs({ ...rouletteInputsData, input5: Number(e.target.value) });
                                        }}
                                    />
                                    <TextField
                                        required
                                        name="roulette6"
                                        label="6. Bet Amount"
                                        className="w-full"
                                        type='number'
                                        variant="outlined"
                                        value={rouletteInputsData.input6}
                                        onChange={(e) => {
                                            if (Number(e.target.value) < 0) return;
                                            setRouletteInputs({ ...rouletteInputsData, input6: Number(e.target.value) });
                                        }}
                                    />
                                </div>
                                <div className='flex gap-3 w-full justify-end mt-5'>
                                    <button onClick={
                                        () => {
                                            setRouletteInputs({
                                                ...rouletteInputsData,
                                                input1: rouletteInputs.input1,
                                                input2: rouletteInputs.input2,
                                                input3: rouletteInputs.input3,
                                                input4: rouletteInputs.input4,
                                                input5: rouletteInputs.input5,
                                                input6: rouletteInputs.input6,
                                            })
                                        }
                                    } className='gold-btn p-2' disabled={demo}>Reset to Default</button>
                                    <button disabled={demo} onClick={updateRouletteSettings} className='green-btn p-2'>Save Changes</button>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}



export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { user, settings }: any = await myGetServerSideProps(context)

    /*
    if (!user.admin) {
        return { redirect: { destination: '/', permanent: false } }
    }
    */

    const getCoinFlipSettings = await fetch(process.env.API_URL + `/api/games/coinFlip/settings?method=all`)
    const coinFlipSettings = await getCoinFlipSettings.json();

    const getHorseNames = await fetch(process.env.API_URL + `/api/games/horseRace/settings/horseNames?method=all`)
    const horseNames = await getHorseNames.json();

    const getRouletteInputs = await fetch(process.env.API_URL + `/api/games/roulette/inputs?method=get`)
    const rouletteInputs = await getRouletteInputs.json();

    return {
        props: {
            user: user,
            settings: settings ?? null,
            coinFlipSettings: coinFlipSettings.settings[0],
            horseNames: horseNames.horseNames[0],
            rouletteInputs: rouletteInputs.inputs
        }
    }
}


