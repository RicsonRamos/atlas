const fs = require('fs');

let html = fs.readFileSync('public/pages/big-o.html', 'utf8');

// 1. CSS adjustments for fluid layout
html = html.replace('max-width: 900px;', 'max-width: 100%;');
html = html.replace('padding: 5rem 1.25rem 4rem;', 'padding: 5rem 2.5rem 4rem;');

// Remove borders from .card
html = html.replace(/border:\s*1px solid var\(--border\);\s*border-radius:\s*14px;/g, 'border: none; border-radius: 0;');
html = html.replace(/background:\s*var\(--bg-card\);/g, 'background: transparent;');

// Remove borders from .info-card and .complexity-card
html = html.replace(/\.info-card \{\n\s*background:\s*var\(--bg\);\n\s*border:\s*1px solid var\(--border\);\n\s*border-radius:\s*10px;/g, '.info-card {\n      background: transparent;\n      border: none;\n      border-radius: 0;');
html = html.replace(/\.complexity-card \{\n\s*background:\s*var\(--bg\);\n\s*border-radius:\s*10px;\n\s*padding:\s*0\.9rem 1rem;\n\s*border:\s*1px solid var\(--border\);/g, '.complexity-card {\n      background: transparent;\n      border-radius: 0;\n      padding: 0.9rem 1rem;\n      border: none;');

// Remove borders from calc-section and calc-card
html = html.replace(/\.calc-section \{\n\s*background:\s*linear-gradient\(135deg, #0f0f1e 0%, #16162a 100%\);\n\s*border:\s*1px solid var\(--accent-mid\);\n\s*border-radius:\s*14px;/g, '.calc-section {\n      background: transparent;\n      border: none;\n      border-radius: 0;');
html = html.replace(/\.calc-card \{\n\s*background:\s*var\(--bg-card\);\n\s*border:\s*1px solid var\(--border\);\n\s*border-radius:\s*10px;/g, '.calc-card {\n      background: transparent;\n      border: none;\n      border-radius: 0;');

// Also remove border-bottom from Nav so it's more fluid? The user said "evitar box". Nav border is okay usually, but let's keep it minimal.
// Remove border from react-lab-root
html = html.replace(/border: 1px solid var\(--border\); border-radius: 14px;/g, 'border: none; border-radius: 0;');

// 2. React app modifications: remove max-w-7xl
html = html.replace(/className="max-w-7xl mx-auto/g, 'className="w-full px-6');
html = html.replace(/className="flex-1 max-w-7xl w-full mx-auto/g, 'className="flex-1 w-full px-6');

// In React app, the reader view has "bg-slate-900/30 border border-slate-800 rounded-2xl" 
// We should remove borders and backgrounds to match "avoid box"
html = html.replace(/bg-slate-900\/30 border border-slate-800 rounded-2xl/g, 'bg-transparent border-none rounded-none');
html = html.replace(/bg-slate-900\/20 border border-slate-800 rounded-2xl/g, 'bg-transparent border-none rounded-none');
html = html.replace(/bg-slate-900\/40 border border-slate-800\/50 p-5 rounded-xl/g, 'bg-transparent border-none p-5 rounded-none');

fs.writeFileSync('public/pages/big-o.html', html, 'utf8');
console.log('Made big-o.html full width and fluid');
