import './style.css'
import gsap from 'gsap';
import * as THREEJS from './build/three.js'
import { OrbitControls } from './js/OrbitControls';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
// import vertexShader from './shaders/vertex.glsl'
// import fragmentShader from './shaders/fragment.glsl'
// import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
// import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

const canvas = document.querySelector('.webgl');
// var context = canvas.getContext('2d');
// var x = canva.width / 2;
// var y = canvasText.height / 2;
// context.textAlign = 'center';
// context.fillStyle = 'white';
// context.fillText('ayxan', x, y)
// const text = document.querySelector('.text').innerHTML = 'Earth in 3D';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000 
    );
    // scene.add(text);
// const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas
});

// TEXT
// var canvasText = document.querySelector('.webgl');
// var context = canvasText.getContext('2d');
// var x = canvasText.width / 2;
// var y = canvasText.height / 2;
// context.textAlign = 'center';
// context.fillStyle = 'white';
// context.fillText('ayxan', x, y)
// scene.add(canvasText);



// Renderer
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// document.body.appendChild(renderer.domElement);
let planet
const planets = ['./globe.jpg', './neptune2.jpg'];
planet = planets[0]

let opt
// Chosing a planet
const earth = document.querySelector('.neptune');
const choose = function() {
    earth.addEventListener('click', function() {
        location.reload();
        planet = planets[1];
    });
}
choose();
// create a sphere 



camera.position.z = 20  

// Atmosphere
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
}))

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere);

const group = new THREE.Group()

scene.add(group);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.6) * 2000;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Mouse Movement
const mouse = {
    x: undefined,
    y: undefined
}
let autoRotate;

// Controls
const controls = new OrbitControls(camera, canvas )
controls.target = new THREE.Vector3(0, 0, -20)

function animate () {
        controls.update();


    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}
animate();
