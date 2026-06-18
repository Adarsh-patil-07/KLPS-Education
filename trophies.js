
window.openTrophyModal = function openTrophyModal() {
    loadTrophies();
    const modal = document.getElementById('trophy-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

window.closeTrophyModal = function closeTrophyModal() {
    const modal = document.getElementById('trophy-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function loadTrophies() {
    const defaultTrophies = {
        'first_steps': { id: 'first_steps', name: 'First Steps', icon: 'directions_walk', color: 'bg-primary/20 text-primary', unlocked: false },
        'century_club': { id: 'century_club', name: 'Century Club', icon: 'workspace_premium', color: 'bg-secondary/20 text-secondary', unlocked: false },
        'perfect_score': { id: 'perfect_score', name: 'Perfect Score', icon: 'verified', color: 'bg-tertiary/20 text-tertiary', unlocked: false },
        'grammar_master': { id: 'grammar_master', name: 'Grammar Master', icon: 'history_edu', color: 'bg-error/20 text-error', unlocked: false },
        'math_whiz': { id: 'math_whiz', name: 'Math Whiz', icon: 'calculate', color: 'bg-secondary-container text-on-secondary-container', unlocked: false },
        'spelling_bee': { id: 'spelling_bee', name: 'Spelling Bee', icon: 'sort_by_alpha', color: 'bg-primary-container text-on-primary-container', unlocked: false }
    };

    let savedTrophies = {};
    try {
        savedTrophies = JSON.parse(localStorage.getItem('klps_trophies') || '{}');
    } catch (e) {}

    let stars = parseInt(localStorage.getItem('sparky_stars') || '0', 10);
    if (stars >= 100) {
        savedTrophies['century_club'] = true;
        localStorage.setItem('klps_trophies', JSON.stringify(savedTrophies));
    }

    const grid = document.getElementById('trophy-modal-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Check if we are in Kannada mode
    let lang = localStorage.getItem('klps_lang') || 'en';
    const isKn = lang === 'kn';
    const knTrophies = {
        'First Steps': 'ಮೊದಲ ಹೆಜ್ಜೆ',
        'Century Club': 'ಶತಕ ವೀರ',
        'Perfect Score': 'ಪರಿಪೂರ್ಣ ಅಂಕ',
        'Grammar Master': 'ವ್ಯಾಕರಣ ಪರಿಣಿತ',
        'Math Whiz': 'ಗಣಿತ ತಜ್ಞ',
        'Spelling Bee': 'ಕಾಗುಣಿತ ಜಾಣ'
    };
    
    for (const key in defaultTrophies) {
        const trophy = defaultTrophies[key];
        const isUnlocked = savedTrophies[key] === true;
        
        const containerClasses = isUnlocked ? trophy.color : 'bg-surface-container-high text-on-surface-variant/50 grayscale';
        const iconStyle = isUnlocked ? "font-variation-settings: 'FILL' 1;" : "";
        
        let displayName = trophy.name;
        if (isKn && knTrophies[displayName]) {
            displayName = knTrophies[displayName];
        }
        
        const html = `
            <div class="flex flex-col items-center text-center group">
                <div class="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 transition-all ${isUnlocked ? 'shadow-sm group-hover:scale-110' : ''} ${containerClasses}">
                    <span class="material-symbols-outlined text-3xl md:text-4xl" style="${iconStyle}">${trophy.icon}</span>
                </div>
                <span class="font-label-bold text-[10px] md:text-xs leading-tight ${isUnlocked ? 'text-on-surface' : 'text-on-surface-variant/50'}" data-en="${trophy.name}">${displayName}</span>
            </div>
        `;
        grid.innerHTML += html;
    }
}
