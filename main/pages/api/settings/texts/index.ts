import { updateTexts } from "@/utils/models/settings-model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === "main") {
    const {
      text,
      game1Title,
      game2Title,
      game3Title,
      game1Description,
      game2Description,
      game3Description,
    } = req.body;
    if (
      !text ||
      !game1Title ||
      !game2Title ||
      !game3Title ||
      !game1Description ||
      !game2Description ||
      !game3Description
    ) {
      return res
        .status(200)
        .json({ status: false, message: "Please fill all fields" });
    }
    const texts = {
      index: {
        text,
        game1Title,
        game2Title,
        game3Title,
        game1Description,
        game2Description,
        game3Description,
      },
    };
    const changes = await updateTexts(texts);
    if (!changes) {
      return res
        .status(400)
        .json({ status: false, message: "Something went wrong" });
    }
    return res.status(200).json({ status: true, message: "Texts updated" });
  }
}
