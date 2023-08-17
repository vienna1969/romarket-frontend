import Layout from '@/components/layout/Layout';
import Sidebar from "@/components/layout/admin/Sidebar";
import { ISettings } from "@/utils/interfaces/settings-interface";
import { IUser } from "@/utils/interfaces/user-interface";
import { authFromServer } from "@/utils/services/useAuth";

import { Breadcrumbs, Link, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, TextField, Typography } from '@mui/material';

import DashboardIcon from "@mui/icons-material/Dashboard";
import { GetServerSidePropsContext } from "next/types";
import { useState } from "react";
import { myGetServerSideProps } from "@/helpers";

import React, { use } from 'react'

import { GridColDef, DataGrid, GridRowsProp } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Visibility';
import { TransitionProps } from '@mui/material/transitions';

import { getCookie } from 'cookies-next';
import { toast } from "react-toastify";

import { ethers } from 'ethers';


import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
  usePaperWalletUserEmail,
} from '@thirdweb-dev/react';

import { useEffect } from "react";
import { Router, View } from 'lucide-react';


import { Network, Alchemy } from 'alchemy-sdk';

import {
    tokenContractAddressBUSD,
    tokenContractAddressROM,
    tokenContractAddressUSDC,
    tokenContractAddressUSDT
} from '@/config/contractAddresses';



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
      children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Transactions({
  //user,
  settings,
  usersCount,
  withdrawRequests,
}: {
  //user: IUser;
  settings: ISettings | null;
  usersCount: number,
  withdrawRequests: any,
}) {



  const settingsAlchemy = {
    //apiKey: 'XBY-aoD3cF_vjy6le186jtpbWDIqSvrH', // Replace with your Alchemy API Key.

    apiKey: '8YyZWFtcbLkYveYaB9sjOC3KPWInNu07', // Replace with your Alchemy API Key.

    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settingsAlchemy);


  const adminAddress = "0xb6012B608DB2ad15e4Fb53d8AD2A2A8B6805F1a2";


  const [balanceROM, setBalanceROM] = useState<any>(0);
  const [balanceUSDC, setBalanceUSDC] = useState<any>(0);
  const [balanceUSDT, setBalanceUSDT] = useState<any>(0);
  const [balanceBUSD, setBalanceBUSD] = useState<any>(0);



  const [withdrawType, setWithdrawType] = useState(settings?.requestType);
  
  const [chat, setChat] = useState(settings?.chat);

  const [demo, setDemo] = useState(process.env.NEXT_PUBLIC_DEMO == "true" ? true : false);
  const [games, setGames] = useState<any>(settings?.games);



  const address = useAddress();
  const disconnect = useDisconnect();
  
  //const emailQuery = usePaperWalletUserEmail();

  const [user, setUser] = React.useState<IUser | null>(null);

  const [transactions, setTransactions] = React.useState([]);


  useEffect(() => {

    async function checkUser() {
        
      if (address) {

        console.log("address: ", address);

        const formInputs = {
          walletAddress: address,
        };

        const res = await fetch("/api/user?method=getOneByWalletAddress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formInputs),
        });
        const data = await res.json();

        console.log("data: ", data);

        if (data.status) {
          setUser(data.user);
        } 
      
      }
    }

    async function checkUserBalance() {

      console.log("adminAddress: ", adminAddress);

      if (adminAddress) {

        //ROM token contract address
        const tokenContractAddresses = [
          tokenContractAddressROM,
          tokenContractAddressUSDC,
          tokenContractAddressUSDT,
          tokenContractAddressBUSD,
        ];

        const data = await alchemy.core.getTokenBalances(
          adminAddress,
          tokenContractAddresses
        );

        console.log("Token balance for Address");
        console.log(data);

        const balanceROM = data.tokenBalances[0].tokenBalance;
        const balanceUSDC = data.tokenBalances[1].tokenBalance;
        const balanceUSDT = data.tokenBalances[2].tokenBalance;
        const balanceBUSD = data.tokenBalances[3].tokenBalance;

        const numDecimals = 18;

        setBalanceROM( (parseInt(balanceROM ?? "0") / 10 ** numDecimals).toFixed(2) );
        setBalanceUSDC( (parseInt(balanceUSDC ?? "0") / 10 ** numDecimals).toFixed(2) );
        setBalanceUSDT( (parseInt(balanceUSDT ?? "0") / 10 ** 6).toFixed(2) );
        setBalanceBUSD( (parseInt(balanceUSDT ?? "0") / 10 ** 6).toFixed(2) );

      }

    }

    //checkUser();

    //checkUserBalance();

  }, [address]);


  const pageKey = '1';
  const pageSize = '50';




  const getTransactions = async () => {

    if (address) {
      // post to api to get transactions
      const formInputs = {
        pageKey: pageKey,
        pageSize: pageSize,
        contract: tokenContractAddressROM,
        address: address,
      };

      const res = await fetch('/api/ft/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInputs),
      });

      const data = await res.json();

      const transactions = [] as any;

      data.data.transactions?.map((transaction: any) => {
        const transactionData = {
          _id: transaction._id,

          //transactionType:
          //  transaction.from === address.toLowerCase() ? 'Send' : 'Receive',
          //transactionType: "Send",

          createdAt: transaction.block_signed_at,

          //address:
          //  transaction.from === address.toLowerCase()
          //    ? transaction.to
          //    : transaction.from,

          from: transaction.from,
          to: transaction.to,

          contract: transaction.contract,

          /*
          amount: {
            ///balance: transaction.value,
            //balance: Math.round(parseFloat(transaction.value) * (10 ** 18)),
            balance: ethers.utils.formatEther(transaction.value),

            usdBalance: '11,032.24',
          },
          */

          amount : ethers.utils.formatEther(transaction.value),

          status: 'Completed',

          tx_hash: transaction.tx_hash,
        };

        transactions.push(transactionData);
      });

      console.log('transactions: ', transactions);

      setTransactions(transactions);
    }

  };

  
  useEffect(() => {

    getTransactions();

    setTimeout(() => {
      getTransactions();
    }, 10000);

  }, [address]);
  





  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false);
  const [requests, setRequests] = useState<any>(withdrawRequests)

  /*
  const rows: GridRowsProp = requests.map((request: any, i: number) => {
      return {
          id: i + 1,
          _id: request._id,
          userId: request.userId,
          email: request.email,
          username: request.username,
          withdrawAmount: request.withdrawAmount,
          withdrawType: request.withdrawType,
          walletTo: request.walletTo,
          status: request.status,
          isPayed: request.isPayed,
          txHash: request.txHash,
          createdAt: new Date(request.createdAt).toLocaleDateString(),
      };
  })
  */

  const rows: GridRowsProp = transactions.map((transaction: any, i: number) => {


    console.log("transaction: ", transaction);


    return {
        id: i + 1,
        _id: transaction._id,
        userId: transaction.from,
        email: transaction.from,
        username: transaction.from,
        withdrawAmount: transaction.amount,
        withdrawType: "ROM",
        walletTo: transaction.to,
        status: transaction.status,
        isPayed: true,
        txHash: transaction.tx_hash,
        createdAt: new Date(transaction.createdAt).toLocaleString(),
    };
})




  const columns: GridColDef[] = [
      {
          field: "id",
          headerName: "ID",
          flex: 0.01,
          minWidth: 50,
          align: "center",
          headerAlign: "center",
      },
      {
          field: "username",
          headerName: "From",
          flex: 0.1,
          minWidth: 150,
          align: "center",
          headerAlign: "center",
      },
      {
        field: "walletTo",
        headerName: "To",
        flex: 0.1,
        minWidth: 150,
        align: "center",
        headerAlign: "center",
    },
      {
          field: "withdrawAmount",
          headerName: "Amount",
          flex: 0.1,
          minWidth: 60,
          align: "center",
          headerAlign: "center",
      },
      {
          field: "withdrawType",
          headerName: "Type",
          flex: 0.1,
          minWidth: 40,
          align: "center",
          headerAlign: "center",
      },
      {
          field: "createdAt",
          headerName: "Date",
          flex: 0.2,
          minWidth: 150,
          align: "center",
          headerAlign: "center",
      },
      {
          field: "status",
          headerName: "Status",
          align: "center",
          headerAlign: "center",
          type: "number",
          flex: 0.1,
          minWidth: 75,
          renderCell(params) {
              return <Chip label={`${params.value}`} color={`${params.value === 'Paid' ? "success" : params.value === "Rejected" ? "error" : "info"}`} />;
          },
      },
      
      {
          field: "action",
          headerName: "View",
          align: "center",
          headerAlign: "center",
          sortable: false,
          width: 125,
          renderCell: (params) => {
              return (
                  <div className="flex justify-center">
                      <IconButton
                          onClick={() => {
                              setSelectedRequest(params.row)
                              handleClickOpen();
                          }}
                      >
                         
                          <ViewIcon />
                      </IconButton>
                  </div>
              );
          },
      },
      
  ];


  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleAccept = async () => {
      const res = await fetch('/api/withdrawRequest?method=update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              userToken: getCookie('token'),
              id: selectedRequest._id,
              status: 'Paid',
              isPayed: selectedRequest.isPayed,
              txHash: selectedRequest.txHash
          })
      })
      const data = await res.json()
      if (data.status) {
          setRequests(requests.filter((request: any) => request._id === selectedRequest._id ? request.status = "Paid" : request))
          setRequests(requests.filter((request: any) => request._id === selectedRequest._id ? request.isPayed = true : request))
          setRequests(requests.filter((request: any) => request._id === selectedRequest._id ? request.txHash = selectedRequest.txHash : request))
          setSelectedRequest(null)
          handleClose()
          toast.success("Withdraw request accepted successfully")
      } else {
          toast.error("Something went wrong")
      }
  }


  const handleReject = async () => {
      const res = await fetch(`/api/withdrawRequest?method=reject&userToken=${getCookie('token')}&id=${selectedRequest._id}`)
      const data = await res.json()
      if (data.status) {
          setRequests(requests.filter((request: any) => request._id === selectedRequest._id ? request.status = "Rejected" : request))
          setSelectedRequest(null)
          handleClose()
          toast.success("Withdraw request rejected successfully")
      } else {
          toast.error("Something went wrong")
      }
  }

  const handleDelete = async () => {
      const res = await fetch(`/api/withdrawRequest?method=delete&userToken=${getCookie('token')}&id=${selectedRequest._id}`)
      const data = await res.json()
      if (data.status) {
          setRequests(requests.filter((request: any) => request._id !== selectedRequest._id))
          setSelectedRequest(null)
          handleClose()
          toast.success("Withdraw request deleted successfully")
      } else {
          toast.error("Something went wrong")
      }
  }






        // if not admin redirect to home page
      /*
        if (!user?.admin) {
          return { redirect: { destination: '/', permanent: false } }
        }
        */
      


  return (

    // if not admin redirect to home page
    //(!user?.admin ?
    (false ?
      <>
        <div>Not Authorized</div>
      </>
    :

    <>
    

    
  
    
    <div className="flex" >

      <div className="w-[80px] lg:w-[453px] p-2">

      </div>


      <Sidebar />

      
      <div className="w-full p-10 gap-2 flex flex-col">

        {/* Breadcrumb Start Here */}
        <div className="bg-gray-900 p-3 rounded-md">

          <Breadcrumbs aria-label="breadcrumb">

            <Link className="flex justify-center" underline="hover" color="inherit" href="/admin">
              <DashboardIcon className="mr-2" />
              Dashboard
            </Link>
            <Typography color="text.primary">Transactions</Typography>
          </Breadcrumbs>

        </div>
        {/* Breadcrumb End Here */}






        <div className="bg-gray-900 w-full h-full p-3 flex flex-row gap-2 relative">
                        <div style={{ width: "100%", height: 600, color: "white" }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                hideFooterSelectedRowCount
                                sx={{ color: "white" }}
                            />
                        </div>
                        {selectedRequest && (
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>
                                    {" "}
                                    From {selectedRequest.username}
                                </DialogTitle>
                                <DialogContent className="space-y-3">

                                    <DialogContentText>
                                        Amount:{" "}
                                        <span className="font-bold italic">
                                            {" "}
                                            {selectedRequest?.withdrawAmount}{" "}
                                        </span>
                                    </DialogContentText>
                                    <DialogContentText>
                                        Type:{" "}
                                        <span className="font-bold italic"> {selectedRequest?.withdrawType} </span>
                                    </DialogContentText>
                                    <DialogContentText>
                                        Status:{" "}
                                        <span className="font-bold italic">
                                            {" "}
                                            {selectedRequest?.status}{" "}
                                        </span>
                                    </DialogContentText>
                                    <DialogContentText>
                                        To:{" "}
                                        <span className="font-bold italic">
                                            {" "}
                                            {selectedRequest?.walletTo}{" "}
                                        </span>
                                    </DialogContentText>
                                    <DialogContentText>
                                        At:{" "}
                                        <span className="font-bold italic">
                                            {" "}
                                            {selectedRequest?.createdAt}{" "}
                                        </span>
                                    </DialogContentText>
                                    <TextField
                                        disabled
                                        autoFocus
                                        id="hash"
                                        label="Transaction Hash"
                                        type="hash"
                                        fullWidth
                                        value={selectedRequest?.txHash}
                                        onChange={(e) => { setSelectedRequest({ ...selectedRequest, txHash: e.target.value }) }}
                                        color="secondary"
                                        variant="standard"
                                        className='m-0 p-0'
                                    />
                                </DialogContent>
                                {/*
                                <DialogContentText className="text-center text-xs italic">
                                    If you reject the request than request amount will be refund to
                                    user!
                                </DialogContentText>
                                */}
                                <DialogActions>
                                  {/*
                                    <Button
                                        color="error"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={handleReject}
                                    >
                                        Reject
                                    </Button>
                                    */}
                                    <Button onClick={handleClose}>Close</Button>
                                    {/*
                                    <Button
                                        color="success"
                                        onClick={handleAccept}
                                    >
                                        Save
                                    </Button>
                                    */}
                                </DialogActions>
                            </Dialog>
                        )}
                    </div>




      </div>
    </div >

    </>
    )

  );


}





export async function getServerSideProps(context: GetServerSidePropsContext) {

  
  const { user, settings }: any = await myGetServerSideProps(context)

  /*
  if (!user.admin) {
    return { redirect: { destination: '/', permanent: false } }
  }
  */

  const usersResponse = await fetch(process.env.API_URL + '/api/user?method=getUserCount')
  const users = await usersResponse.json()

  console.log(users)

  const { req, res } = context;
  const { token } = req.cookies;

  const requestResponse = await fetch(`${process.env.API_URL}/api/withdrawRequest?method=all&userToken=${token}`)
  const requests = await requestResponse.json()




  return {
    props: {
      //user: user,
      settings: settings ?? null,
      usersCount: users.count,
      withdrawRequests: requests.requests ?? null

    }
  }
}