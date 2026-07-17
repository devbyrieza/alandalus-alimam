const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Configuration
const EXCEL_FILE = path.join(__dirname, '../Bahan_ID_Card_AlImam/03_Data_Santri_Fix.xlsx');
const PHOTOS_DIR = path.join(__dirname, '../../safina-keuangan/public/images/foto-kartu-jajan');
const OUTPUT_FILE = path.join(__dirname, '../slide-santri-welcome-day.html');

// Helper to normalize name for finding image
function normalizeName(name) {
    if (!name) return '';
    return name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

// Read photos
let availablePhotos = {};
if (fs.existsSync(PHOTOS_DIR)) {
    const files = fs.readdirSync(PHOTOS_DIR);
    files.forEach(file => {
        const ext = path.extname(file);
        if (['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
            const base = path.basename(file, ext);
            availablePhotos[base.toLowerCase()] = path.join(PHOTOS_DIR, file);
        }
    });
}

// Read Excel
console.log('Reading Excel file...');
const workbook = xlsx.readFile(EXCEL_FILE);
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

console.log(`Found ${data.length} students in Excel.`);

// Read Logos for Header
const logoAlimamPath = path.join(__dirname, '../public/images/logo.png');
const logoAndalusPath = path.join(__dirname, '../public/images/logo-andalus.png');
let logoAlimamBase64 = '';
let logoAndalusBase64 = '';
if (fs.existsSync(logoAlimamPath)) {
    logoAlimamBase64 = 'data:image/png;base64,' + fs.readFileSync(logoAlimamPath).toString('base64');
}
if (fs.existsSync(logoAndalusPath)) {
    logoAndalusBase64 = 'data:image/png;base64,' + fs.readFileSync(logoAndalusPath).toString('base64');
}

// Generate slides HTML
let slidesHtml = '';

data.forEach((student, index) => {
    if (!student.Nama) return;
    
    const name = student.Nama;
    const normName = normalizeName(name);
    
    // Find photo
    let photoSrc = '';
    let isDefault = true;
    
    // Try exact match
    if (availablePhotos[normName]) {
        photoSrc = availablePhotos[normName];
        isDefault = false;
    } else {
        // Try partial match
        const match = Object.keys(availablePhotos).find(key => key.includes(normName) || normName.includes(key));
        if (match) {
            photoSrc = availablePhotos[match];
            isDefault = false;
        }
    }
    
    let imgTag = '';
    if (isDefault) {
        // SVG Placeholder
        imgTag = `<div class="avatar-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </div>`;
    } else {
        // Convert local path to base64 for standalone HTML
        try {
            const ext = path.extname(photoSrc).toLowerCase();
            const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
            const imgData = fs.readFileSync(photoSrc).toString('base64');
            imgTag = `<img src="data:${mime};base64,${imgData}" class="student-photo" alt="${name}">`;
        } catch (e) {
            imgTag = `<div class="avatar-placeholder">...</div>`;
        }
    }

    // Extract City from Alamat (usually the part after KOTA or KABUPATEN)
    let city = "Asal Daerah";
    if (student.Alamat) {
        const addressUpper = student.Alamat.toUpperCase();
        if (addressUpper.includes("KOTA")) {
            const parts = addressUpper.split("KOTA");
            city = "KOTA " + parts[1].split(",")[0].trim();
        } else if (addressUpper.includes("KABUPATEN")) {
            const parts = addressUpper.split("KABUPATEN");
            city = "KABUPATEN " + parts[1].split(",")[0].trim();
        } else if (student['Tempat Lahir']) {
            city = student['Tempat Lahir'];
        }
    }
    
    // Extract Kelas and Kelahiran
    const jenjang = student['Kelas Detail'] || student['Kelas'] || '-';
    let kelahiran = '-';
    if (student['Tempat Lahir'] && student['Tanggal Lahir']) {
        kelahiran = `${student['Tempat Lahir']}, ${student['Tanggal Lahir']}`;
    } else if (student['Tempat Lahir']) {
        kelahiran = student['Tempat Lahir'];
    }
    
    slidesHtml += `
    <div class="slide ${index === 0 ? 'active' : ''}" id="slide-${index}">
        <div class="slide-content">
            <div class="photo-section">
                <div class="photo-frame">
                    ${imgTag}
                </div>
                <div class="photo-badge">#${index + 1}</div>
            </div>
            <div class="info-section">
                <div class="greeting">Ahlan wa Sahlan</div>
                <h1 class="student-name">${name}</h1>
                <div class="student-details">
                    <div class="detail-item">
                        <span class="detail-label">KELAS / JENJANG</span>
                        <span class="detail-value">${jenjang}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">ASAL KOTA</span>
                        <span class="detail-value">${city}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">KELAHIRAN</span>
                        <span class="detail-value" style="font-size: 20px;">${kelahiran}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
});

// Full HTML Template
const htmlTemplate = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Day Santri Baru</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:ital,wght@1,600&display=swap" rel="stylesheet">
    <style>
        :root {
            --maroon: #6e1c23;
            --maroon-dark: #3a0d11;
            --gold: #d4af37;
            --gold-light: #f9eeb5;
            --white: #ffffff;
        }

        body, html {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            font-family: 'Outfit', sans-serif;
            background: linear-gradient(135deg, var(--maroon-dark) 0%, var(--maroon) 100%);
            color: var(--white);
        }

        /* Decorative Background */
        .bg-pattern {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            opacity: 0.05;
            background-image: url('data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M30 0l30 30-30 30L0 30z" fill="%23d4af37" fill-rule="evenodd"/></svg>');
            z-index: 1;
        }

        .header {
            position: absolute;
            top: 40px;
            left: 50px;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .header-logo {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 8px 15px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(5px);
            border-radius: 12px;
            border: 1px solid rgba(212, 175, 55, 0.3);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .header-logo img {
            height: 50px;
            object-fit: contain;
        }

        .header-text h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 300;
            letter-spacing: 2px;
            color: var(--gold-light);
            text-transform: uppercase;
        }

        .header-text h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 1px;
            color: var(--white);
        }

        /* Slides Container */
        .slides-container {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 5;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .slide {
            position: absolute;
            width: 80%;
            max-width: 1200px;
            height: 70vh;
            opacity: 0;
            transform: scale(0.95) translateY(20px);
            transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
            pointer-events: none;
            display: flex;
        }

        .slide.active {
            opacity: 1;
            transform: scale(1) translateY(0);
            pointer-events: auto;
        }

        /* Glassmorphism Card */
        .slide-content {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 30px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.4);
            display: flex;
            overflow: hidden;
            position: relative;
        }

        .slide-content::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 8px;
            background: var(--gold);
        }

        /* Left side: Photo */
        .photo-section {
            flex: 0 0 45%;
            padding: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            background: rgba(0, 0, 0, 0.15);
        }

        .photo-frame {
            width: 300px;
            height: 380px;
            border-radius: 20px;
            padding: 10px;
            background: linear-gradient(135deg, var(--gold) 0%, rgba(212, 175, 55, 0.3) 100%);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            position: relative;
        }

        .student-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
            background-color: var(--white);
        }

        .avatar-placeholder {
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba(255,255,255,0.3);
        }
        
        .avatar-placeholder svg {
            width: 100px;
            height: 100px;
        }

        .photo-badge {
            position: absolute;
            bottom: 30px;
            right: 40px;
            background: var(--maroon);
            color: var(--gold);
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 800;
            font-size: 20px;
            border: 2px solid var(--gold);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        /* Right side: Info */
        .info-section {
            flex: 1;
            padding: 60px 80px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .greeting {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 32px;
            color: var(--gold);
            margin-bottom: 20px;
        }

        .student-name {
            font-size: 54px;
            font-weight: 800;
            line-height: 1.1;
            margin: 0 0 40px 0;
            color: var(--white);
            text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .student-details {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .detail-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .detail-label {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: rgba(212, 175, 55, 0.7);
            font-weight: 600;
        }

        .detail-value {
            font-size: 24px;
            font-weight: 400;
            color: var(--gold-light);
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        /* Controls */
        .controls {
            position: absolute;
            bottom: 40px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            z-index: 10;
        }

        .control-btn {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: var(--white);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 20px;
        }

        .control-btn:hover {
            background: var(--gold);
            color: var(--maroon);
            border-color: var(--gold);
            transform: scale(1.1);
        }

        .play-btn {
            width: 60px;
            height: 60px;
            font-size: 24px;
            background: rgba(212, 175, 55, 0.2);
            border-color: var(--gold);
            color: var(--gold);
        }
        .play-btn.playing {
            background: var(--gold);
            color: var(--maroon);
        }
        
        .progress-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 4px;
            background: rgba(255,255,255,0.1);
            width: 100%;
            z-index: 10;
        }
        .progress-fill {
            height: 100%;
            background: var(--gold);
            width: 0%;
            transition: width 0.3s linear;
        }

    </style>
</head>
<body>
    <div class="bg-pattern"></div>
    
    <div class="header">
        <div class="header-logo">
            \${logoAlimamBase64 ? \`<img src="\${logoAlimamBase64}" alt="Logo Al-Imam">\` : ''}
            \${logoAndalusBase64 ? \`<img src="\${logoAndalusBase64}" alt="Logo Andalus">\` : ''}
        </div>
        <div class="header-text">
            <h3>Pesantren Al-Imam Al-Islami</h3>
            <h2>Welcome Day 2026</h2>
        </div>
    </div>

    <div class="slides-container">
        ${slidesHtml}
    </div>

    <div class="controls">
        <button class="control-btn" id="prevBtn" title="Previous Slide (Left Arrow)">❮</button>
        <button class="control-btn play-btn" id="playBtn" title="Auto Play (Space)">▶</button>
        <button class="control-btn" id="nextBtn" title="Next Slide (Right Arrow)">❯</button>
    </div>
    
    <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
    </div>

    <script>
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playBtn = document.getElementById('playBtn');
        const progressFill = document.getElementById('progressFill');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Auto-play settings
        let isPlaying = false;
        let playInterval;
        const SLIDE_DURATION = 5000; // 5 seconds per slide
        
        function updateSlides() {
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            updateProgress();
        }
        
        function updateProgress() {
            const percentage = ((currentSlide + 1) / totalSlides) * 100;
            progressFill.style.width = percentage + '%';
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlides();
        }
        
        function togglePlay() {
            isPlaying = !isPlaying;
            if (isPlaying) {
                playBtn.classList.add('playing');
                playBtn.innerHTML = '⏸';
                playInterval = setInterval(nextSlide, SLIDE_DURATION);
            } else {
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '▶';
                clearInterval(playInterval);
            }
        }

        nextBtn.addEventListener('click', () => {
            if (isPlaying) togglePlay(); // Pause if manual navigation
            nextSlide();
        });
        
        prevBtn.addEventListener('click', () => {
            if (isPlaying) togglePlay();
            prevSlide();
        });
        
        playBtn.addEventListener('click', togglePlay);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                if (isPlaying) togglePlay();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                if (isPlaying) togglePlay();
                prevSlide();
            } else if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                togglePlay();
            }
        });
        
        // Initialize
        updateProgress();
        
        // Auto start if uncommented
        // setTimeout(togglePlay, 1000);
    </script>
</body>
</html>`;

fs.writeFileSync(OUTPUT_FILE, htmlTemplate, 'utf8');
console.log('Successfully generated slide-santri-welcome-day.html');
