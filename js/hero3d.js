import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const heroSection = document.querySelector('.hero');
const container = document.getElementById('hero3d');

if (heroSection && container) {
  try {
    initHero3D(heroSection, container);
  } catch (err) {
    container.style.display = 'none';
  }
}

function initHero3D(heroSection, container) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  let width = heroSection.offsetWidth;
  let height = heroSection.offsetHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Outer wireframe shell
  const coreGeo = new THREE.IcosahedronGeometry(2.5, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x7c8bff,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  // Inner faceted core
  const innerGeo = new THREE.IcosahedronGeometry(1.45, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xb583ff,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  scene.add(inner);

  // Surrounding particle sphere for depth
  const particleCount = window.innerWidth < 760 ? 220 : 550;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radius = 3.6 + Math.random() * 4.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x9fb0ff,
    size: 0.035,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  if (isFinePointer && !reducedMotion) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
  }

  if (reducedMotion) {
    renderer.render(scene, camera);
  } else {
    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();

      core.rotation.y += delta * 0.18;
      core.rotation.x += delta * 0.08;
      inner.rotation.y -= delta * 0.25;
      inner.rotation.x += delta * 0.12;
      particles.rotation.y += delta * 0.02;

      targetRotX += (mouseY * 0.3 - targetRotX) * 0.04;
      targetRotY += (mouseX * 0.3 - targetRotY) * 0.04;
      scene.rotation.x = targetRotX;
      scene.rotation.y = targetRotY;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }

  window.addEventListener('resize', () => {
    width = heroSection.offsetWidth;
    height = heroSection.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}
