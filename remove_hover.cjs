const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    // Remove hover:class and group-hover:class
    // Regex matches any string starting with hover: or group-hover: followed by non-whitespace and non-quote characters
    content = content.replace(/(?:\b|(?<=\s))(group-)?hover:[^\s"']+/g, '');
    
    // Also remove any stray spaces left behind inside class attributes
    content = content.replace(/class="([^"]*)"/g, (match, p1) => {
        return `class="${p1.replace(/\s+/g, ' ').trim()}"`;
    });
    
    // Additionally, remove hover interactions from JS (e.g. classList.add('hover:bg...'))
    content = content.replace(/,\s*'hover:[^']+'/g, '');
    content = content.replace(/'hover:[^']+',\s*/g, '');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Processed ${file}`);
});
