const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projects = ['alandalus-alimam', 'alandalus-ululalbaab', 'template-demo'];
const baseDir = 'c:\\Users\\itpua\\Dev\\Work\\al-andalus';

projects.forEach(project => {
    const projectDir = path.join(baseDir, project);
    const pagePath = path.join(projectDir, 'src', 'app', 'page.tsx');
    
    if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        
        // Add import if missing
        if (!content.includes('import ScholarshipSection')) {
            content = content.replace(
                'import ProgramSection from "@/components/home/ProgramSection";',
                'import ProgramSection from "@/components/home/ProgramSection";\nimport ScholarshipSection from "@/components/home/ScholarshipSection";'
            );
            fs.writeFileSync(pagePath, content);
            console.log('Fixed page.tsx in ' + project);
        } else {
            console.log('ScholarshipSection already imported in ' + project);
        }
        
        // Commit and push
        try {
            console.log('Committing and pushing for ' + project);
            execSync('git add . && git commit -m "fix: add missing ScholarshipSection import and update ppdb prices" && git push', { cwd: projectDir, stdio: 'inherit' });
            console.log('Successfully pushed ' + project);
        } catch (e) {
            console.log('Git commit/push skipped or failed for ' + project + ' (maybe no changes or network error)');
        }
    }
});
