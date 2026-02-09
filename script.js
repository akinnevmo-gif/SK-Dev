const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Main 3D Objects
const geometry = new THREE.IcosahedronGeometry(10, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x0055ff,
  wireframe: true
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light = new THREE.PointLight(0xff0000, 1);
light.position.set(20, 20, 20);
scene.add(light);

// Particles
function particle() {
  const geo = new THREE.SphereGeometry(0.3, 12, 12);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geo, mat);

  star.position.set(
    THREE.MathUtils.randFloatSpread(200),
    THREE.MathUtils.randFloatSpread(200),
    THREE.MathUtils.randFloatSpread(200)
  );
  scene.add(star);
}
Array(300).fill().forEach(particle);

// Animate
function animate() {
  requestAnimationFrame(animate);

  shape.rotation.x += 0.002;
  shape.rotation.y += 0.003;

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
