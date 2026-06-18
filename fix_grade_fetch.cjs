const fs = require('fs');

function fixFiles() {
    const files = [
        { name: 'quiz_time.html', bank: 'QUIZ_BANK' },
        { name: 'letter_drop.html', bank: 'WORD_BANK' },
        { name: 'word_drop.html', bank: 'SENTENCE_BANK' }
    ];

    for (const f of files) {
        let content = fs.readFileSync(f.name, 'utf8');
        
        // Find: const studentClass = localStorage.getItem('sparky_grade') || "1";
        // Replace with:
        // let studentClass = localStorage.getItem('sparky_grade') || "1";
        // studentClass = studentClass.replace('Class', '').trim();
        
        content = content.replace(
            /const studentClass = localStorage\.getItem\('sparky_grade'\) \|\| "1";/g,
            `let studentClass = localStorage.getItem('sparky_grade') || "1";\n    studentClass = studentClass.replace('Class', '').trim();`
        );
        
        fs.writeFileSync(f.name, content);
        console.log(`Fixed grade fetch in ${f.name}`);
    }

    // Now fix index.html
    let indexContent = fs.readFileSync('index.html', 'utf8');
    indexContent = indexContent.replace(
        /selectedGrade = element\.innerText\.trim\(\);/g,
        `selectedGrade = element.innerText.replace('Class', '').trim();`
    );
    fs.writeFileSync('index.html', indexContent);
    console.log(`Fixed index.html`);
}

fixFiles();
