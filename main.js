import gsap from 'gsap';
// import * as THREEJS from './build/three.js'
import { OrbitControls } from './build/OrbitControls';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'
import atmoVertex2 from './shaders/atmoVertex2.glsl'
import atmoFrag2 from './shaders/atmoFrag2.glsl'



// CANVAS
const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    10000
);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas
});


// Renderer
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

var planetTexture = [
            './textures/mercury.jpg',
            './textures/venus.jpg',
            './textures/earth.jpg',
            './textures/mars.jpg',
            './textures/jupiter.jpg',
            './textures/saturn.jpg',
            './textures/uranus.jpg',
            './textures/neptune.jpg'
            ];


// let planet = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
let scale = {a:5, b:50, c:50};
let position = {x:1500, y:0, z:0}
let tempPlanet
const group2 = new THREE.Group()
for (let i = 0; i < 8; i++) {
    // before generating the first planet we have to define it scale 
    if (i == 0) {
        scale.a = 15*6.5;

    }
    // console.log(tempPlanet);
    tempPlanet = new THREE.Mesh(
        new THREE.SphereGeometry(scale.a, scale.b, scale.c), 
        new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new THREE.TextureLoader().load(planetTexture[i])
                }
            }
        }))
        tempPlanet.position.set(position.x, position.y, position.z)
        group2.add(tempPlanet);        

        position.x += 600   // Math.random() * 100;

        if (i == 1) {
            scale.a = 25*6.5;
        }
        if (i == 2) {
            scale.a = 27*6.5;
        }
        if (i == 3) {
            scale.a = 20*6.5;
        }
        if (i == 4) {
            scale.a = 35*6.5;
        }
        if (i == 5) {
            scale.a = 32*6.5;
        }
        if (i == 6) {
            scale.a = 29*6.5;
        }
        if (i == 7) {
            scale.a = 28*6.5; 
        }
    }

// SUN

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1200, 90, 70), 
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./textures/sun.jpg')
            }
        }
    }))


camera.position.x = 50
camera.position.y = 0
camera.position.z = 3500

// Atmosphere
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1250, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    }))

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere);

// 2nd atmo
const atmosphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(165, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmoVertex2,
        fragmentShader: atmoFrag2,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    }))

atmosphere2.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere2);
atmosphere2.position.set(2700, 0, 0)

const group = new THREE.Group()

group.add(sphere);
scene.add(group);
scene.add(group2);

// Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 15000; i++) {
    const x = (Math.random() - 0.5) * 20000;
    const y = (Math.random() - 0.5) * 20000;
    const z = Math.random() * 20000;
    const a = -(Math.random() - 0.5) * 20000;
    const b = -(Math.random() - 0.5) * 20000;
    const c = -Math.random() * 20000;
    starVertices.push(x, y, z, a, b, c);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// const starVertices2 = [];
// let x,y,z,a,b,c
// y = 0;
// b = 0;
// for ( let j = 0; j < 2000; j++) {
//     for (let i = 0; i < 30; i++) {
//          x = 4000;
//          z = 4000;
//          a = -4000;
//          c = -4000;
//         starVertices2.push(x, y, z, a, b, c);
// }
// x=x+0.5
// z=z-0.5
// a=a+0.5
// c=c-0.5
// }
// starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

// const stars2 = new THREE.Points(starGeometry, starMaterial);
// scene.add(stars2);

// Mouse Movement
const mouse = {
    x: 0,
    y: 0
}
let autoRotate;

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target = new THREE.Vector3(0, 0, 0)
// .position = new THREE.Vector3(10, 10, 10)


const ring = new THREE.RingGeometry( 290, 270, 400);
const materialRing = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const meshRing = new THREE.Mesh( ring, materialRing );
scene.add( meshRing );
meshRing.position.x = 4500
meshRing.rotation.x = Math.PI / 2;



// POSITION OF CAMERA VIEW ON EVERY PLANET
// 'sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'
const sun = document.querySelector('.sun');
const mercury = document.querySelector('.mercury');
const venus = document.querySelector('.venus');
const earth = document.querySelector('.earth');
const mars = document.querySelector('.mars');
const jupiter = document.querySelector('.jupiter');
const saturn = document.querySelector('.saturn');
const uranus = document.querySelector('.uranus');
const neptune = document.querySelector('.neptune');
let v1, v2
v2 = {x:0, y:0, z:5000}
v1 = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
sun.onclick = function () {
    controls.target = new THREE.Vector3(0, 0, 0);
    camera.position.x = 50
    camera.position.y = 0
    camera.position.z = 3500
    // camera.position.lerp(v1, 0.01);
}
mercury.onclick = function () {
    controls.target = new THREE.Vector3(1500, 0, 0);
    camera.position.x = 1500;
    camera.position.z = 600

}
venus.onclick = function () {
    controls.target = new THREE.Vector3(2100, 0, 0);
    camera.position.x = 2100
    camera.position.y = 0
    camera.position.z = 600
}
earth.onclick = function () {
    controls.target = new THREE.Vector3(2700, 0, 0);
    camera.position.x = 2700
    camera.position.y = 0
    camera.position.z = 600
}
mars.onclick = function () {
    controls.target = new THREE.Vector3(3300, 0, 0);
    camera.position.z = 600
    camera.position.x = 3300
}
jupiter.onclick = function () {
    controls.target = new THREE.Vector3(3900, 0, 0);
    camera.position.z = 600
    camera.position.x = 3900
}
saturn.onclick = function () {
    controls.target = new THREE.Vector3(4500, 0, 0);
    camera.position.z = 600
    camera.position.x = 4500
}
uranus.onclick = function () {
    controls.target = new THREE.Vector3(5100, 0, 0);
    camera.position.z = 600
    camera.position.x = 5100
}
neptune.onclick = function () {
    controls.target = new THREE.Vector3(5700, 0, 0);
    camera.position.z = 600
    camera.position.x = 5700
}


// TWEEN JS

// var startCoords = { x: 50, y: 0, z: 3500 }
// var endCoords = { x: 2100, y: 0, z: 2000 }
// var tween = new TWEEN.Tween(startCoords).to(endCoords, 2000);

// tween.onUpdate(function(){
//     camera.position.x = position.x;
//     camera.position.y = position.y;
//     camera.position.z = position.z;
// });
// tween.delay(500)
// tween.start();
//



function animate() {
    renderer.render(scene, camera);
    if (autoRotate = true) {
        sphere.rotation.y += 0.003;
    }
    gsap.to(group.rotation, {
        y: mouse.x * 0.8,
        x: mouse.y * 0.8,
        duration: 2
    });
    // canvas.addEventListener('mousemove', () => {
    //     mouse.x = (event.clientX / innerWidth) * 2 - 1
    //     mouse.y = (event.clientY / innerHeight) * 2 - 1
    //     autoRotate = false
    //     // console.log(mouse);
    // });
    requestAnimationFrame(animate);
    // v1.update()
    controls.update();
    // TWEEN.update();

 
}
animate();
