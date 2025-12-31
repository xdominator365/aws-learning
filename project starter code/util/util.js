import fs from "fs";
import axios from "axios";
import Jimp from "jimp";
import os from "os";
import path from "path";

// filterImageFromURL
export async function filterImageFromURL(inputURL) {
  try {
    const response = await axios.get(inputURL, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
      }
    });

    const imageBuffer = Buffer.from(response.data);
    const photo = await Jimp.read(imageBuffer);

    const outpath = path.join(
      os.tmpdir(),
      `filtered.${Math.floor(Math.random() * 2000)}.jpg`
    );

    await photo
      .resize(256, 256)
      .quality(60)
      .greyscale()
      .writeAsync(outpath);

    return outpath;

  } catch (error) {
    throw error;
  }
}

// deleteLocalFiles
export async function deleteLocalFiles(files) {
  for (let file of files) {
    try {
      fs.unlinkSync(file);
    } catch (e) {
      console.log("File already removed:", file);
    }
  }
}
