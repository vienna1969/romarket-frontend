import Image from "next/image";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LanguageIcon from "@mui/icons-material/Language";
import CloudIcon from "@mui/icons-material/Cloud";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import Link from "next/link";
import { BsBodyText } from "react-icons/bs";

export default function AdminSidebar() {

  return (
    <div className="sidebar fixed top-0 bottom-0  p-2 w-[80px] lg:w-[350px]  overflow-y-auto text-center bg-gray-900">
      
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1  items-center justify-center lg:flex hidden">
          <Image src="/logo/logo.png" width="35" height="35" alt="logo" />
          <i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>

      <Link
        href={"/admin"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <DashboardIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Dashboard
        </span>
      </Link>

      <Link
        href={"/admin/users"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <GroupIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Users
        </span>
      </Link>

      <Link
        href={"/admin/withdraw-requests"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <RequestPageIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Withdraw Requests
        </span>
      </Link>

      <div className="my-4 bg-gray-600 h-[1px]"></div>

      <Link
        href={"/admin/settings"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <SettingsApplicationsIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Settings
        </span>
      </Link>



      {/*
      <Link
        href={"/admin/gameSettings"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <VideogameAssetIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Game Settings
        </span>
      </Link>
      */}

      <Link
        href={"/admin/network"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <CloudIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Network Settings
        </span>
      </Link>


      {/*

      <Link
        href={"/admin/settings/texts"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <BsBodyText />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Page Texts
        </span>
      </Link>
            */}

      <div className="my-4 bg-gray-600 h-[1px]"></div>

      <Link
        href={"/admin/administrators"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <GroupIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Administrators
        </span>
      </Link>

      <Link
        href={"/"}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <LanguageIcon />
        <span className="text-[15px] ml-4 text-gray-200 font-bold lg:block hidden">
          Go Home
        </span>
      </Link>

    </div>
  );
}
