const fs = require('fs');
const path = require('path');

// Read the logo from id-card-panitia.html
const panitiaPath = path.join(__dirname, '..', 'id-card-panitia.html');
const panitiaContent = fs.readFileSync(panitiaPath, 'utf8');
const logoMatch = panitiaContent.match(/<img src="(data:image\/png;base64,[^"]+)">/);
let logoBase64 = '';
if (logoMatch) {
    logoBase64 = logoMatch[1];
}

let htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Karcis Parkir Mobil - Welcome Day 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #4a0d0d; /* Maroon/Dark Red */
            --secondary: #d4af37; /* Gold */
            --white: #ffffff;
            --light-gold: #fdf5e6;
        }

        body {
            margin: 0;
            padding: 20px;
            font-family: 'Outfit', sans-serif;
            background-color: #f0f0f0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .print-btn {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: 0.3s;
        }

        .print-btn:hover {
            background-color: #218838;
            transform: translateY(-2px);
        }

        .tickets-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            width: 100%;
            max-width: 210mm; /* A4 width */
        }

        .ticket {
            width: 180mm;
            height: 65mm;
            background: var(--primary);
            border-radius: 12px;
            display: flex;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            color: var(--white);
            border: 2px solid var(--secondary);
            box-sizing: border-box;
        }

        /* Decorative background pattern */
        .ticket::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 0l20 20-20 20L0 20z" fill="%23d4af37" fill-opacity="0.05" fill-rule="evenodd"/></svg>');
            pointer-events: none;
            z-index: 1;
        }

        .stub {
            width: 50mm;
            background: var(--light-gold);
            border-right: 2px dashed var(--secondary);
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--primary);
            position: relative;
            z-index: 2;
        }

        .stub-content {
            transform: rotate(-90deg);
            display: flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
        }

        .stub .vertical-text {
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 2px;
            color: var(--secondary);
            text-shadow: 1px 1px 0px rgba(0,0,0,0.1);
        }

        .stub .number {
            font-size: 18px;
            font-weight: 700;
            background: var(--primary);
            color: var(--secondary);
            padding: 4px 12px;
            border-radius: 20px;
        }

        .main {
            flex: 1;
            padding: 15px 25px;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 2;
        }

        .main-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .logo-title {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo-title img {
            height: 45px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .header-text h3 {
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            color: var(--white);
            letter-spacing: 1px;
        }

        .header-text h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            color: var(--secondary);
        }

        .ticket-number {
            font-size: 28px;
            font-weight: 800;
            color: var(--secondary);
            background: rgba(0,0,0,0.3);
            padding: 5px 15px;
            border-radius: 8px;
            border: 1px solid var(--secondary);
        }

        .title-area {
            text-align: center;
            margin-top: 15px;
            flex: 1;
        }

        .title-area h2 {
            margin: 0;
            font-size: 38px;
            font-weight: 800;
            color: var(--secondary);
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .title-area p {
            margin: 5px 0 0 0;
            font-size: 16px;
            font-weight: 300;
            color: var(--white);
            letter-spacing: 3px;
        }

        .footer-area {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: auto;
        }

        .footer-note {
            font-size: 11px;
            line-height: 1.5;
            color: rgba(255,255,255,0.85);
            max-width: 65%;
            margin-bottom: 5px;
        }
        .footer-note ul {
            margin: 0;
            padding-left: 15px;
            list-style-type: disc;
        }

        .signature-area {
            text-align: center;
            width: 150px;
        }

        .signature-area p {
            margin: 0;
            font-size: 12px;
            color: var(--secondary);
            font-weight: 600;
        }

        .signature-space {
            height: 45px;
            background-color: var(--light-gold);
            border-radius: 6px;
            margin: 4px 0;
            border: 1px solid var(--secondary);
            /* Placeholder for signature */
        }

        .signature-name {
            font-size: 13px !important;
            color: var(--white) !important;
            font-weight: 700 !important;
            text-decoration: underline;
        }

        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            .print-btn {
                display: none;
            }
            .ticket {
                page-break-inside: avoid;
                margin-bottom: 0;
                box-shadow: none;
            }
            .tickets-container {
                gap: 5mm;
            }
        }
    </style>
</head>
<body>

    <button class="print-btn" onclick="window.print()">🖨️ Print Karcis (PDF/A4)</button>

    <div class="tickets-container">
`;

// Generate 150 tickets
for (let i = 1; i <= 150; i++) {
    const num = String(i).padStart(3, '0');
    
    htmlContent += `
        <div class="ticket">
            <div class="stub">
                <div class="stub-content">
                    <div class="number">#${num}</div>
                    <div class="vertical-text">PARKIR MOBIL</div>
                </div>
            </div>
            <div class="main">
                <div class="main-header">
                    <div class="logo-title">
                        <img src="${logoBase64}" alt="Logo">
                        <div class="header-text">
                            <h3>PESANTREN AL-IMAM AL-ISLAMI</h3>
                            <h1>Welcome Day 2026</h1>
                        </div>
                    </div>
                    <div class="ticket-number">#${num}</div>
                </div>
                
                <div class="title-area">
                    <h2>KARCIS PARKIR</h2>
                    <p>KHUSUS KENDARAAN RODA EMPAT (MOBIL)</p>
                </div>

                <div class="footer-area">
                    <div class="footer-note">
                        <ul>
                            <li>Mohon letakkan karcis ini di atas dashboard mobil yang terlihat dari luar.</li>
                            <li>Harap mengunci kendaraan Anda dengan aman.</li>
                        </ul>
                    </div>
                    <div class="signature-area">
                        <p>Penanggung Jawab</p>
                        <div class="signature-space"></div>
                        <p class="signature-name">Ust. Agus Cahyono</p>
                        <p style="font-weight: 300; font-size: 10px;">Ketua Panitia</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

htmlContent += `
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'karcis-parkir.html'), htmlContent, 'utf8');
console.log('Successfully generated karcis-parkir.html with 150 tickets.');
