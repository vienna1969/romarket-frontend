import fs from "fs/promises";
import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(`Error: ${err}`);
      return;
    }

    const oldPath = files.myLogo.filepath;
    const newPath = path.join(process.cwd(), "public/logo/logo.png");
    try {
      await fs.rename(oldPath, newPath);
      const dataPath = newPath;
      res.status(200).send("File uploaded successfully");
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(`Error: ${err}`);
    }
  });
}
