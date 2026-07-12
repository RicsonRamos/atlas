/**
 * ============================================================
 * LogicLab — bloch.js
 * Esfera de Bloch 3D para Lógica Quântica
 * ============================================================
 */

window.LogicLab = window.LogicLab || {};

LogicLab.Bloch = (function () {
    'use strict';

    let scene, camera, renderer, sphereGroup;
    let arrowPointer;
    let animId = null;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    // Alvo para lerp da seta
    let targetTheta = 0;
    let targetPhi = 0;
    let currentTheta = 0;
    let currentPhi = 0;

    function init(containerId, width, height) {
        if (!window.THREE) {
            console.error('Three.js não carregado.');
            return null;
        }

        const container = document.getElementById(containerId);
        if (!container) return null;
        
        container.innerHTML = '';

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(2, 2, 3);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        sphereGroup = new THREE.Group();
        scene.add(sphereGroup);

        // Iluminação
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // Esfera transparente
        const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
        const sphereMat = new THREE.MeshPhongMaterial({
            color: 0x1E293B,
            transparent: true,
            opacity: 0.2,
            depthWrite: false
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphereGroup.add(sphere);

        // Wireframe (equador e meridianos)
        const wireMat = new THREE.LineBasicMaterial({ color: 0x94A3B8, transparent: true, opacity: 0.3 });
        const equatorGeo = new THREE.EdgesGeometry(new THREE.CylinderGeometry(1, 1, 0.01, 32));
        const equator = new THREE.LineSegments(equatorGeo, wireMat);
        sphereGroup.add(equator);
        
        const meridianGeo = new THREE.EdgesGeometry(new THREE.CylinderGeometry(1, 1, 0.01, 32));
        const meridian1 = new THREE.LineSegments(meridianGeo, wireMat);
        meridian1.rotation.x = Math.PI / 2;
        sphereGroup.add(meridian1);
        
        const meridian2 = new THREE.LineSegments(meridianGeo, wireMat);
        meridian2.rotation.z = Math.PI / 2;
        sphereGroup.add(meridian2);

        // Eixos (X, Y, Z)
        function createAxis(color, p1, p2, label) {
            const mat = new THREE.LineBasicMaterial({ color: color });
            const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
            const line = new THREE.Line(geo, mat);
            sphereGroup.add(line);
            
            // Labels simples (texto 2D na frente do canvas em app.js) - omitido do 3D puro por simplicidade
        }

        createAxis(0xFF4081, new THREE.Vector3(-1.2, 0, 0), new THREE.Vector3(1.2, 0, 0)); // X (Red-ish)
        createAxis(0x00FFB2, new THREE.Vector3(0, -1.2, 0), new THREE.Vector3(0, 1.2, 0)); // Y (Green-ish)
        createAxis(0x00E5FF, new THREE.Vector3(0, 0, -1.2), new THREE.Vector3(0, 0, 1.2)); // Z (Blue-ish)

        // Seta do Estado (Vetor)
        arrowPointer = new THREE.ArrowHelper(
            new THREE.Vector3(0, 0, 1), // dir
            new THREE.Vector3(0, 0, 0), // origem
            1, // length
            0xFFD54F, // color yellow
            0.15, // headLength
            0.1  // headWidth
        );
        sphereGroup.add(arrowPointer);

        // Interatividade (OrbitControls simples)
        renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
        });
        renderer.domElement.addEventListener('mousemove', (e) => {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };
            
            if (isDragging) {
                const deltaRotationQuaternion = new THREE.Quaternion()
                    .setFromEuler(new THREE.Euler(
                        Math.toRadians(deltaMove.y * 0.5),
                        Math.toRadians(deltaMove.x * 0.5),
                        0,
                        'XYZ'
                    ));
                sphereGroup.quaternion.multiplyQuaternions(deltaRotationQuaternion, sphereGroup.quaternion);
            }
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
        });
        window.addEventListener('mouseup', () => { isDragging = false; });

        Math.toRadians = function(degrees) { return degrees * Math.PI / 180; };

        // Loop
        function animate() {
            animId = requestAnimationFrame(animate);
            
            // Lerp da seta
            currentTheta = LogicLab.Utils.lerp(currentTheta, targetTheta, 0.1);
            currentPhi = LogicLab.Utils.lerp(currentPhi, targetPhi, 0.1);
            
            // Note: Na física quantica, |0> fica em Z+ (polo norte). 
            // ThreeJS: Y é para cima. 
            // Então mapeamos: Z quantico -> Y ThreeJS. X -> X. Y -> Z.
            const x = Math.sin(currentTheta) * Math.cos(currentPhi);
            const z = Math.sin(currentTheta) * Math.sin(currentPhi); // Y quantico
            const y = Math.cos(currentTheta); // Z quantico
            
            const dir = new THREE.Vector3(x, y, z).normalize();
            arrowPointer.setDirection(dir);
            
            renderer.render(scene, camera);
        }
        
        animate();

        return {
            resize: function(w, h) {
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            },
            setState: function(theta, phi) {
                // theta: 0 a PI, phi: 0 a 2PI
                targetTheta = theta;
                targetPhi = phi;
            },
            dispose: function() {
                if (animId) cancelAnimationFrame(animId);
            }
        };
    }

    return {
        init
    };

})();
