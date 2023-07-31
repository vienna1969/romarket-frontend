import { editHorseNames, getHorseNames } from "@/utils/models/horseRace/horses";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.query;

  if (method === "all") {
    const horseNames = await getHorseNames();
    return res.status(200).json({ status: true, horseNames });
  }

  if (method === "set") {
    const { horse1, horse2, horse3, horse4, horse5 } = req.body;
    const result = await editHorseNames(horse1, horse2, horse3, horse4, horse5);
    return res.status(200).json({ status: true, result });
  }

  return res.status(405).json({ status: false, message: "Method not allowed" });
}
