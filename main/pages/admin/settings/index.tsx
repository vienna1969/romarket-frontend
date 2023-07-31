import Sidebar from "@/components/layout/admin/Sidebar";
import { ISettings } from "@/utils/interfaces/settings-interface";
import { IUser } from "@/utils/interfaces/user-interface";
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
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { GetServerSidePropsContext } from "next/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { myGetServerSideProps } from "@/helpers";
import { ImSpinner9 } from "react-icons/im";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  
  const { user, settings }: any = await myGetServerSideProps(context);

  if (!user.admin) {
    return { redirect: { destination: '/', permanent: false } }
  }

  ////console.log("settings", settings);

  return {
    props: {
      user: user,
      settings: settings ?? null,
    }
  }
}

export default function Admin({
  user,
  settings,
  users,
}: {
  user: IUser;
  settings: ISettings | null;
  users: IUser[];
}) {


  console.log("Admin settings", settings);




  const [demo, setDemo] = useState(process.env.NEXT_PUBLIC_DEMO == "true" ? true : false);
  
  
  const [general, setGeneralSettings] = useState<any>(settings?.settings.general);

  const [mainSettings, setMainSettings] = useState<any>(settings?.main);

  const [tokenSettings, setTokenSettings] = useState<any>(settings?.token);

  const [welcomeBonus, setWelcomeBonus] = useState<any>(settings?.welcomeBonus);
  const [bannerUrl, setBannerUrl] = useState<any>(settings?.bannerUrl);

  const [isLoadingLogo, setIsLoadingLogo] = useState(false)
  const [isLoadingFavicon, setIsLoadingFavicon] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [isLoadingGeneral, setIsLoadingGeneral] = useState(false)
  const [isLoadingNetwork, setIsLoadingNetwork] = useState(false)


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log('here we go')
    // console.log(e.target)
    // const { siteName, siteDescription, scrollingText, logoText, copyRightText } = e.target;
    // const formData = {
    //   general: {
    //     siteName: siteName.value,
    //     siteDescription: siteDescription.value,
    //     scrollingText: scrollingText.value,
    //     logoText: logoText.value,
    //     copyRightText: copyRightText.value,
    //   },
    // };
    // console.log(formData)
    // fetch("/api/settings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     method: "updateSettings",
    //     API_KEY: "123456",
    //     _id: settings?._id,
    //     settings: formData,
    //   }),
    // }).then((res) => {
    //   console.log(res)
    //   if (res.status === 200) {
    //     toast.success("Settings Updated");
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 1000);
    //   }
    // });
    setIsLoadingGeneral(true)
    let formInputs = {
      general
    }
    const res = await fetch(`/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        method: "updateSettings",
        _id: settings?._id,
        settings: formInputs
      })
    })
    const data = await res.json()
    console.log(data)
    if (data.status) {
      toast.success("General settings updated successfully");
      setIsLoadingGeneral(false)
    } else {
      toast.error("An error occurred while updating the general settings");
      setIsLoadingGeneral(false)
    }

  };


  const handleUploadLogo = async (e: any) => {
    setIsLoadingLogo(true)
    const input = (document.getElementById("logo") as HTMLInputElement);
    //@ts-ignore
    const file = input.files[0]
    if (!file) {
      toast.error("Please select a file");
      setIsLoadingLogo(false)
      return;
    }
    if (file.size > 1024 * 1024) {
      toast.error("File size is too big");
      setIsLoadingLogo(false)
      return;
    }
    if (
      file.type !== "image/png"
    ) {
      toast.error("File format is must be png");
      return;
    }
    const formData = new FormData();
    formData.append("myLogo", file);
    fetch("/api/admin/changeLogo", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status == 200) {
        toast.success("Logo uploaded successfully");
        setIsLoadingLogo(false)
      } else {
        toast.error("An error occurred while uploading the image");
        setIsLoadingLogo(false)
      }
    });
  }

  const handleUploadFavicon = async (e: any) => {
    setIsLoadingFavicon(true)
    const input = (document.getElementById("favicon") as HTMLInputElement);
    //@ts-ignore
    const file = input.files[0]
    if (!file) {
      toast.error("Please select a file");
      setIsLoadingFavicon(false)
      return;
    }
    if (file.size > 1024 * 1024) {
      toast.error("File size is too big");
      setIsLoadingFavicon(false)
      return;
    }
    const fileExtension = file.name.split(".").pop();

    if (fileExtension !== "ico") {
      toast.error("File format must be .ico");
      setIsLoadingFavicon(false);
      return;
    }

    const formData = new FormData();
    formData.append("myFavicon", file);
    fetch("/api/admin/changeFavicon", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status == 200) {
        toast.success("Favicon uploaded successfully");
        setIsLoadingFavicon(false)
      } else {
        toast.error("An error occurred while uploading the image");
        setIsLoadingFavicon(false)
      }
    });
  }

  const handleUploadUserPhoto = async (e: any) => {
    setIsLoadingUser(true)
    const input = (document.getElementById("user") as HTMLInputElement);
    //@ts-ignore
    const file = input.files[0]
    if (!file) {
      toast.error("Please select a file");
      setIsLoadingUser(false)
      return;
    }
    if (file.size > 1024 * 1024) {
      toast.error("File size is too big");
      setIsLoadingUser(false)
      return;
    }
    const fileExtension = file.name.split(".").pop();
    if (
      fileExtension !== "jpg"
    ) {
      toast.error("File format is must be jpg");
      setIsLoadingUser(false)

      return;
    }
    const formData = new FormData();
    formData.append("myUser", file);
    fetch("/api/admin/defaultUser", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.status == 200) {
        toast.success("User default photo changed successfully");
        setIsLoadingUser(false)
      } else {
        toast.error("An error occurred while uploading the image");
        setIsLoadingUser(false)
      }
    });
  }

  const handleUpdateNetworkSettings = async (e: any) => {
    e.preventDefault()
    setIsLoadingNetwork(true)



    const formInputs = {
      method: "createTokenSettings",
      tokenSettings: tokenSettings,
      mainSettings: mainSettings,
    }
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formInputs),
    })
    
    const data = await res.json()

    console.log("handleUpdateNetworkSettings", data);


    if (data.status == true) {
      toast.success("Network settings updated successfully");
      setIsLoadingNetwork(false)
    } else {
      toast.error("An error occurred while updating the network settings");
      setIsLoadingNetwork(false)
    }
  }

  const handleBonus = async () => {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "welcomeBonusAmount",
        amount: welcomeBonus,
      }),
    })
    const data = await res.json()
    console.log(data)
    if (data.status) {
      toast.success("Welcome Bonus updated successfully");
    } else {
      toast.error("An error occurred while updating the welcome bonus");
    }
  }

  const handleBanner = async () => {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "banner",
        url: bannerUrl
      }),
    })
    const data = await res.json()
    console.log(data)
    if (data.status) {
      toast.success("Banner URL updated successfully");
    } else {
      toast.error("An error occurred while updating the banner URL");
    }
  }

  return (
    <div className="flex">
      <div className="w-[80px] lg:w-[453px] p-2"></div>
      <Sidebar />
      <div className="w-full p-10 gap-2 ml-10 md:ml-0 flex flex-col">

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
            <Typography color="text.primary">Settings</Typography>
          </Breadcrumbs>
        </div>
        {/* Breadcrumb End Here */}

        <div className="w-full p-4 flex flex-col lg:flex-row justify-between gap-2">
          <div className="w-full p-2 items-center justify-center gap-1 bg-gray-900 shadow rounded-md flex flex-col">
            <h6>Logo</h6>
            <input
              className="appearance-none rounded w-[220px] py-2 flex items-center justify-center text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
              id="logo"
              type="file"
            />
            <Button
              variant="contained"
              className="bg-blue-800 text-white"
              onClick={handleUploadLogo}
              disabled={demo == true ? true : isLoadingLogo}
            >
              {isLoadingLogo ? <ImSpinner9 className='animate-spin' /> : 'Change'}
            </Button>
          </div>
          <div className="w-full p-2 items-center justify-center gap-1 bg-gray-900 shadow rounded-md flex flex-col">
            <h6>Favicon</h6>
            <input
              className="appearance-none rounded w-[220px] py-2 flex items-center justify-center text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
              id="favicon"
              type="file"
            />
            <Button
              variant="contained"
              className="bg-blue-800 text-white"
              onClick={handleUploadFavicon}
              disabled={demo == true ? true : isLoadingLogo}
            >
              {isLoadingFavicon ? <ImSpinner9 className='animate-spin' /> : 'Change'}
            </Button>
          </div>
          <div className="w-full p-2 items-center justify-center gap-1 bg-gray-900 shadow rounded-md flex flex-col">
            <h6>User</h6>
            <p className="text-xs text-gray-400">
              Default user profile image.
            </p>
            <input
              className="appearance-none rounded w-[220px] py-2 flex items-center justify-center text-gray-200 leading-tight focus:outline-none focus:shadow-outline "
              id="user"
              type="file"
            />
            <Button
              variant="contained"
              className="bg-blue-800 text-white"
              onClick={handleUploadUserPhoto}
              disabled={demo == true ? true : isLoadingLogo}
            >
              {isLoadingUser ? <ImSpinner9 className='animate-spin' /> : 'Change'}
            </Button>
          </div>
        </div>

        <div className="bg-gray-900 p-3 flex flex-col lg:flex-row gap-2">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex-col flex gap-3">
                <Typography variant="h6" color="text.primary">
                  General Settings
                </Typography>
                <TextField
                  required
                  name="siteName"
                  label="Site Name"
                  className="w-full"
                  variant="outlined"
                  
                  value={general.siteName}

                  ////value={"Crypto Game Place"}


                  onChange={(e) => {
                    setGeneralSettings({ ...general, siteName: e.target.value })
                  }}
                />
                <TextField
                  required
                  name="siteDescription"
                  label="Site Description"
                  className="w-full"
                  variant="outlined"
                  
                  value={general.siteDescription}
                  /////value={"Crypto Game Place"}

                  onChange={(e) => {
                    setGeneralSettings({ ...general, siteDescription: e.target.value })
                  }}
                />
                <TextField
                  required
                  name="scrollingText"
                  label="Scrolling Text"
                  multiline
                  className="w-full"
                  variant="outlined"
                  
                  
                  value={general.scrollingText}
                  ////value={"Crypto Game Place"}


                  onChange={(e) => {
                    setGeneralSettings({ ...general, scrollingText: e.target.value })
                  }}
                />
                <TextField
                  required
                  name="logoText"
                  label="Logo Text"
                  className="w-full"
                  variant="outlined"
                  
                  value={general.logoText}
                  //value={"Crypto Game Place"}


                  onChange={(e) => {
                    setGeneralSettings({ ...general, logoText: e.target.value })
                  }}
                />
                <TextField
                  required
                  name="copyRightText"
                  label="Copy Right Text"
                  className="w-full"
                  variant="outlined"
                  
                  
                  value={general.copyRightText}

                  ////value={"Crypto Game Place"}

                  onChange={(e) => {
                    setGeneralSettings({ ...general, copyRightText: e.target.value })
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-blue-800 text-white"
                  disabled={isLoadingGeneral}
                >
                  Save
                </Button>
              </div>
            </form>
            <div className="flex gap-1 mt-5">
              <TextField
                required
                name="welcome"
                
                //label={`New User Welcome Bonus (${tokenSettings.symbol})`}
                label={`New User Welcome Bonus (GCOW)`}

                className="w-full"
                variant="outlined"
                value={welcomeBonus}
                onChange={(e) => {
                  setWelcomeBonus(e.target.value)
                }}
              />
              <Button
                variant="contained"
                className="bg-blue-800 text-white"
                onClick={handleBonus}
              >
                Save
              </Button>
            </div>
            <div className="flex gap-1 mt-5">
              <TextField
                required
                name="welcome"
                label={`Main Page Banner (URL)`}
                className="w-full"
                variant="outlined"
                value={bannerUrl}
                onChange={(e) => {
                  setBannerUrl(e.target.value)
                }}
              />
              <Button
                variant="contained"
                className="bg-blue-800 text-white"
                onClick={handleBanner}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="w-full">
            <form onSubmit={handleUpdateNetworkSettings}>
              <div className="w-full flex-col flex gap-5">
                <Typography variant="h6" color="text.primary">
                  Network Settings
                </Typography>
                <div className="flex gap-1 flex-col md:flex-row items-center">
                  <FormControlLabel

                    control={
                      <Checkbox
                        
                      
                        //checked={mainSettings.status}

                        checked={true}


                        onChange={(e) => { setMainSettings({ ...mainSettings, status: e.target.checked }) }}
                      />
                    }
                    label="Main Status" />
                  <FormControlLabel
                    control={
                      <Checkbox
                        
                        //checked={mainSettings.swapStatus}

                        checked={true}

                        onChange={(e) => { setMainSettings({ ...mainSettings, swapStatus: e.target.checked }) }}
                      />
                    }
                    label="Main Swap Status" />
                  <FormControlLabel
                    control={
                      <Checkbox
                        
                      
                        //checked={tokenSettings.status}
                        checked={true}

                        onChange={(e) => { setTokenSettings({ ...tokenSettings, status: e.target.checked }) }}
                      />
                    }
                    label="Token Setting Status" />
                </div>
                <TextField
                  required
                  name="address"
                  label="Address"
                  className="w-full"
                  variant="outlined"
                  
                  
                  //value={tokenSettings.address}
                  value={"0x000000"}

                  onChange={(e) => {
                    setTokenSettings({ ...tokenSettings, address: e.target.value });
                  }}
                />
                <TextField
                  required
                  name="addressTo"
                  label="Address To"
                  className="w-full"
                  variant="outlined"
                  
                  
                  value={mainSettings.toAddress}
                  //value={"0x000000"}


                  onChange={(e) => {
                    setMainSettings({ ...mainSettings, toAddress: e.target.value });
                  }}
                />
                <TextField
                  required
                  name="coinSort"
                  label="Coin (Short) Main"
                  className="w-full"
                  variant="outlined"
                  
                  
                  value={mainSettings.symbol}
                  //value={"CGP"}

                  onChange={(e) => {
                    setMainSettings({ ...mainSettings, symbol: e.target.value });
                  }}
                />
                <TextField
                  required
                  name="gasLimit"
                  label="Gas Limit Main"
                  className="w-full"
                  variant="outlined"
                  type="number"
                  
                  
                  value={mainSettings.gasLimit}

                  //value={1000000}

                  onChange={(e) => {
                    setMainSettings({ ...mainSettings, gasLimit: e.target.value });
                  }}
                />
                <TextField
                  required
                  name="multiplier"
                  label="Multiplier"
                  className="w-full"
                  variant="outlined"
                  type="number"
                  
                  
                  value={tokenSettings.multiplier}

                  //value={1000000000000000000}

                  onChange={(e) => {
                    setTokenSettings({ ...tokenSettings, multiplier: e.target.value });
                  }}
                />

                <TextField
                  required
                  name="gasLimit"
                  label="Gas Limit Token"
                  className="w-full"
                  variant="outlined"
                  type="number"
                  
                  
                  value={tokenSettings.gasLimit}
                  //value={1000000}

                  onChange={(e) => {
                    setTokenSettings({ ...tokenSettings, gasLimit: e.target.value });
                  }}
                />
                <TextField
                  required
                  name="coinSort"
                  label="Coin (Short) Token"
                  className="w-full"
                  variant="outlined"
                  
                  value={tokenSettings.symbol}

                  ///value={"CGP"}

                  onChange={(e) => {
                    setTokenSettings({ ...tokenSettings, symbol: e.target.value });
                  }}
                />
                <TextField
                  required
                  name="tokenDecimal"
                  label="Token Decimal"
                  className="w-full"
                  variant="outlined"
                  
                  //value={tokenSettings.decimals}
                  value={18}

                  onChange={(e) => {
                    setTokenSettings({ ...tokenSettings, decimals: e.target.value });
                  }}
                />
                <TextField
                  required
                  name="tokenImg"
                  label="Token Image"
                  className="w-full"
                  variant="outlined"
                  
                  //value={tokenSettings.img}
                  value={"https://cryptogameplace.org/logo/logo.png"}

                  onChange={(e) => {
                    setTokenSettings({ ...tokenSettings, img: e.target.value });
                  }}
                />


                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  You should deploy and enter the contract that we provided in the Contract Address section. Otherwise, <strong>CryptoGamePlace is not responsible for this.</strong>
                </Alert>
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-blue-800 text-white"
                  disabled={isLoadingNetwork}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
}
