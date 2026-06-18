const fs = require('fs');

const files = ['quiz_time.html', 'word_drop.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add id="btn-class1" to the first button
    content = content.replace(
        /<button class="flex-1 py-3 px-4 rounded-md font-label-bold text-label-bold bg-primary-container text-on-primary-container inner-glow transition-all">/g,
        '<button id="btn-class1" class="flex-1 py-3 px-4 rounded-md font-label-bold text-label-bold bg-primary-container text-on-primary-container inner-glow transition-all">'
    );

    // 2. Remove the old button update logic in loadQuestion
    const oldLogicRegex = /\/\/ Restore styling for the level selector buttons based on currentDifficulty[\s\S]*?(if \(currentDifficulty === 'medium' \|\| currentDifficulty === 'hard'\) \{)/;
    
    // We need to carefully replace the block.
    // Let's use a split or just a more targeted regex.
    const startString = `// Restore styling for the level selector buttons based on currentDifficulty`;
    const endString = `if (currentDifficulty === 'medium' || currentDifficulty === 'hard') {`;
    
    if (content.includes(startString) && content.includes(endString)) {
        const startIdx = content.indexOf(startString);
        const endIdx = content.indexOf(endString);
        
        const label = file.includes('quiz') ? 'Quizzes' : 'Sentences';

        const newLogic = `
    const btn1 = document.getElementById('btn-class1');
    const btn2 = document.getElementById('btn-class2');
    const btn3 = document.getElementById('btn-class3');

    const activeClass = "flex-1 py-3 px-4 rounded-md font-label-bold text-label-bold bg-primary-container text-on-primary-container inner-glow transition-all";
    const inactiveClass = "flex-1 py-3 px-4 rounded-md font-label-bold text-label-bold text-on-surface-variant transition-all";

    if (btn1) btn1.className = activeClass;
    if (btn2) btn2.className = currentDifficulty === 'medium' || currentDifficulty === 'hard' ? activeClass : inactiveClass;
    if (btn3) btn3.className = currentDifficulty === 'hard' ? activeClass : inactiveClass;

    if (currentDifficulty === 'easy') {
        if (btn1) btn1.innerHTML = \`Easy <span class="block text-xs opacity-80">\${currentQuestionIndex + 1}/\${questions.length} ${label}</span>\`;
        if (btn2) btn2.innerHTML = \`Medium <span class="block text-xs opacity-80">Locked</span>\`;
        if (btn3) btn3.innerHTML = \`Hard <span class="block text-xs opacity-80">Locked</span>\`;
    } else if (currentDifficulty === 'medium') {
        if (btn1) btn1.innerHTML = \`Easy <span class="block text-xs opacity-80">\${questions.length}/\${questions.length} ${label}</span>\`;
        if (btn2) btn2.innerHTML = \`Medium <span class="block text-xs opacity-80">\${currentQuestionIndex + 1}/\${questions.length} ${label}</span>\`;
        if (btn3) btn3.innerHTML = \`Hard <span class="block text-xs opacity-80">Locked</span>\`;
    } else if (currentDifficulty === 'hard') {
        if (btn1) btn1.innerHTML = \`Easy <span class="block text-xs opacity-80">\${questions.length}/\${questions.length} ${label}</span>\`;
        if (btn2) btn2.innerHTML = \`Medium <span class="block text-xs opacity-80">\${questions.length}/\${questions.length} ${label}</span>\`;
        if (btn3) btn3.innerHTML = \`Hard <span class="block text-xs opacity-80">\${currentQuestionIndex + 1}/\${questions.length} ${label}</span>\`;
    }
    
    // Removing old level-title updates since we set innerHTML directly
    
    `;

        content = content.substring(0, startIdx) + newLogic + content.substring(endIdx);
    }

    // 3. Remove the level-title and level-subtitle update lines further down
    content = content.replace(/let displayTitle = '';[\s\S]*?document\.getElementById\('level-subtitle'\)\.innerText = `\$\{currentQuestionIndex \+ 1\}\/\$\{questions\.length\} (Quizzes|Sentences)`;/g, '');

    fs.writeFileSync(file, content);
    console.log(`Patched ${file}`);
});
