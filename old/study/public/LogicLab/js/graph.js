/**
 * ============================================================
 * LogicLab — graph.js
 * Visualização de Grafos (Force-Directed)
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Graph = (function () {
    'use strict';

    let instances = {};

    function create(canvasId, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        
        const config = {
            width: options.width || canvas.parentElement.clientWidth || 800,
            height: options.height || canvas.parentElement.clientHeight || 600,
            nodeRadius: options.nodeRadius || 25,
            springLength: options.springLength || 150,
            springStrength: options.springStrength || 0.05,
            repulsion: options.repulsion || 3000,
            damping: options.damping || 0.85,
            bgColor: options.bgColor || 'transparent',
            textColor: options.textColor || '#FFFFFF',
            lineColor: options.lineColor || 'rgba(255, 255, 255, 0.2)'
        };
        
        canvas.width = config.width;
        canvas.height = config.height;
        
        const state = {
            nodes: [],
            edges: [],
            animId: null,
            draggedNode: null,
            hoveredNode: null,
            mouseX: 0,
            mouseY: 0
        };

        function addNode(id, label, color, emoji) {
            if (state.nodes.find(n => n.id === id)) return;
            state.nodes.push({
                id, label, color, emoji,
                x: Math.random() * config.width,
                y: Math.random() * config.height,
                vx: 0, vy: 0,
                mass: 1
            });
        }

        function removeNode(id) {
            state.nodes = state.nodes.filter(n => n.id !== id);
            state.edges = state.edges.filter(e => e.from !== id && e.to !== id);
        }

        function addEdge(from, to, label = '', color = config.lineColor, directed = true) {
            if (state.edges.find(e => e.from === from && e.to === to && e.label === label)) return;
            state.edges.push({ from, to, label, color, directed });
        }

        function removeEdge(from, to) {
            state.edges = state.edges.filter(e => !(e.from === from && e.to === to));
        }

        function clear() {
            state.nodes = [];
            state.edges = [];
        }

        function simulate() {
            // Repulsion
            for (let i = 0; i < state.nodes.length; i++) {
                for (let j = i + 1; j < state.nodes.length; j++) {
                    let n1 = state.nodes[i];
                    let n2 = state.nodes[j];
                    let dx = n1.x - n2.x;
                    let dy = n1.y - n2.y;
                    let distSq = dx*dx + dy*dy;
                    if (distSq === 0) { dx = Math.random(); dy = Math.random(); distSq = dx*dx+dy*dy; }
                    
                    let force = config.repulsion / distSq;
                    let dist = Math.sqrt(distSq);
                    let fx = (dx / dist) * force;
                    let fy = (dy / dist) * force;
                    
                    n1.vx += fx; n1.vy += fy;
                    n2.vx -= fx; n2.vy -= fy;
                }
            }
            
            // Springs (Edges)
            for (let edge of state.edges) {
                let n1 = state.nodes.find(n => n.id === edge.from);
                let n2 = state.nodes.find(n => n.id === edge.to);
                if (!n1 || !n2) continue;
                
                let dx = n2.x - n1.x;
                let dy = n2.y - n1.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if (dist === 0) dist = 0.01;
                
                let force = (dist - config.springLength) * config.springStrength;
                let fx = (dx / dist) * force;
                let fy = (dy / dist) * force;
                
                n1.vx += fx; n1.vy += fy;
                n2.vx -= fx; n2.vy -= fy;
            }
            
            // Center gravity
            let cx = config.width / 2;
            let cy = config.height / 2;
            for (let n of state.nodes) {
                n.vx += (cx - n.x) * 0.01;
                n.vy += (cy - n.y) * 0.01;
            }
            
            // Apply velocities
            for (let n of state.nodes) {
                if (n === state.draggedNode) continue;
                n.vx *= config.damping;
                n.vy *= config.damping;
                n.x += n.vx;
                n.y += n.vy;
                
                // Bounds
                n.x = Math.max(config.nodeRadius, Math.min(config.width - config.nodeRadius, n.x));
                n.y = Math.max(config.nodeRadius, Math.min(config.height - config.nodeRadius, n.y));
            }
        }

        function render() {
            ctx.clearRect(0, 0, config.width, config.height);
            if (config.bgColor !== 'transparent') {
                ctx.fillStyle = config.bgColor;
                ctx.fillRect(0, 0, config.width, config.height);
            }
            
            // Draw edges
            for (let edge of state.edges) {
                let n1 = state.nodes.find(n => n.id === edge.from);
                let n2 = state.nodes.find(n => n.id === edge.to);
                if (!n1 || !n2) continue;
                
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                
                // Curve for self loops or bidirectional
                let isBidirectional = state.edges.some(e => e.from === edge.to && e.to === edge.from);
                
                if (n1 === n2) {
                    // Self loop
                    ctx.arc(n1.x, n1.y - config.nodeRadius, 20, 0, 2 * Math.PI);
                } else if (isBidirectional && edge.from > edge.to) {
                    // Curved line
                    let mx = (n1.x + n2.x)/2;
                    let my = (n1.y + n2.y)/2;
                    let dx = n2.x - n1.x;
                    let dy = n2.y - n1.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    let nx = -dy/dist;
                    let ny = dx/dist;
                    ctx.quadraticCurveTo(mx + nx*30, my + ny*30, n2.x, n2.y);
                } else {
                    // Straight line
                    ctx.lineTo(n2.x, n2.y);
                }
                
                ctx.strokeStyle = edge.color;
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Arrow
                if (edge.directed && n1 !== n2) {
                    let angle = Math.atan2(n2.y - n1.y, n2.x - n1.x);
                    let targetX = n2.x - Math.cos(angle) * config.nodeRadius;
                    let targetY = n2.y - Math.sin(angle) * config.nodeRadius;
                    
                    if (isBidirectional && edge.from > edge.to) {
                        // Approximate angle for curve
                    }
                    
                    ctx.beginPath();
                    ctx.moveTo(targetX, targetY);
                    ctx.lineTo(targetX - 10 * Math.cos(angle - Math.PI/6), targetY - 10 * Math.sin(angle - Math.PI/6));
                    ctx.lineTo(targetX - 10 * Math.cos(angle + Math.PI/6), targetY - 10 * Math.sin(angle + Math.PI/6));
                    ctx.closePath();
                    ctx.fillStyle = edge.color;
                    ctx.fill();
                }
                
                // Label
                if (edge.label) {
                    let mx = (n1.x + n2.x)/2;
                    let my = (n1.y + n2.y)/2;
                    ctx.fillStyle = config.textColor;
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    // BG for text
                    let txtW = ctx.measureText(edge.label).width;
                    ctx.fillStyle = 'rgba(18, 25, 45, 0.8)';
                    ctx.fillRect(mx - txtW/2 - 2, my - 8, txtW + 4, 16);
                    
                    ctx.fillStyle = config.textColor;
                    ctx.fillText(edge.label, mx, my);
                }
            }
            
            // Draw nodes
            for (let n of state.nodes) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, config.nodeRadius, 0, 2 * Math.PI);
                ctx.fillStyle = n.color || '#333';
                ctx.fill();
                
                if (n === state.hoveredNode) {
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#FFF';
                    ctx.stroke();
                }
                
                // Emoji or Label
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                if (n.emoji) {
                    ctx.font = '20px Arial';
                    ctx.fillText(n.emoji, n.x, n.y);
                }
                
                // Name label below
                ctx.font = '12px Arial';
                ctx.fillStyle = config.textColor;
                ctx.fillText(n.label, n.x, n.y + config.nodeRadius + 12);
            }
        }

        function loop() {
            simulate();
            render();
            state.animId = requestAnimationFrame(loop);
        }

        function startSimulation() {
            if (!state.animId) {
                loop();
            }
        }

        function stopSimulation() {
            if (state.animId) {
                cancelAnimationFrame(state.animId);
                state.animId = null;
            }
        }

        function getNodeAt(x, y) {
            for (let i = state.nodes.length - 1; i >= 0; i--) {
                let n = state.nodes[i];
                let dx = n.x - x;
                let dy = n.y - y;
                if (dx*dx + dy*dy <= config.nodeRadius*config.nodeRadius) {
                    return n;
                }
            }
            return null;
        }

        // Interactivity
        canvas.addEventListener('mousedown', e => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            let clickedNode = getNodeAt(x, y);
            if (clickedNode) {
                state.draggedNode = clickedNode;
            }
        });
        
        canvas.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            state.mouseX = e.clientX - rect.left;
            state.mouseY = e.clientY - rect.top;
            
            if (state.draggedNode) {
                state.draggedNode.x = state.mouseX;
                state.draggedNode.y = state.mouseY;
                state.draggedNode.vx = 0;
                state.draggedNode.vy = 0;
            } else {
                let node = getNodeAt(state.mouseX, state.mouseY);
                if (node !== state.hoveredNode) {
                    state.hoveredNode = node;
                    canvas.style.cursor = node ? 'pointer' : 'default';
                }
            }
        });
        
        window.addEventListener('mouseup', () => {
            state.draggedNode = null;
        });

        // Resize handler
        window.addEventListener('resize', () => {
            if (canvas.parentElement) {
                config.width = canvas.parentElement.clientWidth;
                canvas.width = config.width;
            }
        });

        const instance = {
            addNode, removeNode, addEdge, removeEdge, clear,
            startSimulation, stopSimulation, render, simulate,
            getNodes: () => state.nodes,
            getEdges: () => state.edges
        };
        
        instances[canvasId] = instance;
        return instance;
    }

    return {
        create,
        get: (id) => instances[id]
    };

})();
