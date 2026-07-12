const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'public', 'pages', 'big-o.html');
const tsxPath = path.join(__dirname, 'laborat_rio_de_fundamentos_computacionais.tsx');

let html = fs.readFileSync(htmlPath, 'utf8');
let tsx = fs.readFileSync(tsxPath, 'utf8');

// 1. Process TSX
// Remove the imports as we will handle them manually in the wrapper to be sure, or just keep them since import map handles them!
// Actually, import map handles `lucide-react` and `react`. Let's just modify the `App` export and the `min-h-screen` class.

tsx = tsx.replace('export default function App()', 'function App()');
tsx = tsx.replace('className="min-h-screen bg-slate-950', 'className="min-h-full h-full relative bg-slate-950');

// Extract the imports from tsx
const importsBlock = `
import { createRoot } from 'react-dom/client';
`;

const tsxCode = `
${importsBlock}
${tsx}

const root = createRoot(document.getElementById('react-lab-root'));
root.render(<App />);
`;

// 2. Inject into HTML

// Add dependencies to <head>
const dependencies = `
  <!-- React Lab Dependencies -->
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18?dev",
        "react-dom/client": "https://esm.sh/react-dom@18/client?dev",
        "lucide-react": "https://esm.sh/lucide-react@0.292.0"
      }
    }
  </script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script>
    tailwind = {
      corePlugins: {
        preflight: false,
      }
    }
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>`;

html = html.replace('</head>', dependencies);

// Add Navigation Link
const navLink = `<a href="#amortizada">Amortizada</a>\n      <a href="#laboratorio">Laboratório</a>`;
html = html.replace('<a href="#amortizada">Amortizada</a>', navLink);

// Add Section to <main>
const labSection = `
    <!-- ── LABORATÓRIO INTERATIVO (REACT APP) ── -->
    <section id="laboratorio">
      <div class="card" style="padding: 0; overflow: hidden; border: none; background: transparent;">
        <div id="react-lab-root" style="height: 90vh; overflow-y: auto; border: 1px solid var(--border); border-radius: 14px; position: relative;"></div>
      </div>
    </section>
  </main>`;
html = html.replace('</main>', labSection);

// Add Script to end of body
const reactScript = `
  <script type="text/babel" data-type="module">
${tsxCode}
  </script>
</body>`;
html = html.replace('</body>', reactScript);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Successfully injected React Lab into big-o.html');
