const xlsx = require('xlsx'); const workbook = xlsx.readFile('REKAP HASIL TES.xlsx'); console.log('Sheets:', workbook.SheetNames);
