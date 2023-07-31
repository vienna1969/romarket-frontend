import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { url } = req.body;

    if(!url){
        return res.status(400).json({ message: "Bad Request" });
    }

    const uploadFolder = path.join(process.cwd(), 'utils', 'update');
    const fileName = 'update.zip';
    const filePath = path.join(uploadFolder, fileName);
  
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
  
    fs.writeFile(filePath, Buffer.from(buffer), (error) => {
      if (error) {
        console.error('Dosya kaydedilirken bir hata oluştu:', error);
        res.send(error);
      } else {
        console.log('Dosya başarıyla indirildi ve kaydedildi.');
        const childProcess = spawn('bash', ['utils/test.sh'], { detached: true });

        childProcess.unref();
        
        res.status(200).json({ message: 'John Doe' })
      }
    });

    

  res.status(400).json({ message: 'John Doe' })
}
