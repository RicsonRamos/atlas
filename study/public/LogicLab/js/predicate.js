/**
 * ============================================================
 * LogicLab — predicate.js
 * Módulo de Lógica de Predicados
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Predicate = (function () {
    'use strict';

    // Estado local
    let universe = [
        {id:'dog', name:'Cachorro', emoji:'🐶'},
        {id:'cat', name:'Gato', emoji:'🐱'},
        {id:'bird', name:'Pássaro', emoji:'🐦'},
        {id:'joao', name:'João', emoji:'👨'},
        {id:'maria', name:'Maria', emoji:'👩'}
    ];
    
    // Predicados Unários: Nome -> Array de IDs que satisfazem
    let predicates = {
        'Animal': ['dog', 'cat', 'bird'],
        'Pessoa': ['joao', 'maria'],
        'Domestico': ['dog', 'cat']
    };
    
    // Predicados Binários (Relações): Nome -> Array de pares [id1, id2]
    let relations = {
        'Ama': [['joao', 'dog'], ['maria', 'cat']],
        'Cuida': [['maria', 'bird'], ['joao', 'cat']]
    };

    let graphInstance = null;

    function init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const html = `
            <div class="animate-fade-in">
                <h2>Lógica de Predicados</h2>
                <p>Explore quantificadores (∀, ∃) baseados em um universo de discurso e relações.</p>
                
                <div class="split-view">
                    <!-- Esquerda: Editor de Universo e Predicados -->
                    <div class="split-panel">
                        <h3>Universo de Discurso (U)</h3>
                        <div id="pred-universe-list" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;"></div>
                        
                        <h3>Predicados P(x)</h3>
                        <div id="pred-unary-list" style="margin-bottom:1rem;"></div>
                        
                        <h3>Relações R(x,y)</h3>
                        <div id="pred-binary-list" style="margin-bottom:1rem;"></div>
                    </div>
                    
                    <!-- Direita: Consultas e Grafo -->
                    <div class="split-panel" style="display:flex; flex-direction:column;">
                        <h3>Grafo de Relações</h3>
                        <div style="flex:1; min-height:300px; position:relative; background:var(--bg-primary); border-radius:var(--radius-md); overflow:hidden;">
                            <canvas id="pred-graph-canvas" style="width:100%; height:100%; display:block;"></canvas>
                        </div>
                        
                        <h3 style="margin-top:1rem;">Avaliador Lógico</h3>
                        <div class="expression-editor" style="margin-bottom:0;">
                            <select id="pred-query-select" class="input" style="margin-bottom:0.5rem;" onchange="LogicLab.Predicate.evaluateSelected()">
                                <option value="">Selecione uma consulta...</option>
                                <option value="1">∀x Animal(x) → Domestico(x)</option>
                                <option value="2">∃x Pessoa(x) ∧ Ama(x, dog)</option>
                                <option value="3">∀x Pessoa(x) → ∃y (Animal(y) ∧ Ama(x,y))</option>
                                <option value="4">∃x (Animal(x) ∧ ¬Domestico(x))</option>
                            </select>
                            <div id="pred-query-result" style="margin-top:0.5rem;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        renderUniverse();
        renderPredicates();
        renderRelations();
        
        // Setup Graph
        setTimeout(() => {
            graphInstance = LogicLab.Graph.create('pred-graph-canvas', {
                nodeRadius: 20,
                bgColor: 'var(--bg-primary)',
                textColor: 'var(--text-primary)',
                lineColor: 'var(--text-muted)'
            });
            updateGraph();
        }, 100);
    }

    function renderUniverse() {
        const container = document.getElementById('pred-universe-list');
        if (!container) return;
        
        let html = '';
        universe.forEach(obj => {
            html += `
                <div class="badge" style="display:flex; align-items:center; gap:0.25rem; font-size:1rem; padding:0.5rem;">
                    <span>${obj.emoji}</span> <span>${obj.name}</span>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderPredicates() {
        const container = document.getElementById('pred-unary-list');
        if (!container) return;
        
        let html = '';
        for (const [name, items] of Object.entries(predicates)) {
            html += `
                <div style="margin-bottom: 0.5rem;">
                    <strong>${name}(x):</strong> 
                    ${items.map(id => {
                        let obj = universe.find(u => u.id === id);
                        return obj ? obj.emoji : id;
                    }).join(', ') || 'Nenhum'}
                </div>
            `;
        }
        container.innerHTML = html;
    }

    function renderRelations() {
        const container = document.getElementById('pred-binary-list');
        if (!container) return;
        
        let html = '';
        for (const [name, pairs] of Object.entries(relations)) {
            html += `
                <div style="margin-bottom: 0.5rem;">
                    <strong>${name}(x, y):</strong><br>
                    ${pairs.map(p => {
                        let obj1 = universe.find(u => u.id === p[0]);
                        let obj2 = universe.find(u => u.id === p[1]);
                        return `${obj1 ? obj1.emoji : p[0]} → ${obj2 ? obj2.emoji : p[1]}`;
                    }).join('<br>') || 'Nenhuma'}
                </div>
            `;
        }
        container.innerHTML = html;
    }

    function updateGraph() {
        if (!graphInstance) return;
        
        graphInstance.clear();
        
        // Add nodes
        universe.forEach(obj => {
            // Cor baseada se é pessoa ou animal
            let isPerson = predicates['Pessoa'].includes(obj.id);
            let color = isPerson ? '#B388FF' : '#00E5FF';
            graphInstance.addNode(obj.id, obj.name, color, obj.emoji);
        });
        
        // Add edges
        for (const [relName, pairs] of Object.entries(relations)) {
            let color = relName === 'Ama' ? '#FF4081' : '#00FFB2';
            pairs.forEach(p => {
                graphInstance.addEdge(p[0], p[1], relName, color, true);
            });
        }
        
        graphInstance.startSimulation();
    }

    function evaluateSelected() {
        const select = document.getElementById('pred-query-select');
        const resDiv = document.getElementById('pred-query-result');
        if (!select || !resDiv) return;
        
        const val = select.value;
        let resultHTML = '';
        
        if (val === "1") {
            // ∀x Animal(x) → Domestico(x)
            let allTrue = true;
            let counterExample = null;
            
            universe.forEach(obj => {
                let isAnimal = predicates['Animal'].includes(obj.id);
                let isDomestico = predicates['Domestico'].includes(obj.id);
                if (isAnimal && !isDomestico) {
                    allTrue = false;
                    counterExample = obj;
                }
            });
            
            if (allTrue) {
                resultHTML = `<div class="toast toast-success" style="position:static; margin-top:0.5rem; animation:none;">✅ Verdadeiro para todo x.</div>`;
            } else {
                resultHTML = `<div class="toast toast-error" style="position:static; margin-top:0.5rem; animation:none;">❌ Falso. Contra-exemplo: ${counterExample.emoji} ${counterExample.name} é Animal mas não é Domestico.</div>`;
            }
        } 
        else if (val === "2") {
            // ∃x Pessoa(x) ∧ Ama(x, dog)
            let found = null;
            
            universe.forEach(obj => {
                let isPessoa = predicates['Pessoa'].includes(obj.id);
                let amaCachorro = relations['Ama'].some(p => p[0] === obj.id && p[1] === 'dog');
                if (isPessoa && amaCachorro) {
                    found = obj;
                }
            });
            
            if (found) {
                resultHTML = `<div class="toast toast-success" style="position:static; margin-top:0.5rem; animation:none;">✅ Verdadeiro. Encontrado: ${found.emoji} ${found.name}.</div>`;
            } else {
                resultHTML = `<div class="toast toast-error" style="position:static; margin-top:0.5rem; animation:none;">❌ Falso. Nenhuma pessoa ama o cachorro.</div>`;
            }
        }
        else if (val === "3") {
            // ∀x Pessoa(x) → ∃y (Animal(y) ∧ Ama(x,y))
            let allTrue = true;
            let counterExample = null;
            
            universe.forEach(x => {
                let isPessoa = predicates['Pessoa'].includes(x.id);
                if (isPessoa) {
                    let hasAnimal = false;
                    universe.forEach(y => {
                        let isAnimal = predicates['Animal'].includes(y.id);
                        let ama = relations['Ama'].some(p => p[0] === x.id && p[1] === y.id);
                        if (isAnimal && ama) hasAnimal = true;
                    });
                    
                    if (!hasAnimal) {
                        allTrue = false;
                        counterExample = x;
                    }
                }
            });
            
            if (allTrue) {
                resultHTML = `<div class="toast toast-success" style="position:static; margin-top:0.5rem; animation:none;">✅ Verdadeiro. Toda pessoa ama algum animal.</div>`;
            } else {
                resultHTML = `<div class="toast toast-error" style="position:static; margin-top:0.5rem; animation:none;">❌ Falso. ${counterExample.emoji} ${counterExample.name} não ama nenhum animal.</div>`;
            }
        }
        else if (val === "4") {
            // ∃x (Animal(x) ∧ ¬Domestico(x))
            let found = null;
            universe.forEach(obj => {
                let isAnimal = predicates['Animal'].includes(obj.id);
                let isDomestico = predicates['Domestico'].includes(obj.id);
                if (isAnimal && !isDomestico) {
                    found = obj;
                }
            });
            
            if (found) {
                resultHTML = `<div class="toast toast-success" style="position:static; margin-top:0.5rem; animation:none;">✅ Verdadeiro. Encontrado: ${found.emoji} ${found.name}.</div>`;
            } else {
                resultHTML = `<div class="toast toast-error" style="position:static; margin-top:0.5rem; animation:none;">❌ Falso. Não existe animal que não seja doméstico.</div>`;
            }
        }
        else {
            resultHTML = '';
        }
        
        resDiv.innerHTML = resultHTML;
    }

    return {
        init,
        evaluateSelected
    };

})();
