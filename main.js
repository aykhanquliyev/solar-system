import gsap from 'gsap';
// import * as THREEJS from './build/three.js'
import { OrbitControls } from './build/OrbitControls';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

// $('#open').click(function() {
//     $('#modalOverlay').show().addClass('modal-open');
//   });

//   $('#close').click(function() {
//     var elem = $('#modalOverlay');
//     elem.removeClass('modal-open');
//     setTimeout(function() {
//       elem.hide();
//     },200);
//   });

// POP UP 
// $(document).ready(function () {
//     $('.pop-up-button').click(function () {
//       $('.wrapper').toggleClass('show');
//     });
//   });
// POP UP END

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
var planets = [
            './textures/sun.jpg',
            './textures/mercury.jpg',
            './textures/venus.jpeg',
            './textures/earth.jpg',
            './textures/mars.jpg',
            './textures/jupiter.jpg',
            './textures/saturn.jpg',
            './textures/uranus.jpg',
            './textures/neptune.jpg'
            ];

planet = planets[3]

// let opt
// Chosing a planet

// const earth = document.querySelector('.mercury');
// earth.onclick = function () {
//     planet = planets[2];
// }
//  choose = function() {
//     earth.addEventListener('click', function() {
//     });
// }

// THE SUN

const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(10, 70, 70),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load(planets[3])
            }
        }
    }))

// MERCURY

const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(10, 70, 70),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load(planets[3])
            }
        }
    }))

// Venus

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(10, 70, 70),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,   
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load(planet)
            }
        }
    }))

// EARTH

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load(planet)
            }
        }
    }))

camera.position.x = 50
camera.position.y = 0
camera.position.z = 70

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
const group2 = new THREE.Group()

group.add(sphere);
group2.add(sphere2)
group2.add(mercury)
scene.add(group);
scene.add(group2);

sphere2.position.set( 20, 0, 0 );
mercury.position.set( 45, 0, 0 );

// Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 2000; i++) {
    const x = (Math.random() - 0.5) * 5000;
    const y = (Math.random() - 0.5) * 5000;
    const z = Math.random() * 1000;
    const a = -(Math.random() - 0.5) * 5000;
    const b = -(Math.random() - 0.5) * 5000;
    const c = -Math.random() * 1000;
    starVertices.push(x, y, z, a, b, c);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

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


const earth = document.querySelector('.mercury');

earth.onclick = function () {
    controls.target = new THREE.Vector3(20, 0, 10);
}

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
    canvas.addEventListener('mousemove', () => {
        mouse.x = (event.clientX / innerWidth) * 2 - 1
        mouse.y = (event.clientY / innerHeight) * 2 - 1
        autoRotate = false
        // console.log(mouse);
    });
    requestAnimationFrame(animate);
    controls.update();
}
animate();
