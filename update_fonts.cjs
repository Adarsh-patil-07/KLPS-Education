const fs = require('fs');
const files = ['index.html', 'learning_path.html', 'progress.html', 'profile.html', 'quiz_time.html', 'word_drop.html', 'letter_drop.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Quicksand fonts link
    content = content.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Quicksand[^>]+>/g, '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"/>');
    
    // Clean up duplicate font links if any
    content = content.replace(/(<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Outfit[^>]+>)\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Outfit[^>]+>/g, '$1');

    // Replace CSS font-family
    content = content.replace(/font-family:\s*'Quicksand',\s*sans-serif;/g, "font-family: 'Poppins', sans-serif;");

    // Update Tailwind config fonts
    content = content.replace(/"body-lg":\s*\["Quicksand"\]/g, '"body-lg": ["Poppins"]');
    content = content.replace(/"body-md":\s*\["Quicksand"\]/g, '"body-md": ["Poppins"]');
    content = content.replace(/"label-bold":\s*\["Quicksand"\]/g, '"label-bold": ["Poppins"]');
    
    content = content.replace(/"display-lg-mobile":\s*\["Quicksand"\]/g, '"display-lg-mobile": ["Outfit"]');
    content = content.replace(/"headline-md":\s*\["Quicksand"\]/g, '"headline-md": ["Outfit"]');
    content = content.replace(/"display-lg":\s*\["Quicksand"\]/g, '"display-lg": ["Outfit"]');

    // Update header gradient for KLPS Pangire (A)
    content = content.replace(/text-primary(">KLPS Pangire \(A\)(<\/h1>|<\/span>))/g, 'bg-gradient-to-r from-primary to-primary-container text-transparent bg-clip-text drop-shadow-sm$1');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
