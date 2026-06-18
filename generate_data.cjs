const fs = require('fs');

// Quiz Bank Generator
function generateQuizBank() {
    const bank = {};
    for (let c = 1; c <= 5; c++) {
        bank[c.toString()] = { easy: [], medium: [], hard: [] };
        for (let i = 0; i < 20; i++) {
            // Generate some random math questions to make it realistic
            const a = c * (i + 1);
            const b = c * (i % 5 + 1);
            
            bank[c.toString()].easy.push({
                question: `What is ${a} + ${b}?`,
                correct: (a + b).toString(),
                options: [(a + b).toString(), (a + b + 1).toString(), (a + b - 1).toString(), (a + b + 2).toString()].sort(() => Math.random() - 0.5),
                emoji: "🔢"
            });
            
            bank[c.toString()].medium.push({
                question: `What is ${a * 2} - ${b}?`,
                correct: (a * 2 - b).toString(),
                options: [(a * 2 - b).toString(), (a * 2 - b + 1).toString(), (a * 2 - b - 1).toString(), (a * 2 - b + 2).toString()].sort(() => Math.random() - 0.5),
                emoji: "🧮"
            });
            
            bank[c.toString()].hard.push({
                question: `What is ${a} x ${b}?`,
                correct: (a * b).toString(),
                options: [(a * b).toString(), (a * b + c).toString(), (a * b - c).toString(), (a * b + c*2).toString()].sort(() => Math.random() - 0.5),
                emoji: "✖️"
            });
        }
    }
    return `const QUIZ_BANK = ${JSON.stringify(bank, null, 2)};`;
}

// Letter Bank Generator
function generateLetterBank() {
    const bank = {};
    const words = [
        "CAT", "DOG", "SUN", "HAT", "BED", "BUG", "CAR", "COW", "PIG", "BAT", 
        "BOX", "CUP", "MAP", "NET", "PEN", "TOP", "BUS", "FOX", "JAM", "LIP"
    ];
    for (let c = 1; c <= 5; c++) {
        bank[c.toString()] = { easy: [], medium: [], hard: [] };
        for (let i = 0; i < 20; i++) {
            bank[c.toString()].easy.push({ word: words[i], emoji: "✨" });
            bank[c.toString()].medium.push({ word: words[i] + "S", emoji: "✨" });
            bank[c.toString()].hard.push({ word: words[i] + "ES", emoji: "✨" });
        }
    }
    return `const WORD_BANK = ${JSON.stringify(bank, null, 2)};`;
}

// Sentence Bank Generator
function generateSentenceBank() {
    const bank = {};
    for (let c = 1; c <= 5; c++) {
        bank[c.toString()] = { easy: [], medium: [], hard: [] };
        for (let i = 0; i < 20; i++) {
            bank[c.toString()].easy.push({
                parts: [`The cat is `, " the table."],
                correct: "under", options: ["under", "above", "in"], emoji: "🐈"
            });
            bank[c.toString()].medium.push({
                parts: [`I went to the store `, " buy milk."],
                correct: "to", options: ["to", "too", "two"], emoji: "🏪"
            });
            bank[c.toString()].hard.push({
                parts: [`The experiment yielded `, " results."],
                correct: "unexpected", options: ["unexpected", "unexpecting", "unexpect"], emoji: "🔬"
            });
        }
    }
    return `const SENTENCE_BANK = ${JSON.stringify(bank, null, 2)};`;
}

function processFile(filename, bankName, generatorFunc) {
    let content = fs.readFileSync(filename, 'utf8');
    const regex = new RegExp(`const ${bankName} = \\{[\\s\\S]*?\\};`, 'm');
    content = content.replace(regex, generatorFunc());
    fs.writeFileSync(filename, content);
    console.log(`Updated ${filename}`);
}

processFile('quiz_time.html', 'QUIZ_BANK', generateQuizBank);
processFile('letter_drop.html', 'WORD_BANK', generateLetterBank);
processFile('word_drop.html', 'SENTENCE_BANK', generateSentenceBank);
