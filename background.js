// 3D Particle Network Animation using Three.js

const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles in a wide area
        posArray[i] = (Math.random() - 0.5) * 80;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x0891b2, // Cyan/Secondary color
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Connecting Lines (Optional - keeping it simple for performance, can add if requested)
    // For a "Cloud Architecture" feel, we can add a subtle geometric wireframe icosahedron
    const geoGeometry = new THREE.IcosahedronGeometry(15, 1);
    const geoMaterial = new THREE.MeshBasicMaterial({
        color: 0x2563eb, // Primary Blue
        wireframe: true,
        transparent: true,
        opacity: 0.05
    });
    const geoMesh = new THREE.Mesh(geoGeometry, geoMaterial);
    scene.add(geoMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotation
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        geoMesh.rotation.x -= 0.001;
        geoMesh.rotation.y -= 0.001;

        // Mouse Parallax
        particlesMesh.rotation.y += mouseX * 0.05;
        particlesMesh.rotation.x += mouseY * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    // Responsive Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

document.addEventListener('DOMContentLoaded', initThreeJS);
