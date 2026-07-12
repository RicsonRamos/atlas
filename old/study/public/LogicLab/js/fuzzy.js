/**
 * ============================================================
 * LogicLab — fuzzy.js
 * Módulo de Lógica Fuzzy (Mamdani)
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Fuzzy = (function () {
    'use strict';

    let charts = {};

    const state = {
        inputs: {
            'Temperatura': { min: 0, max: 50, value: 25, sets: [
                { name: 'Frio', params: [-20, 0, 20], color: '#00E5FF' },
                { name: 'Morno', params: [10, 25, 40], color: '#FFD54F' },
                { name: 'Quente', params: [30, 50, 70], color: '#FF4081' }
            ]},
            'Umidade': { min: 0, max: 100, value: 50, sets: [
                { name: 'Baixa', params: [-40, 0, 40], color: '#00E5FF' },
                { name: 'Media', params: [20, 50, 80], color: '#FFD54F' },
                { name: 'Alta', params: [60, 100, 140], color: '#FF4081' }
            ]}
        },
        output: {
            name: 'Ventilador', min: 0, max: 100, sets: [
                { name: 'Lento', params: [-40, 0, 40], color: '#00E5FF' },
                { name: 'Medio', params: [20, 50, 80], color: '#FFD54F' },
                { name: 'Rapido', params: [60, 100, 140], color: '#FF4081' }
            ]
        },
        rules: [
            { id: 1, conds: [{v:'Temperatura', s:'Frio'}, {op:'AND', v:'Umidade', s:'Baixa'}], cons: 'Lento' },
            { id: 2, conds: [{v:'Temperatura', s:'Morno'}], cons: 'Medio' },
            { id: 3, conds: [{v:'Temperatura', s:'Quente'}], cons: 'Rapido' },
            { id: 4, conds: [{v:'Temperatura', s:'Frio'}, {op:'AND', v:'Umidade', s:'Alta'}], cons: 'Medio' }
        ],
        currentResult: { crisp: 0, aggregated: [] }
    };

    function init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const html = `
            <div class="animate-fade-in">
                <h2>Lógica Fuzzy</h2>
                <p>Sistema de Inferência Mamdani. Altere as entradas para ver como as regras são ativadas e o resultado é defuzzificado.</p>
                
                <div class="split-view">
                    <!-- Entradas -->
                    <div class="split-panel">
                        <h3>Variáveis de Entrada</h3>
                        <div id="fuzzy-inputs"></div>
                    </div>
                    
                    <!-- Regras e Saída -->
                    <div class="split-panel">
                        <h3>Regras Ativas (Inferência)</h3>
                        <div id="fuzzy-rules" style="margin-bottom:1rem; max-height:200px; overflow-y:auto;"></div>
                        
                        <h3>Saída Defuzzificada (Centroide)</h3>
                        <div style="background:var(--bg-primary); border-radius:var(--radius-md); padding:1rem;">
                            <canvas id="fuzzy-output-chart" height="150"></canvas>
                        </div>
                        <div id="fuzzy-result-text" class="math-display" style="font-size:1.5rem; margin-top:1rem; color:var(--accent-green)">
                            Ventilador = 0.00%
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        renderInputs();
        updateAll();
    }

    function renderInputs() {
        const container = document.getElementById('fuzzy-inputs');
        if (!container) return;
        
        let html = '';
        Object.keys(state.inputs).forEach(vName => {
            let v = state.inputs[vName];
            html += `
                <div style="margin-bottom: 2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong>${vName}</strong>
                        <span id="fuzzy-val-${vName}" class="badge">${v.value}</span>
                    </div>
                    <input type="range" class="fuzzy-slider" min="${v.min}" max="${v.max}" value="${v.value}" 
                           oninput="LogicLab.Fuzzy.onInputChange('${vName}', this.value)">
                    <div style="background:var(--bg-primary); border-radius:var(--radius-md); margin-top:0.5rem;">
                        <canvas id="fuzzy-chart-${vName}" height="100"></canvas>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Inicializa gráficos de entrada
        Object.keys(state.inputs).forEach(vName => {
            renderInputChart(vName);
        });
    }

    function onInputChange(vName, value) {
        state.inputs[vName].value = parseFloat(value);
        document.getElementById(`fuzzy-val-${vName}`).innerText = value;
        updateAll();
    }

    // Função de Pertinência Triangular
    function triMF(x, a, b, c) {
        if (x <= a) return 0;
        if (x >= c) return 0;
        if (x === b) return 1;
        if (x < b) return (x - a) / (b - a);
        return (c - x) / (c - b);
    }

    function getMembership(varData, setName, x) {
        const set = varData.sets.find(s => s.name === setName);
        if (!set) return 0;
        return triMF(x, set.params[0], set.params[1], set.params[2]);
    }

    function renderInputChart(vName) {
        const canvasId = `fuzzy-chart-${vName}`;
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        if (charts[canvasId]) {
            charts[canvasId].destroy();
        }
        
        const v = state.inputs[vName];
        
        // Gerar dados do eixo X
        const labels = [];
        const datasets = [];
        
        const points = 50;
        const step = (v.max - v.min) / points;
        
        for (let i=0; i<=points; i++) {
            labels.push(v.min + (i*step));
        }
        
        // Dataset para cada conjunto
        v.sets.forEach(set => {
            const data = labels.map(x => triMF(x, set.params[0], set.params[1], set.params[2]));
            datasets.push({
                label: set.name,
                data: data,
                borderColor: set.color,
                borderWidth: 2,
                fill: false,
                tension: 0,
                pointRadius: 0
            });
        });
        
        // Linha vertical para valor atual
        datasets.push({
            label: 'Atual',
            data: labels.map(x => (Math.abs(x - v.value) <= step/2) ? 1 : 0),
            borderColor: '#FFFFFF',
            borderWidth: 1,
            borderDash: [5, 5],
            fill: true,
            backgroundColor: 'rgba(255,255,255,0.1)',
            pointRadius: 0
        });

        charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false },
                    y: { min: 0, max: 1, display: false }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: { duration: 0 } // Desativa animação para deslizar fluido
            }
        });
    }

    function evaluateRules() {
        let ruleResults = [];
        let ruleHTML = '';
        
        state.rules.forEach(rule => {
            let fireStrength = 0;
            let str = `SE `;
            
            rule.conds.forEach((c, idx) => {
                let mu = getMembership(state.inputs[c.v], c.s, state.inputs[c.v].value);
                
                if (idx === 0) {
                    fireStrength = mu;
                    str += `<span style="color:var(--accent-cyan)">${c.v} é ${c.s}</span>`;
                } else {
                    if (c.op === 'AND') {
                        fireStrength = Math.min(fireStrength, mu);
                        str += ` E <span style="color:var(--accent-cyan)">${c.v} é ${c.s}</span>`;
                    } else {
                        fireStrength = Math.max(fireStrength, mu);
                        str += ` OU <span style="color:var(--accent-cyan)">${c.v} é ${c.s}</span>`;
                    }
                }
            });
            
            str += ` ENTÃO <span style="color:var(--accent-pink)">${state.output.name} é ${rule.cons}</span>`;
            
            ruleResults.push({
                ruleId: rule.id,
                consequentSet: rule.cons,
                fireStrength: fireStrength
            });
            
            let opacity = fireStrength > 0 ? 1 : 0.3;
            ruleHTML += `
                <div style="padding:0.5rem; border-bottom:1px solid var(--border-color); opacity:${opacity}; display:flex; justify-content:space-between;">
                    <div>${str}</div>
                    <div class="badge" style="background:rgba(255,255,255,0.1)">μ = ${fireStrength.toFixed(2)}</div>
                </div>
            `;
        });
        
        document.getElementById('fuzzy-rules').innerHTML = ruleHTML;
        return ruleResults;
    }

    function defuzzify(ruleResults) {
        // Agregação (MAX das áreas clipadas)
        const points = 100;
        const out = state.output;
        const step = (out.max - out.min) / points;
        
        let aggregated = [];
        let num = 0;
        let den = 0;
        
        for (let i=0; i<=points; i++) {
            let x = out.min + (i*step);
            let maxMu = 0;
            
            // Para cada ponto x, encontra o max de pertinência entre todas as regras ativas
            ruleResults.forEach(r => {
                if (r.fireStrength > 0) {
                    let set = out.sets.find(s => s.name === r.consequentSet);
                    let mu = triMF(x, set.params[0], set.params[1], set.params[2]);
                    // Clipping de Mamdani (MIN)
                    let clippedMu = Math.min(mu, r.fireStrength);
                    maxMu = Math.max(maxMu, clippedMu);
                }
            });
            
            aggregated.push({x, mu: maxMu});
            
            // Centro de Gravidade (Centroide)
            num += x * maxMu;
            den += maxMu;
        }
        
        let crisp = den === 0 ? (out.max + out.min)/2 : num / den;
        
        state.currentResult = { crisp, aggregated };
        
        document.getElementById('fuzzy-result-text').innerText = `${out.name} = ${crisp.toFixed(2)}`;
    }

    function renderOutputChart() {
        const canvasId = `fuzzy-output-chart`;
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        if (charts[canvasId]) {
            charts[canvasId].destroy();
        }
        
        const labels = state.currentResult.aggregated.map(p => p.x);
        const data = state.currentResult.aggregated.map(p => p.mu);
        
        const datasets = [];
        
        // Área agregada preenchida
        datasets.push({
            label: 'Área Agregada',
            data: data,
            borderColor: '#FFD54F',
            backgroundColor: 'rgba(255, 213, 79, 0.5)',
            borderWidth: 2,
            fill: true,
            tension: 0,
            pointRadius: 0
        });
        
        // Linha do Centroide
        const crisp = state.currentResult.crisp;
        const step = (state.output.max - state.output.min) / 100;
        
        datasets.push({
            label: 'Centroide',
            data: labels.map(x => (Math.abs(x - crisp) <= step/2) ? 1 : 0),
            borderColor: '#00FFB2',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
        });

        charts[canvasId] = new Chart(ctx, {
            type: 'line',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false },
                    y: { min: 0, max: 1, display: false }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: { duration: 0 }
            }
        });
    }

    function updateAll() {
        Object.keys(state.inputs).forEach(vName => {
            renderInputChart(vName);
        });
        
        let ruleResults = evaluateRules();
        defuzzify(ruleResults);
        renderOutputChart();
    }

    return {
        init,
        onInputChange
    };

})();
