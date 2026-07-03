const ExcelJS = require('exceljs');

async function readExcel() {
  const filePath = 'c:/Users/itpua/Dev/Work/al-andalus/alandalus-alimam/Data_NIS_Santri_Baru_2026_Terpisah.xlsx';
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  
  workbook.eachSheet((worksheet, sheetId) => {
    console.log(`Sheet: ${worksheet.name}`);
    let count = 0;
    worksheet.eachRow((row, rowNumber) => {
      if (count < 5) { // Print first 5 rows
        console.log(`Row ${rowNumber}: ${JSON.stringify(row.values)}`);
      }
      count++;
    });
    console.log(`Total rows: ${count}`);
    console.log('---');
  });
}

readExcel().catch(console.error);
