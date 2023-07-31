import { NextApiRequest, NextApiResponse } from "next";

const { spawn } = require('child_process');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  const childProcess = spawn('bash', ['utils/test.sh']);

  childProcess.stdout.on('data', (data:any) => {
    console.log(`Çıktı: ${data}`);
  });

  childProcess.stderr.on('data', (data:any) => {
    console.error(`Hata çıktısı: ${data}`);
  });

  childProcess.on('close', (code:any) => {
    console.log(`Bash scripti tamamlandı. Çıkış kodu: ${code}`);
    res.status(200).json({ code });
  });
}