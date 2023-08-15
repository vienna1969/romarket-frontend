import Sidebar from "@/components/layout/admin/Sidebar";
import { ISettings } from "@/utils/interfaces/settings-interface";
import { IUser } from "@/utils/interfaces/user-interface";
import { authFromServer } from "@/utils/services/useAuth";
import { Breadcrumbs, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Slide, TextField, Typography } from "@mui/material";
import { GridColDef, GridApi, DataGrid, GridRowsProp } from '@mui/x-data-grid';
import DashboardIcon from "@mui/icons-material/Dashboard";
import { GetServerSidePropsContext } from "next/types";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { toast } from "react-toastify";
import { myGetServerSideProps } from "@/helpers";



export async function getServerSideProps(context: GetServerSidePropsContext) {
  
  const { user, settings }: any = await myGetServerSideProps(context);

  /*
  if (!user.admin) {
    return { redirect: { destination: '/', permanent: false } }
  }
  */

  const usersResponse = await fetch(process.env.API_URL + '/api/user?method=getAll');
  const users = await usersResponse.json();

  return {
    props: {
      user: user,
      settings: settings ?? null,
      users: users.users
    }
  }
}


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Users({
  user,
  settings,
  users
}: {
  user: IUser;
  settings: ISettings | null;
  users: IUser[];
}) {



  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();
  const [demo, setDemo] = useState(process.env.NEXT_PUBLIC_DEMO == "true" ? true : false);


  function duzenle(e: any) {
    setSelectedUser(e)
    handleClickOpen()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null)
  };

  const updateUser = async () => {
    let username = (document.getElementById("username") as HTMLInputElement).value
    let email = (document.getElementById("email") as HTMLInputElement).value
    let walletAddress = (document.getElementById("walletAddress") as HTMLInputElement).value
    let coinBalance = (document.getElementById("coinBalance") as HTMLInputElement).value
    let coinBalance2 = (document.getElementById("coinBalance2") as HTMLInputElement).value
    let coinBalance3 = (document.getElementById("coinBalance3") as HTMLInputElement).value
    //let maticBalance = (document.getElementById("maticBalance") as HTMLInputElement).value
    //let admin = (document.getElementById("admin") as HTMLInputElement).checked

    let status = (document.getElementById("status") as HTMLInputElement).checked
    

    const formInputs = {
      _id: selectedUser.kayitId,
      username: username,
      email: email,
      walletAddress: walletAddress,
      deposit: coinBalance,
      deposit2: coinBalance2,
      deposit3: coinBalance3,
      //maticBalance: maticBalance,
      //admin: admin,
      status: status,
      pass1: selectedUser.pass1,
      pass2: selectedUser.pass2,
      img: selectedUser.img,
    }
    fetch('/api/user?method=update', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formInputs),
    })
      .then(res => res.json())
      .then(data => {
        if (data.user.success) {
          toast.success("User updated successfully")
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } else {
        }
      })
  }

  const deleteUser = async () => {

    const formInputs = {
      userToken: selectedUser.userToken,
    }
    fetch('/api/user?method=delete', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formInputs),
    }).then(res => res.json()).then(data => {
      if (data.status) {

      } else {

      }
    })
  }


  const rows: GridRowsProp = users.map((item: any, i: number) => {
    return {
      kayitId: item._id,
      id: i + 1,
      email1: item.email,
      img: item.img,
      admin: item.admin,
      status: item.status,
      wallet: item.walletAddress,
      username: item.username,
      pass1: item.pass1,
      pass2: item.pass2,
      userToken: item.userToken,
      coin: item.deposit,
      coin2: item.deposit2,
      coin3: item.deposit3,
      matic: item.maticBalance,
    }
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
    /*
    {
      field: "username",
      headerName: "Username",
      flex: 0.2,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    */
    {
      field: "email1",
      headerName: "email",
      flex: 0.2,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "wallet",
      headerName: "wallet",
      flex: 0.2,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "coin",
      headerName: "ROM",
      flex: 0.1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "coin2",
      headerName: "USDC",
      flex: 0.1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "coin3",
      headerName: "USDT",
      flex: 0.1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    /*
    {
      field: "matic",
      headerName: "Matic Balance",
      flex: 0.1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },


    {
      field: "admin",
      headerName: "Admin",
      align: "center",
      headerAlign: "center",
      type: "number",
      flex: 0.1,
      minWidth: 75,
      renderCell(params) {
        return <Chip label={`${params.value ? "Admin" : "User"}`} color={`${params.value ? "success" : "info"}`} />;
      },
    },
    */

    {
      field: "status",
      headerName: "Blocked",
      align: "center",
      headerAlign: "center",
      //type: "number",
      flex: 0.1,
      minWidth: 75,
      
      renderCell(params) {
        return <Chip label={`${params.value ? true : false}`} color={`${params.value ? "info" : "success"}`} />;
      },
    
    },



    {
      field: "action",
      headerName: "Edit",
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 125,
      renderCell: (params) => {
        return (
          <div className="flex justify-center">
            <IconButton
              onClick={() => {
                setSelectedUser(params.row)
                handleClickOpen();
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },

  ];

  const [airdropAmount, setAirdropAmount] = useState(0)
  const airdrop = async () => {
    const formInputs = {
      amount: airdropAmount,
    }

    fetch('/api/user?method=airdrop', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formInputs),
    }).then(res => res.json()).then(data => {
      if (data.status) {
        toast.success("Airdrop successfull")
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast.error("Airdrop failed")
      }
    })

  }

  return (
    <>
      <div className="flex">
        
        <div className="w-[80px] lg:w-[453px] p-2"></div>
        <Sidebar />
        <div className="w-full h-full ml-16 md:ml-0 p-2 md:p-10 gap-2 flex flex-col">

          {/* Breadcrumb Start Here */}
          <div className="bg-gray-900 p-3 rounded-md">
            <Breadcrumbs aria-label="breadcrumb">

              <Link className="flex justify-center" underline="hover" color="inherit" href="/admin">
                <DashboardIcon className="mr-2" />
                Dashboard
              </Link>
              <Typography color="text.primary">Users</Typography>
            </Breadcrumbs>
          </div>
          {/* Breadcrumb End Here */}

          <div className="bg-gray-900 w-full h-full p-3 flex flex-row gap-2 relative">
            <div style={{ width: "100%", height: 600, color: "white" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                hideFooterSelectedRowCount
                sx={{
                  color: "white",
                }}
              />
            </div>
          </div>
          <div className="bg-gray-900 w-full h-full p-3 flex flex-col gap-2 relative">
            <Typography variant="h6" className="text-white">
              Make Airdrop to all users
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="airdrop"
              label="Airdrop Amount"
              type="text"
              fullWidth
              color='primary'
              variant="standard"
              typeof="number"
              value={airdropAmount}
              onChange={(e) => setAirdropAmount(parseInt(e.target.value))}
            />
            <Button disabled={demo} className="bg-blue-500" variant="contained" color="primary" onClick={airdrop}> Airdrop </Button>
          </div>
        </div>
      </div>
      {selectedUser && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle> User Edit Form</DialogTitle>
          <DialogContent className='space-y-3'>
            
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              defaultValue={selectedUser?.username}
              color='secondary'
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="E-Mail"
              type="text"
              fullWidth
              defaultValue={selectedUser?.email1}
              color='secondary'
              variant="standard"
              //cannot change email
              disabled

            />
            <TextField
              autoFocus
              margin="dense"
              id="walletAddress"
              label="Wallet Address"
              type="text"
              fullWidth
              defaultValue={selectedUser?.wallet}
              color='secondary'
              variant="standard"
              disabled
            />
            <TextField
              autoFocus
              margin="dense"
              id="coinBalance"
              label="Balance(ROM)"
              type="number"
              fullWidth
              defaultValue={selectedUser?.coin}
              color='secondary'
              variant="standard"
              disabled
            />
            <TextField
              autoFocus
              margin="dense"
              id="coinBalance2"
              label="Balance(USDC)"
              type="number"
              fullWidth
              defaultValue={selectedUser?.coin}
              color='secondary'
              variant="standard"
              disabled
            />
            <TextField
              autoFocus
              margin="dense"
              id="coinBalance3"
              label="Balance(USDT)"
              type="number"
              fullWidth
              defaultValue={selectedUser?.coin}
              color='secondary'
              variant="standard"
              disabled
            />
            {/*
            <TextField
              autoFocus
              margin="dense"
              id="maticBalance"
              label="Matic Balance"
              type="number"
              fullWidth
              defaultValue={selectedUser?.matic}
              color='secondary'
              variant="standard"
            />
            

            <div className='flex gap-1 items-center'>
              <input type="checkbox" defaultChecked={selectedUser?.admin} id='admin' className="checkbox checkbox-primary" />
              <p>Admin?</p>
            </div>

            */}

            <div className='flex gap-1 items-center'>
              <input type="checkbox" defaultChecked={selectedUser?.status} id='status' className="checkbox checkbox-primary" />
              <p>Blocked</p>
            </div>


          </DialogContent>


          <DialogActions>
            {/*
            <Button color='error' onClick={deleteUser} disabled={demo} >Delete</Button>
            */}
            <Button onClick={handleClose} disabled={demo}>Close</Button>
            
            <Button color='success' onClick={updateUser} disabled={demo}>Save</Button>
            
          </DialogActions>

        </Dialog>
      )}
    </>
  );
}
