import { makeDepositCoin, makeDepositMatic, makeDepositToken, makeWinDepositCoin, swapToMatic } from './../../../utils/models/user-model';

  import { NextApiRequest, NextApiResponse } from "next";
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { method } = req.body;

  
    if (method === "makeMaticDeposit") {
      const { userID, amount } = req.body;
      if (!userID || !amount) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }
      const updatedUser = await makeDepositMatic(userID, amount);
      if (updatedUser.success) {
        return res.status(200).json({ message: "Success", updatedUser });
      }
      return res.status(400).json({ message: "Action Failed" });
    }

    if(method === "makeDepositCoin"){
      const { userID, amount } = req.body;
      if (!userID || !amount) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }
      const updatedUser = await makeDepositToken(userID, amount);
      if (updatedUser.success) {
        return res.status(200).json({ message: "Success", updatedUser });
      }
      return res.status(400).json({ message: "Action Failed" });
    }
  
    if (method === "swapToCoin") {
      const { userID, amount } = req.body;
      if (!userID || !amount) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }
      const updatedUser = await makeDepositCoin(userID, amount);
      if (updatedUser.success) {
        return res.status(200).json({ message: "Success", updatedUser });
      }
      return res.status(400).json({ message: "Action Failed" });
    }
  
    if (method === "winDeposit") {
      const { userID, amount } = req.body;
      if (!userID || !amount) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }
      const updatedUser = await makeWinDepositCoin(userID, amount);
      if (updatedUser.success) {
        return res.status(200).json({ message: "Success", updatedUser });
      }
      return res.status(400).json({ message: "Action Failed" });
    }
  
    if (method === "swapToMatic") {
      const { userID, amount } = req.body;
      if (!userID || !amount) {
        res.status(400).json({ message: "Bad Request" });
        return;
      }
      const updatedUser = await swapToMatic(userID, amount);
      if (updatedUser.success) {
        return res.status(200).json({ message: "Success", updatedUser });
      }
      return res.status(400).json({ message: "Action Failed" });
    }
  
    if (method === "") {
    }
  }
  