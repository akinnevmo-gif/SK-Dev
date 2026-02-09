const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 3D Logo Object
const geometry = new THREE.TorusKnotGeometry(10, 3, 120, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0x0066ff,
  wireframe: true,
  emissive: 0xff1e1e,
  emissiveIntensity: 0.4
});
const logo3D = new THREE.Mesh(geometry, material);
scene.add(logo3D);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const redLight = new THREE.PointLight(0xff1e1e, 1.2);
redLight.position.set(30, 20, 20);
scene.add(redLight);

const blueLight = new THREE.PointLight(0x0066ff, 1.2);
blueLight.position.set(-30, -20, 20);
scene.add(blueLight);

// Stars
Array(300).fill().forEach(() => {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.3),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  star.position.set(
    THREE.MathUtils.randFloatSpread(200),
    THREE.MathUtils.randFloatSpread(200),
    THREE.MathUtils.randFloatSpread(200)
  );
  scene.add(star);
});

// Scroll-based motion
document.body.onscroll = () => {
  const t = document.body.getBoundingClientRect().top;
  logo3D.rotation.x = t * 0.001;
  logo3D.rotation.y = t * 0.001;
  camera.position.z = 40 + t * -0.01;
};

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  logo3D.rotation.x += 0.003;
  logo3D.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// Theme toggle
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
};

// WhatsApp form
function sendMessage(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const msg = document.getElementById("message").value;
  window.open(
    `https://wa.me/231777789356?text=${encodeURIComponent(
      `Hello, I am ${name}. ${msg}`
    )}`
  );
}

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
