const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const ExcelJS = require('exceljs');

const jsonlPath = path.join(__dirname, '../pendaftar_db.jsonl');
const lines = fs.readFileSync(jsonlPath, 'utf8').trim().split('\n').filter(Boolean);

// Read V5 Kepengasuhan file for extra details (parents, etc.)
const fileV5 = path.join(__dirname, '../Data_Santri_Kepengasuhan/Data_Santri_AlImam_Kepengasuhan_2026-2027_V5.xlsx');
const wbV5 = XLSX.readFile(fileV5);
const dataUtama = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Utama']);
const dataOrtu = XLSX.utils.sheet_to_json(wbV5.Sheets['Data Orang Tua']);

// Build lookup maps by name and no_pendaftaran
const v5Map = new Map();
dataUtama.forEach(s => {
  const o = dataOrtu.find(item => item['No Pendaftaran'] === s['No Pendaftaran']) || {};
  v5Map.set(s['Nama Lengkap'].toLowerCase().trim(), { s, o });
  if (s['No Pendaftaran']) {
    v5Map.set(s['No Pendaftaran'].toLowerCase().trim(), { s, o });
  }
});

function formatPhone(phone) {
  if (!phone) return '';
  let str = String(phone).trim();
  if (str === '0' || str === '-') return '';
  str = str.replace(/[^\d+]/g, '');
  if (str.startsWith('+62')) {
    str = '0' + str.slice(3);
  } else if (str.startsWith('62')) {
    str = '0' + str.slice(2);
  }
  if (!str.startsWith('0') && str.length > 5) {
    str = '0' + str;
  }
  return str;
}

const allPendaftar = [];
const seenNames = new Set();

lines.forEach((line, idx) => {
  try {
    const item = JSON.parse(line);
    const rawName = (item.nama_lengkap || '').trim();
    if (!rawName) return;

    // Filter out obvious test accounts
    const lowerName = rawName.toLowerCase();
    if (lowerName.includes('tes') || lowerName.includes('bypass') || rawName === 'FARID') {
      return;
    }

    if (seenNames.has(lowerName)) return;
    seenNames.add(lowerName);

    // Try finding in V5
    const matched = v5Map.get(lowerName);
    let nis = item.nis || (matched?.s?.['NIS']) || '';
    let noPendaftaran = item.nomor_pendaftaran || (matched?.s?.['No Pendaftaran']) || '';
    let jenjang = item.jenjang || (matched?.s?.['Jenjang']) || '';
    
    // Determine kelas
    let kelasDisplay = '';
    if (jenjang === 'MTs' || jenjang === 'SMP' || noPendaftaran.startsWith('MTA')) {
      kelasDisplay = '7 MTs';
      jenjang = 'MTs';
    } else if (jenjang === 'IL' || jenjang === 'SMA' || jenjang === 'MA' || noPendaftaran.startsWith('ILA')) {
      kelasDisplay = '10 IL';
      jenjang = 'IL';
    } else {
      kelasDisplay = jenjang || '-';
    }

    let namaAyah = item.nama_ayah || matched?.o?.['Nama Ayah'] || item.orang_tua?.nama_ayah || '';
    let waAyah = formatPhone(item.no_hp_ayah || matched?.o?.['No HP Ayah'] || item.orang_tua?.no_hp_ayah);

    let namaIbu = item.nama_ibu || matched?.o?.['Nama Ibu'] || item.orang_tua?.nama_ibu || '';
    let waIbu = formatPhone(item.no_hp_ibu || matched?.o?.['No HP Ibu'] || item.orang_tua?.no_hp_ibu);

    let namaWali = item.nama_wali || matched?.o?.['Nama Wali'] || item.orang_tua?.nama_wali || '';
    let waWali = formatPhone(item.no_hp_wali || matched?.o?.['No HP Wali'] || item.orang_tua?.no_hp_wali);

    let waSantriOrtu = formatPhone(item.no_hp || matched?.s?.['No HP Santri/Ortu']);

    let waUtamaLaundry = waAyah || waIbu || waWali || waSantriOrtu;

    allPendaftar.push({
      namaSantri: rawName.toUpperCase(),
      noPendaftaran,
      nis,
      jenjang,
      kelas: kelasDisplay,
      namaAyah,
      waAyah,
      namaIbu,
      waIbu,
      namaWali,
      waWali,
      waUtamaOrtu: waUtamaLaundry
    });
  } catch (e) {
    console.error("Error line", idx, e.message);
  }
});

console.log("Total Pendaftar Parsed:", allPendaftar.length);
allPendaftar.forEach((p, idx) => {
  console.log(`[${idx+1}] ${p.namaSantri} | ${p.kelas} | NoPendaftar: ${p.noPendaftaran} | NIS: ${p.nis} | WA: ${p.waUtamaOrtu}`);
});
