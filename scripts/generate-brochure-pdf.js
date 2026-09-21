const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');

async function buildBrochurePdf() {
  const publicDir = path.join(__dirname, '..', 'public');
  const documentsDir = path.join(publicDir, 'documents');
  if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
  }

  const depanPath = path.join(publicDir, 'images', 'BROSUR PPDB AL IMAM UK 2027-2028 UK A4 Depan (2).png');
  const belakangPath = path.join(publicDir, 'images', 'BROSUR PPDB AL IMAM UK 2027-2028 UK A4 Belakang (2).png');

  console.log('Optimizing images for PDF...');
  
  // Convert 3508x2480 PNG to high-quality JPEG (quality 92) for crisp text & manageable file size
  const depanJpg = await sharp(depanPath)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toBuffer();

  const belakangJpg = await sharp(belakangPath)
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toBuffer();

  console.log('Depan JPG size:', (depanJpg.length / 1024 / 1024).toFixed(2), 'MB');
  console.log('Belakang JPG size:', (belakangJpg.length / 1024 / 1024).toFixed(2), 'MB');

  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('Brosur SPMB Pesantren Al Imam Al Islami 2027/2028');
  pdfDoc.setAuthor('Pesantren Al Imam Al Islami managed by Al-Andalus IIBS');
  pdfDoc.setSubject('Brosur Informasi Penerimaan Santri Baru (SPMB) 2027/2028');
  pdfDoc.setCreator('Al-Imam Media & IT');

  // A4 Landscape dimensions in points: 841.89 x 595.28
  const widthPt = 841.89;
  const heightPt = 595.28;

  // Page 1: Depan
  const depanImage = await pdfDoc.embedJpg(depanJpg);
  const page1 = pdfDoc.addPage([widthPt, heightPt]);
  page1.drawImage(depanImage, {
    x: 0,
    y: 0,
    width: widthPt,
    height: heightPt,
  });

  // Page 2: Belakang
  const belakangImage = await pdfDoc.embedJpg(belakangJpg);
  const page2 = pdfDoc.addPage([widthPt, heightPt]);
  page2.drawImage(belakangImage, {
    x: 0,
    y: 0,
    width: widthPt,
    height: heightPt,
  });

  const pdfBytes = await pdfDoc.save();

  const outPath1 = path.join(documentsDir, 'Brosur-SPMB.pdf');
  const outPath2 = path.join(documentsDir, 'Brosur-SPMB-Al-Imam-2027-2028.pdf');

  fs.writeFileSync(outPath1, pdfBytes);
  fs.writeFileSync(outPath2, pdfBytes);

  console.log('PDF successfully created:');
  console.log('-', outPath1, `(${(pdfBytes.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log('-', outPath2, `(${(pdfBytes.length / 1024 / 1024).toFixed(2)} MB)`);
}

buildBrochurePdf().catch(console.error);
