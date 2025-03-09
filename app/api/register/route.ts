import { NextResponse } from "next/server";
import { Pool } from "pg";
import formidable, { File } from "formidable";
import fs from "fs/promises";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return resolve(NextResponse.json({ message: "Error parsing form" }, { status: 500 }));

      const { name, age, gender, rank, date } = fields;
      const image = files.image?.[0] as File | undefined;

      let imageUrl = null;
      if (image) {
        const data = await fs.readFile(image.filepath);
        const base64Image = `data:${image.mimetype};base64,${data.toString("base64")}`;
        imageUrl = base64Image;
      }

      try {
        await pool.query(
          "INSERT INTO users (name, age, gender, rank, date, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
          [name, age, gender, rank, date, imageUrl]
        );
        resolve(NextResponse.json({ message: "User registered successfully" }));
      } catch (error) {
        resolve(NextResponse.json({ message: "Database error", error: (error as Error).message }, { status: 500 }));
      }
    });
  });
}
