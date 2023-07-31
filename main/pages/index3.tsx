import MyLottiePlayer from "@/components/MyLottie";
import Layout from "@/components/layout/Layout";
import { myGetServerSideProps } from "../helpers";
import { IUser } from "@/utils/interfaces/user-interface";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ISettings } from "@/utils/interfaces/settings-interface";

export default function Home({
  user,
  settings,
}: {
  user: IUser | null;
  settings: ISettings | any;
}) {
  return (
    <>
      <Layout user={user} settings={settings}>
        <div className="flex flex-col lg:flex-row w-full  justify-between px-12 pt-20 gap-10">


    
          <div className="w-full flex-col lg:w-[35%]">
            <Image
              src="/logo/logo.png"
              width={350}
              height={350}
              alt="crypto game place"
            />
            <p className="mt-5">
              {settings?.texts?.index.text ??
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque excepturi recusandae doloribus ratione vero molestias non fugit nisi enim! Ducimus aliquam, consectetur itaque reprehenderit laudantium distinctio minus ipsa sed molestiae!"}
            </p>
          </div>
          <div className="w-full lg:w-[65%] flex-col flex items-end gap-5">
            {settings?.bannerUrl?.length > 1 && (
              <div className="w-full  items-center justify-center hidden lg:flex">
                <Image
                  src={settings?.bannerUrl}
                  width={728}
                  height={90}
                  alt="crypto game place"
                  className="w-[728px] h-[90x]"
                />
              </div>
            )}

            {settings.games[1].active && (
              <div className="flex w-full gap-5 items-center bg-black/30 shadow-md px-5 h-auto rounded-lg backdrop-blur-md border-emerald-400 border-2 emerald-div duration-300 transition-all">
                <MyLottiePlayer
                  src={"/horseRace/at.json"}
                  width={150}
                  height={150}
                />
                <div className="my-5">
                  <h2 className="font-bold">
                    {settings?.texts?.index.game1Title ?? "Horse Race"}
                  </h2>
                  <p className="text-sm italic my-2 lg:my-5">
                    {settings?.texts?.index.game1Description ??
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque."}
                  </p>
                  <Link
                    href={"/games/horseRace"}
                    className="emerald-btn p-2 px-4  duration-300 transition-all"
                  >
                    Play
                  </Link>
                </div>
              </div>
            )}
            {settings.games[0].active && (
              <div className="flex w-full gap-5 items-center bg-black/30 shadow-md px-5 min-auto rounded-lg backdrop-blur-md text-end border-emerald-400 border-2 emerald-div duration-300 transition-all">
                <div className="w-[90%] my-5">
                  <h2 className="font-bold">
                    {settings?.texts?.index.game2Title ?? "Coin Flip"}
                  </h2>
                  <p className="text-sm italic my-2 lg:my-5">
                    {settings?.texts?.index.game2Description ??
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque."}
                  </p>
                  <Link
                    href={"/games/coinFlip"}
                    className="emerald-btn p-2 px-4 duration-300 transition-all"
                  >
                    Play
                  </Link>
                </div>
                <MyLottiePlayer
                  src={"/coinFlip/coinFlip.json"}
                  width={150}
                  height={150}
                />
              </div>
            )}

            {settings.games[2].active && (
              <div className="flex w-full gap-5 items-center bg-black/30 shadow-md px-5  rounded-lg backdrop-blur-md border-emerald-400 border-2 emerald-div duration-300 transition-all">
                <MyLottiePlayer
                  src={"/roulette/roulette.json"}
                  width={150}
                  height={150}
                />
                <div className="my-5">
                  <h2 className="font-bold">
                    {settings?.texts?.index.game3Title ?? "Roulette"}
                  </h2>
                  <p className="text-sm italic my-2 lg:my-5">
                    {settings?.texts?.index.game3Description ??
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, itaque."}
                  </p>
                  <Link
                    href={"/games/roulette"}
                    className="emerald-btn p-2 px-4 duration-300 transition-all"
                  >
                    Play
                  </Link>
                </div>
              </div>
            )}
          </div>

    


        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const { user, settings }: any = await myGetServerSideProps(context);
  
  return {
    props: {
      user: user ?? null,
      settings: settings ?? null,
    },
  };
}
