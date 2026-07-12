/**
 * ============================================================
 * LogicLab — quantum.js
 * Módulo de Lógica Quântica
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Quantum = (function () {
    'use strict';

    let blochInst = null;
    let history = [];

    // Estado Atual do Qubit (amplitudes complexas [re, im])
    // Inicialmente |0⟩
    let state = {
        alpha: [1, 0],
        beta: [0, 0]
    };

    const mathSqrt2 = Math.sqrt(2);
    const gates = {
        'X': { name: 'Pauli-X (NOT)', matrix: [[[0,0], [1,0]], [[1,0], [0,0]]], desc: 'Inverte |0⟩ e |1⟩.' },
        'Y': { name: 'Pauli-Y', matrix: [[[0,0], [0,-1]], [[0,1], [0,0]]], desc: 'Rotação de 180° ao redor do eixo Y.' },
        'Z': { name: 'Pauli-Z', matrix: [[[1,0], [0,0]], [[0,0], [-1,0]]], desc: 'Inverte a fase de |1⟩.' },
        'H': { name: 'Hadamard', matrix: [[[1/mathSqrt2,0], [1/mathSqrt2,0]], [[1/mathSqrt2,0], [-1/mathSqrt2,0]]], desc: 'Cria superposição igual.' },
        'S': { name: 'Phase (S)', matrix: [[[1,0], [0,0]], [[0,0], [0,1]]], desc: 'Rotação de 90° ao redor do eixo Z.' },
        'T': { name: 'T (π/8)', matrix: [[[1,0], [0,0]], [[Math.cos(Math.PI/4),Math.sin(Math.PI/4)], [0,0]]], desc: 'Rotação de 45° ao redor do eixo Z.' }
    };

    function init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const html = `
            <div class="animate-fade-in">
                <h2>Lógica Quântica</h2>
                <p>Explore um qubit individual usando a Esfera de Bloch. Aplique portas quânticas e realize medições.</p>
                
                <div class="split-view">
                    <!-- Esquerda: Controles e Estado -->
                    <div class="split-panel">
                        <h3>Estado Atual |ψ⟩</h3>
                        <div id="quant-state-display" class="math-display" style="font-size: 1.25rem;"></div>
                        
                        <div style="margin: 1.5rem 0;">
                            <h4>Portas Quânticas</h4>
                            <div id="quant-gates" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;"></div>
                        </div>
                        
                        <div style="margin-top: 2rem;">
                            <button class="btn btn-primary" style="width:100%; font-size:1.2rem; padding:1rem;" onclick="LogicLab.Quantum.measure()">
                                MEDIR (Colapso)
                            </button>
                        </div>
                        
                        <div style="margin-top: 2rem;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <h4>Histórico</h4>
                                <button class="btn btn-secondary btn-sm" onclick="LogicLab.Quantum.resetState()">Resetar |0⟩</button>
                            </div>
                            <ul id="quant-history" style="list-style:none; padding:0; margin-top:0.5rem; max-height:150px; overflow-y:auto; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:0.5rem; background:var(--bg-primary);">
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Direita: Esfera de Bloch -->
                    <div class="split-panel" style="display:flex; flex-direction:column;">
                        <h3 style="text-align:center;">Esfera de Bloch</h3>
                        <div class="bloch-container" id="bloch-canvas-container" style="flex:1;"></div>
                        <div style="text-align:center; margin-top:0.5rem; color:var(--text-muted); font-size:0.85rem;">
                            (Arraste para rotacionar a esfera)
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        renderGates();
        updateDisplay();
        
        // Init Bloch
        setTimeout(() => {
            const blochContainer = document.getElementById('bloch-canvas-container');
            blochInst = LogicLab.Bloch.init('bloch-canvas-container', blochContainer.clientWidth, blochContainer.clientHeight);
            updateBloch();
        }, 100);
    }

    function renderGates() {
        const container = document.getElementById('quant-gates');
        if (!container) return;
        
        let html = '';
        for (const [id, gate] of Object.entries(gates)) {
            html += `
                <button class="gate-btn" title="${gate.name}: ${gate.desc}" onclick="LogicLab.Quantum.applyGate('${id}')">
                    ${id}
                </button>
            `;
        }
        container.innerHTML = html;
    }

    function formatComplex(c) {
        let re = c[0];
        let im = c[1];
        if (Math.abs(re) < 1e-10) re = 0;
        if (Math.abs(im) < 1e-10) im = 0;
        
        if (re === 0 && im === 0) return "0";
        if (re === 0) {
            if (im === 1) return "i";
            if (im === -1) return "-i";
            return `${im.toFixed(2)}i`;
        }
        if (im === 0) return `${re.toFixed(2)}`;
        
        let sign = im > 0 ? "+" : "-";
        let imStr = Math.abs(im) === 1 ? "i" : `${Math.abs(im).toFixed(2)}i`;
        
        return `(${re.toFixed(2)} ${sign} ${imStr})`;
    }

    function updateDisplay() {
        const display = document.getElementById('quant-state-display');
        if (!display) return;
        
        let alphaStr = formatComplex(state.alpha);
        let betaStr = formatComplex(state.beta);
        
        display.innerHTML = `$$|\\psi\\rangle = ${alphaStr}|0\\rangle + ${betaStr}|1\\rangle$$`;
        
        if (window.MathJax && MathJax.typeset) {
            setTimeout(() => { MathJax.typeset(); }, 50);
        }
    }

    function updateBloch() {
        if (!blochInst) return;
        
        // Convert to Theta/Phi
        // theta = 2 * acos(|alpha|)
        // phi = arg(beta) - arg(alpha)
        
        let magAlpha = LogicLab.Utils.complexMag(state.alpha);
        // Clip para evitar NaN por precisão de float
        magAlpha = LogicLab.Utils.clamp(magAlpha, 0, 1);
        
        let theta = 2 * Math.acos(magAlpha);
        
        let argAlpha = Math.atan2(state.alpha[1], state.alpha[0]);
        let argBeta = Math.atan2(state.beta[1], state.beta[0]);
        let phi = argBeta - argAlpha;
        
        blochInst.setState(theta, phi);
    }

    function applyGate(gateId) {
        const gate = gates[gateId];
        if (!gate) return;
        
        const U = gate.matrix;
        const v = [state.alpha, state.beta];
        
        const nextV = LogicLab.Utils.matVecMul2(U, v);
        
        // Normalize (evitar drift float)
        let mag0 = LogicLab.Utils.complexMag(nextV[0]);
        let mag1 = LogicLab.Utils.complexMag(nextV[1]);
        let norm = Math.sqrt(mag0*mag0 + mag1*mag1);
        
        state.alpha = [nextV[0][0]/norm, nextV[0][1]/norm];
        state.beta = [nextV[1][0]/norm, nextV[1][1]/norm];
        
        addToHistory(`Aplicada porta ${gateId}`);
        updateDisplay();
        updateBloch();
    }

    function measure() {
        let mag0 = LogicLab.Utils.complexMag(state.alpha);
        let p0 = mag0 * mag0;
        
        let result = Math.random() < p0 ? 0 : 1;
        
        if (result === 0) {
            state.alpha = [1, 0];
            state.beta = [0, 0];
        } else {
            state.alpha = [0, 0];
            state.beta = [1, 0];
        }
        
        addToHistory(`Medição! Resultado: |${result}⟩`);
        LogicLab.Utils.showToast(`Colapso da função de onda! Qubit medido como |${result}⟩`, 'info', 4000);
        
        // Piscar tela
        document.getElementById('bloch-canvas-container').style.animation = 'collapse 0.5s ease-out';
        setTimeout(() => {
            document.getElementById('bloch-canvas-container').style.animation = '';
        }, 500);
        
        updateDisplay();
        updateBloch();
    }

    function resetState() {
        state.alpha = [1, 0];
        state.beta = [0, 0];
        history = [];
        document.getElementById('quant-history').innerHTML = '';
        addToHistory('Reset para |0⟩');
        updateDisplay();
        updateBloch();
    }
    
    function addToHistory(msg) {
        history.unshift(msg);
        if (history.length > 20) history.pop();
        
        const ul = document.getElementById('quant-history');
        if (ul) {
            let html = '';
            history.forEach((m, i) => {
                let opacity = 1 - (i * 0.1);
                if (opacity < 0.2) opacity = 0.2;
                html += `<li style="opacity:${opacity}; padding:0.25rem 0; border-bottom:1px solid rgba(255,255,255,0.05);">${m}</li>`;
            });
            ul.innerHTML = html;
        }
    }

    return {
        init,
        applyGate,
        measure,
        resetState
    };

})();
