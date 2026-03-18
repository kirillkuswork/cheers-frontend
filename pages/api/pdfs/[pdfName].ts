import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pdfName } = req.query;

  const filePath = join(process.cwd(), 'public/pdfs', `${pdfName}.pdf`);

  try {
    const fileContent = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pdfName}.pdf`);
    res.send(fileContent);
  } catch (error) {
    res.status(404).send('PDF not found');
  }
}
