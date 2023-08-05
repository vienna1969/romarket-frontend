import Sidebar from "@/components/layout/admin/Sidebar";
import { ISettings } from "@/utils/interfaces/settings-interface";
import { IUser } from "@/utils/interfaces/user-interface";
import { authFromServer } from "@/utils/services/useAuth";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";
import { myGetServerSideProps } from "@/helpers";



export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { user, settings }: any = await myGetServerSideProps(context);

  /*
  if (!user.admin) {
    return { redirect: { destination: "/", permanent: false } };
  }
  */
 
  const usersResponse = await fetch(
    process.env.API_URL + "/api/user?method=getUserCount"
  );
  const users = await usersResponse.json();

  return {
    props: {
      user: user,
      settings: settings ?? null,
      usersCount: users.count,
    },
  };
}

import versionJson from "../../../utils/version.json";

export default function Update({
  user,
  settings,
  usersCount,
}: {
  user: IUser;
  settings: ISettings | null;
  usersCount: number;
}) {
  const [withdrawType, setWithdrawType] = useState(settings?.requestType);
  const [chat, setChat] = useState(settings?.chat);
  const [demo, setDemo] = useState(
    process.env.NEXT_PUBLIC_DEMO == "true" ? true : false
  );
  const [games, setGames] = useState<any>(settings?.games);
  const [blog, setBlog] = useState<any>([]);

  useEffect(() => {
    fetch("https://update.cryptogameplace.com/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        console.log(data);
      });
  }, []);

  const updateCheck = () => {
    fetch("https://update.cryptogameplace.com/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        releaseNumber: versionJson?.releaseNumber,
        domain: process.env.NEXT_PUBLIC_API_URL,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.check) {
          runScript(data.updateUrl);
        } else {
          alert("You are using the latest version of the website.");
        }
      });
  };

  const runScript = async (url:any) => {
    try {
      console.log(url);
      const res = await fetch('/api/settings/update',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
        }),
      });
      
      const data = await res.json();
      
    } catch (error) {
      console.error(`Hata: ${error}`);
    }
  };


  return (
    <div className="flex">
      <div className="w-[80px] lg:w-[453px] p-2"></div>
      <Sidebar />
      <div className="w-full p-10 gap-2 flex flex-col">
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
            <Typography color="text.primary">Update</Typography>
          </Breadcrumbs>
        </div>
        {/* Breadcrumb End Here */}

        <div className="p-4 bg-gray-900 rounded-sm flex flex-col w-full gap-3">
          <Typography className="text-white" variant="h6">
            Update
          </Typography>
          <Typography className="text-white" variant="body1">
            You can update your website from here.
          </Typography>
        </div>
        <div className="p-4 bg-gray-900 rounded-sm flex flex-col w-full gap-3">
          <div className="flex-row flex justify-between items-center">
            <div className="flex flex-col">
              <Typography className="text-white" variant="h6">
                Web Site Version : {versionJson?.version}
              </Typography>
              <Typography className="text-gray-300" variant="body1">
                Release Number : {versionJson?.releaseNumber}
              </Typography>
              <Typography className="text-gray-300" variant="body1">
                Updated Date: {versionJson?.releaseDate}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-500"
              onClick={updateCheck}
            >
              Update
            </Button>
          </div>
        </div>
        <div className="p-4 bg-gray-900 rounded-sm flex flex-col w-full gap-3">
          <Typography className="text-white" variant="h6">
            Update Blog
          </Typography>
          {blog?.map((item: any) => (
            <Card
              sx={{ flex: "1 0 auto" }}
              className="flex-row flex"
              key={item.id}
            >
              <CardContent className="w-[70%]">
                <Typography gutterBottom variant="h5" component="div">
                  {item.blogTitle}
                </Typography>
                <div>{item.blogContent}</div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="mt-3 italic"
                >
                  By {item.author}
                </Typography>
              </CardContent>
              <CardMedia
                className="w-[30%]"
                component="img"
                height="10px"
                image={item.blogImg}
                alt="green iguana"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
