// LOGIN
function openLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function login() {
  localStorage.setItem("member", "true");
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("locked").style.display = "none";
  document.getElementById("premium").style.display = "block";
}

// LEADERBOARD
function saveScore() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({
    name: player.value,
    score: score.value
  });
  localStorage.setItem("scores", JSON.stringify(scores));
  renderScores();
}

function renderScores() {
  let list = document.getElementById("leaderboard");
  list.innerHTML = "";
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.sort((a,b)=>b.score-a.score);
  scores.forEach(s=>{
    let li = document.createElement("li");
    li.innerText = `${s.name}: ${s.score}`;
    list.appendChild(li);
  });
}

renderScores();

// THREE.JS BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: bg3d, alpha:true});
renderer.setSize(innerWidth, innerHeight);

const geo = new THREE.TorusKnotGeometry(10,3,100,16);
const mat = new THREE.MeshStandardMaterial({color:0xff0000, wireframe:true});
const knot = new THREE.Mesh(geo, mat);
scene.add(knot);

const light = new THREE.PointLight(0x00f0ff,1);
light.position.set(20,20,20);
scene.add(light);

camera.position.z = 40;

function animate(){
  requestAnimationFrame(animate);
  knot.rotation.x += 0.005;
  knot.rotation.y += 0.005;
  renderer.render(scene,camera);
}
animate();
