const fs = require('fs');
const path = require('path');

const projects = ['alandalus-alimam', 'alandalus-ululalbaab', 'template-demo'];
const baseDir = 'c:\\Users\\itpua\\Dev\\Work\\al-andalus';

projects.forEach(project => {
    const projectDir = path.join(baseDir, project);
    
    // 1. ppdb-config.ts
    const configPath = path.join(projectDir, 'src', 'config', 'ppdb-config.ts');
    if (fs.existsSync(configPath)) {
        let content = fs.readFileSync(configPath, 'utf8');
        
        // update prices
        content = content.replace('amount: "Rp 200.000"', 'amount: "Rp 250.000"');
        content = content.replace('amount: "Rp 7.500.000"', 'amount: "Rp 7.650.000"');
        content = content.replace('amount: "Rp 8.500.000"', 'amount: "Rp 8.650.000"');
        
        // add MA program if not exists
        if (!content.includes('id: "ma"')) {
            const ilProgramStr = 'theme: "gold",\n    },';
            const maProgramStr = 'theme: "gold",\n    },\n    {\n      id: "ma",\n      name: "MA",\n      fullName: "Madrasah Aliyah",\n      description: "Program setara SMA. Syarat khusus: Lulus tes lisan Bahasa Arab dan Hafalan Mutqin minimal 4 Juz.",\n      image: "/images/mts.webp",\n      theme: "teal",\n    },';
            content = content.replace(ilProgramStr, maProgramStr);
        }
        
        fs.writeFileSync(configPath, content);
        console.log('Updated ppdb-config.ts in ' + project);
    }
    
    // 2. page.tsx
    const pagePath = path.join(projectDir, 'src', 'app', 'ppdb', 'page.tsx');
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        
        // update stats
        content = content.replace('{ label: "Kuota MTs", value: "25 Santri", icon: Users },', '{ label: "Kuota MTs Putra", value: "50 Santri (Terbatas)", icon: Users },');
        content = content.replace('{ label: "Kuota I\'dad", value: "25 Santri", icon: Users },', '{ label: "Kuota I\'dad Putra", value: "25 Santri (Terbatas)", icon: Users },');
        
        // update biaya
        content = content.replace('{ label: "Biaya Pendaftaran", value: "Rp 200rb", icon: CreditCard },', '{ label: "Biaya Pendaftaran", value: "Rp 250rb", icon: CreditCard },');
        content = content.replace('{ label: "Uang Pangkal", value: "Rp 7.5Jt", icon: Shield },', '{ label: "Uang Pangkal", value: "Rp 7.65Jt", icon: Shield },');
        
        fs.writeFileSync(pagePath, content);
        console.log('Updated page.tsx in ' + project);
    }
    
    // 3. route.ts (seed)
    const seedPath = path.join(projectDir, 'src', 'app', 'api', 'admin', 'tahun-ajaran', 'seed', 'route.ts');
    if (fs.existsSync(seedPath)) {
        let content = fs.readFileSync(seedPath, 'utf8');
        content = content.replace(/biaya_pendaftaran: 200000/g, 'biaya_pendaftaran: 250000');
        fs.writeFileSync(seedPath, content);
        console.log('Updated seed route.ts in ' + project);
    }
});
