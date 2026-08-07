const XLSX = require('xlsx');
const path = require('path');

const fileV5 = path.join(__dirname, '../Data_Santri_Kepengasuhan/Data_Santri_AlImam_Kepengasuhan_2026-2027_V5.xlsx');
const fileV8 = path.join(__dirname, '../Data_Monitoring_PPDB_AlImam_Final_V8.xlsx');

const wbV5 = XLSX.readFile(fileV5);
const dataUtama = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Utama']);
const dataOrtu = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Orang Tua']);
const dataKontak = XLSX.utils.sheet_to_json(wbV5.Sheets['Kontak Darurat']);

const wbV8 = XLSX.readFile(fileV8);
const dataMTs = XLSX.utils.sheet_to_json(wbV8.Sheets['Data MTs'], { header: 1 });
const dataIL = XLSX.utils.sheet_to_json(wbV8.Sheets['Data IL'], { header: 1 });

console.log("=== V5 DATA UTAMA COUNT ===", dataUtama.length);
console.log("=== V5 DATA ORTU COUNT ===", dataOrtu.length);
console.log("=== V5 KONTAK COUNT ===", dataKontak.length);

console.log("\n=== SAMPLE COMBINED SANTRI DATA ===");
dataUtama.forEach((s, idx) => {
  const o = dataOrtu.find(item => item['No Pendaftaran'] === s['No Pendaftaran']) || {};
  const k = dataKontak.find(item => item['No Pendaftaran'] === s['No Pendaftaran']) || {};

  console.log(`[${idx+1}] ${s['Nama Lengkap']} | Jenjang: ${s['Jenjang']} | NoPendaftar: ${s['No Pendaftaran']} | NIS: ${s['NIS']}`);
  console.log(`     Ayah: ${o['Nama Ayah'] || '-'} (HP: ${o['No HP Ayah'] || '-'})`);
  console.log(`     Ibu: ${o['Nama Ibu'] || '-'} (HP: ${o['No HP Ibu'] || '-'})`);
  console.log(`     Wali: ${o['Nama Wali'] || '-'} (HP: ${o['No HP Wali'] || '-'})`);
  console.log(`     No HP Santri/Ortu di Utama: ${s['No HP Santri/Ortu']}`);
  console.log(`     WA Kontak Darurat: Santri:${k['No HP Santri']} | Ayah:${k['No HP Ayah']} | Ibu:${k['No HP Ibu']} | Wali:${k['No HP Wali']}`);
  console.log('---');
});
