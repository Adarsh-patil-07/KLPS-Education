const fs = require('fs');
const path = require('path');

const files = ['quiz_time.html', 'letter_drop.html', 'word_drop.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // HTML replacements
    content = content.replace(/>Class 1</g, '>Easy<');
    content = content.replace(/Class 2 /g, 'Medium ');
    content = content.replace(/Class 3 /g, 'Hard ');
    content = content.replace(/>Level: Class 1</g, '>Level: Easy<');
    
    // Javascript string replacements
    content = content.replace(/'Class 1'/g, "'Easy'");
    content = content.replace(/'Class 2 /g, "'Medium ");
    content = content.replace(/'Class 3 /g, "'Hard ");
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
