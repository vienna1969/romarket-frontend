import {
  Stack,
  Snackbar,
  Alert,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


//import { useAccount, useNetwork } from "wagmi";

import { IUser } from "@/utils/interfaces/user-interface";
import Layout from "@/components/layout/Layout";
import { ISettings } from "@/utils/interfaces/settings-interface";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { myGetServerSideProps } from "@/helpers";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { user, settings }: any = await myGetServerSideProps(context);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { req, res } = context
  const { token } = req.cookies

  const withdrawRequestResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/withdrawRequest?method=my&userToken=${token}`)
  const withdrawRequestData = await withdrawRequestResponse.json()


  return {
    props: {
      user: user ?? null,
      settings: settings ?? null,
      requests: withdrawRequestData.requests ?? null
    },
  };
}

import abi from "@/utils/abi.json";
import axios from "axios";
import { makeWinDepositCoin } from "@/utils/models/user-model";
import { getCookie } from "cookies-next";
import Link from "next/link";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 110,
    editable: true,
  },
];

export default function Deposite({
  user,
  settings,
  requests
}: {
  user: IUser;
  settings: ISettings | null;
  requests: any
}) {

  //const { address, isConnecting, isDisconnected } = useAccount();
  //const { chain, chains } = useNetwork();


  const router = useRouter();
  const [swap, setSwap] = useState(false);
  const [upperText, setUpperText] = useState(0);
  const [bottomText, setBottomText] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [depositCoin, setDepositCoin] = useState(0);
  const [unsupported, setUnsupported] = useState(false);
  const [swapDisabled, setSwapDisabled] = useState(true);
  const [tokenAddress, setTokenAddress] = useState(settings?.token.address);
  const [tokenSymbol, settokenSymbol] = useState<any>(settings?.token.symbol);
  const [tokenDecimals, settokenDecimals] = useState<any>(
    settings?.token.decimals
  );
  const [tokenImage, setTokenImage] = useState(settings?.token.img);
  const [selectedSide, setSelectedSide] = useState("deposit");
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const rows = [
    { id: 1, status: "Pending", amount: 35 },
    { id: 2, status: "Pending", amount: 42 },
  ];

  const change = (e: any) => {
    if (e.target.value >= 0) {
      if (swap != true) {
        setSwapDisabled(e.target.value >= user?.deposit);
        setUpperText(e.target.value); //@ts-ignore
        setBottomText(e.target.value / settings?.token.multiplier);
      } else {
        setSwapDisabled(e.target.value >= user?.maticBalance);
        setUpperText(e.target.value); //@ts-ignore
        setBottomText(e.target.value * settings?.token.multiplier);
      }
    }
  };

  /*
  useEffect(() => {
    setTimeout(() => {
      if (chain) {
        if (chain.unsupported === true) {
          setUnsupported(true);
          toast.error("Please change your network ");
        } else {
          setUnsupported(false);
          toast.success("You are connected ");
        }
      }
    }, 200);
  }, [chain, address, isConnecting, isDisconnected]);
  */

  const wasAdded = async () => {
    try {
      const ethereum = (window as any).ethereum;
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const swapCoin = () => {
    if (!swap) {
      fetch("/api/deposite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "swapToMatic",
          userID: user?._id,
          amount: upperText,
        }),
      }).then((res) => {
        if (res.status == 200) {
          toast.success("Swap Success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Swap Failed");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
    } else {
      fetch("/api/deposite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "swapToCoin",
          userID: user?._id,
          amount: upperText,
        }),
      }).then((res) => {
        if (res.status == 200) {
          toast.success("Swap Success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Swap Failed");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
    }
  };

  const coinDeposit = async () => {

    /*
    try {
      const ethereum = (window as any).ethereum;
      
      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();
      //@ts-ignore
      const contract = new ethers.Contract(tokenAddress, abi, signer);
      const amount = deposit;
      const depositAmount = ethers.utils.parseUnits(deposit.toString(), tokenDecimals);
      //@ts-ignore
      const tx = await contract.transfer(
        settings?.main.toAddress,
        depositAmount,
        { gasLimit: settings?.token.gasLimit }
      );
      //Wait
      const receipt = await tx.wait();



      if (receipt.status == 1) {
        fetch("/api/deposite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "makeDepositCoin",
            userID: user?._id,
            amount: amount,
          }),
        }).then((res) => {
          if (res.status == 200) {
            toast.success("Deposit Success");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error("Deposit Failed");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
      } else {
        toast.error("Deposit Failed");
      }
    } catch (err) {
      console.log(err);
    }
    */

  };

  const mainDeposit = async () => {
    //RPC ERROR VERDİ
    /*
    try {
      const ethereum = (window as any).ethereum;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const amount = depositCoin;
      const signedTransaction = await signer.sendTransaction({
        to: settings?.main.toAddress,
        value: ethers.utils.parseEther(amount.toString()),//@ts-ignore
      }, { gasLimit: parseInt(settings?.main.gasLimit) });
      const receipt = await signedTransaction.wait();
      if (receipt.status == 1) {
        fetch("/api/deposite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "makeMaticDeposit",
            userID: user?._id,
            amount: amount,
          }),
        }).then((res) => {
          if (res.status == 200) {
            toast.success("Deposit Success");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.error("Deposit Failed");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
      }
      else {
        toast.error("Deposit Failed");
      }
    }
    catch (error) {
      console.log(error);
    }
    */
  }


  const handleCreateWithdrawRequest = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) return toast.error('Please enter a valid amount')
    const response = await fetch('/api/withdrawRequest?method=create', {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        userToken: getCookie('token'),
        amount: withdrawAmount,
        type: settings?.requestType === 'Coin' ? settings?.token.symbol : settings?.main.symbol
      })
    })
    const data = await response.json()
    if (data.status) {
      toast.success(data.message);
      router.push('/');
    } else {
      toast.error(data.message)
    }
  }

  return (
    <>
      <Layout user={user} settings={settings}>

        {/*

        {address ? (
          !unsupported ? (
            <div className="w-full p-4">
              <div className="w-full flex flex-row">
                <div className="flex w-full items-center justify-center px-20 gap-20">
                  <button
                    onClick={() => { setSelectedSide('deposit') }}
                    className={`w-full ${selectedSide === "deposit" ? "bg-[#24252f]" : "bg-transparent"} rounded-md p-2 font-bold text-xl`}>Deposit</button>
                  <button
                    onClick={() => { setSelectedSide('withdraw') }}
                    className={`w-full ${selectedSide === "withdraw" ? "bg-[#24252f]" : "bg-transparent"} rounded-t-md p-2 font-bold text-xl`}>Withdraw</button>
                </div>
              </div>
              {
                selectedSide == "deposit" ? (
                  <div className="w-full flex flex-col lg:flex-row  mt-4 gap-5 p-10">
                    {
                      settings?.main.swapStatus ? (
                        <div className="w-full flex flex-col">
                          <div className=" w-full bg-[#24252f] shadow-md rounded-md gap-4 flex flex-col p-2 items-center justify-center">
                            <div className="text-2xl font-bold p-2 text-[#cbcbcd] w-full">
                              Swap Panel
                            </div>

                            <div className="w-full flex flex-col gap-2">
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                type="number"
                                value={upperText} //@ts-ignore
                                onChange={(e) => {
                                  change(e);
                                }}
                                className="w-full"
                                InputProps={{
                                  endAdornment: (
                                    <div className="font-bold">
                                      {swap
                                        ? settings?.main.symbol
                                        : settings?.token.symbol}
                                    </div>
                                  ),
                                }}
                              />
                              <div className="text-gray text-xs">
                                Your Site Balance :{" "}
                                {swap ? user?.maticBalance : user?.deposit}{" "}
                                {swap ? settings?.main.symbol : settings?.token.symbol}
                              </div>
                            </div>

                            <IconButton
                              size={"large"}
                              className="flex flex-row gap-2 "
                              onClick={() => {
                                setSwap(!swap);
                                change({ target: { value: upperText } });
                              }}
                            >
                              <SwapVertIcon />
                              <div className="text-sm">Swap</div>
                            </IconButton>
                            <div className="w-full flex flex-col gap-2">
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                type="number"
                                value={bottomText}
                                onChange={(e) => {
                                  //@ts-ignore
                                  setBottomText(e.target.value);
                                }}
                                className="w-full"
                                disabled
                                InputProps={{
                                  endAdornment: (
                                    <div className="font-bold">
                                      {!swap
                                        ? settings?.main.symbol
                                        : settings?.token.symbol}
                                    </div>
                                  ),
                                }}
                              />
                              <div className="text-gray text-xs flex flex-col md:flex-row gap-1">
                                Your Site Balance :{" "}
                                {!swap ? <p>{user?.maticBalance.toFixed(25)}</p> : <p>{user?.deposit}</p>}{" "}
                                {!swap ? settings?.main.symbol : settings?.token.symbol}
                              </div>
                            </div>
                            <Button
                              variant="contained"
                              className="bg-[#00d395] text-white w-full"
                              disabled={swapDisabled}
                              onClick={() => {
                                swapCoin();
                              }}
                            >
                              Swap
                            </Button>
                          </div>
                        </div>
                      ) : null
                    }

                    <div className="w-full flex flex-col gap-3">
                      {
                        settings?.token.status ? (
                          <div className=" w-full bg-[#24252f] shadow-md rounded-md gap-2 flex flex-col p-2 items-center justify-center">
                            <div className="text-2xl font-bold p-2 text-[#cbcbcd] w-full">
                              {settings?.token.symbol} Deposit Panel
                            </div>
                            <div className="text-sm text-gray-200 p-2  w-full">
                              {settings?.token.symbol} token is a BEP-20 token. You can
                              deposit {settings?.token.symbol} token to your account.
                            </div>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              type="number"
                              value={deposit}
                              onChange={(e) => {
                                //@ts-ignore
                                setDeposit(e.target.value);
                              }}
                              className="w-full"
                              InputProps={{
                                endAdornment: (
                                  <div className="font-bold">
                                    {settings?.token.symbol}
                                  </div>
                                ),
                              }}
                            />
                            <div className="flex flex-row gap-2 w-full">
                              <Button
                                variant="contained"
                                className="bg-[#00d395] text-white w-1/2"
                                onClick={() => {
                                  coinDeposit();
                                }}
                              >
                                Deposit
                              </Button>
                              <Button
                                variant="contained"
                                color="warning"
                                className="bg-[#ff9900] text-white w-1/2"
                                onClick={() => {
                                  wasAdded();
                                }}
                              >
                                Token Add to Metamask
                              </Button>
                            </div>
                          </div>
                        ) : null
                      }
                      {
                        settings?.main.status ? (
                          <div className=" w-full bg-[#24252f] shadow-md rounded-md gap-2 flex flex-col p-2 items-center justify-center">
                            <div className="text-2xl font-bold p-2 text-[#cbcbcd] w-full">
                              {settings?.main.symbol} Deposit Panel
                            </div>
                            <div className="text-sm text-gray-200 p-2  w-full"></div>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              type="number"
                              value={depositCoin}
                              onChange={(e) => {
                                //@ts-ignore
                                setDepositCoin(e.target.value);
                              }}
                              className="w-full"
                              InputProps={{
                                endAdornment: (
                                  <div className="font-bold">
                                    {settings?.main.symbol}
                                  </div>
                                ),
                              }}
                            />
                            <div className="flex flex-row gap-2 w-full">
                              <Button
                                variant="contained"
                                className="bg-[#00d395] text-white w-full"
                                onClick={() => {
                                  mainDeposit();
                                }}
                              >
                                Deposit
                              </Button>
                            </div>
                          </div>
                        ) : null
                      }
                    </div>
                  </div>
                ) : (
                  <div className=" flex flex-col items-center justify-center p-10 bg-[#24252f] rounded-md gap-5">
                    <h3>Welcome {user.username}</h3>
                    <p className="text-sm text-gray-400">
                      You can create a withdraw request. The request will be reviewed by admins and if it is approved, your withdraw will be processed.
                    </p>
                    <>
                      {
                        settings?.requestType === 'Coin' ?
                          (
                            <p>
                              Your current balance is {user?.deposit.toFixed(5)} {settings?.token.symbol}
                            </p>
                          ) : (
                            <p>
                              Your current balance is {user?.maticBalance.toFixed(25)} {settings?.main.symbol}
                            </p>
                          )
                      }
                      <div className='flex gap-1 items-center'>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          type="number"
                          value={withdrawAmount}
                          onChange={(e) => {
                            setWithdrawAmount(Number(e.target.value));
                          }}
                          className="w-full"
                          InputProps={{
                            endAdornment: (
                              <div className="font-bold">
                                {settings?.requestType === 'Coin' ? settings?.token.symbol : settings?.main.symbol}
                              </div>
                            ),
                          }}
                        />
                        <Button
                          variant="contained"
                          className="bg-[#00d395] text-white w-32"
                          onClick={handleCreateWithdrawRequest}
                        >
                          Withdraw
                        </Button>
                      </div>
                    </>
                    {
                      requests.length > 0 ? (
                        <>
                          <div className="flex flex-col gap-1 w-full">
                            <h5 className=''>Your Withdraw Requests</h5>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                              {requests.map((request: any, index: number) => {
                                if (!request.isPayed && request.status === 'Waiting')
                                  return (
                                    <div key={request._id} className='flex flex-col border rounded-md gap-1 items-center p-2'>
                                      <p>
                                        Withdraw Amount : {request.withdrawAmount} {request.withdrawType}
                                      </p>
                                      <p>
                                        Status : <span className={`text-yellow-500 `}>{request.status}</span>
                                      </p>
                                      <p>
                                        Date : {new Date(request.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                  )
                              })}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <h5 className=''>Your Paid Requests</h5>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                              {requests.map((request: any, index: number) => {
                                if (request.isPayed || request.status === 'Rejected')
                                  return (
                                    <div key={request._id} className='flex flex-col border rounded-md gap-1 items-center p-2'>
                                      <p>
                                        Withdraw Amount : {request.withdrawAmount} {request.withdrawType}
                                      </p>
                                      <p>
                                        Status : <span className={`text-${request.isPayed ? 'green' : 'red'}-500 `}>{request.status}</span>
                                      </p>
                                      {request.txHash.length > 0 ? (
                                        <p>
                                          TxHash : <Link href={`${request.txHash}`} target='_blank' className='text-blue-500'>{request.txHash}</Link>
                                        </p>
                                      ) : null}
                                    </div>
                                  )
                              })}
                            </div>
                          </div>
                        </>
                      ) : null
                    }
                  </div>
                )
              }

            </div>
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold">Wrong Network</div>
                <div className="text-xl font-normal">
                  Please change your network
                </div>
                <ConnectButton />
              </div>
            </div>
          )
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">
                Please Connect Your Wallet
              </div>
              <div className="text-xl font-normal">
                You can connect your wallet to deposit
              </div>
              <ConnectButton />
            </div>
          </div>
        )}
        */}
        

      </Layout >
    </>
  );
}
