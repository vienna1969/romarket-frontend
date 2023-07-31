import { getWithdrawType } from "@/utils/models/settings-model";
import { getUser } from "@/utils/models/user-model";
import {
  cancelWithdrawRequest,
  deleteWithdrawRequest,
  getAllWithdrawRequests,
  getUserWithdrawRequests,
  newWithdrawRequest,
  updateWithdrawRequest,
} from "@/utils/models/withdrawRequest";
import { authFromServer } from "@/utils/services/useAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;
  if (method === "create") {
    const { userToken, amount, type } = req.body;
    if (!userToken || !amount || !type) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }
    const { _id: userId } = await authFromServer(userToken);
    if (!userId) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    const user = await getUser(userId);
    if (!user.success) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    if (user.user.walletAddress == "") {
      return res
        .status(400)
        .json({ status: false, message: "User wallet address not found" });
    }
    const settings = await getWithdrawType();
    if (settings === "Coin") {
      if (user.user.deposit < amount) {
        return res
          .status(400)
          .json({ status: false, message: "User balance is not enough" });
      }
    } else {
      if (user.user.maticBalance < amount) {
        return res
          .status(400)
          .json({ status: false, message: "User balance is not enough" });
      }
    }
    const newRequest = await newWithdrawRequest(userId, amount, type);
    if (!newRequest) {
      return res
        .status(400)
        .json({ status: false, message: newRequest.message });
    }
    settings === "Coin"
      ? (user.user.deposit -= amount)
      : (user.user.maticBalance -= amount);
    await user.user.save();
    return res.status(200).json({
      status: true,
      message: "Your withdraw request created successfully",
    });
  }

  if (method === "all") {
    const { userToken } = req.query;
    if (!userToken) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }
    const { isAdmin } = await authFromServer(userToken);
    if (!isAdmin) {
      return res.status(400).json({
        status: false,
        message: "You shall not pass -Gandalf The Gray",
      });
    }
    const requests = await getAllWithdrawRequests();
    return res.status(200).json({ status: true, requests });
  }

  if (method === "my") {
    const { userToken } = req.query;
    if (!userToken) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }
    const { _id: userId } = await authFromServer(userToken);
    if (!userId) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    const requests = await getUserWithdrawRequests(userId);
    return res.status(200).json({ status: true, requests });
  }

  if (method === "reject") {
    const { userToken, id } = req.query;
    if (!userToken) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }
    const { isAdmin } = await authFromServer(userToken);
    if (!isAdmin) {
      return res.status(400).json({
        status: false,
        message: "You shall not pass -Gandalf The Gray",
      });
    }
    const rejectedRequest = await cancelWithdrawRequest(id as string);
    if (!rejectedRequest.success) {
      return res
        .status(400)
        .json({ status: false, message: rejectedRequest.message });
    }
    return res.status(200).json({ status: true, message: "Request rejected" });
  }

  if (method === "update") {
    const { userToken, id, status, isPayed, txHash } = req.body;
    const { isAdmin } = await authFromServer(userToken);
    if (!isAdmin) {
      return res.status(400).json({
        status: false,
        message: "You shall not pass -Gandalf The Gray",
      });
    }
    if (!id || !status || !isPayed || !txHash) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }
    const updatedRequest = await updateWithdrawRequest(
      id,
      status,
      isPayed,
      txHash
    );
    if (!updatedRequest.success) {
      return res
        .status(400)
        .json({ status: false, message: updatedRequest.message });
    }
    return res.status(200).json({ status: true, message: "Request updated" });
  }

  if (method === "delete") {
    const { userToken, id } = req.query;
    if (!userToken) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }
    const { isAdmin } = await authFromServer(userToken);
    if (!isAdmin) {
      return res.status(400).json({
        status: false,
        message: "You shall not pass -Gandalf The Gray",
      });
    }
    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }
    const deletedRequest = await deleteWithdrawRequest(id as string);
    if (!deletedRequest.success) {
      return res
        .status(400)
        .json({ status: false, message: deletedRequest.message });
    }
    return res.status(200).json({ status: true, message: "Request deleted" });
  }

  return res.status(400).json({ status: false, message: "Invalid method" });
}
