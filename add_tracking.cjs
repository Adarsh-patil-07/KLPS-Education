const fs = require('fs');
const path = require('path');

function logMistakeSnippet(subject, topicVariable) {
    return `
        let struggles = JSON.parse(localStorage.getItem('klps_struggles') || '[]');
        struggles.push({ subject: '${subject}', topic: ${topicVariable}, timestamp: Date.now() });
        localStorage.setItem('klps_struggles', JSON.stringify(struggles));
`;
}

function trophyUnlockSnippet(trophyId) {
    return `
        let trophies = JSON.parse(localStorage.getItem('klps_trophies') || '{}');
        if (!trophies['${trophyId}']) {
            trophies['${trophyId}'] = true;
            localStorage.setItem('klps_trophies', JSON.stringify(trophies));
        }
        if (!trophies['first_steps']) {
            trophies['first_steps'] = true;
            localStorage.setItem('klps_trophies', JSON.stringify(trophies));
        }
`;
}

function processGameFile(filename, subject, defaultTopic, errorTarget, errorReplacement, winTarget, winReplacement) {
    const p = path.join(__dirname, filename);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    
    if (!content.includes('klps_struggles')) {
        content = content.replace(errorTarget, errorReplacement + logMistakeSnippet(subject, `"${defaultTopic}"`));
    }
    if (!content.includes('klps_trophies')) {
        content = content.replace(winTarget, winReplacement + trophyUnlockSnippet(filename === 'word_drop.html' ? 'grammar_master' : filename === 'quiz_time.html' ? 'math_whiz' : 'spelling_bee'));
    }
    
    fs.writeFileSync(p, content);
    console.log(`Updated tracking for ${filename}`);
}

// 1. word_drop.html
processGameFile(
    'word_drop.html', 
    'English', 
    'Grammar Rules', 
    "btn.classList.add('bg-error-container', 'border-error');", 
    "btn.classList.add('bg-error-container', 'border-error');",
    "winFeedback.className = \"fixed inset-0 pointer-events-none flex items-center justify-center z-[100] bg-on-surface/30 backdrop-blur-sm transition-all\";",
    "winFeedback.className = \"fixed inset-0 pointer-events-none flex items-center justify-center z-[100] bg-on-surface/30 backdrop-blur-sm transition-all\";"
);

// 2. letter_drop.html
processGameFile(
    'letter_drop.html', 
    'English', 
    'Spelling', 
    "btn.classList.add('bg-error', 'text-on-error', 'animate-shake');", 
    "btn.classList.add('bg-error', 'text-on-error', 'animate-shake');",
    "document.getElementById('win-modal').classList.remove('hidden');",
    "document.getElementById('win-modal').classList.remove('hidden');"
);

// 3. quiz_time.html
processGameFile(
    'quiz_time.html', 
    'Mathematics', 
    'Arithmetic', 
    "btn.classList.add('bg-error-container', 'border-error');", 
    "btn.classList.add('bg-error-container', 'border-error');",
    "winFeedback.className = \"fixed inset-0 pointer-events-none flex items-center justify-center z-[100] bg-on-surface/30 backdrop-blur-sm transition-all\";",
    "winFeedback.className = \"fixed inset-0 pointer-events-none flex items-center justify-center z-[100] bg-on-surface/30 backdrop-blur-sm transition-all\";"
);
