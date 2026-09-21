const XLSX = require('xlsx');

function readExcelHeaders(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    console.log(`Workbook has ${workbook.SheetNames.length} sheets: ${workbook.SheetNames.join(', ')}`);
    
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      if (data.length > 0) {
        console.log(`\nHeaders for sheet '${sheetName}':`);
        console.log(data[0]);
      } else {
        console.log(`\nSheet '${sheetName}' is empty.`);
      }
    });
  } catch (error) {
    console.error("Error reading excel file:", error);
  }
}

readExcelHeaders("C:\\Users\\itpua\\Dev\\Work\\al-andalus\\alandalus-alimam\\Data_Monitoring_PPDB_AlImam_Final_V8.xlsx");
