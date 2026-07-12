/**
 * ============================================================
 * LogicLab — utils.js
 * Utilitários compartilhados
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Utils = (function () {
    'use strict';

    // Seletores de DOM
    function $(selector) {
        return document.querySelector(selector);
    }

    function $$(selector) {
        return document.querySelectorAll(selector);
    }

    // Criador de Elementos DOM
    function createElement(tag, attrs = {}, children = []) {
        const el = document.createElement(tag);
        for (const [key, value] of Object.entries(attrs)) {
            if (key === 'className') {
                el.className = value;
            } else if (key === 'innerHTML') {
                el.innerHTML = value;
            } else if (key === 'textContent') {
                el.textContent = value;
            } else if (key.startsWith('on') && typeof value === 'function') {
                el.addEventListener(key.substring(2).toLowerCase(), value);
            } else {
                el.setAttribute(key, value);
            }
        }
        children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child);
            }
        });
        return el;
    }

    // Debounce e Throttle
    function debounce(fn, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function throttle(fn, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Download de arquivos
    function downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    // Copiar para área de transferência
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copiado para a área de transferência!', 'success');
            }).catch(err => {
                showToast('Erro ao copiar: ' + err, 'error');
            });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast('Copiado para a área de transferência!', 'success');
            } catch (err) {
                showToast('Erro ao copiar', 'error');
            }
            document.body.removeChild(textArea);
        }
    }

    // Formatação
    function formatNumber(n, decimals = 2) {
        return Number(n).toFixed(decimals);
    }

    // Geração de ID único
    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Matemática
    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function hexToRgba(hex, alpha) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Toasts (Notificações)
    function showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = createElement('div', { className: `toast toast-${type}` }, [message]);
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 300ms forwards';
            setTimeout(() => {
                if (toast.parentNode === container) {
                    container.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    // Local Storage
    function saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to storage', e);
            return false;
        }
    }

    function loadFromStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error loading from storage', e);
            return null;
        }
    }

    // Exportação
    function exportAsCSV(headers, rows) {
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
        return csvContent;
    }

    function exportAsPNG(element, filename = 'export.png') {
        // Implementação simplificada para exportar Canvas.
        // Se for um HTML genérico, precisaria do html2canvas.
        if (element.tagName.toLowerCase() === 'canvas') {
            const dataUrl = element.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = filename;
            a.click();
        } else {
            showToast('Exportação PNG requer biblioteca adicional (html2canvas)', 'error');
        }
    }

    function requestAnimFrame(callback) {
        return window.requestAnimationFrame(callback) || 
               window.webkitRequestAnimationFrame(callback) || 
               window.mozRequestAnimationFrame(callback) || 
               window.oRequestAnimationFrame(callback) || 
               window.msRequestAnimationFrame(callback) ||
               function(callback) { window.setTimeout(callback, 1000 / 60); };
    }

    // Operações com Números Complexos (Para Lógica Quântica)
    // Complex format: [real, imag]

    function complexAdd(a, b) {
        return [a[0] + b[0], a[1] + b[1]];
    }

    function complexMul(a, b) {
        return [
            a[0] * b[0] - a[1] * b[1],
            a[0] * b[1] + a[1] * b[0]
        ];
    }

    function complexMag(a) {
        return Math.sqrt(a[0]*a[0] + a[1]*a[1]);
    }

    function matMul2x2(A, B) {
        // Multiplica matrizes 2x2. M[row][col]
        return [
            [
                complexAdd(complexMul(A[0][0], B[0][0]), complexMul(A[0][1], B[1][0])),
                complexAdd(complexMul(A[0][0], B[0][1]), complexMul(A[0][1], B[1][1]))
            ],
            [
                complexAdd(complexMul(A[1][0], B[0][0]), complexMul(A[1][1], B[1][0])),
                complexAdd(complexMul(A[1][0], B[0][1]), complexMul(A[1][1], B[1][1]))
            ]
        ];
    }

    function matVecMul2(M, v) {
        // Multiplica Matriz 2x2 por Vetor 2
        return [
            complexAdd(complexMul(M[0][0], v[0]), complexMul(M[0][1], v[1])),
            complexAdd(complexMul(M[1][0], v[0]), complexMul(M[1][1], v[1]))
        ];
    }

    return {
        $,
        $$,
        createElement,
        debounce,
        throttle,
        downloadFile,
        copyToClipboard,
        formatNumber,
        generateId,
        clamp,
        lerp,
        hexToRgba,
        showToast,
        saveToStorage,
        loadFromStorage,
        exportAsCSV,
        exportAsPNG,
        requestAnimFrame,
        complexAdd,
        complexMul,
        complexMag,
        matMul2x2,
        matVecMul2
    };

})();
