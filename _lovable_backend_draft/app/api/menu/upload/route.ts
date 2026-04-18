import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import { parseOCR } from '/path/to/ocr/parser'; // Make sure to change the path to your import

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return NextResponse.json({ error: 'Error processing the file' }, { status: 400 });
    }

    const file = files.file;
    const data = fs.readFileSync(file.filepath); // Make sure to handle file reading correctly

    const ocrResult = await parseOCR(data); // Process the file with your OCR function

    return NextResponse.json({ result: ocrResult }, { status: 200 });
  });
}