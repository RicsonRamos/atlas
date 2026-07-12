/**
 * ============================================================
 * LogicLab — propositional.js
 * Módulo de Lógica Proposicional
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Propositional = (function () {
    'use strict';

    let currentAST = null;

    const examples = [
        { label: "Básico", expr: "(A ∧ B) ∨ ¬C" },
        { label: "Implicação", expr: "A → B" },
        { label: "Bicondicional", expr: "A ↔ B" },
        { label: "De Morgan 1", expr: "¬(A ∧ B) ↔ (¬A ∨ ¬B)" },
        { label: "De Morgan 2", expr: "¬(A ∨ B) ↔ (¬A ∧ ¬B)" },
        { label: "XOR", expr: "(A ⊕ B) ∧ C" },
        { label: "Complexo", expr: "(A ∨ B) ∧ (¬A ∨ C) ∧ (¬B ∨ ¬C)" }
    ];

    function init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const html = `
            <div class="animate-fade-in">
                <h2>Lógica Proposicional</h2>
                <p>Construa expressões lógicas e visualize a tabela verdade, o circuito digital e a árvore sintática.</p>
                
                <div id="prop-editor-container"></div>
                
                <div class="tabs" style="margin-top: 1rem;">
                    <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
                        <button class="btn btn-secondary tab-btn active" onclick="LogicLab.Propositional.switchTab(this, 'prop-table')">Tabela Verdade</button>
                        <button class="btn btn-secondary tab-btn" onclick="LogicLab.Propositional.switchTab(this, 'prop-circuit')">Circuito Lógico</button>
                        <button class="btn btn-secondary tab-btn" onclick="LogicLab.Propositional.switchTab(this, 'prop-tree')">Árvore Sintática</button>
                        <button class="btn btn-secondary tab-btn" onclick="LogicLab.Propositional.switchTab(this, 'prop-steps')">Passo-a-Passo</button>
                    </div>
                    
                    <div id="prop-table" class="tab-panel active"></div>
                    <div id="prop-circuit" class="tab-panel" style="display:none;">
                        <div class="circuit-container" id="circuit-svg-container"></div>
                    </div>
                    <div id="prop-tree" class="tab-panel" style="display:none;">
                        <div class="tree-container" id="tree-svg-container"></div>
                    </div>
                    <div id="prop-steps" class="tab-panel" style="display:none;"></div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        renderEditor(document.getElementById('prop-editor-container'));
        
        // Carga inicial
        onExpressionChange(examples[0].expr);
    }

    function switchTab(btn, panelId) {
        // Tab buttons
        const btns = btn.parentElement.querySelectorAll('.tab-btn');
        btns.forEach(b => b.classList.remove('active', 'btn-primary'));
        btns.forEach(b => b.classList.add('btn-secondary'));
        btn.classList.remove('btn-secondary');
        btn.classList.add('active', 'btn-primary');
        
        // Panels
        const panels = btn.parentElement.parentElement.querySelectorAll('.tab-panel');
        panels.forEach(p => p.style.display = 'none');
        document.getElementById(panelId).style.display = 'block';
        
        // Re-render if needed to fix dimensions
        if (panelId === 'prop-circuit' && currentAST) {
            drawCircuit(currentAST, document.getElementById('circuit-svg-container'));
        }
        if (panelId === 'prop-tree' && currentAST) {
            drawSyntaxTree(currentAST, document.getElementById('tree-svg-container'));
        }
    }

    function renderEditor(container) {
        let html = `
            <div class="expression-editor">
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                    <input type="text" class="input" id="prop-expression-input" placeholder="Digite uma expressão..." style="flex: 1;">
                    <select class="input" id="prop-examples" style="width: 200px;" onchange="LogicLab.Propositional.loadExample(this.value)">
                        <option value="">Exemplos...</option>
                        ${examples.map((ex, i) => `<option value="${i}">${ex.label}</option>`).join('')}
                    </select>
                </div>
                <div class="editor-buttons">
                    <span style="color: var(--text-muted); font-size: 0.85rem; display: flex; align-items: center; margin-right: 0.5rem;">Operadores:</span>
        `;
        
        const ops = ['∧', '∨', '¬', '⊕', '→', '↔', '(', ')'];
        ops.forEach(op => {
            html += `<button class="btn btn-secondary btn-sm" onclick="LogicLab.Propositional.insertText('${op}')">${op}</button>`;
        });
        
        html += `<span style="color: var(--text-muted); font-size: 0.85rem; display: flex; align-items: center; margin: 0 0.5rem;">Variáveis:</span>`;
        const vars = ['A', 'B', 'C', 'D', 'E'];
        vars.forEach(v => {
            html += `<button class="btn btn-secondary btn-sm" onclick="LogicLab.Propositional.insertText('${v}')" style="color: var(--accent-green); border-color: rgba(0, 255, 178, 0.3)">${v}</button>`;
        });
        
        html += `
                    <button class="btn btn-primary btn-sm" style="margin-left: auto;" onclick="LogicLab.Propositional.evaluateCurrent()">Avaliar</button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add enter key listener
        setTimeout(() => {
            document.getElementById('prop-expression-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    evaluateCurrent();
                }
            });
        }, 100);
    }

    function loadExample(index) {
        if (index === "") return;
        const input = document.getElementById('prop-expression-input');
        if (input && examples[index]) {
            input.value = examples[index].expr;
            evaluateCurrent();
        }
    }

    function insertText(text) {
        const input = document.getElementById('prop-expression-input');
        if (input) {
            const pos = input.selectionStart || input.value.length;
            input.value = input.value.slice(0, pos) + text + input.value.slice(pos);
            input.focus();
            input.setSelectionRange(pos + text.length, pos + text.length);
        }
    }

    function evaluateCurrent() {
        const input = document.getElementById('prop-expression-input');
        if (input) {
            onExpressionChange(input.value);
        }
    }

    function onExpressionChange(expr) {
        const input = document.getElementById('prop-expression-input');
        if (input && input.value !== expr) input.value = expr;
        
        if (!expr.trim()) return;

        try {
            currentAST = LogicLab.Parser.parseExpression(expr);
            
            // Update all views
            generateTruthTableHTML(currentAST);
            
            const circuitContainer = document.getElementById('circuit-svg-container');
            if (circuitContainer && circuitContainer.parentElement.style.display !== 'none') {
                drawCircuit(currentAST, circuitContainer);
            }
            
            const treeContainer = document.getElementById('tree-svg-container');
            if (treeContainer && treeContainer.parentElement.style.display !== 'none') {
                drawSyntaxTree(currentAST, treeContainer);
            }
            
            renderStepByStep(currentAST);
            
            // Render MathJax
            if (window.MathJax && MathJax.typeset) {
                setTimeout(() => { MathJax.typeset(); }, 100);
            }
            
        } catch (e) {
            LogicLab.Utils.showToast(e.message, 'error');
            const tableContainer = document.getElementById('prop-table');
            if (tableContainer) {
                tableContainer.innerHTML = `<div class="card" style="border-color: var(--accent-pink)"><h3 style="color: var(--accent-pink)">Erro de Sintaxe</h3><p>${e.message}</p></div>`;
            }
        }
    }

    // ────────────────────────────────────────────
    // Verdade
    // ────────────────────────────────────────────
    function generateTruthTableHTML(ast) {
        const container = document.getElementById('prop-table');
        if (!container) return;

        try {
            const tableData = LogicLab.Parser.generateTruthTable(ast);
            
            let html = `
                <div class="card animate-slide-up">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3>Tabela Verdade</h3>
                        <div class="math-display" style="margin:0; padding: 0.5rem; display:inline-block;">$${LogicLab.Parser.toLatex(ast)}$</div>
                    </div>
                    <div style="overflow-x: auto;">
                        <table class="truth-table">
                            <thead>
                                <tr>
                                    ${tableData.headers.map((h, i) => {
                                        const isFinal = i === tableData.headers.length - 1;
                                        return `<th ${isFinal ? 'style="border-left: 2px solid var(--border-highlight)"' : ''}>${h}</th>`;
                                    }).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${tableData.rows.map(row => `
                                    <tr>
                                        ${row.map((val, i) => {
                                            const isFinal = i === row.length - 1;
                                            let cls = val ? 'cell-true' : 'cell-false';
                                            if (isFinal) cls += ' cell-result';
                                            return `<td class="${cls}">${val ? 'V' : 'F'}</td>`;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="export-row">
                        <button class="btn btn-secondary btn-sm" onclick="LogicLab.Propositional.exportCSV()"><span class="btn-icon-inline"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span> Exportar CSV</button>
                    </div>
                </div>
            `;
            container.innerHTML = html;
        } catch (e) {
            container.innerHTML = `<p style="color: var(--accent-pink)">Erro ao gerar tabela: ${e.message}</p>`;
        }
    }

    function exportCSV() {
        if (!currentAST) return;
        const tableData = LogicLab.Parser.generateTruthTable(currentAST);
        const csvStr = LogicLab.Utils.exportAsCSV(tableData.headers, tableData.rows.map(r => r.map(v => v ? 'V' : 'F')));
        LogicLab.Utils.downloadFile(csvStr, 'tabela_verdade.csv', 'text/csv');
    }

    // ────────────────────────────────────────────
    // Circuitos SVG
    // ────────────────────────────────────────────
    function drawCircuit(ast, container) {
        if (!ast || !container) return;
        
        container.innerHTML = '';
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        
        // Implementação simplificada de layout hierárquico
        let nodes = [];
        let links = [];
        let idCounter = 0;
        
        function traverse(node, depth, yPos) {
            const id = 'gate_' + idCounter++;
            let type = node.type;
            let label = node.name || node.type;
            
            let outNode = { id, type, label, x: depth * 120 + 50, y: yPos, inputs: [] };
            nodes.push(outNode);
            
            if (node.type === LogicLab.Parser.TokenType.VAR) {
                // Leaf
                return outNode;
            } else if (node.type === LogicLab.Parser.TokenType.NOT) {
                let in1 = traverse(node.child, depth - 1, yPos);
                links.push({ source: in1, target: outNode, port: 0 });
                outNode.inputs.push(in1);
            } else {
                let in1 = traverse(node.left, depth - 1, yPos - 30);
                let in2 = traverse(node.right, depth - 1, yPos + 30);
                links.push({ source: in1, target: outNode, port: -1 });
                links.push({ source: in2, target: outNode, port: 1 });
                outNode.inputs.push(in1, in2);
            }
            return outNode;
        }
        
        // Descobre a profundidade máxima (para colocar as variáveis na esquerda)
        function getDepth(node) {
            if (!node || node.type === LogicLab.Parser.TokenType.VAR) return 0;
            if (node.type === LogicLab.Parser.TokenType.NOT) return 1 + getDepth(node.child);
            return 1 + Math.max(getDepth(node.left), getDepth(node.right));
        }
        
        const maxDepth = getDepth(ast);
        traverse(ast, maxDepth, 200);
        
        // Centralizar usando viewBox
        let minX = Math.min(...nodes.map(n => n.x)) - 50;
        let maxX = Math.max(...nodes.map(n => n.x)) + 150;
        let minY = Math.min(...nodes.map(n => n.y)) - 50;
        let maxY = Math.max(...nodes.map(n => n.y)) + 50;
        
        svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
        
        // Draw links
        links.forEach(l => {
            let path = document.createElementNS(ns, "path");
            
            let startX = l.source.x + 30; // Saída do gate
            let startY = l.source.y;
            let endX = l.target.x - 30; // Entrada do gate
            let endY = l.target.y + (l.port * 15); // Offset para portas múltiplas
            
            if (l.source.type === 'VAR') startX = l.source.x + 10;
            
            let d = `M ${startX} ${startY} C ${startX + 30} ${startY}, ${endX - 30} ${endY}, ${endX} ${endY}`;
            
            path.setAttribute("d", d);
            path.setAttribute("stroke", "var(--text-secondary)");
            path.setAttribute("stroke-width", "2");
            path.setAttribute("fill", "none");
            
            // Animation
            path.style.strokeDasharray = "5,5";
            path.style.animation = "signalFlow 1s linear infinite";
            
            svg.appendChild(path);
        });
        
        // Draw nodes
        nodes.forEach(n => {
            let g = document.createElementNS(ns, "g");
            g.setAttribute("transform", `translate(${n.x}, ${n.y})`);
            
            if (n.type === 'VAR') {
                let rect = document.createElementNS(ns, "rect");
                rect.setAttribute("x", "-15");
                rect.setAttribute("y", "-15");
                rect.setAttribute("width", "30");
                rect.setAttribute("height", "30");
                rect.setAttribute("rx", "5");
                rect.setAttribute("fill", "var(--accent-green)");
                g.appendChild(rect);
                
                let text = document.createElementNS(ns, "text");
                text.setAttribute("x", "0");
                text.setAttribute("y", "5");
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("fill", "#000");
                text.setAttribute("font-weight", "bold");
                text.setAttribute("font-family", "var(--font-main)");
                text.textContent = n.label;
                g.appendChild(text);
            } else {
                // Desenho simplificado das portas (caixas com nomes por enquanto, svg paths podem ser complexos)
                let rect = document.createElementNS(ns, "rect");
                rect.setAttribute("x", "-30");
                rect.setAttribute("y", "-20");
                rect.setAttribute("width", "60");
                rect.setAttribute("height", "40");
                rect.setAttribute("rx", "10");
                rect.setAttribute("fill", "var(--bg-secondary)");
                rect.setAttribute("stroke", "var(--accent-cyan)");
                rect.setAttribute("stroke-width", "2");
                g.appendChild(rect);
                
                let text = document.createElementNS(ns, "text");
                text.setAttribute("x", "0");
                text.setAttribute("y", "5");
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("fill", "var(--accent-cyan)");
                text.setAttribute("font-weight", "bold");
                text.setAttribute("font-size", "12px");
                text.setAttribute("font-family", "var(--font-main)");
                
                let opName = n.type;
                if (n.type === 'BICONDITIONAL') opName = 'XNOR';
                if (n.type === 'IMPL') opName = 'IMPL';
                
                text.textContent = opName;
                g.appendChild(text);
            }
            
            svg.appendChild(g);
        });
        
        container.appendChild(svg);
        
        // Zoom/Pan básico
        let isDown = false;
        let startX, startY;
        
        svg.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.clientX;
            startY = e.clientY;
        });
        window.addEventListener('mouseup', () => { isDown = false; });
        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            let dx = e.clientX - startX;
            let dy = e.clientY - startY;
            
            minX -= dx;
            minY -= dy;
            svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
            
            startX = e.clientX;
            startY = e.clientY;
        });
    }

    // ────────────────────────────────────────────
    // Árvore Sintática
    // ────────────────────────────────────────────
    function drawSyntaxTree(ast, container) {
        if (!ast || !container) return;
        
        container.innerHTML = '';
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        
        let nodes = [];
        let links = [];
        let idCounter = 0;
        
        // Basic layout algorithm (tree)
        function calcLayout(node, depth, offset) {
            if (!node) return null;
            
            const id = 'node_' + idCounter++;
            let outNode = { id, type: node.type, label: node.name || LogicLab.Parser.toUnicode({type:node.type, left:node.left, right:node.right, child:node.child}), x: 0, y: depth * 80, nodeRef: node };
            
            if (node.type === LogicLab.Parser.TokenType.VAR) {
                outNode.x = offset;
                nodes.push(outNode);
                return { node: outNode, width: 60 };
            }
            
            if (node.type === LogicLab.Parser.TokenType.NOT) {
                let childRes = calcLayout(node.child, depth + 1, offset);
                outNode.x = childRes.node.x;
                links.push({ source: outNode, target: childRes.node });
                nodes.push(outNode);
                return { node: outNode, width: childRes.width };
            }
            
            let leftRes = calcLayout(node.left, depth + 1, offset);
            let rightRes = calcLayout(node.right, depth + 1, offset + leftRes.width + 20);
            
            outNode.x = (leftRes.node.x + rightRes.node.x) / 2;
            links.push({ source: outNode, target: leftRes.node });
            links.push({ source: outNode, target: rightRes.node });
            nodes.push(outNode);
            
            return { node: outNode, width: leftRes.width + rightRes.width + 20 };
        }
        
        calcLayout(ast, 1, 0);
        
        let minX = Math.min(...nodes.map(n => n.x)) - 50;
        let maxX = Math.max(...nodes.map(n => n.x)) + 50;
        let minY = 0;
        let maxY = Math.max(...nodes.map(n => n.y)) + 100;
        
        svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
        
        links.forEach(l => {
            let line = document.createElementNS(ns, "line");
            line.setAttribute("x1", l.source.x);
            line.setAttribute("y1", l.source.y);
            line.setAttribute("x2", l.target.x);
            line.setAttribute("y2", l.target.y);
            line.setAttribute("stroke", "var(--text-secondary)");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);
        });
        
        nodes.forEach(n => {
            let g = document.createElementNS(ns, "g");
            g.setAttribute("transform", `translate(${n.x}, ${n.y})`);
            
            let circle = document.createElementNS(ns, "circle");
            circle.setAttribute("r", "20");
            circle.setAttribute("fill", n.type === 'VAR' ? 'var(--accent-green)' : 'var(--bg-secondary)');
            circle.setAttribute("stroke", n.type === 'VAR' ? 'none' : 'var(--accent-cyan)');
            circle.setAttribute("stroke-width", "2");
            g.appendChild(circle);
            
            let text = document.createElementNS(ns, "text");
            text.setAttribute("x", "0");
            text.setAttribute("y", "5");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("fill", n.type === 'VAR' ? '#000' : 'var(--accent-cyan)');
            text.setAttribute("font-weight", "bold");
            text.setAttribute("font-family", "var(--font-main)");
            
            let lbl = n.type;
            if (n.type === 'VAR') lbl = n.label;
            else if (n.type === 'AND') lbl = '∧';
            else if (n.type === 'OR') lbl = '∨';
            else if (n.type === 'NOT') lbl = '¬';
            else if (n.type === 'XOR') lbl = '⊕';
            else if (n.type === 'IMPL') lbl = '→';
            else if (n.type === 'BICONDITIONAL') lbl = '↔';
            
            text.textContent = lbl;
            g.appendChild(text);
            svg.appendChild(g);
        });
        
        container.appendChild(svg);
    }

    // ────────────────────────────────────────────
    // Passo-a-passo
    // ────────────────────────────────────────────
    function renderStepByStep(ast) {
        const container = document.getElementById('prop-steps');
        if (!container) return;
        
        const subs = LogicLab.Parser.getSubExpressions(ast);
        if (subs.length === 0) subs.push(ast); // Se for só uma variável
        
        const finalStr = LogicLab.Parser.toUnicode(ast);
        if (LogicLab.Parser.toUnicode(subs[subs.length-1]) !== finalStr && finalStr.length > 1) {
            subs.push(ast);
        }
        
        let html = '<div class="card animate-fade-in">';
        html += '<h3>Ordem de Avaliação</h3>';
        html += '<ol style="padding-left: 2rem; margin-top: 1rem;">';
        
        subs.forEach((sub, i) => {
            html += `<li style="margin-bottom: 0.5rem; font-size: 1.1rem;">
                        <span class="math-display" style="display:inline-block; padding: 0.25rem 0.5rem; margin:0;">$${LogicLab.Parser.toLatex(sub)}$</span>
                     </li>`;
        });
        
        html += '</ol>';
        html += '<p class="text-muted" style="margin-top: 1rem;">Esta é a ordem em que a máquina (e o cérebro) avalia a expressão de dentro para fora.</p>';
        html += '</div>';
        
        container.innerHTML = html;
    }

    return {
        init,
        renderEditor,
        loadExample,
        insertText,
        evaluateCurrent,
        switchTab,
        exportCSV
    };

})();
