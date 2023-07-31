import {
  createSettings,
  getSettings,
  updateSettings,
  deleteSettings,
  updateSettingsSettings,
  createGameSettings,
  updateGameStatus,
  createTokenSettings,
  changeWelcomeBonus,
  setBannerUrl,
} from "@/utils/models/settings-model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;


  console.log("api settings method", method);



  if (!method) {
    res.status(400).json({ status: false, message: "Bad Request" });
    return;
  }

  if (method === "create") {
    const { requestType, chat } = req.body;
    if (!requestType || !chat) {
      res.status(400).json({ status: false, message: "Bad Request" });
      return;
    }
    const settings = createSettings(requestType, chat, []);
    if (!settings) {
      res.status(500).json({ status: true, message: "Internal Server Error" });
      return;
    }
    return res.status(200).json({ message: "Settings created", settings });
  }

  if (method === "get") {
    const settings: any = await getSettings();
    if (!settings) {

      console.log("settings not found");


      res.status(500).json({ status: false, message: "Internal Server Error" });
      return;
    }

    //////console.log("settings found", settings);


    return res
      .status(200)
      .json({ status: true, message: "Settings fetched", settings });
  }


  if (method === "update") {
    const { _id, requestType, chat, networks } = req.body;
    if (!_id || !requestType || chat === undefined || !networks) {
      res.status(400).json({ status: false, message: "Bad Request" });
      return;
    }
    const settings = await updateSettings(_id, requestType, chat, networks);
    if (!settings) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return;
    }
    return res.status(200).json({ status: true, message: "Settings updated" });
  }

  if (method === "updateSettings") {

    const { _id, settings } = req.body;
    if (!_id || !settings) {
      res.status(400).json({ status: false, message: "Bad Request" });
      return;
    }


    console.log("updateSettings", _id, settings);


    const updatedSettings = await updateSettingsSettings(_id, settings);
    if (!updatedSettings) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return;
    }
    return res.status(200).json({ status: true, message: "Settings updated" });
  }

  if (method === "delete") {
    const { _id } = req.body;
    if (!_id) {
      res.status(400).json({ status: false, message: "Bad Request" });
      return;
    }
    const deleted = await deleteSettings(_id);
    if (!deleted) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return;
    }
    return res.status(200).json({ status: true, message: "Settings deleted" });
  }

  if (method === "createGameSettings") {
    const { gameSettings } = req.body;
    if (!gameSettings) {
      res.status(400).json({ status: false, message: "Bad Request" });
      return;
    }
    const settings = await createGameSettings(gameSettings);
    if (!settings) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return;
    }
    return res.status(200).json({ status: true, message: "Settings updated" });
  }

  if (method === "changeGameStatus") {
    const { gameId, status } = req.body;
    const update = await updateGameStatus(gameId, status);
    if (!update) {
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
    return res.status(200).json({ status: true, message: "Settings updated" });
  }


  if (method === "createTokenSettings") {

    const { tokenSettings, mainSettings } = req.body;

    console.log("createTokenSettings", tokenSettings, mainSettings);


    if (!tokenSettings) {
      return res.status(400).json({ status: false, message: "Bad Request" });
    }
    const settings = await createTokenSettings(tokenSettings, mainSettings);
    if (settings == null || settings == undefined) {
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
    return res.status(200).json({ status: true, message: "Settings updated" });
  }


  if (method === "welcomeBonusAmount") {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ status: false, message: "Bad Request" });
    }
    const bonus = await changeWelcomeBonus(amount);
    if (bonus == null || bonus == undefined) {
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
    return res.status(200).json({ status: true, message: "Settings updated" });
  }

  if (method === "banner") {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ status: false, message: "Bad Request" });
    }
    const settings = await setBannerUrl(url);
    if (settings == null || settings == undefined) {
      return res
        .status(500)
        .json({ status: false, message: "Internal Server Error" });
    }
    return res.status(200).json({ status: true, message: "Settings updated" });
  }
}
