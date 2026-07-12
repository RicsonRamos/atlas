/**
 * ============================================================
 * LogicLab — app.js
 * Orquestrador principal da aplicação
 * Gerencia navegação, inicialização de módulos, UI global
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.App = (function () {
    'use strict';

    // ────────────────────────────────────────────
    // Estado da aplicação
    // ────────────────────────────────────────────
    let currentSection = 'home';
    let sidebarExpanded = true;
    let darkMode = true;

    // ────────────────────────────────────────────
    // Seções disponíveis
    // ────────────────────────────────────────────
    const sections = [
        { id: 'home', label: 'Início', icon: 'home' },
        { id: 'propositional', label: 'Proposicional', icon: 'logic' },
        { id: 'predicate', label: 'Predicados', icon: 'predicate' },
        { id: 'fuzzy', label: 'Fuzzy', icon: 'fuzzy' },
        { id: 'quantum', label: 'Quântica', icon: 'quantum' },
        { id: 'comparison', label: 'Comparação', icon: 'compare' },
        { id: 'playground', label: 'Playground', icon: 'playground' },
        { id: 'challenges', label: 'Desafios', icon: 'challenge' }
    ];

    // ────────────────────────────────────────────
    // Ícones SVG inline
    // ────────────────────────────────────────────
    const icons = {
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        logic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>',
        predicate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><line x1="10.5" y1="10.5" x2="13.5" y2="13.5"/></svg>',
        fuzzy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20 C6 8, 10 4, 12 12 C14 20, 18 4, 22 8"/></svg>',
        quantum: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
        compare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="8" height="8" rx="1"/><rect x="14" y="3" width="8" height="8" rx="1"/><rect x="2" y="13" width="8" height="8" rx="1"/><rect x="14" y="13" width="8" height="8" rx="1"/></svg>',
        playground: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
        challenge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
        menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
        chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
        download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
        trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4a2 2 0 01-2-2V5h4M18 9h2a2 2 0 002-2V5h-4M4 5h16v4c0 4-3.5 7-8 7s-8-3-8-7V5z"/><path d="M12 16v2M8 22h8M10 18h4"/></svg>'
    };

    // ────────────────────────────────────────────
    // Cards da página inicial
    // ────────────────────────────────────────────
    const homeCards = [
        {
            id: 'propositional',
            title: 'Lógica Proposicional',
            description: 'Tabelas verdade, circuitos lógicos, árvores sintáticas e avaliação passo a passo.',
            icon: 'logic',
            color: '#00E5FF',
            tags: ['Tabela Verdade', 'Circuitos', 'Parser']
        },
        {
            id: 'predicate',
            title: 'Lógica de Predicados',
            description: 'Universo visual, predicados, quantificadores ∀ ∃ e grafos de relações.',
            icon: 'predicate',
            color: '#00FFB2',
            tags: ['Quantificadores', 'Grafos', 'Universo']
        },
        {
            id: 'fuzzy',
            title: 'Lógica Fuzzy',
            description: 'Funções de pertinência, regras SE-ENTÃO, inferência e defuzzificação.',
            icon: 'fuzzy',
            color: '#FFD54F',
            tags: ['Pertinência', 'Inferência', 'Mamdani']
        },
        {
            id: 'quantum',
            title: 'Lógica Quântica',
            description: 'Qubits, portas quânticas, esfera de Bloch 3D e medição com colapso.',
            icon: 'quantum',
            color: '#FF4081',
            tags: ['Qubits', 'Bloch', 'Portas']
        },
        {
            id: 'comparison',
            title: 'Comparação',
            description: 'Compare os 4 sistemas de lógica resolvendo o mesmo problema lado a lado.',
            icon: 'compare',
            color: '#B388FF',
            tags: ['Lado a lado', 'Análise']
        },
        {
            id: 'playground',
            title: 'Playground',
            description: 'Editor livre para experimentar qualquer expressão lógica.',
            icon: 'playground',
            color: '#69F0AE',
            tags: ['Livre', 'Experimento']
        },
        {
            id: 'challenges',
            title: 'Desafios',
            description: 'Resolva desafios de lógica com correção automática e pontuação.',
            icon: 'challenge',
            color: '#FFAB40',
            tags: ['Quiz', 'Pontuação']
        }
    ];

    // ────────────────────────────────────────────
    // Desafios
    // ────────────────────────────────────────────
    const challengeData = [
        {
            id: 1,
            title: 'E Lógico',
            description: 'Monte uma expressão que é verdadeira somente quando A E B são verdadeiros.',
            hint: 'Use o operador ∧',
            answer: 'A ∧ B',
            validate: function (ast) {
                if (!ast) return false;
                var P = LogicLab.Parser;
                var table = P.generateTruthTable(ast);
                // Deve ter exatamente 1 linha true (A=T, B=T)
                var trueRows = table.rows.filter(function (r) { return r[r.length - 1] === true; });
                return trueRows.length === 1 && trueRows[0][0] === true && trueRows[0][1] === true;
            },
            points: 10
        },
        {
            id: 2,
            title: 'OU Exclusivo',
            description: 'Monte uma expressão verdadeira quando exatamente uma das duas variáveis (A ou B) é verdadeira.',
            hint: 'Pense em XOR',
            answer: 'A ⊕ B',
            validate: function (ast) {
                if (!ast) return false;
                var P = LogicLab.Parser;
                var table = P.generateTruthTable(ast);
                var trueRows = table.rows.filter(function (r) { return r[r.length - 1] === true; });
                return trueRows.length === 2;
            },
            points: 15
        },
        {
            id: 3,
            title: 'De Morgan',
            description: 'Crie uma expressão equivalente a ¬(A ∧ B) sem usar ∧ dentro da negação.',
            hint: 'Lei de De Morgan: ¬(A ∧ B) = ¬A ∨ ¬B',
            answer: '¬A ∨ ¬B',
            validate: function (ast) {
                if (!ast) return false;
                var P = LogicLab.Parser;
                var table = P.generateTruthTable(ast);
                // Deve ter 3 linhas true (mesma tabela que NAND)
                var trueRows = table.rows.filter(function (r) { return r[r.length - 1] === true; });
                return trueRows.length === 3;
            },
            points: 20
        },
        {
            id: 4,
            title: 'Implicação',
            description: 'Crie uma expressão usando A → B. Quantas linhas da tabela verdade são verdadeiras?',
            hint: 'A → B é falso apenas quando A=V e B=F',
            answer: 'A → B',
            validate: function (ast) {
                if (!ast) return false;
                var P = LogicLab.Parser;
                var table = P.generateTruthTable(ast);
                var trueRows = table.rows.filter(function (r) { return r[r.length - 1] === true; });
                return trueRows.length === 3;
            },
            points: 15
        },
        {
            id: 5,
            title: 'Tautologia',
            description: 'Crie uma expressão que é SEMPRE verdadeira, independente dos valores de A e B.',
            hint: 'Pense em A ∨ ¬A',
            answer: 'A ∨ ¬A',
            validate: function (ast) {
                if (!ast) return false;
                var P = LogicLab.Parser;
                var table = P.generateTruthTable(ast);
                var trueRows = table.rows.filter(function (r) { return r[r.length - 1] === true; });
                return trueRows.length === table.rows.length;
            },
            points: 25
        },
        {
            id: 6,
            title: 'Três Variáveis',
            description: 'Crie uma expressão com A, B e C verdadeira apenas quando pelo menos 2 são verdadeiras.',
            hint: 'Combine pares com AND e depois com OR',
            answer: '(A ∧ B) ∨ (A ∧ C) ∨ (B ∧ C)',
            validate: function (ast) {
                if (!ast) return false;
                var P = LogicLab.Parser;
                var table = P.generateTruthTable(ast);
                var trueRows = table.rows.filter(function (r) { return r[r.length - 1] === true; });
                // Majority: 4 rows true out of 8
                return trueRows.length === 4;
            },
            points: 30
        }
    ];

    let challengeScores = {};

    // ────────────────────────────────────────────
    // Inicialização
    // ────────────────────────────────────────────
    function init() {
        // Carregar configurações salvas
        var savedTheme = LogicLab.Utils.loadFromStorage('logiclab-theme');
        if (savedTheme === 'light') {
            darkMode = false;
            document.body.classList.add('light-theme');
        }

        challengeScores = LogicLab.Utils.loadFromStorage('logiclab-scores') || {};

        // Construir UI
        buildSidebar();
        buildHeader();
        buildSections();
        renderHome();

        // Event listeners globais
        setupKeyboardShortcuts();
        setupResizeHandler();

        // Navegar para seção salva ou home
        var savedSection = LogicLab.Utils.loadFromStorage('logiclab-section') || 'home';
        navigateTo(savedSection);

        console.log('%c🧪 LogicLab iniciado!', 'color: #00E5FF; font-size: 16px; font-weight: bold;');
    }

    // ────────────────────────────────────────────
    // Construção da Sidebar
    // ────────────────────────────────────────────
    function buildSidebar() {
        var sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        var nav = document.createElement('nav');
        nav.className = 'sidebar-nav';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navegação principal');

        // Logo
        var logo = document.createElement('div');
        logo.className = 'sidebar-logo';
        logo.innerHTML = '<span class="logo-icon">🧪</span><span class="logo-text">LogicLab</span>';
        sidebar.appendChild(logo);

        // Botão toggle
        var toggleBtn = document.createElement('button');
        toggleBtn.className = 'sidebar-toggle-btn';
        toggleBtn.setAttribute('aria-label', 'Expandir/recolher menu');
        toggleBtn.innerHTML = icons.chevronLeft;
        toggleBtn.addEventListener('click', toggleSidebar);
        sidebar.appendChild(toggleBtn);

        // Itens de navegação
        sections.forEach(function (section) {
            var item = document.createElement('button');
            item.className = 'sidebar-item';
            item.setAttribute('data-section', section.id);
            item.setAttribute('aria-label', section.label);
            item.setAttribute('title', section.label);

            var iconSpan = document.createElement('span');
            iconSpan.className = 'sidebar-item-icon';
            iconSpan.innerHTML = icons[section.icon] || '';

            var labelSpan = document.createElement('span');
            labelSpan.className = 'sidebar-item-label';
            labelSpan.textContent = section.label;

            item.appendChild(iconSpan);
            item.appendChild(labelSpan);

            item.addEventListener('click', function () {
                navigateTo(section.id);
            });

            nav.appendChild(item);
        });

        sidebar.appendChild(nav);

        // Botão de retorno ao Roadmap
        var backItem = document.createElement('a');
        backItem.className = 'sidebar-item back-to-roadmap';
        backItem.href = '/';
        backItem.setAttribute('aria-label', 'Voltar ao Roadmap');
        backItem.setAttribute('title', 'Voltar ao Roadmap');
        backItem.style.borderTop = '1px solid var(--border-color)';
        backItem.style.padding = 'var(--spacing-md)';
        backItem.style.color = '#ff5555';
        backItem.style.display = 'flex';
        backItem.style.alignItems = 'center';
        backItem.style.textDecoration = 'none';

        var backIconSpan = document.createElement('span');
        backIconSpan.className = 'sidebar-item-icon';
        backIconSpan.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';

        var backLabelSpan = document.createElement('span');
        backLabelSpan.className = 'sidebar-item-label';
        backLabelSpan.textContent = 'Voltar ao Roadmap';
        backLabelSpan.style.transition = 'opacity var(--transition-fast)';

        backItem.appendChild(backIconSpan);
        backItem.appendChild(backLabelSpan);
        sidebar.appendChild(backItem);
    }

    // ────────────────────────────────────────────
    // Construção do Header
    // ────────────────────────────────────────────
    function buildHeader() {
        var header = document.getElementById('app-header');
        if (!header) return;

        // Botão mobile menu
        var menuBtn = document.createElement('button');
        menuBtn.className = 'header-menu-btn';
        menuBtn.innerHTML = icons.menu;
        menuBtn.setAttribute('aria-label', 'Menu');
        menuBtn.addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });

        // Título da seção atual
        var title = document.createElement('h2');
        title.className = 'header-title';
        title.id = 'header-title';
        title.textContent = 'Início';

        // Barra de busca
        var searchWrap = document.createElement('div');
        searchWrap.className = 'header-search';
        searchWrap.innerHTML = icons.search + '<input type="text" placeholder="Buscar..." aria-label="Buscar" id="global-search">';

        // Controles
        var controls = document.createElement('div');
        controls.className = 'header-controls';

        // Toggle tema
        var themeBtn = document.createElement('button');
        themeBtn.className = 'btn btn-icon';
        themeBtn.id = 'theme-toggle';
        themeBtn.innerHTML = darkMode ? icons.sun : icons.moon;
        themeBtn.setAttribute('aria-label', 'Alternar tema');
        themeBtn.addEventListener('click', toggleTheme);
        controls.appendChild(themeBtn);

        header.appendChild(menuBtn);
        header.appendChild(title);
        header.appendChild(searchWrap);
        header.appendChild(controls);
    }

    // ────────────────────────────────────────────
    // Construção das Seções
    // ────────────────────────────────────────────
    function buildSections() {
        var main = document.getElementById('main-content');
        if (!main) return;

        sections.forEach(function (section) {
            var page = document.createElement('section');
            page.className = 'section-page';
            page.id = 'section-' + section.id;
            page.setAttribute('role', 'tabpanel');
            page.setAttribute('aria-label', section.label);
            main.appendChild(page);
        });
    }

    // ────────────────────────────────────────────
    // Navegação entre seções
    // ────────────────────────────────────────────
    function navigateTo(sectionId) {
        // Desativar seção atual
        var pages = document.querySelectorAll('.section-page');
        pages.forEach(function (p) { p.classList.remove('active'); });

        // Desativar item da sidebar
        var items = document.querySelectorAll('.sidebar-item');
        items.forEach(function (i) { i.classList.remove('active'); });

        // Ativar nova seção
        var target = document.getElementById('section-' + sectionId);
        if (target) {
            target.classList.add('active');
        }

        // Ativar item da sidebar
        var activeItem = document.querySelector('.sidebar-item[data-section="' + sectionId + '"]');
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Atualizar título
        var sectionData = sections.find(function (s) { return s.id === sectionId; });
        var titleEl = document.getElementById('header-title');
        if (titleEl && sectionData) {
            titleEl.textContent = sectionData.label;
        }

        // Inicializar conteúdo da seção se necessário
        initSectionContent(sectionId);

        // Salvar estado
        currentSection = sectionId;
        LogicLab.Utils.saveToStorage('logiclab-section', sectionId);

        // Fechar menu mobile
        var sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('mobile-open');
    }

    // ────────────────────────────────────────────
    // Inicialização sob demanda das seções
    // ────────────────────────────────────────────
    function initSectionContent(sectionId) {
        var container = document.getElementById('section-' + sectionId);
        if (!container || container.getAttribute('data-initialized') === 'true') return;

        switch (sectionId) {
            case 'home':
                renderHome();
                break;
            case 'propositional':
                if (LogicLab.Propositional) LogicLab.Propositional.init('section-propositional');
                break;
            case 'predicate':
                if (LogicLab.Predicate) LogicLab.Predicate.init('section-predicate');
                break;
            case 'fuzzy':
                if (LogicLab.Fuzzy) LogicLab.Fuzzy.init('section-fuzzy');
                break;
            case 'quantum':
                if (LogicLab.Quantum) LogicLab.Quantum.init('section-quantum');
                break;
            case 'comparison':
                renderComparison();
                break;
            case 'playground':
                renderPlayground();
                break;
            case 'challenges':
                renderChallenges();
                break;
        }

        container.setAttribute('data-initialized', 'true');
    }

    // ────────────────────────────────────────────
    // Página Inicial
    // ────────────────────────────────────────────
    function renderHome() {
        var container = document.getElementById('section-home');
        if (!container) return;

        var html = '<div class="home-hero animate-fade-in">';
        html += '<h1 class="home-title">🧪 LogicLab</h1>';
        html += '<p class="home-subtitle">Laboratório Interativo de Lógica</p>';
        html += '<p class="home-desc">Explore quatro sistemas de lógica através de visualizações interativas, simuladores e desafios.</p>';
        html += '</div>';

        html += '<div class="home-grid">';

        homeCards.forEach(function (card, i) {
            html += '<div class="card card-lg hover-lift stagger-' + (i + 1) + ' animate-slide-up" ';
            html += 'data-section="' + card.id + '" ';
            html += 'style="--card-accent: ' + card.color + '" ';
            html += 'onclick="LogicLab.App.navigateTo(\'' + card.id + '\')" ';
            html += 'role="button" tabindex="0" aria-label="' + card.title + '">';

            html += '<div class="card-icon" style="color: ' + card.color + '">';
            html += icons[card.icon] || '';
            html += '</div>';
            html += '<h3 class="card-title">' + card.title + '</h3>';
            html += '<p class="card-description">' + card.description + '</p>';
            html += '<div class="card-tags">';
            card.tags.forEach(function (tag) {
                html += '<span class="badge" style="border-color: ' + card.color + '; color: ' + card.color + '">' + tag + '</span>';
            });
            html += '</div>';
            html += '</div>';
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // ────────────────────────────────────────────
    // Comparação
    // ────────────────────────────────────────────
    function renderComparison() {
        var container = document.getElementById('section-comparison');
        if (!container) return;

        var html = '<div class="comparison-intro animate-fade-in">';
        html += '<h2>Comparação de Sistemas Lógicos</h2>';
        html += '<p>Veja como o mesmo conceito se manifesta em cada sistema de lógica.</p>';
        html += '</div>';

        html += '<div class="comparison-problem">';
        html += '<h3>Problema: "O semáforo está verde?"</h3>';
        html += '</div>';

        html += '<div class="split-view">';

        // Proposicional
        html += '<div class="split-panel">';
        html += '<h4 style="color: #00E5FF">Proposicional</h4>';
        html += '<div class="math-display">$$P = \\text{verde}$$</div>';
        html += '<p>Resultado: <span class="badge" style="background: #00FFB2; color: #000">Verdadeiro</span> ou <span class="badge" style="background: #FF4081; color: #fff">Falso</span></p>';
        html += '<p class="text-muted">Valor binário: {0, 1}</p>';
        html += '</div>';

        // Predicados
        html += '<div class="split-panel">';
        html += '<h4 style="color: #00FFB2">Predicados</h4>';
        html += '<div class="math-display">$$\\forall x\\, \\text{Semáforo}(x) \\rightarrow \\text{Verde}(x)$$</div>';
        html += '<p>Quantifica sobre todos os semáforos do universo.</p>';
        html += '<p class="text-muted">Depende do domínio de discurso.</p>';
        html += '</div>';

        // Fuzzy
        html += '<div class="split-panel">';
        html += '<h4 style="color: #FFD54F">Fuzzy</h4>';
        html += '<div class="math-display">$$\\mu_{\\text{verde}}(x) = 0.73$$</div>';
        html += '<p>Grau de pertinência: o semáforo é 73% verde.</p>';
        html += '<p class="text-muted">Valor contínuo: [0, 1]</p>';
        html += '</div>';

        // Quântica
        html += '<div class="split-panel">';
        html += '<h4 style="color: #FF4081">Quântica</h4>';
        html += '<div class="math-display">$$|\\psi\\rangle = \\sqrt{0.73}|\\text{verde}\\rangle + \\sqrt{0.27}|\\text{vermelho}\\rangle$$</div>';
        html += '<p>Em superposição até a medição (colapso).</p>';
        html += '<p class="text-muted">Amplitudes complexas: α|0⟩ + β|1⟩</p>';
        html += '</div>';

        html += '</div>';

        // Tabela comparativa
        html += '<div class="comparison-table-wrap animate-slide-up">';
        html += '<h3>Resumo Comparativo</h3>';
        html += '<table class="truth-table">';
        html += '<thead><tr><th>Aspecto</th><th>Proposicional</th><th>Predicados</th><th>Fuzzy</th><th>Quântica</th></tr></thead>';
        html += '<tbody>';
        html += '<tr><td>Valores</td><td>{V, F}</td><td>{V, F}</td><td>[0, 1]</td><td>α|0⟩+β|1⟩</td></tr>';
        html += '<tr><td>Variáveis</td><td>Proposições</td><td>Objetos + Predicados</td><td>Linguísticas</td><td>Qubits</td></tr>';
        html += '<tr><td>Operadores</td><td>∧ ∨ ¬ → ↔</td><td>∀ ∃ ∧ ∨ ¬</td><td>MIN MAX 1-x</td><td>Portas unitárias</td></tr>';
        html += '<tr><td>Aplicação</td><td>Circuitos digitais</td><td>Bancos de dados</td><td>Controle</td><td>Computação quântica</td></tr>';
        html += '</tbody></table>';
        html += '</div>';

        container.innerHTML = html;

        // Re-renderizar MathJax
        if (window.MathJax && MathJax.typeset) {
            setTimeout(function () { MathJax.typeset(); }, 100);
        }
    }

    // ────────────────────────────────────────────
    // Playground
    // ────────────────────────────────────────────
    function renderPlayground() {
        var container = document.getElementById('section-playground');
        if (!container) return;

        var html = '<div class="playground-section animate-fade-in">';
        html += '<h2>🛠️ Playground Livre</h2>';
        html += '<p>Digite qualquer expressão lógica e veja a avaliação completa.</p>';

        html += '<div class="expression-editor">';
        html += '<input type="text" class="input" id="playground-input" placeholder="Ex: (A ∧ B) ∨ ¬C" value="(A ∧ B) ∨ ¬C" aria-label="Expressão lógica">';
        html += '<div class="editor-buttons">';
        var ops = ['∧', '∨', '¬', '⊕', '→', '↔', '(', ')'];
        ops.forEach(function (op) {
            html += '<button class="btn btn-secondary btn-sm" onclick="LogicLab.App.insertPlayground(\'' + op + '\')">' + op + '</button>';
        });
        var vars = ['A', 'B', 'C', 'D', 'E'];
        vars.forEach(function (v) {
            html += '<button class="btn btn-secondary btn-sm" onclick="LogicLab.App.insertPlayground(\'' + v + '\')" style="color: #00FFB2">' + v + '</button>';
        });
        html += '</div>';
        html += '<button class="btn btn-primary" onclick="LogicLab.App.evaluatePlayground()">Avaliar</button>';
        html += '</div>';

        html += '<div id="playground-results"></div>';
        html += '</div>';

        container.innerHTML = html;
    }

    function insertPlayground(text) {
        var input = document.getElementById('playground-input');
        if (input) {
            var pos = input.selectionStart || input.value.length;
            input.value = input.value.slice(0, pos) + text + input.value.slice(pos);
            input.focus();
            input.setSelectionRange(pos + text.length, pos + text.length);
        }
    }

    function evaluatePlayground() {
        var input = document.getElementById('playground-input');
        var results = document.getElementById('playground-results');
        if (!input || !results || !LogicLab.Parser) return;

        var expr = input.value.trim();
        if (!expr) return;

        try {
            var ast = LogicLab.Parser.parseExpression(expr);
            var vars = LogicLab.Parser.extractVariables(ast);
            var table = LogicLab.Parser.generateTruthTable(ast);

            var html = '';

            // Expressão formatada
            html += '<div class="card animate-fade-in" style="margin-top: 1rem">';
            html += '<h3>Expressão</h3>';
            html += '<div class="math-display" style="font-size: 1.5rem; font-family: var(--font-mono)">' + LogicLab.Parser.toUnicode(ast) + '</div>';
            html += '<p>Variáveis: ' + vars.join(', ') + ' | Linhas: ' + table.rows.length + '</p>';
            html += '</div>';

            // Tabela verdade
            html += '<div class="card animate-slide-up" style="margin-top: 1rem">';
            html += '<h3>Tabela Verdade</h3>';

            html += '<div style="overflow-x: auto">';
            html += '<table class="truth-table"><thead><tr>';
            table.headers.forEach(function (h) {
                html += '<th>' + h + '</th>';
            });
            html += '</tr></thead><tbody>';

            table.rows.forEach(function (row) {
                html += '<tr>';
                row.forEach(function (val, ci) {
                    var isResult = ci === row.length - 1;
                    var cls = val ? 'cell-true' : 'cell-false';
                    if (isResult) cls += ' cell-result';
                    html += '<td class="' + cls + '">' + (val ? 'V' : 'F') + '</td>';
                });
                html += '</tr>';
            });

            html += '</tbody></table>';
            html += '</div>';

            // Export
            html += '<div class="export-row">';
            html += '<button class="btn btn-secondary btn-sm" onclick="LogicLab.App.exportPlaygroundCSV()"><span class="btn-icon-inline">' + icons.download + '</span> CSV</button>';
            html += '</div>';

            html += '</div>';

            // Análise
            var totalTrue = table.rows.filter(function (r) { return r[r.length - 1]; }).length;
            html += '<div class="card animate-slide-up" style="margin-top: 1rem">';
            html += '<h3>Análise</h3>';
            if (totalTrue === table.rows.length) {
                html += '<p><span class="badge" style="background: #00FFB2; color: #000">Tautologia</span> — Sempre verdadeira!</p>';
            } else if (totalTrue === 0) {
                html += '<p><span class="badge" style="background: #FF4081; color: #fff">Contradição</span> — Sempre falsa!</p>';
            } else {
                html += '<p><span class="badge" style="background: #FFD54F; color: #000">Contingência</span> — ' + totalTrue + '/' + table.rows.length + ' linhas verdadeiras (' + Math.round(totalTrue / table.rows.length * 100) + '%)</p>';
            }
            html += '</div>';

            results.innerHTML = html;

            if (window.MathJax && MathJax.typeset) {
                setTimeout(function () { MathJax.typeset(); }, 100);
            }
        } catch (e) {
            results.innerHTML = '<div class="card" style="margin-top: 1rem; border-color: #FF4081;"><h3 style="color: #FF4081">Erro</h3><p>' + e.message + '</p></div>';
        }
    }

    function exportPlaygroundCSV() {
        var input = document.getElementById('playground-input');
        if (!input || !LogicLab.Parser) return;

        try {
            var ast = LogicLab.Parser.parseExpression(input.value.trim());
            var table = LogicLab.Parser.generateTruthTable(ast);
            var csv = LogicLab.Utils.exportAsCSV(table.headers, table.rows.map(function (r) {
                return r.map(function (v) { return v ? 'V' : 'F'; });
            }));
            LogicLab.Utils.downloadFile(csv, 'tabela_verdade.csv', 'text/csv');
        } catch (e) {
            LogicLab.Utils.showToast('Erro ao exportar: ' + e.message, 'error');
        }
    }

    // ────────────────────────────────────────────
    // Desafios
    // ────────────────────────────────────────────
    function renderChallenges() {
        var container = document.getElementById('section-challenges');
        if (!container) return;

        var totalScore = Object.values(challengeScores).reduce(function (a, b) { return a + b; }, 0);

        var html = '<div class="challenges-header animate-fade-in">';
        html += '<h2><span style="margin-right: 0.5rem">' + icons.trophy + '</span> Desafios de Lógica</h2>';
        html += '<div class="score-display">';
        html += '<span class="score-label">Pontuação Total:</span>';
        html += '<span class="score-value">' + totalScore + '</span>';
        html += '</div>';
        html += '</div>';

        html += '<div class="challenges-grid">';

        challengeData.forEach(function (ch, i) {
            var completed = challengeScores[ch.id] > 0;

            html += '<div class="challenge-card stagger-' + Math.min(i + 1, 6) + ' animate-slide-up' + (completed ? ' completed' : '') + '">';
            html += '<div class="challenge-header">';
            html += '<h3>' + ch.title + '</h3>';
            html += '<span class="badge">' + ch.points + ' pts</span>';
            html += '</div>';
            html += '<p>' + ch.description + '</p>';

            if (!completed) {
                html += '<div class="challenge-input-wrap">';
                html += '<input type="text" class="input" id="challenge-input-' + ch.id + '" placeholder="Sua expressão...">';
                html += '<button class="btn btn-primary btn-sm" onclick="LogicLab.App.checkChallenge(' + ch.id + ')">Verificar</button>';
                html += '</div>';
                html += '<details><summary class="text-muted" style="cursor:pointer">💡 Dica</summary><p class="text-muted">' + ch.hint + '</p></details>';
            } else {
                html += '<p style="color: #00FFB2">✅ Concluído! (+' + ch.points + ' pts)</p>';
            }

            html += '<div id="challenge-result-' + ch.id + '"></div>';
            html += '</div>';
        });

        html += '</div>';
        container.innerHTML = html;
    }

    function checkChallenge(id) {
        var ch = challengeData.find(function (c) { return c.id === id; });
        if (!ch) return;

        var input = document.getElementById('challenge-input-' + id);
        var resultDiv = document.getElementById('challenge-result-' + id);
        if (!input || !resultDiv || !LogicLab.Parser) return;

        try {
            var ast = LogicLab.Parser.parseExpression(input.value.trim());
            var correct = ch.validate(ast);

            if (correct) {
                resultDiv.innerHTML = '<p style="color: #00FFB2; margin-top: 0.5rem">✅ Correto! +' + ch.points + ' pontos!</p>';
                challengeScores[id] = ch.points;
                LogicLab.Utils.saveToStorage('logiclab-scores', challengeScores);
                // Re-render após delay para mostrar o resultado
                setTimeout(function () { renderChallenges(); }, 1500);
            } else {
                resultDiv.innerHTML = '<p style="color: #FF4081; margin-top: 0.5rem">❌ Não está correto. Tente novamente!</p>';
            }
        } catch (e) {
            resultDiv.innerHTML = '<p style="color: #FFD54F; margin-top: 0.5rem">⚠️ Expressão inválida: ' + e.message + '</p>';
        }
    }

    // ────────────────────────────────────────────
    // Toggle Sidebar
    // ────────────────────────────────────────────
    function toggleSidebar() {
        sidebarExpanded = !sidebarExpanded;
        var sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed', !sidebarExpanded);
        }
        var toggleBtn = sidebar ? sidebar.querySelector('.sidebar-toggle-btn') : null;
        if (toggleBtn) {
            toggleBtn.innerHTML = sidebarExpanded ? icons.chevronLeft : icons.chevronRight;
        }
    }

    // ────────────────────────────────────────────
    // Toggle Tema
    // ────────────────────────────────────────────
    function toggleTheme() {
        darkMode = !darkMode;
        document.body.classList.toggle('light-theme', !darkMode);
        var themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.innerHTML = darkMode ? icons.sun : icons.moon;
        }
        LogicLab.Utils.saveToStorage('logiclab-theme', darkMode ? 'dark' : 'light');
    }

    // ────────────────────────────────────────────
    // Atalhos de teclado
    // ────────────────────────────────────────────
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function (e) {
            // Ctrl+1-7 para navegar
            if (e.ctrlKey && e.key >= '1' && e.key <= '7') {
                e.preventDefault();
                var idx = parseInt(e.key) - 1;
                if (sections[idx]) navigateTo(sections[idx].id);
            }
            // Ctrl+0 para home
            if (e.ctrlKey && e.key === '0') {
                e.preventDefault();
                navigateTo('home');
            }
            // Ctrl+B toggle sidebar
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                toggleSidebar();
            }
            // Escape fecha mobile menu
            if (e.key === 'Escape') {
                var sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('mobile-open');
            }
        });
    }

    // ────────────────────────────────────────────
    // Resize handler
    // ────────────────────────────────────────────
    function setupResizeHandler() {
        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                // Auto-collapse sidebar em telas pequenas
                if (window.innerWidth < 768 && sidebarExpanded) {
                    sidebarExpanded = false;
                    var sidebar = document.getElementById('sidebar');
                    if (sidebar) sidebar.classList.add('collapsed');
                }
            }, 250);
        });
    }

    // ────────────────────────────────────────────
    // API Pública
    // ────────────────────────────────────────────
    return {
        init: init,
        navigateTo: navigateTo,
        toggleSidebar: toggleSidebar,
        toggleTheme: toggleTheme,
        insertPlayground: insertPlayground,
        evaluatePlayground: evaluatePlayground,
        exportPlaygroundCSV: exportPlaygroundCSV,
        checkChallenge: checkChallenge,
        icons: icons,
        sections: sections
    };

})();

// ────────────────────────────────────────────
// Inicializar quando o DOM estiver pronto
// ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    LogicLab.App.init();
});
